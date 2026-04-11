import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Home as HomeIcon, Info, Zap, Clock } from 'lucide-react';

function Navigation({ bgTheme, setBgTheme }) {
  const location = useLocation();
  const themes = ['space', 'light'];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(bgTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setBgTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch(bgTheme) {
      case 'space': return '🌌';
      case 'light': return '☀️';
      default: return '🎨';
    }
  };

  const isLight = bgTheme === 'light';

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
      isLight
        ? 'bg-white/90 border-slate-200'
        : 'bg-slate-900/80 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Sparkles className="text-purple-500" size={28} />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              PARALYTICA
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'text-purple-600 bg-purple-500/10'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HomeIcon size={18} />
              Home
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'text-purple-600 bg-purple-500/10'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Info size={18} />
              About
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/history')
                  ? 'text-purple-600 bg-purple-500/10'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock size={18} />
              Archive
            </Link>

            <Link
              to="/questionnaire"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] ${
                isActive('/questionnaire') || isActive('/simulate') ? 'ring-2 ring-purple-400' : ''
              }`}
            >
              <Zap size={18} />
              Launch Simulator
            </Link>

            {/* Theme Switcher */}
            <button
              onClick={cycleTheme}
              className={`ml-2 p-2 rounded-lg transition-colors text-2xl ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Current theme: ${bgTheme}`}
            >
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
