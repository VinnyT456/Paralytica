import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackButton({ to, label = 'Back', bgTheme }) {
  const navigate = useNavigate();
  const isLight = bgTheme === 'light';

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group fixed top-24 left-8 z-40 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
        isLight
          ? 'bg-white/80 hover:bg-white/95 border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm hover:shadow-md'
          : 'bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/50 text-slate-400 hover:text-slate-200 shadow-lg hover:shadow-[0_0_15px_rgba(100,116,139,0.2)]'
      } backdrop-blur-sm hover:scale-105`}
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default BackButton;
