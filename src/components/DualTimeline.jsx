import { useState, useEffect, useRef } from 'react';
import { Check, RefreshCw, Edit3, Sparkles, Save } from 'lucide-react';

function DualTimeline({
  branchDecision,
  baselineTimeline,
  projectedTimeline,
  draftNode,
  isGenerating,
  onAccept,
  onDiverge,
  onManualOverride,
  onReset,
  bgTheme
}) {
  const isLight = bgTheme === 'light';
  const [isEditing, setIsEditing] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const leftScrollRef = useRef(null);
  const rightScrollRef = useRef(null);
  const timelineEndRef = useRef(null);

  // Synchronized scrolling
  const handleScroll = (sourceRef, targetRef) => {
    if (targetRef.current && sourceRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop;
    }
  };

  // Auto-scroll to bottom when new nodes are added
  useEffect(() => {
    if (timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [projectedTimeline, draftNode]);

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onManualOverride(manualInput);
      setManualInput('');
      setIsEditing(false);
    }
  };

  const calculateDelta = (activeMetric, controlMetric) => {
    const delta = activeMetric - controlMetric;
    const sign = delta > 0 ? '+' : '';
    return { delta, sign, text: `${sign}${delta}%` };
  };

  const renderNode = (node, index, isBaseline = false) => {
    const projectedNode = projectedTimeline[index];
    const baselineNode = baselineTimeline[index];

    return (
      <div key={index} className="relative flex gap-4 items-start" style={{ minHeight: '280px' }}>
        {/* Timeline Dot */}
        <div className="relative z-10 flex-shrink-0">
          <div className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
            isBaseline
              ? isLight
                ? 'bg-slate-100 border-slate-400 opacity-50'
                : 'bg-slate-800 border-slate-600 opacity-50'
              : isLight
              ? 'bg-white border-purple-500 shadow-lg shadow-purple-500/30'
              : 'bg-slate-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] animate-pulse'
          }`}>
            <span className={`text-xs font-bold ${
              isBaseline
                ? isLight ? 'text-slate-500' : 'text-slate-500'
                : isLight ? 'text-purple-600' : 'text-purple-400'
            }`}>
              {node.year}
            </span>
          </div>
        </div>

        {/* Card */}
        <div className={`flex-1 border-2 rounded-lg p-5 transition-all duration-300 ${
          isBaseline
            ? isLight
              ? 'bg-slate-50 border-slate-300 opacity-50'
              : 'bg-slate-900/50 border-slate-700 opacity-50'
            : isLight
            ? 'bg-white border-purple-400 shadow-lg'
            : 'bg-slate-900/90 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        }`}>
          <h3 className={`text-base font-semibold mb-2 ${
            isBaseline
              ? isLight ? 'text-slate-600' : 'text-slate-400'
              : isLight ? 'text-purple-700' : 'text-purple-300'
          }`}>{node.title}</h3>
          <p className={`text-sm mb-3 line-clamp-3 ${
            isBaseline
              ? isLight ? 'text-slate-600' : 'text-slate-500'
              : isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {node.narrative}
          </p>

          {/* Metrics with Deltas (only on projected side) */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={isBaseline
                  ? isLight ? 'text-slate-500' : 'text-slate-500'
                  : isLight ? 'text-slate-600' : 'text-slate-400'
                }>Wealth</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    isBaseline
                      ? isLight ? 'text-slate-600' : 'text-slate-500'
                      : isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {node.metrics.wealth}%
                  </span>
                  {!isBaseline && baselineNode && (
                    <span className={`text-xs font-bold ${
                      calculateDelta(node.metrics.wealth, baselineNode.metrics.wealth).delta > 0
                        ? 'text-emerald-500'
                        : 'text-red-400'
                    }`}>
                      {calculateDelta(node.metrics.wealth, baselineNode.metrics.wealth).text}
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                isLight ? 'bg-slate-200' : 'bg-slate-700'
              }`}>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full"
                  style={{ width: `${node.metrics.wealth}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={isBaseline
                  ? isLight ? 'text-slate-500' : 'text-slate-500'
                  : isLight ? 'text-slate-600' : 'text-slate-400'
                }>Satisfaction</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    isBaseline
                      ? isLight ? 'text-slate-600' : 'text-slate-500'
                      : isLight ? 'text-sky-700' : 'text-sky-400'
                  }`}>
                    {node.metrics.satisfaction}%
                  </span>
                  {!isBaseline && baselineNode && (
                    <span className={`text-xs font-bold ${
                      calculateDelta(node.metrics.satisfaction, baselineNode.metrics.satisfaction).delta > 0
                        ? 'text-emerald-500'
                        : 'text-red-400'
                    }`}>
                      {calculateDelta(node.metrics.satisfaction, baselineNode.metrics.satisfaction).text}
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                isLight ? 'bg-slate-200' : 'bg-slate-700'
              }`}>
                <div
                  className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full"
                  style={{ width: `${node.metrics.satisfaction}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={isBaseline
                  ? isLight ? 'text-slate-500' : 'text-slate-500'
                  : isLight ? 'text-slate-600' : 'text-slate-400'
                }>Happiness</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    isBaseline
                      ? isLight ? 'text-slate-600' : 'text-slate-500'
                      : isLight ? 'text-purple-700' : 'text-purple-400'
                  }`}>
                    {node.metrics.happiness}%
                  </span>
                  {!isBaseline && baselineNode && (
                    <span className={`text-xs font-bold ${
                      calculateDelta(node.metrics.happiness, baselineNode.metrics.happiness).delta > 0
                        ? 'text-emerald-500'
                        : 'text-red-400'
                    }`}>
                      {calculateDelta(node.metrics.happiness, baselineNode.metrics.happiness).text}
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                isLight ? 'bg-slate-200' : 'bg-slate-700'
              }`}>
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full"
                  style={{ width: `${node.metrics.happiness}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dimensional Bridge (only render on baseline side) */}
        {isBaseline && (
          <div className={`absolute left-full top-6 h-1 w-8 bg-gradient-to-r from-slate-500 via-purple-500 to-sky-500 ${
            isLight ? 'opacity-40' : 'opacity-60 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
          }`} />
        )}
      </div>
    );
  };

  const renderDraftNode = () => {
    const baselineNode = baselineTimeline[projectedTimeline.length];

    return (
      <div className="relative flex gap-4 items-start">
        <div className="relative z-10 flex-shrink-0">
          <div className={`w-12 h-12 border-2 border-dashed rounded-full flex items-center justify-center animate-pulse ${
            isLight
              ? 'bg-white border-purple-400 shadow-lg'
              : 'bg-slate-900 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.8)]'
          }`}>
            {draftNode && (
              <span className={`text-xs font-bold ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>
                {draftNode.year}
              </span>
            )}
            {isGenerating && (
              <Sparkles className={isLight ? 'text-purple-600' : 'text-purple-400'} size={16} />
            )}
          </div>
        </div>

        <div className={`flex-1 border-2 border-dashed rounded-lg p-4 ${
          isLight
            ? 'bg-purple-50/50 border-purple-400 shadow-lg'
            : 'bg-purple-900/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]'
        }`}>
          {isGenerating ? (
            <div className="text-center py-6">
              <Sparkles className={`mx-auto mb-2 animate-pulse ${
                isLight ? 'text-purple-600' : 'text-purple-400'
              }`} size={24} />
              <p className={`text-xs ${isLight ? 'text-purple-700' : 'text-purple-300'}`}>
                Generating next segment...
              </p>
            </div>
          ) : draftNode && (
            <>
              {!isEditing ? (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-base font-semibold ${
                      isLight ? 'text-purple-700' : 'text-purple-300'
                    }`}>{draftNode.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isLight ? 'bg-purple-200 text-purple-700' : 'bg-purple-500/30 text-purple-400'
                    }`}>DRAFT</span>
                  </div>

                  <p className={`text-sm mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {draftNode.narrative}
                  </p>

                  {/* Metrics with Deltas */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Wealth</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                            {draftNode.metrics.wealth}%
                          </span>
                          {baselineNode && (
                            <span className={`text-xs font-bold ${
                              calculateDelta(draftNode.metrics.wealth, baselineNode.metrics.wealth).delta > 0
                                ? 'text-emerald-500'
                                : 'text-red-400'
                            }`}>
                              {calculateDelta(draftNode.metrics.wealth, baselineNode.metrics.wealth).text}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isLight ? 'bg-slate-200' : 'bg-slate-700'
                      }`}>
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full"
                          style={{ width: `${draftNode.metrics.wealth}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Satisfaction</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                            {draftNode.metrics.satisfaction}%
                          </span>
                          {baselineNode && (
                            <span className={`text-xs font-bold ${
                              calculateDelta(draftNode.metrics.satisfaction, baselineNode.metrics.satisfaction).delta > 0
                                ? 'text-emerald-500'
                                : 'text-red-400'
                            }`}>
                              {calculateDelta(draftNode.metrics.satisfaction, baselineNode.metrics.satisfaction).text}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isLight ? 'bg-slate-200' : 'bg-slate-700'
                      }`}>
                        <div
                          className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full"
                          style={{ width: `${draftNode.metrics.satisfaction}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Happiness</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>
                            {draftNode.metrics.happiness}%
                          </span>
                          {baselineNode && (
                            <span className={`text-xs font-bold ${
                              calculateDelta(draftNode.metrics.happiness, baselineNode.metrics.happiness).delta > 0
                                ? 'text-emerald-500'
                                : 'text-red-400'
                            }`}>
                              {calculateDelta(draftNode.metrics.happiness, baselineNode.metrics.happiness).text}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isLight ? 'bg-slate-200' : 'bg-slate-700'
                      }`}>
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full"
                          style={{ width: `${draftNode.metrics.happiness}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={onAccept}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      }`}
                    >
                      <Check size={14} />
                      Accept
                    </button>
                    <button
                      onClick={onDiverge}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md'
                          : 'bg-sky-600 hover:bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                      }`}
                    >
                      <RefreshCw size={14} />
                      Diverge
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      }`}
                      title="Manual Override"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className={`text-xs mb-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Write your own narrative:
                  </p>
                  <textarea
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 mb-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-200'
                    }`}
                    rows="3"
                    placeholder="Describe what happens..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleManualSubmit}
                      className="flex-1 flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      <Save size={14} />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setManualInput('');
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION - Header & Decision */}
        <div className="relative flex flex-col items-center mb-8">
          {/* BACKGROUND ATMOSPHERE - Indigo Glow */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
            <div className={`w-full h-full bg-gradient-radial ${
              isLight
                ? 'from-indigo-200/20 via-transparent to-transparent'
                : 'from-indigo-500/10 via-transparent to-transparent'
            }`} />
          </div>

          {/* THE TITLE - Refined Scale */}
          <h1 className={`relative text-4xl font-black tracking-tighter mb-3 bg-gradient-to-b ${
            isLight
              ? 'from-slate-900 via-slate-600 to-transparent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              : 'from-white via-slate-300 to-transparent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
          }`}>
            Dual-Universe Comparison
          </h1>

          {/* THE DECISION CHIP - Refined */}
          <div className={`relative bg-sky-500/10 border border-sky-400/50 rounded-full px-4 py-1.5 shadow-[0_0_20px_rgba(56,189,248,0.2)] ${
            isLight ? 'shadow-[0_0_15px_rgba(56,189,248,0.15)]' : 'shadow-[0_0_20px_rgba(56,189,248,0.2)]'
          }`}>
            <span className="text-sky-400 font-mono text-sm">
              "{branchDecision}"
            </span>
          </div>
        </div>

        {/* UNIVERSE CONTAINERS - Premium Glass Cards */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* BASELINE REALITY - Glass Container */}
          <div className={`flex flex-col items-center text-center p-8 rounded-2xl border backdrop-blur-xl shadow-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.03)] ${
            isLight
              ? 'bg-slate-100/60 border-slate-300/50'
              : 'bg-slate-900/40 border-slate-800/50'
          }`}>
            <h2 className={`text-2xl font-black tracking-[0.3em] uppercase mb-3 ${
              isLight ? 'text-slate-600' : 'text-slate-500'
            }`}>
              BASELINE REALITY
            </h2>
            <p className={`text-xs max-w-xs ${
              isLight ? 'text-slate-500' : 'text-slate-600'
            }`}>
              The grounded, original trajectory based on your established history.
            </p>
          </div>

          {/* PROJECTED FUTURE - Glass Container with Gradient */}
          <div className={`flex flex-col items-center text-center p-8 rounded-2xl border backdrop-blur-xl shadow-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.03)] ${
            isLight
              ? 'bg-slate-100/60 border-slate-300/50'
              : 'bg-slate-900/40 border-slate-800/50'
          }`}>
            <h2 className="text-2xl font-black tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
              PROJECTED FUTURE
            </h2>
            <p className={`text-xs max-w-xs ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              The unfolding nexus of potential—a life re-forged by your active decisions.
            </p>
          </div>
        </div>

        {/* Dual Timeline Container */}
        <div className="grid grid-cols-2 gap-16 mt-12">
          {/* LEFT COLUMN: BASELINE REALITY */}
          <div className="w-full bg-transparent flex flex-col items-center saturate-50">
            <div
              ref={leftScrollRef}
              onScroll={() => handleScroll(leftScrollRef, rightScrollRef)}
              className="space-y-6 w-full"
              style={{ maxHeight: 'calc(100vh - 260px)', overflowY: 'auto' }}
            >
              {baselineTimeline.map((node, index) => renderNode(node, index, true))}
            </div>
          </div>

          {/* RIGHT COLUMN: PROJECTED FUTURE */}
          <div className="w-full bg-transparent flex flex-col items-center relative">
            {/* Radial Gradient Backdrop - Only Behind Projected Cards */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.05)_0%,_transparent_70%)]" />

            <div
              ref={rightScrollRef}
              onScroll={() => handleScroll(rightScrollRef, leftScrollRef)}
              className="space-y-6 w-full relative z-10"
              style={{ maxHeight: 'calc(100vh - 260px)', overflowY: 'auto' }}
            >
              {projectedTimeline.map((node, index) => renderNode(node, index, false))}

              {/* Draft Node */}
              {(draftNode || isGenerating) && renderDraftNode()}

              <div ref={timelineEndRef} />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {!isGenerating && projectedTimeline.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={onReset}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLight
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700 shadow-md hover:shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 shadow-lg hover:shadow-xl'
              }`}
            >
              <RefreshCw size={16} />
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DualTimeline;
