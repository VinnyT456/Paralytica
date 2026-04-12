import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight, GitBranch, Loader2 } from 'lucide-react';
import ParalyticaLogo from '../assets/PurpleParalyticaLogoTransparent.png';

function Home({ bgTheme }) {
  const navigate = useNavigate();
  const isLight = bgTheme === 'light';

  return (
    <div className="min-h-screen flex flex-col p-6 pt-24 pb-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        {/* SECTION A: Hero Section - The Headline */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block mb-8">
            <img src={ParalyticaLogo} alt="Paralytica Logo" className="w-50 h-40 mx-auto animate-pulse" />
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Map Your Multiverse
          </h1>

          <p className={`text-2xl mb-4 max-w-3xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Explore how your choices shape your life. <br /> See its impact on your career, relationships, and happiness.  
          </p>

          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>
            An interactive tool to compare possible futures. <br /> 
            See how small choices lead to different outcomes. 
          </p>
        </div>

        {/* SECTION B: Feature Pillars - MASSIVE Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {/* Pillar 1: Timeline Paths */}
          <div className={`group backdrop-blur-md border-2 rounded-3xl p-12 min-h-[480px] transition-all duration-500 hover:scale-[1.03] flex flex-col items-center justify-center text-center ${
            isLight
              ? 'bg-white/90 border-purple-300 hover:border-purple-500 hover:shadow-2xl'
              : 'bg-slate-900/80 border-purple-500/40 hover:border-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]'
          }`}>
            <div className="mb-8 p-8 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-500 shadow-lg">
              <GitBranch className="text-purple-500 group-hover:scale-110 transition-transform duration-500" size={72} />
            </div>
            <h3 className={`text-4xl font-bold mb-6 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>Timeline <br /> Paths</h3>
            <p className={`text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              See where key decisions could take you.   
              Explore different directions your story might take. 
            </p>
          </div>

          {/* Pillar 2: Reality Simulation */}
          <div className={`group backdrop-blur-md border-2 rounded-3xl p-12 min-h-[480px] transition-all duration-500 hover:scale-[1.03] flex flex-col items-center justify-center text-center ${
            isLight
              ? 'bg-white/90 border-sky-300 hover:border-sky-500 hover:shadow-2xl'
              : 'bg-slate-900/80 border-sky-500/40 hover:border-sky-500 hover:shadow-[0_0_60px_rgba(14,165,233,0.5)]'
          }`}>
            <div className="mb-8 p-8 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-600/20 group-hover:from-sky-500/30 group-hover:to-sky-600/30 transition-all duration-500 shadow-lg">
              <Loader2 className="text-sky-500 group-hover:scale-110 transition-transform duration-500" size={72} />
            </div>
            <h3 className={`text-4xl font-bold mb-6 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>Future Simulation</h3>
            <p className={`text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Let AI generate realistic “what if” scenarios. 
              Understand how one decision can affect what comes next. 
            </p>
          </div>

          {/* Pillar 3: Data Storytelling */}
          <div className={`group backdrop-blur-md border-2 rounded-3xl p-12 min-h-[480px] transition-all duration-500 hover:scale-[1.03] flex flex-col items-center justify-center text-center ${
            isLight
              ? 'bg-white/90 border-emerald-300 hover:border-emerald-500 hover:shadow-2xl'
              : 'bg-slate-900/80 border-emerald-500/40 hover:border-emerald-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]'
          }`}>
            <div className="mb-8 p-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-500 shadow-lg">
              <Sparkles className="text-emerald-500 group-hover:scale-110 transition-transform duration-500" size={72} />
            </div>
            <h3 className={`text-4xl font-bold mb-6 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>
              Life <br />Insights
            </h3>
            <p className={`text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Track possible outcomes like happiness, finances, and life satisfaction. 
              Compare different paths side by side. 
            </p>
          </div>
        </div>

        {/* SECTION C: Main Call-to-Action - BOTTOM */}
        <div className="text-center mt-auto pt-8">
          <button
            onClick={() => navigate('/questionnaire')}
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 via-sky-600 to-emerald-600 hover:from-purple-500 hover:via-sky-500 hover:to-emerald-500 text-white text-2xl font-bold px-20 py-8 rounded-2xl transition-all duration-500 shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:shadow-[0_0_100px_rgba(168,85,247,0.8)] hover:scale-105"
          >
            <Zap className="group-hover:rotate-12 transition-transform" size={36} />
            Start Exploring
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={36} />
          </button>
          <p className={`mt-6 text-base ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            Discover where your choices could lead. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
