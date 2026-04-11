import { GitBranch, RefreshCcw } from 'lucide-react';

function Step4FracturedTimeline({ lifePoints, branchIndex, branchDecision, alternateTimeline, onReset, bgTheme }) {
  const isLight = bgTheme === 'light';
  const pointsBeforeBranch = lifePoints.slice(0, branchIndex + 1);
  const pointsAfterBranch = lifePoints.slice(branchIndex + 1);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Timeline Fracture Detected
          </h1>
          <p className={`mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Observing parallel realities</p>
          <button
            onClick={onReset}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLight
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <RefreshCcw size={18} />
            Start Over
          </button>
        </div>

        {/* Timeline before branch */}
        <div className="mb-12">
          <h2 className={`text-xl font-semibold mb-6 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Shared History</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 to-purple-500" />
            <div className="space-y-6">
              {pointsBeforeBranch.map((point, index) => (
                <div key={point.id} className="relative flex gap-6 items-start">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 border-2 rounded-full flex items-center justify-center ${
                      isLight ? 'bg-white border-slate-400' : 'bg-slate-900 border-slate-600'
                    }`}>
                      <span className={`text-sm font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{point.year}</span>
                    </div>
                  </div>
                  <div className={`flex-1 border rounded-xl p-5 ${
                    isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-900/40 border-slate-800'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{point.role}</h3>
                    <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-500'}`}>
                      {point.company && <span>{point.company}</span>}
                      {point.company && point.location && <span> • </span>}
                      {point.location && <span>{point.location}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divergence point */}
        <div className="mb-12">
          <div className={`border-2 rounded-xl p-8 text-center ${
            isLight
              ? 'bg-gradient-to-r from-purple-100 via-sky-100 to-emerald-100 border-purple-400 shadow-lg'
              : 'bg-gradient-to-r from-purple-900/40 via-sky-900/40 to-emerald-900/40 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.3)]'
          }`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <GitBranch className={isLight ? 'text-emerald-600' : 'text-emerald-400'} size={32} />
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text">
                DIVERGENCE CREATED
              </h2>
            </div>
            <p className={`text-lg mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Alternate Decision:</p>
            <p className={`text-xl font-semibold italic ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>"{branchDecision}"</p>
            <p className={`mt-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{alternateTimeline.multiverse_summary}</p>
          </div>
        </div>

        {/* The Y-Split */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Original Universe (abandoned) */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span className={`w-3 h-3 rounded-full ${isLight ? 'bg-slate-400' : 'bg-slate-600'}`} />
              Original Universe (Abandoned)
            </h2>
            <div className="relative">
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`} />
              <div className="space-y-6 opacity-40">
                {pointsAfterBranch.map((point) => (
                  <div key={point.id} className="relative flex gap-6 items-start">
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 border-2 rounded-full flex items-center justify-center ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
                      }`}>
                        <span className={`text-sm font-bold ${isLight ? 'text-slate-500' : 'text-slate-600'}`}>{point.year}</span>
                      </div>
                    </div>
                    <div className={`flex-1 border rounded-xl p-5 ${
                      isLight ? 'bg-white/60 border-slate-200' : 'bg-slate-900/20 border-slate-800'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-1 ${isLight ? 'text-slate-500' : 'text-slate-600'}`}>{point.role}</h3>
                      <p className={`text-sm ${isLight ? 'text-slate-400' : 'text-slate-700'}`}>
                        {point.company && <span>{point.company}</span>}
                        {point.company && point.location && <span> • </span>}
                        {point.location && <span>{point.location}</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Alternate Universe */}
          <div>
            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
              isLight ? 'text-emerald-600' : 'text-emerald-400'
            }`}>
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse" />
              Alternate Universe (Active)
            </h2>
            <div className="relative">
              <div className={`absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-sky-500 to-emerald-500 ${
                isLight ? 'shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'shadow-[0_0_15px_rgba(168,85,247,0.6)]'
              }`} />
              <div className="space-y-6">
                {alternateTimeline.timeline.map((node, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6 items-start animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.3}s`, opacity: 0 }}
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 border-2 border-emerald-500 rounded-full flex items-center justify-center ${
                        isLight
                          ? 'bg-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                      }`}>
                        <span className={`text-sm font-bold ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>{node.year}</span>
                      </div>
                    </div>
                    <div className={`flex-1 border border-emerald-500/50 rounded-xl p-5 ${
                      isLight
                        ? 'bg-gradient-to-br from-white to-emerald-50/30 shadow-md'
                        : 'bg-gradient-to-br from-slate-900/80 to-slate-800/80 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>{node.title}</h3>
                      <p className={`text-sm mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{node.narrative}</p>

                      {/* Metrics */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Wealth Trajectory</span>
                            <span className={`font-semibold ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>{node.metrics.wealth}%</span>
                          </div>
                          <div className={`w-full rounded-full h-2 overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-slate-700'
                          }`}>
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.wealth}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Job Satisfaction</span>
                            <span className={`font-semibold ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>{node.metrics.satisfaction}%</span>
                          </div>
                          <div className={`w-full rounded-full h-2 overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-slate-700'
                          }`}>
                            <div
                              className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.satisfaction}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Overall Happiness</span>
                            <span className={`font-semibold ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>{node.metrics.happiness}%</span>
                          </div>
                          <div className={`w-full rounded-full h-2 overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-slate-700'
                          }`}>
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.happiness}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4FracturedTimeline;
