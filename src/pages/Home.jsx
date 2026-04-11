import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight, GitBranch, Loader2 } from 'lucide-react';

function Home({ bgTheme }) {
  const navigate = useNavigate();
  const isLight = bgTheme === 'light';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-block mb-6">
            <Sparkles className="text-purple-500 mx-auto animate-pulse" size={64} />
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Map Your Multiverse
          </h1>

          <p className={`text-2xl mb-4 max-w-3xl mx-auto ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Every decision splits reality into infinite branches.
            Visualize the life you didn't choose.
          </p>

          <p className={`text-lg mb-12 max-w-2xl mx-auto ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}>
            A data storytelling tool that simulates alternate timelines based on pivotal life decisions.
            See how different choices reshape your career, relationships, and happiness across parallel realities.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/questionnaire')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-sky-600 to-emerald-600 hover:from-purple-500 hover:via-sky-500 hover:to-emerald-500 text-white text-xl font-bold px-12 py-6 rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:scale-105"
          >
            <Zap className="group-hover:rotate-12 transition-transform" size={28} />
            Initialize Engine
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={28} />
          </button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className={`backdrop-blur-sm border rounded-xl p-6 ${
            isLight
              ? 'bg-white/80 border-purple-300'
              : 'bg-slate-900/60 border-purple-500/30'
          }`}>
            <GitBranch className="text-purple-500 mb-3 mx-auto" size={32} />
            <h3 className={`text-lg font-semibold mb-2 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>Timeline Branching</h3>
            <p className={`text-sm ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>Explore how pivotal decisions create divergent life paths</p>
          </div>

          <div className={`backdrop-blur-sm border rounded-xl p-6 ${
            isLight
              ? 'bg-white/80 border-sky-300'
              : 'bg-slate-900/60 border-sky-500/30'
          }`}>
            <Loader2 className="text-sky-500 mb-3 mx-auto" size={32} />
            <h3 className={`text-lg font-semibold mb-2 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>Reality Simulation</h3>
            <p className={`text-sm ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>AI-powered narrative generation for alternate futures</p>
          </div>

          <div className={`backdrop-blur-sm border rounded-xl p-6 ${
            isLight
              ? 'bg-white/80 border-emerald-300'
              : 'bg-slate-900/60 border-emerald-500/30'
          }`}>
            <Sparkles className="text-emerald-500 mb-3 mx-auto" size={32} />
            <h3 className={`text-lg font-semibold mb-2 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>Data Storytelling</h3>
            <p className={`text-sm ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>Visualize happiness, wealth, and satisfaction metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
