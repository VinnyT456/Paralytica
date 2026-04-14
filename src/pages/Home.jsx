import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Sparkles, Zap, ArrowRight, GitBranch, Loader2 } from 'lucide-react';
import ParalyticaLogo from '../assets/NewLogo1Transparent3.png';

function Home({ bgTheme }) {
  const navigate = useNavigate();
  const isLight = bgTheme === 'light';
  const {
    setHeuristicProfile,
    setDemoPersonaId,
    setTimeline,
    setMilestoneHistory
  } = useAppContext();

  const clearVaultAndStart = () => {
    try {
      localStorage.removeItem('nexus_vault');
    } catch {
      // ignore
    }
    setHeuristicProfile(null);
    setDemoPersonaId(null);
    setTimeline([]);
    setMilestoneHistory([]);
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 pt-20 sm:p-6 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col min-w-0">
        {/* SECTION A: Hero Section - The Headline */}
        <div className="text-center mb-12 sm:mb-20 animate-fade-in-up">
          <div className="inline-block mb-4 sm:mb-8">
            <img
              src={ParalyticaLogo}
              alt="Paralytica Logo"
              className="w-28 h-auto sm:w-40 md:w-48 mx-auto animate-pulse max-w-[min(100%,12rem)]"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 px-1 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Map Your Multiverse
          </h1>

          <p className={`text-base sm:text-xl md:text-2xl mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-1 ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Explore how your choices shape your life. See its impact on your career, relationships, and happiness.
          </p>

          <p className={`text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-1 ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>
            An interactive tool to compare possible futures. See how small choices lead to different outcomes.
          </p>
        </div>

        {/* SECTION B: Feature Pillars - MASSIVE Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-20">
          {/* Pillar 1: Timeline Paths */}
          <div className={`group backdrop-blur-md border-2 rounded-3xl p-6 sm:p-10 md:p-12 min-h-[280px] sm:min-h-[400px] lg:min-h-[480px] transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] flex flex-col items-center justify-center text-center ${
            isLight
              ? 'bg-white/90 border-purple-300 hover:border-purple-500 hover:shadow-2xl'
              : 'bg-slate-900/80 border-purple-500/40 hover:border-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]'
          }`}>
            <div className="mb-6 sm:mb-8 p-5 sm:p-8 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-500 shadow-lg">
              <GitBranch className="text-purple-500 group-hover:scale-110 transition-transform duration-500 w-12 h-12 sm:w-[4.5rem] sm:h-[4.5rem]" strokeWidth={1.75} />
            </div>
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>Timeline <br /> Paths</h3>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              See how your choices shape possible future paths and meaningful life outcomes. 
            </p>
          </div>

          {/* Pillar 2: Reality Simulation */}
          <div className={`group backdrop-blur-md border-2 rounded-3xl p-6 sm:p-10 md:p-12 min-h-[280px] sm:min-h-[400px] lg:min-h-[480px] transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] flex flex-col items-center justify-center text-center ${
            isLight
              ? 'bg-white/90 border-sky-300 hover:border-sky-500 hover:shadow-2xl'
              : 'bg-slate-900/80 border-sky-500/40 hover:border-sky-500 hover:shadow-[0_0_60px_rgba(14,165,233,0.5)]'
          }`}>
            <div className="mb-6 sm:mb-8 p-5 sm:p-8 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-600/20 group-hover:from-sky-500/30 group-hover:to-sky-600/30 transition-all duration-500 shadow-lg">
              <Loader2 className="text-sky-500 group-hover:scale-110 transition-transform duration-500 w-12 h-12 sm:w-[4.5rem] sm:h-[4.5rem]" strokeWidth={1.75} />
            </div>
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>Future Simulation</h3>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>  
              Explore realistic AI-generated scenarios showing how decisions shape outcomes. 
            </p>
          </div>

          {/* Pillar 3: Data Storytelling */}
          <div className={`group backdrop-blur-md border-2 rounded-3xl p-6 sm:p-10 md:p-12 min-h-[280px] sm:min-h-[400px] lg:min-h-[480px] transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] flex flex-col items-center justify-center text-center ${
            isLight
              ? 'bg-white/90 border-emerald-300 hover:border-emerald-500 hover:shadow-2xl'
              : 'bg-slate-900/80 border-emerald-500/40 hover:border-emerald-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]'
          }`}>
            <div className="mb-6 sm:mb-8 p-5 sm:p-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-500 shadow-lg">
              <Sparkles className="text-emerald-500 group-hover:scale-110 transition-transform duration-500 w-12 h-12 sm:w-[4.5rem] sm:h-[4.5rem]" strokeWidth={1.75} />
            </div>
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Life <br />Insights
            </h3>
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Compare potential outcomes like happiness, finances, and overall life satisfaction. 
            </p>
          </div>
        </div>

        {/* SECTION C: Main Call-to-Action - BOTTOM */}
        <div className="text-center mt-auto pt-8">
          <button
            onClick={clearVaultAndStart}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-4 bg-gradient-to-r from-purple-600 via-sky-600 to-emerald-600 hover:from-purple-500 hover:via-sky-500 hover:to-emerald-500 text-white text-base sm:text-xl md:text-2xl font-bold px-6 py-4 sm:px-12 sm:py-6 md:px-20 md:py-8 rounded-xl sm:rounded-2xl transition-all duration-500 shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:shadow-[0_0_100px_rgba(168,85,247,0.8)] hover:scale-[1.02] sm:hover:scale-105 max-w-full w-full sm:w-auto"
          >
            <Zap className="group-hover:rotate-12 transition-transform shrink-0 w-6 h-6 sm:w-9 sm:h-9" strokeWidth={2} />
            Start Exploring
            <ArrowRight className="group-hover:translate-x-2 transition-transform shrink-0 w-6 h-6 sm:w-9 sm:h-9" strokeWidth={2} />
          </button>
          <p className={`mt-6 text-base ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            Discover where your choices could lead
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
