import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, RefreshCw, Sparkles, Wand2, Zap } from 'lucide-react';

function DualTimeline({
  branchDecision,
  baselineTimeline,
  projectedTimeline,
  draftNode,
  isGenerating,
  branchIndex,
  onAccept,
  onDiverge,
  onManualOverride,
  onReset,
  bgTheme,
  isDemoPersona = false,
  demoTimelineLength = null
}) {
  const navigate = useNavigate();
  const isLight = bgTheme === 'light';
  const [customDecision, setCustomDecision] = useState('');
  const timelineEndRef = useRef(null);
  const decisionInputRef = useRef(null);
  const onAcceptRef = useRef(onAccept);
  onAcceptRef.current = onAccept;

  const isLastDemoDraft =
    isDemoPersona &&
    typeof demoTimelineLength === 'number' &&
    demoTimelineLength > 0 &&
    draftNode &&
    projectedTimeline.length === demoTimelineLength - 1;

  const hideDemoDecisionHeader =
    isDemoPersona &&
    typeof demoTimelineLength === 'number' &&
    demoTimelineLength > 0 &&
    projectedTimeline.length >= demoTimelineLength - 1 &&
    (!draftNode || projectedTimeline.length === demoTimelineLength - 1);

  const lastDemoAutoKeyRef = useRef(null);
  useEffect(() => {
    if (!isLastDemoDraft || !draftNode) return;
    const key = `${draftNode.year}-${projectedTimeline.length}`;
    if (lastDemoAutoKeyRef.current === key) return;
    lastDemoAutoKeyRef.current = key;
    const text = draftNode.aiSuggestion ?? customDecision ?? '';
    onAcceptRef.current(text);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid re-firing when customDecision syncs from prior step
  }, [isLastDemoDraft, draftNode, projectedTimeline.length]);

  // Auto-scroll to bottom when new nodes are added
  useEffect(() => {
    if (timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [projectedTimeline, draftNode]);

  // Auto-populate custom decision with AI suggestion when draft node changes
  useEffect(() => {
    if (draftNode?.aiSuggestion) {
      setCustomDecision(draftNode.aiSuggestion);
    }
  }, [draftNode]);

  const handleAcceptClick = () => {
    // Pass the custom decision to parent for next prediction
    onAccept(customDecision);
  };

  const handleDivergeClick = () => {
    // Clear the input field and focus it
    setCustomDecision('');
    // Focus the input field
    if (decisionInputRef.current) {
      decisionInputRef.current.focus();
    }
  };

  const calculateDelta = (activeMetric, controlMetric) => {
    const delta = activeMetric - controlMetric;
    const sign = delta > 0 ? '+' : '';
    return { delta, sign, text: `${sign}${delta}%` };
  };

  /** Deltas on the alternate path: vs branch milestone first, then vs previous projected card (so % + Δ matches the next card). */
  const getProjectedDeltaReference = (projectedLocalIndex) => {
    if (projectedLocalIndex === 0) {
      return baselineTimeline[branchIndex] ?? null;
    }
    return projectedTimeline[projectedLocalIndex - 1] ?? null;
  };

  const renderNode = (node, index, isBaseline = false) => {
    const deltaReference = !isBaseline ? getProjectedDeltaReference(index) : null;

    return (
      <div key={index} className="relative flex gap-4 items-start" style={{ minHeight: '280px' }}>
        {/* Timeline Dot */}
        <div className="relative z-10 flex-shrink-0">
          <div className={`w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
            isBaseline
              ? isLight
                ? 'bg-slate-100 border-slate-400'
                : 'bg-slate-800 border-slate-600'
              : isLight
              ? 'bg-white border-purple-500 shadow-lg shadow-purple-500/30'
              : 'bg-slate-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.7)] animate-pulse'
          }`}>
            <span className={`text-xs font-bold ${
              isBaseline
                ? isLight ? 'text-slate-600' : 'text-slate-300'
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
              ? 'bg-slate-50 border-slate-300'
              : 'bg-slate-900/50 border-slate-700'
            : isLight
            ? 'bg-white border-purple-400 shadow-lg'
            : 'bg-slate-900/90 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        }`}>
          <h3 className={`text-base font-semibold mb-2 ${
            isBaseline
              ? isLight ? 'text-slate-700' : 'text-slate-300'
              : isLight ? 'text-purple-700' : 'text-purple-300'
          }`}>{node.title}</h3>
          <p className={`text-sm mb-3 ${
            isBaseline
              ? isLight ? 'text-slate-600' : 'text-slate-300'
              : isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {node.narrative}
          </p>

          {/* Metrics with Deltas (only on projected side) */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={isBaseline
                  ? isLight ? 'text-slate-600' : 'text-slate-300'
                  : isLight ? 'text-slate-600' : 'text-slate-400'
                }>Wealth</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    isBaseline
                      ? isLight ? 'text-slate-700' : 'text-slate-300'
                      : isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {node.metrics.wealth}%
                  </span>
                  {!isBaseline && deltaReference && (
                    <span className={`text-xs font-bold ${
                      calculateDelta(node.metrics.wealth, deltaReference.metrics.wealth).delta > 0
                        ? 'text-emerald-500'
                        : 'text-red-400'
                    }`}>
                      {calculateDelta(node.metrics.wealth, deltaReference.metrics.wealth).text}
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
                  ? isLight ? 'text-slate-600' : 'text-slate-300'
                  : isLight ? 'text-slate-600' : 'text-slate-400'
                }>Satisfaction</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    isBaseline
                      ? isLight ? 'text-slate-700' : 'text-slate-300'
                      : isLight ? 'text-sky-700' : 'text-sky-400'
                  }`}>
                    {node.metrics.satisfaction}%
                  </span>
                  {!isBaseline && deltaReference && (
                    <span className={`text-xs font-bold ${
                      calculateDelta(node.metrics.satisfaction, deltaReference.metrics.satisfaction).delta > 0
                        ? 'text-emerald-500'
                        : 'text-red-400'
                    }`}>
                      {calculateDelta(node.metrics.satisfaction, deltaReference.metrics.satisfaction).text}
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
                  ? isLight ? 'text-slate-600' : 'text-slate-300'
                  : isLight ? 'text-slate-600' : 'text-slate-400'
                }>Happiness</span>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${
                    isBaseline
                      ? isLight ? 'text-slate-700' : 'text-slate-300'
                      : isLight ? 'text-purple-700' : 'text-purple-400'
                  }`}>
                    {node.metrics.happiness}%
                  </span>
                  {!isBaseline && deltaReference && (
                    <span className={`text-xs font-bold ${
                      calculateDelta(node.metrics.happiness, deltaReference.metrics.happiness).delta > 0
                        ? 'text-emerald-500'
                        : 'text-red-400'
                    }`}>
                      {calculateDelta(node.metrics.happiness, deltaReference.metrics.happiness).text}
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
      </div>
    );
  };

  const renderDraftNode = () => {
    const draftDeltaReference =
      projectedTimeline.length > 0
        ? projectedTimeline[projectedTimeline.length - 1]
        : baselineTimeline[branchIndex] ?? null;

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
                      {draftDeltaReference && (
                        <span className={`text-xs font-bold ${
                          calculateDelta(draftNode.metrics.wealth, draftDeltaReference.metrics.wealth).delta > 0
                            ? 'text-emerald-500'
                            : 'text-red-400'
                        }`}>
                          {calculateDelta(draftNode.metrics.wealth, draftDeltaReference.metrics.wealth).text}
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
                      {draftDeltaReference && (
                        <span className={`text-xs font-bold ${
                          calculateDelta(draftNode.metrics.satisfaction, draftDeltaReference.metrics.satisfaction).delta > 0
                            ? 'text-emerald-500'
                            : 'text-red-400'
                        }`}>
                          {calculateDelta(draftNode.metrics.satisfaction, draftDeltaReference.metrics.satisfaction).text}
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
                      {draftDeltaReference && (
                        <span className={`text-xs font-bold ${
                          calculateDelta(draftNode.metrics.happiness, draftDeltaReference.metrics.happiness).delta > 0
                            ? 'text-emerald-500'
                            : 'text-red-400'
                        }`}>
                          {calculateDelta(draftNode.metrics.happiness, draftDeltaReference.metrics.happiness).text}
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

              {!isLastDemoDraft && (
                <>
                  {/* Next Decision Input (AI Suggestion as editable field) */}
                  <div className={`mb-4 p-3 rounded-lg border ${
                    isLight
                      ? 'bg-sky-50/80 border-sky-300'
                      : 'bg-sky-900/10 border-sky-700/50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <Wand2 className={`flex-shrink-0 mt-2 ${
                        isLight ? 'text-sky-600' : 'text-sky-400'
                      }`} size={16} />
                      <div className="flex-1">
                        <p className={`text-xs font-semibold mb-2 ${
                          isLight ? 'text-sky-700' : 'text-sky-300'
                        }`}>
                          Your Decision
                        </p>
                        <input
                          ref={decisionInputRef}
                          type="text"
                          value={customDecision}
                          onChange={(e) => setCustomDecision(e.target.value)}
                          className={`w-full border rounded-md px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            isLight
                              ? 'bg-white border-sky-300 text-slate-900 placeholder-slate-400'
                              : 'bg-slate-900/50 border-sky-700 text-slate-200 placeholder-slate-500'
                          }`}
                          placeholder="What if I..."
                        />
                        {draftNode.nextPrompt && (
                          <p className={`text-xs mt-2 italic ${
                            isLight ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {draftNode.nextPrompt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleAcceptClick}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:shadow-[0_0_25px_rgba(16,185,129,0.8)] ring-2 ring-emerald-400/30'
                      }`}
                    >
                      <Check size={14} />
                      Accept & Continue
                    </button>
                    <button
                      onClick={handleDivergeClick}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isLight
                          ? 'bg-slate-600 hover:bg-slate-500 text-white shadow-md'
                          : 'bg-slate-700 hover:bg-slate-600 text-white shadow-[0_0_10px_rgba(100,116,139,0.3)]'
                      }`}
                    >
                      <RefreshCw size={14} />
                      Clear & Rewrite
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

          {/* THE TITLE - Bold Hierarchy */}
          <h1 className={`relative text-6xl font-black tracking-tight mb-6 bg-gradient-to-b ${
            isLight
              ? 'from-slate-900 via-slate-600 to-transparent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              : 'from-white via-slate-300 to-transparent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
          }`}>
            Compare Two Possible Futures
          </h1>

          {/* THE DECISION CHIP - Enhanced (hidden for demo once the scripted path reaches its final segment) */}
          {!hideDemoDecisionHeader && (
            <div className="flex flex-col items-center">
              <p className={`text-xs font-bold font-mono tracking-widest mb-2 ${
                isLight ? 'text-slate-600' : 'text-slate-500'
              }`}>
                Your decision: What if you…
              </p>
              <div className={`relative bg-sky-500/10 border-2 border-sky-400 rounded-full px-8 py-3 shadow-[0_0_30px_rgba(56,189,248,0.4)] ${
                isLight ? 'shadow-[0_0_25px_rgba(56,189,248,0.3)]' : 'shadow-[0_0_30px_rgba(56,189,248,0.4)]'
              }`}>
                <span className="text-sky-400 font-bold text-2xl">
                  {branchDecision}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* UNIVERSE CONTAINERS - Holographic Panels */}
        <div className="grid grid-cols-2 gap-12 mb-8">
          {/* BASELINE REALITY - Light Container */}
          <div className={`flex flex-col items-center text-center p-8 rounded-2xl border backdrop-blur-2xl ${
            isLight
              ? 'bg-slate-200/30 border-slate-400/60'
              : 'bg-slate-950/20 border-slate-800/60'
          }`}>
            <h2 className={`text-2xl font-black tracking-[0.3em] uppercase mb-3 ${
              isLight ? 'text-slate-600' : 'text-slate-500'
            }`}>
              YOUR CURRENT PATH
            </h2>
            <p className={`text-xs font-light max-w-xs ${
              isLight ? 'text-slate-600' : 'text-slate-600'
            }`}>
              The direction your life is heading in right now, based on your past choices and experiences. 
            </p>
          </div>

          {/* PROJECTED FUTURE - Holographic Panel with Cyan Glow */}
          <div className={`flex flex-col items-center text-center p-8 rounded-2xl border backdrop-blur-2xl shadow-[0_0_20px_rgba(56,189,248,0.1)] animate-pulse ${
            isLight
              ? 'bg-slate-200/30 border-slate-400/60'
              : 'bg-slate-950/20 border-slate-800/60'
          }`}>
            <h2 className="text-2xl font-black tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
              A POSSIBLE FUTURE 
            </h2>
            <p className={`text-xs font-light max-w-xs ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              How making a different choice could change your direction and lead your life somewhere new. 
            </p>
          </div>
        </div>

        {/* Timeline with Shared History */}
        <div className="mt-6">
          {/* SHARED HISTORY Section - All milestones before split */}
          {branchIndex > 0 && (
            <div className="flex flex-col items-center mb-6">
              {/* SHARED HISTORY Label - At the very top */}
              <div className={`inline-flex items-center gap-2 rounded-full px-6 py-2 backdrop-blur-2xl shadow-lg mb-6 ${
                isLight
                  ? 'bg-slate-200/40 border border-slate-400/60 text-slate-700'
                  : 'bg-slate-950/20 border border-slate-800/60 text-slate-400'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  isLight ? 'bg-slate-600' : 'bg-slate-500'
                }`} />
                <h2 className="text-sm font-mono tracking-[0.3em] uppercase font-semibold">
                  SHARED HISTORY
                </h2>
              </div>

              {/* Shared Milestones - All nodes before splitIndex */}
              <div className="relative flex flex-col items-center">
                {/* Vertical Stem Line connecting all shared nodes */}
                <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${
                  isLight ? 'bg-slate-400' : 'bg-slate-600'
                }`} style={{ height: '100%' }} />

                <div className="space-y-3 max-w-md w-full relative z-10">
                  {baselineTimeline.slice(0, branchIndex).map((node, index) => (
                    <div key={index}>
                      {renderNode(node, index, false)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Y-Split Indicator */}
              <div className="relative w-full h-16 mt-4">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {/* Baseline Path (Left) - Muted */}
                  <path
                    d="M 50% 0 L 25% 100%"
                    stroke={isLight ? '#94a3b8' : '#64748b'}
                    strokeWidth="2"
                    fill="none"
                    opacity="0.5"
                  />
                  {/* Projected Path (Right) - Glow Effect */}
                  <path
                    d="M 50% 0 L 75% 100%"
                    stroke="url(#projected-glow)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))"
                  />
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="projected-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          )}

          {/* Dual Timeline Container - Y-Split */}
          <div className="grid grid-cols-2 gap-16">
            {/* LEFT COLUMN: BASELINE REALITY */}
            <div className="w-full bg-transparent flex flex-col items-center opacity-85">
              <div className="space-y-3 w-full">
                {baselineTimeline.slice(branchIndex).map((node, index) => renderNode(node, branchIndex + index, true))}
              </div>
            </div>

            {/* RIGHT COLUMN: PROJECTED FUTURE */}
            <div className="w-full bg-transparent flex flex-col items-center relative">
              {/* Radial Gradient Backdrop - Only Behind Projected Cards */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.05)_0%,_transparent_70%)]" />

              <div className="space-y-4 w-full relative z-10">
                {projectedTimeline.map((node, index) => renderNode(node, index, false))}

                {/* Draft Node */}
                {(draftNode || isGenerating) && renderDraftNode()}

                <div ref={timelineEndRef} />
              </div>
            </div>
          </div>
        </div>

        {/* Reset/Try It Yourself Button */}
        {!isGenerating && projectedTimeline.length > 0 && !draftNode && (
          <div className="text-center mt-10">
            {isDemoPersona ? (
              <button
                onClick={() => navigate('/questionnaire')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105"
              >
                <Zap size={20} />
                Try It Yourself
              </button>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DualTimeline;
