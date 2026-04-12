import { GitBranch } from 'lucide-react';

function Step2PrimaryTimeline({ lifePoints, onBranch, bgTheme, subjectName }) {
  const isLight = bgTheme === 'light';
  const firstName = subjectName?.trim()?.split(/\s+/)?.[0];
  const title = firstName ? `${firstName}'s Life Timeline` : 'Your Life Timeline';
  const subtitle = firstName
    ? `Select “Explore Alternative Path” to see other possible directions for ${firstName}.`
    : 'Select “Explore Alternative Path” to see other possible directions';
  const branchCta = firstName
    ? `Explore ${firstName}'s Alternative Path`
    : 'Explore Alternative Path';

  return (
    <div className="min-h-screen px-3 py-4 sm:p-6 md:p-12 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto min-w-0">
        <div className="text-center mb-8 sm:mb-12 px-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>{subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-sky-500 to-emerald-500" />

          <div className="space-y-6 sm:space-y-8">
            {lifePoints.map((point, index) => (
              <div key={point.id} className="relative flex gap-3 sm:gap-6 items-start pl-0 sm:pl-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0 w-12 sm:w-16 flex justify-center sm:block">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                    <span className="text-xs sm:text-sm font-bold text-purple-400 tabular-nums">{point.year}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 min-w-0 backdrop-blur-sm border rounded-xl p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-300 shadow-lg ${
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
                    <span className="text-xs text-slate-500">Satisfaction:</span>
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
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-sm sm:text-base px-3 py-2 sm:px-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] w-full sm:w-auto"
                  >
                    <GitBranch className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" />
                    <span className="text-left leading-snug">{branchCta}</span>
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
