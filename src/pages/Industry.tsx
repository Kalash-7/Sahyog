import { useState } from 'react';
import { useSahyog } from '../context/SahyogContext';
import { Briefcase, Building2, Landmark, CheckCircle, TrendingUp, HandCoins, AlertCircle } from 'lucide-react';

export default function Industry() {
  const { challenges, fundChallenge } = useSahyog();

  // Dynamic Metrics
  const activePilots = challenges.filter(c => c.status === 'Completed' || (c.milestoneIndex !== undefined && c.milestoneIndex >= 4)).length;
  const totalFundsDisbursed = (challenges.filter(c => c.industryFunded).length * 500000).toLocaleString('en-IN');

  // Only show projects that are actively being worked on by a University
  const investmentOpportunities = challenges.filter(c => c.status === 'In Progress');

  const [fundingId, setFundingId] = useState<string | null>(null);

  const handleFund = (id: string) => {
    setFundingId(id);
    // Simulate transaction delay
    setTimeout(() => {
      fundChallenge(id, 'Tata Trusts (Mock CSR)');
      setFundingId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
      <header className="bg-slate-900 dark:bg-zinc-900 text-white shadow-xl border-b-2 border-slate-700 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-slate-300" />
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight leading-none">Sahyog</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Corporate Partner Portal</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Removed My Portfolio button */}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="mb-8 border-b border-slate-300 dark:border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 transition-colors">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">CSR Deployment Tracker</h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 font-medium transition-colors">Monitor your funds and scale civic innovation projects.</p>
          </div>
          <div className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-zinc-900 px-4 py-2 rounded-lg transition-colors">
            <TrendingUp className="w-5 h-5 mr-2 text-slate-600 dark:text-slate-500" />
            Impact Multiplier: High
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors hover:shadow-md">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Funds Disbursed</div>
            <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">₹{totalFundsDisbursed}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm transition-colors hover:shadow-md">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Active Pilot Deployments</div>
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{activePilots}</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Live Investment Opportunities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentOpportunities.length === 0 ? (
            <div className="col-span-full py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center flex flex-col items-center justify-center transition-colors">
              <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No Active Opportunities</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">There are currently no civic projects in the 'In Progress' phase available for funding. Check back later once universities have accepted new challenges.</p>
            </div>
          ) : (
            investmentOpportunities.map(challenge => (
              <div key={challenge.id} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 border border-slate-200 dark:border-zinc-800 flex flex-col overflow-hidden group">
                
                <div className="bg-slate-900 dark:bg-zinc-950 p-6 relative overflow-hidden transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                    <Briefcase className="w-24 h-24 text-white" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-slate-800 dark:bg-zinc-800 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-md mb-3 border border-slate-700 dark:border-zinc-700 transition-colors">
                      {challenge.ai_analysis?.domain || 'Innovation'}
                    </span>
                    <h2 className="text-xl font-bold text-white leading-snug">{challenge.title}</h2>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 transition-colors">Execution Partner</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-300 flex items-center transition-colors">
                      <Landmark className="w-4 h-4 mr-2 text-slate-500 dark:text-slate-500" />
                      {challenge.ai_analysis?.recommended_uni || 'Assigned University'}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-zinc-800 transition-colors">
                    {challenge.industryFunded ? (
                      <div className="w-full flex items-center justify-center px-4 py-3.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded-xl border border-emerald-200 dark:border-emerald-900/30 transition-colors">
                        Funded by {challenge.industryPartner} <CheckCircle className="ml-2 w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                      </div>
                    ) : (
                      <button
                        onClick={() => handleFund(challenge.id)}
                        disabled={fundingId === challenge.id}
                        className="w-full flex items-center justify-center px-4 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {fundingId === challenge.id ? (
                          'Processing Transaction...'
                        ) : (
                          <>
                            <HandCoins className="mr-2 w-5 h-5" /> Provide CSR Funding
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
