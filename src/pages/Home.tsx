
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, GraduationCap, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const portals = [
    {
      title: 'Citizen Portal',
      description: 'Report civic issues, track progress, and participate in local governance.',
      icon: Users,
      href: '/citizen',
      color: 'blue'
    },
    {
      title: 'Admin Dashboard',
      description: 'Monitor reports, assign tasks, and oversee resolution workflows.',
      icon: ShieldCheck,
      href: '/admin',
      color: 'indigo'
    },
    {
      title: 'University Workspace',
      description: 'Collaborate on complex problems and propose innovative solutions.',
      icon: GraduationCap,
      href: '/university',
      color: 'sky'
    },
    {
      title: 'Industry Hub',
      description: 'Partner with the community to implement scalable solutions.',
      icon: Briefcase,
      href: '/industry',
      color: 'slate'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex flex-col items-center relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[120px] pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-[120px] pointer-events-none transition-colors duration-300" />

      {/* Hero Section */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-md shadow-sm mb-8 animate-in fade-in zoom-in transition-transform hover:scale-105 duration-300">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-sm font-black text-blue-800 dark:text-blue-300 tracking-widest uppercase">Welcome to</span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 transition-colors duration-300">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Sahyog</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-16 transition-colors duration-300">
          Every Problem Deserves a Path to a Solution. Connects citizens, administrators, academia, and industry to resolve community challenges effectively.
        </p>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
          {portals.map((portal) => (
            <Link
              key={portal.title}
              to={portal.href}
              className="group flex flex-col items-center text-center bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-500 border border-slate-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-2 overflow-hidden relative"
            >
              {/* Decorative top gradient on hover */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner dark:shadow-none group-hover:shadow-blue-200 group-hover:scale-110">
                <portal.icon className="w-10 h-10 stroke-[1.5]" />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                {portal.title}
              </h2>

              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 flex-grow transition-colors duration-300">
                {portal.description}
              </p>

              <div className="mt-auto inline-flex items-center text-blue-600 dark:text-blue-300 font-semibold text-sm bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                Enter Portal
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
