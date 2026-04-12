import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Info, Zap, Sun, Moon, Users, Menu, X } from 'lucide-react';
import ParalyticaLogo from '../assets/NewLogo1Transparent3.png';

function Navigation({ bgTheme, setBgTheme }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const themes = ['space', 'light'];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(bgTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setBgTheme(themes[nextIndex]);
  };

  const isLight = bgTheme === 'light';

  const isActive = (path) => location.pathname === path;

  const linkBase = (path) =>
    `flex items-center gap-2 px-3 py-3 rounded-lg transition-colors text-left w-full sm:w-auto sm:py-2 ${
      isActive(path)
        ? 'text-purple-600 bg-purple-500/10'
        : isLight
          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
      isLight
        ? 'bg-white/90 border-slate-200'
        : 'bg-slate-900/80 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer min-w-0 shrink"
            onClick={() => setMobileOpen(false)}
          >
            <img src={ParalyticaLogo} alt="" className="h-8 w-auto sm:h-10 shrink-0" />
            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent truncate">
              PARALYTICA
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-3 xl:gap-6 shrink-0">
            <Link to="/" className={linkBase('/')}>
              <HomeIcon size={18} />
              Home
            </Link>
            <Link to="/about" className={linkBase('/about')}>
              <Info size={18} />
              About
            </Link>
            <Link to="/demo" className={linkBase('/demo')}>
              <Users size={18} />
              Demo
            </Link>
            <Link
              to="/questionnaire"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] ${
                isActive('/questionnaire') || isActive('/simulate') ? 'ring-2 ring-purple-400' : ''
              }`}
            >
              <Zap size={18} />
              <span className="hidden xl:inline">Start Exploring</span>
              <span className="xl:hidden">Start</span>
            </Link>
            <button
              type="button"
              onClick={cycleTheme}
              className={`ml-1 p-2 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title={`Current theme: ${bgTheme}`}
            >
              {isLight ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={cycleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title={`Theme: ${bgTheme}`}
            >
              {isLight ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className={`lg:hidden mt-3 pt-3 border-t flex flex-col gap-1 pb-2 ${
              isLight ? 'border-slate-200' : 'border-slate-700'
            }`}
          >
            <Link to="/" className={linkBase('/')} onClick={() => setMobileOpen(false)}>
              <HomeIcon size={18} />
              Home
            </Link>
            <Link to="/about" className={linkBase('/about')} onClick={() => setMobileOpen(false)}>
              <Info size={18} />
              About
            </Link>
            <Link to="/demo" className={linkBase('/demo')} onClick={() => setMobileOpen(false)}>
              <Users size={18} />
              Demo
            </Link>
            <Link
              to="/questionnaire"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-sky-600 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              onClick={() => setMobileOpen(false)}
            >
              <Zap size={18} />
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
