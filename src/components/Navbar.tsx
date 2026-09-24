import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Report Issue', path: '/citizen' },
    { name: 'Gov Admin', path: '/admin' },
    { name: 'University', path: '/university' },
    { name: 'Industry', path: '/industry' },
  ];

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Sahyog</span>
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold transition-all border-b-2 px-1 py-5 flex items-center ${
                    isActive
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:border-zinc-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 ml-4 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-slate-300 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
