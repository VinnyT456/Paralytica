import { GitBranch } from 'lucide-react';

function Step2PrimaryTimeline({ lifePoints, onBranch, bgTheme }) {
  const isLight = bgTheme === 'light';

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
            Your Primary Timeline
          </h1>
          <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>Click "Branch Here" to explore an alternate reality</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-sky-500 to-emerald-500" />

          <div className="space-y-8">
            {lifePoints.map((point, index) => (
              <div key={point.id} className="relative flex gap-6 items-start animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                    <span className="text-sm font-bold text-purple-400">{point.year}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 backdrop-blur-sm border rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 shadow-lg ${
                  isLight
                    ? 'bg-white/90 border-slate-200'
                    : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}>{point.role}</h3>
                  <p className={`mb-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                    {point.company && <span className={isLight ? 'text-sky-600' : 'text-sky-400'}>{point.company}</span>}
                    {point.company && point.location && <span className={isLight ? 'text-slate-400 mx-2' : 'text-slate-600 mx-2'}>•</span>}
                    {point.location && <span className={isLight ? 'text-slate-600' : 'text-slate-500'}>{point.location}</span>}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-slate-500">Happiness:</span>
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < point.happiness ? 'bg-purple-500' : 'bg-slate-700'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-purple-400 font-semibold">{point.happiness}/10</span>
                  </div>

                  <button
                    onClick={() => onBranch(point, index)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
                  >
                    <GitBranch size={18} />
                    Branch Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2PrimaryTimeline;
