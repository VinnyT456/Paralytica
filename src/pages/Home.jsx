import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight, GitBranch, Loader2 } from 'lucide-react';

function Home({ bgTheme }) {
  const navigate = useNavigate();
  const isLight = bgTheme === 'light';

  return (
    <div className="min-h-screen flex flex-col p-6 pt-24 pb-12">
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        {/* SECTION A: Hero Section - The Headline */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block mb-8">
            <Sparkles className="text-purple-500 mx-auto animate-pulse" size={80} />
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Map Your Multiverse
          </h1>

          <p className={`text-2xl mb-4 max-w-3xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Every decision splits reality into infinite branches.
            Visualize the life you didn't choose.
          </p>

          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>
            A data storytelling tool that simulates alternate timelines based on pivotal life decisions.
            See how different choices reshape your career, relationships, and happiness across parallel realities.
          </p>
        </div>

        {/* SECTION B: Feature Pillars - MASSIVE Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {/* Pillar 1: Timeline Branching */}
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
            }`}>Timeline Branching</h3>
            <p className={`text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Explore how pivotal decisions create divergent life paths. Watch your reality split at key moments and see what could have been.
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
            }`}>Reality Simulation</h3>
            <p className={`text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              AI-powered narrative generation creates compelling alternate futures. Experience the cascading effects of different choices.
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
            }`}>Data Storytelling</h3>
            <p className={`text-xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Visualize happiness, wealth, and satisfaction metrics across parallel realities. See your life's trajectory quantified.
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
            Initialize Engine
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={36} />
          </button>
          <p className={`mt-6 text-base ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            Begin your journey through the multiverse
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
