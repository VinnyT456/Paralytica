import { useState, useEffect, useRef } from 'react';
import { Check, RefreshCw, Edit3, Sparkles, Save } from 'lucide-react';

function IterativeTimeline({
  branchDecision,
  permanentTimeline,
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
  const timelineEndRef = useRef(null);

  // Auto-scroll to bottom when new nodes are added
  useEffect(() => {
    if (timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [permanentTimeline, draftNode]);

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onManualOverride(manualInput);
      setManualInput('');
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Iterative Timeline Simulation
          </h1>
          <p className={`mb-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Decision: <span className={`font-semibold italic ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>"{branchDecision}"</span>
          </p>
          <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            {permanentTimeline.length} node{permanentTimeline.length !== 1 ? 's' : ''} committed
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className={`absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-sky-500 to-emerald-500 ${
            isLight
              ? 'shadow-[0_0_10px_rgba(168,85,247,0.3)]'
              : 'shadow-[0_0_15px_rgba(168,85,247,0.6)]'
          }`} />

          <div className="space-y-8">
            {/* Permanent Nodes */}
            {permanentTimeline.map((node, index) => (
              <div
                key={index}
                className="relative flex gap-6 items-start animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Dot - Solid */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-16 h-16 border-4 border-emerald-500 rounded-full flex items-center justify-center ${
                    isLight
                      ? 'bg-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                  }`}>
                    <span className={`text-sm font-bold ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
                      {node.year}
                    </span>
                  </div>
                </div>

                {/* Card - Permanent */}
                <div className={`flex-1 border-2 border-emerald-500/50 rounded-xl p-5 ${
                  isLight
                    ? 'bg-white shadow-md'
                    : 'bg-slate-900/80 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                }`}>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>{node.title}</h3>
                  <p className={`text-sm mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {node.narrative}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Wealth</span>
                        <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                          {node.metrics.wealth}%
                        </span>
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
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Satisfaction</span>
                        <span className={`font-semibold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                          {node.metrics.satisfaction}%
                        </span>
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
                        <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Happiness</span>
                        <span className={`font-semibold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>
                          {node.metrics.happiness}%
                        </span>
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
            ))}

            {/* Draft Node */}
            {(draftNode || isGenerating) && (
              <div className="relative flex gap-6 items-start animate-fade-in-up">
                {/* Timeline Dot - Pulsing Dashed */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-16 h-16 border-4 border-dashed rounded-full flex items-center justify-center animate-pulse ${
                    isLight
                      ? 'bg-white border-purple-400 shadow-lg'
                      : 'bg-slate-900 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.8)]'
                  }`}>
                    {draftNode && (
                      <span className={`text-sm font-bold ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>
                        {draftNode.year}
                      </span>
                    )}
                    {isGenerating && (
                      <Sparkles className={isLight ? 'text-purple-600' : 'text-purple-400'} size={20} />
                    )}
                  </div>
                </div>

                {/* Card - Draft */}
                <div className={`flex-1 border-2 border-dashed rounded-xl p-5 ${
                  isLight
                    ? 'bg-purple-50/50 border-purple-400 shadow-lg'
                    : 'bg-purple-900/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                }`}>
                  {isGenerating ? (
                    <div className="text-center py-8">
                      <Sparkles className={`mx-auto mb-3 animate-pulse ${
                        isLight ? 'text-purple-600' : 'text-purple-400'
                      }`} size={32} />
                      <p className={`text-sm ${isLight ? 'text-purple-700' : 'text-purple-300'}`}>
                        Generating next timeline segment...
                      </p>
                    </div>
                  ) : draftNode && (
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
                          isLight ? 'text-purple-700' : 'text-purple-300'
                        }`}>{draftNode.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isLight
                            ? 'bg-purple-200 text-purple-700'
                            : 'bg-purple-500/30 text-purple-400'
                        }`}>DRAFT</span>
                      </div>

                      {!isEditing ? (
                        <>
                          <p className={`text-sm mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                            {draftNode.narrative}
                          </p>

                          {/* Metrics */}
                          <div className="space-y-2 mb-6">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Wealth</span>
                                <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                                  {draftNode.metrics.wealth}%
                                </span>
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
                                <span className={`font-semibold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                                  {draftNode.metrics.satisfaction}%
                                </span>
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
                                <span className={`font-semibold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>
                                  {draftNode.metrics.happiness}%
                                </span>
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
                          <div className="flex gap-3">
                            <button
                              onClick={onAccept}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                isLight
                                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg'
                                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                              }`}
                            >
                              <Check size={18} />
                              Accept
                            </button>
                            <button
                              onClick={onDiverge}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                isLight
                                  ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:shadow-lg'
                                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]'
                              }`}
                            >
                              <RefreshCw size={18} />
                              Diverge
                            </button>
                            <button
                              onClick={() => setIsEditing(true)}
                              className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                isLight
                                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md hover:shadow-lg'
                                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                              }`}
                              title="Manual Override"
                            >
                              <Edit3 size={18} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className={`text-sm mb-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            Write your own narrative for this segment:
                          </p>
                          <textarea
                            value={manualInput}
                            onChange={(e) => setManualInput(e.target.value)}
                            className={`w-full border rounded-lg px-4 py-3 mb-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none ${
                              isLight
                                ? 'bg-white border-slate-300 text-slate-900'
                                : 'bg-slate-950 border-slate-700 text-slate-200'
                            }`}
                            rows="4"
                            placeholder="Describe what happens in this timeline segment..."
                            autoFocus
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={handleManualSubmit}
                              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                            >
                              <Save size={18} />
                              Save Manual Override
                            </button>
                            <button
                              onClick={() => {
                                setIsEditing(false);
                                setManualInput('');
                              }}
                              className={`px-4 py-3 rounded-lg transition-colors ${
                                isLight
                                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
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
            )}

            {/* Timeline End Ref for auto-scroll */}
            <div ref={timelineEndRef} />
          </div>
        </div>

        {/* Reset Button */}
        {!isGenerating && permanentTimeline.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={onReset}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <RefreshCw size={18} />
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IterativeTimeline;
