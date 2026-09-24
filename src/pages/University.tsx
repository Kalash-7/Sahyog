import { useState } from 'react';
import { useSahyog } from '../context/SahyogContext';
import { 
  GraduationCap, BookOpen, Clock, Users, ArrowRight,
  CheckSquare, FileText, Wrench, FlaskConical, Rocket, Target,
  Award, BrainCircuit, CheckCircle
} from 'lucide-react';
import { RANCHI_BLOCKS } from '../data/ranchiDatasets';

const MILESTONES = [
  { label: 'Validation', icon: CheckSquare },
  { label: 'Proposal', icon: FileText },
  { label: 'Prototype', icon: Wrench },
  { label: 'Testing', icon: FlaskConical },
  { label: 'Pilot', icon: Rocket },
  { label: 'Impact', icon: Target },
];

export default function University() {
  const { challenges, updateChallengeStatus, updateChallengeMilestone } = useSahyog();
  const [blockFilter, setBlockFilter] = useState('All');
  
  const [teamModalId, setTeamModalId] = useState<string | null>(null);
  const [dept1, setDept1] = useState('Computer Science');
  const [dept2, setDept2] = useState('Civil Engineering');
  const [mentor, setMentor] = useState('Dr. A. Sharma');

  const [showSyncToast, setShowSyncToast] = useState(false);

  const activeChallenges = challenges.filter(c => {
    const statusMatch = c.status === 'Validated' || c.status === 'In Progress' || c.status === 'Completed';
    const blockMatch = blockFilter === 'All' || c.district === blockFilter;
    return statusMatch && blockMatch;
  });

  const activeCount = activeChallenges.length;
  const studentsEngaged = activeCount * 12;
  const naacPoints = activeCount * 5;

  const handleStartTeam = (id: string) => {
    setTeamModalId(id);
  };

  const confirmTeamAndStart = () => {
    if (teamModalId) {
      updateChallengeStatus(teamModalId, 'In Progress');
      updateChallengeMilestone(teamModalId, 0);
      setTeamModalId(null);
    }
  };

  const handleAdvance = (id: string, currentIndex: number) => {
    if (currentIndex < MILESTONES.length - 1) {
      updateChallengeMilestone(id, currentIndex + 1);
    }
  };

  const handleDeploy = (id: string) => {
    setShowSyncToast(true);
    updateChallengeStatus(id, 'Completed');
    setTimeout(() => setShowSyncToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col transition-colors duration-300 relative">
      
      {/* Toast Notification for Sync */}
      {showSyncToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-top-10 fade-in duration-300">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">Data synced to Govt Analytics. AI Retraining Loop Updated.</span>
        </div>
      )}

      <header className="bg-blue-900 dark:bg-zinc-900 text-white shadow-md border-b-4 border-amber-400 dark:border-blue-600 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-xl tracking-tight">University Workspace <span className="font-light text-blue-300">| Sahyog</span></span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <BookOpen className="w-4 h-4 text-blue-300" />
            <span className="text-blue-100 font-medium">Innovation Hub</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">Project Lifecycle Management</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Accept validated challenges and drive them through to real-world impact.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={blockFilter}
              onChange={(e) => setBlockFilter(e.target.value)}
              className="px-3 py-2 border-slate-300 dark:border-zinc-700 border text-sm rounded-lg bg-white dark:bg-zinc-900 shadow-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <option value="All">All Blocks</option>
              {RANCHI_BLOCKS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* NEP 2020 Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors hover:shadow-md">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Active Experiential Projects (NEP 2020)</div>
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{activeCount}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors hover:shadow-md">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Students Engaged</div>
            <div className="text-4xl font-black text-amber-500 dark:text-amber-400">{studentsEngaged}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors hover:shadow-md">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Estimated NAAC Accreditation Points</div>
            <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">+{naacPoints}</div>
          </div>
        </div>

        <div className="space-y-8">
          {activeChallenges.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 transition-colors">
              <p className="text-slate-500 dark:text-slate-400">No projects available for your workspace yet.</p>
            </div>
          ) : (
            activeChallenges.map(challenge => {
              const currentMilestone = challenge.milestoneIndex || 0;
              
              return (
                <div key={challenge.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-colors">
                  
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 dark:bg-zinc-950/50 transition-colors">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                          challenge.status === 'Validated' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                          challenge.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {challenge.status === 'Validated' ? 'New Assignment' : challenge.status}
                        </span>
                        
                        {challenge.industryFunded && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500 dark:bg-emerald-600 text-white shadow-sm">
                            <Award className="w-3 h-3 mr-1" /> Supported by {challenge.industryPartner}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{challenge.title}</h2>
                    </div>
                    
                    {challenge.status === 'Validated' && (
                      <button
                        onClick={() => handleStartTeam(challenge.id)}
                        className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Accept Challenge & Form Team
                      </button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <p className="text-slate-700 dark:text-slate-300 mb-4 max-w-4xl transition-colors">{challenge.description}</p>
                    
                    {challenge.imageUrl && (
                      <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 w-full max-w-md">
                        <img src={challenge.imageUrl} alt="Evidence" className="w-full h-auto object-cover max-h-64" />
                      </div>
                    )}
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 mb-6">
                      <div className="text-xs font-bold text-blue-800 dark:text-blue-400 mb-1 flex items-center uppercase tracking-wider">
                        <BrainCircuit className="w-4 h-4 mr-2" />
                        AI Match Reason (Explainable AI)
                      </div>
                      <div className="text-sm text-blue-900 dark:text-blue-200 font-medium">
                        {challenge.ai_analysis?.uni_pov_reason || challenge.ai_analysis?.match_reason || 'Routed automatically by Sahyog AI due to matching domain capabilities.'}
                      </div>
                    </div>

                    {/* Lifecycle Tracker */}
                    {(challenge.status === 'In Progress' || challenge.status === 'Completed') && (
                      <div className="mt-8 border-t border-slate-100 dark:border-zinc-800 pt-8">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-8 uppercase tracking-wider flex items-center transition-colors">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          Project Lifecycle
                        </h3>
                        
                        <div className="relative">
                          {/* Connecting Line */}
                          <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 dark:bg-zinc-800 -z-10 transition-colors" />
                          <div 
                            className="absolute top-5 left-8 h-0.5 bg-blue-500 dark:bg-blue-600 -z-10 transition-all duration-500" 
                            style={{ width: `${(currentMilestone / (MILESTONES.length - 1)) * 100}%`, maxWidth: 'calc(100% - 4rem)' }}
                          />

                          <div className="flex justify-between">
                            {MILESTONES.map((step, idx) => {
                              const isCompleted = idx < currentMilestone;
                              const isActive = idx === currentMilestone && challenge.status !== 'Completed';
                              const isFinished = challenge.status === 'Completed';

                              return (
                                <div key={step.label} className="flex flex-col items-center group relative w-16">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted || isFinished
                                      ? 'bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600 text-white'
                                      : isActive
                                      ? 'bg-white border-blue-500 text-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] dark:bg-zinc-900 dark:border-blue-500 dark:text-blue-400 dark:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]'
                                      : 'bg-white border-slate-300 text-slate-400 dark:bg-zinc-900 dark:border-zinc-700 dark:text-slate-600'
                                  }`}>
                                    <step.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                                  </div>
                                  <span className={`mt-3 text-xs font-bold text-center transition-colors ${
                                    isCompleted || isFinished || isActive ? 'text-slate-900 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'
                                  }`}>
                                    {step.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action Area for In Progress */}
                        {challenge.status === 'In Progress' && (
                          <div className="mt-12 flex justify-end">
                            {currentMilestone === MILESTONES.length - 1 ? (
                              <button
                                onClick={() => handleDeploy(challenge.id)}
                                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                              >
                                Deploy & Feed Data to Govt Dashboard
                                <Rocket className="w-5 h-5 ml-2" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAdvance(challenge.id, currentMilestone)}
                                className="inline-flex items-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
                              >
                                Advance Milestone
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Multidisciplinary Team Builder Modal */}
      {teamModalId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/50">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" /> Form Multidisciplinary Team
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Break academic silos by assigning cross-departmental teams (NEP 2020).</p>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Primary Department</label>
                <select 
                  value={dept1} 
                  onChange={e => setDept1(e.target.value)}
                  className="w-full border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-lg p-3 text-sm font-medium shadow-sm dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Computer Science</option>
                  <option>Environmental Science</option>
                  <option>Agriculture</option>
                  <option>Public Health</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Secondary Department (Interdisciplinary)</label>
                <select 
                  value={dept2} 
                  onChange={e => setDept2(e.target.value)}
                  className="w-full border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-lg p-3 text-sm font-medium shadow-sm dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Civil Engineering</option>
                  <option>Social Sciences</option>
                  <option>Data Analytics</option>
                  <option>Economics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Faculty Mentor</label>
                <select 
                  value={mentor} 
                  onChange={e => setMentor(e.target.value)}
                  className="w-full border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-lg p-3 text-sm font-medium shadow-sm dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Dr. A. Sharma</option>
                  <option>Prof. M. Kumar</option>
                  <option>Dr. R. Singh</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/50 flex justify-end space-x-3">
              <button 
                onClick={() => setTeamModalId(null)}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmTeamAndStart}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 shadow-md transition-colors"
              >
                Confirm Team & Start Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
