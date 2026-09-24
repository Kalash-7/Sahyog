import React, { useState } from 'react';
import { useSahyog } from '../context/SahyogContext';
import { Shield, CheckCircle, BrainCircuit, Building, ArrowRight, Activity, MapPin, DatabaseBackup, Database, Landmark, Users, Briefcase } from 'lucide-react';
import { RANCHI_BLOCKS, REGISTERED_UNIVERSITIES, INDUSTRY_PARTNERS } from '../data/ranchiDatasets';

export default function Admin() {
  const { challenges, updateChallengeStatus, seedDatabase } = useSahyog();
  const [filter, setFilter] = useState<'All' | 'Submitted' | 'Validated'>('Submitted');
  const [blockFilter, setBlockFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'challenges' | 'universities' | 'industry'>('challenges');
  const [hitlOverrides, setHitlOverrides] = useState<Record<string, string>>({});

  const filteredChallenges = challenges.filter(c => {
    const statusMatch = filter === 'All' || c.status === filter;
    const blockMatch = blockFilter === 'All' || c.district === blockFilter;
    return statusMatch && blockMatch;
  });

  const handleApprove = (id: string) => {
    // We could store the chosen uni (from hitlOverrides[id]) in the context,
    // but updating the status achieves the flow requirement.
    updateChallengeStatus(id, 'Validated');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col transition-colors duration-300">
      {/* Top Navbar Simulation */}
      <header className="bg-slate-900 dark:bg-zinc-900 text-white shadow-md border-b border-transparent dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-xl tracking-tight">Sahyog <span className="font-light text-slate-400">| Govt Admin</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm font-medium bg-slate-800 px-3 py-1.5 rounded-full">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Live Monitor</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300">Ecosystem Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage civic issues, universities, and industry partners.</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset the Sandbox Data? This will overwrite existing challenges.")) {
                  seedDatabase();
                }
              }}
              className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 text-sm font-bold rounded-lg transition-colors"
            >
              <DatabaseBackup className="w-4 h-4 mr-2" />
              Reset Sandbox Data
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-slate-200 dark:border-zinc-800">
          <nav className="-mb-px flex space-x-8">
            {(
              [
                { id: 'challenges', label: 'Civic Challenges', icon: Shield },
                { id: 'universities', label: 'Registered Universities', icon: Landmark },
                { id: 'industry', label: 'Industry Partners', icon: Briefcase },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'challenges' && (
          <div className="mb-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <select
              value={blockFilter}
              onChange={(e) => setBlockFilter(e.target.value)}
              className="px-3 py-2 border-slate-300 dark:border-zinc-700 border text-sm rounded-lg bg-white dark:bg-zinc-900 shadow-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <option value="All">All Blocks</option>
              {RANCHI_BLOCKS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <div className="flex space-x-2 bg-slate-200 dark:bg-zinc-800 p-1 rounded-lg transition-colors">
              {['Submitted', 'Validated', 'All'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    filter === status 
                      ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        
        {activeTab === 'challenges' && (
        <div className="space-y-6">
          {filteredChallenges.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-12 text-center transition-colors">
              <CheckCircle className="w-12 h-12 text-emerald-500 dark:text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Inbox Zero</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">No challenges require validation at this time.</p>
            </div>
          ) : (
            filteredChallenges.map(challenge => (
              <div key={challenge.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row transition-all hover:shadow-md dark:hover:shadow-black/50">
                
                {/* Left Side: Citizen Report */}
                <div className="p-6 lg:w-3/5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-zinc-800 flex flex-col transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      challenge.status === 'Submitted' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 
                      challenge.status === 'Validated' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:text-slate-300'
                    }`}>
                      {challenge.status}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">ID: {challenge.id.substring(0,8)}</span>
                  </div>

                  {/* Deduplication Warning Badge */}
                  {challenge.ai_analysis?.duplicate_flag && (
                    <div className="mb-4 inline-flex flex-col bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-3 w-full sm:w-auto">
                      <div className="flex items-center text-sm font-bold text-yellow-800 dark:text-yellow-500 mb-1">
                        <span className="mr-2">⚠️</span> Merged Duplicate ({challenge.ai_analysis?.duplicate_count || 3} similar reports clustered)
                      </div>
                      {challenge.ai_analysis?.merged_reports && (
                        <div className="text-xs text-yellow-700 dark:text-yellow-600/80 font-medium ml-6">
                          Sub-tickets: {challenge.ai_analysis.merged_reports.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{challenge.title}</h2>
                  
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" /> {challenge.district}
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                    {challenge.description}
                  </p>

                  {challenge.imageUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 w-full sm:w-2/3">
                      <img src={challenge.imageUrl} alt="Evidence" className="w-full h-auto object-cover max-h-48" />
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-800">
                    <div className="flex flex-wrap gap-2">
                      {challenge.ai_analysis?.keywords?.map((kw: string) => (
                        <span key={kw} className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-xs font-medium transition-colors">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: AI Insights Panel */}
                <div className="p-6 lg:w-2/5 bg-slate-50 dark:bg-zinc-950/50 flex flex-col transition-colors">
                  <div className="flex items-center mb-4 text-blue-700 dark:text-blue-400 font-bold">
                    <BrainCircuit className="w-5 h-5 mr-2" />
                    AI Routing Intelligence
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-slate-200 dark:border-zinc-800 transition-colors">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider">Domain</div>
                      <div className="font-medium text-slate-900 dark:text-white">{challenge.ai_analysis?.domain || 'Unclassified'}</div>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-slate-200 dark:border-zinc-800 transition-colors">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 uppercase tracking-wider">Priority</div>
                      <div className={`font-bold ${
                        challenge.ai_analysis?.priority === 'High' ? 'text-red-600 dark:text-red-400' : 
                        challenge.ai_analysis?.priority === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {challenge.ai_analysis?.priority || 'Normal'}
                      </div>
                    </div>
                  </div>

                  {/* Explainable AI Block with HITL Override */}
                  <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 mb-6 flex-grow transition-colors">
                    <div className="text-sm font-bold text-slate-800 dark:text-blue-100 mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      Recommended University Partner
                    </div>
                    
                    <div className="mb-4">
                      <select 
                        className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg p-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={hitlOverrides[challenge.id] || challenge.ai_analysis?.recommended_uni || ''}
                        onChange={(e) => setHitlOverrides({...hitlOverrides, [challenge.id]: e.target.value})}
                      >
                        {challenge.ai_analysis?.recommended_uni && (
                          <option value={challenge.ai_analysis.recommended_uni}>{challenge.ai_analysis.recommended_uni} (AI Recommended)</option>
                        )}
                        {REGISTERED_UNIVERSITIES.filter(u => u.name !== challenge.ai_analysis?.recommended_uni).map(u => (
                          <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                      </select>
                      <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 flex items-center italic">
                        <Shield className="w-3 h-3 mr-1" /> HITL Enabled: Admin retains final routing authority.
                      </div>
                    </div>

                    {(!hitlOverrides[challenge.id] || hitlOverrides[challenge.id] === challenge.ai_analysis?.recommended_uni) && (
                      <div className="text-sm border-t border-blue-100 dark:border-blue-900/30 pt-3">
                        <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Explainable Matching:</div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-snug">
                          <span className="font-medium text-blue-700 dark:text-blue-400">Why this university?</span> <br/>
                          {challenge.ai_analysis?.match_reason || 'Insufficient data to provide explanation.'}
                        </p>
                        <div className="mt-3 inline-flex items-center text-[10px] uppercase tracking-wider font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded transition-colors">
                          <Database className="w-3 h-3 mr-1" /> Triage Grounded in CGWB & NBSS&LUP Block Data
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Area */}
                  <div className="mt-auto">
                    {challenge.status === 'Submitted' ? (
                      <button
                        onClick={() => handleApprove(challenge.id)}
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors"
                      >
                        Approve & Route to {hitlOverrides[challenge.id] ? 'Selected' : 'University'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-center px-4 py-3 border border-emerald-200 dark:border-emerald-900/30 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold transition-colors">
                        <CheckCircle className="mr-2 w-4 h-4" />
                        Validated & Routed
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
        )}

        {activeTab === 'universities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGISTERED_UNIVERSITIES.map((uni) => (
              <div key={uni.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 shrink-0">
                    <Landmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{uni.name}</h2>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {uni.expertise.map((exp) => (
                      <span key={exp} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex-grow">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Facilities</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{uni.facilities}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-auto">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-400">Nodal Contact: <span className="font-semibold text-slate-900 dark:text-slate-200">{uni.contact_nodal}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'industry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRY_PARTNERS.map((partner) => (
              <div key={partner.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mr-4 shrink-0">
                      <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{partner.name}</h2>
                  </div>
                </div>
                
                <div className="mb-4 flex-grow">
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.focus_areas.map((area) => (
                      <span key={area} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-auto flex flex-col space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Funding Tier</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{partner.funding_tier}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Active Projects</span>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                      {partner.active_projects}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Backend/Architecture Illusion Status Bar */}
      <footer className="sticky bottom-0 bg-slate-900 dark:bg-black border-t border-slate-800 px-4 py-2 flex items-center justify-between z-10 transition-colors">
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-xs font-semibold text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            Live Sync: Firebase Cloud Gateway
          </div>
          <div className="hidden sm:flex items-center text-xs font-semibold text-blue-400">
            <Shield className="w-3 h-3 mr-1" />
            TensorFlow Deduplication: Active
          </div>
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
          System Core v2.4.1
        </div>
      </footer>
    </div>
  );
}
