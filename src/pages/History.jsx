import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Clock, ExternalLink, Trash2, Sparkles, Zap } from 'lucide-react';
import BackButton from '../components/BackButton';

function History({ bgTheme }) {
  const navigate = useNavigate();
  const { savedTimelines, deleteTimeline, loadTimeline } = useAppContext();
  const isLight = bgTheme === 'light';

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleView = (id) => {
    const timeline = loadTimeline(id);
    if (timeline) {
      // Navigate to simulate with the loaded timeline data
      navigate('/simulate', { state: { loadedTimeline: timeline } });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this timeline?')) {
      deleteTimeline(id);
    }
  };

  // Empty State
  if (savedTimelines.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 pt-24">
        <BackButton to="/" bgTheme={bgTheme} />
        <div className="text-center max-w-lg">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-slate-700/30 rounded-full animate-pulse" />
            </div>
            <div className="relative z-10 w-40 h-40 flex items-center justify-center">
              <Clock className="text-slate-600" size={64} />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
            Multiverse Archive Empty
          </h2>

          <p className={`text-lg mb-8 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            No timelines have been saved yet. Create your first branching reality to populate the archive.
          </p>

          <button
            onClick={() => navigate('/questionnaire')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
          >
            <Sparkles size={20} />
            Initialize New Paralytica
          </button>
        </div>
      </div>
    );
  }

  // Timeline View
  return (
    <div className="min-h-screen p-6 md:p-12 pt-24" style={{
      backgroundImage: isLight
        ? 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)'
        : 'linear-gradient(rgba(71, 85, 105, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}>
      <BackButton to="/" bgTheme={bgTheme} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Multiverse Archive
          </h1>
          <p className={`text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            A chronological ledger of all explored realities
          </p>
          <div className={`inline-block mt-4 px-4 py-2 rounded-full border ${
            isLight ? 'bg-white/80 border-slate-300 text-slate-700' : 'bg-slate-800/60 border-slate-700 text-slate-300'
          }`}>
            <span className="font-mono text-sm">
              {savedTimelines.length} Timeline{savedTimelines.length !== 1 ? 's' : ''} Archived
            </span>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Glowing Line */}
          <div className={`absolute left-8 md:left-12 top-0 bottom-0 w-0.5 ${
            isLight
              ? 'bg-gradient-to-b from-sky-300 via-purple-300 to-emerald-300'
              : 'bg-gradient-to-b from-sky-500 via-purple-500 to-emerald-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]'
          }`} />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {savedTimelines.map((timeline, index) => (
              <div
                key={timeline.id}
                className="relative flex gap-6 md:gap-8 items-start animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-16 h-16 md:w-20 md:h-20 border-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isLight
                      ? 'bg-white border-purple-400 shadow-lg'
                      : 'bg-slate-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                  }`}>
                    <Sparkles className={isLight ? 'text-purple-600' : 'text-purple-400'} size={28} />
                  </div>
                </div>

                {/* Timeline Card */}
                <div
                  className={`group flex-1 backdrop-blur-md border-2 rounded-xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] ${
                    isLight
                      ? 'bg-white/90 border-slate-200 hover:border-purple-400 hover:shadow-xl'
                      : 'bg-slate-900/80 border-slate-800 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className={`text-2xl font-bold mb-2 ${
                        isLight ? 'text-slate-800' : 'text-slate-100'
                      }`}>
                        {timeline.name}'s Paralytica Blueprint
                      </h2>
                      <p className={`text-sm font-mono ${
                        isLight ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        <Clock size={14} className="inline mr-1" />
                        {formatTimestamp(timeline.timestamp)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(timeline.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isLight
                            ? 'bg-sky-100 hover:bg-sky-200 text-sky-700'
                            : 'bg-sky-900/50 hover:bg-sky-800 text-sky-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                        }`}
                        title="View Timeline"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(timeline.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isLight
                            ? 'bg-red-100 hover:bg-red-200 text-red-700'
                            : 'bg-red-900/50 hover:bg-red-800 text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        }`}
                        title="Delete Timeline"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Identity Profile */}
                  <div className={`border rounded-lg p-4 mb-6 ${
                    isLight
                      ? 'bg-gradient-to-r from-purple-50 to-sky-50 border-purple-200'
                      : 'bg-gradient-to-r from-purple-900/20 to-sky-900/20 border-purple-500/30'
                  }`}>
                    <h3 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${
                      isLight ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      Identity Recap
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className={`text-xs uppercase tracking-wide ${
                          isLight ? 'text-slate-600' : 'text-slate-500'
                        }`}>
                          Vibe
                        </span>
                        <p className={`font-semibold ${
                          isLight ? 'text-purple-700' : 'text-purple-400'
                        }`}>
                          {timeline.userVibe}
                        </p>
                      </div>
                      <div>
                        <span className={`text-xs uppercase tracking-wide ${
                          isLight ? 'text-slate-600' : 'text-slate-500'
                        }`}>
                          Superpower
                        </span>
                        <p className={`font-semibold flex items-center gap-2 ${
                          isLight ? 'text-sky-700' : 'text-sky-400'
                        }`}>
                          <Zap size={16} />
                          {timeline.superpower}
                        </p>
                      </div>
                    </div>
                    {timeline.selectedValues && timeline.selectedValues.length > 0 && (
                      <div className="mt-3">
                        <span className={`text-xs uppercase tracking-wide ${
                          isLight ? 'text-slate-600' : 'text-slate-500'
                        }`}>
                          Success Values
                        </span>
                        <p className={`font-medium ${
                          isLight ? 'text-emerald-700' : 'text-emerald-400'
                        }`}>
                          {timeline.selectedValues.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {timeline.summary && (
                    <p className={`mb-6 italic ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      "{timeline.summary}"
                    </p>
                  )}

                  {/* Metric Strips */}
                  {timeline.metrics && (
                    <div className="space-y-3">
                      <h3 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${
                        isLight ? 'text-slate-700' : 'text-slate-400'
                      }`}>
                        Final Outcome Metrics
                      </h3>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Wealth Trajectory</span>
                          <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                            {timeline.metrics.wealth}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 overflow-hidden ${
                          isLight ? 'bg-slate-200' : 'bg-slate-800'
                        }`}>
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${timeline.metrics.wealth}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Job Satisfaction</span>
                          <span className={`font-semibold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                            {timeline.metrics.satisfaction}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 overflow-hidden ${
                          isLight ? 'bg-slate-200' : 'bg-slate-800'
                        }`}>
                          <div
                            className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${timeline.metrics.satisfaction}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Overall Happiness</span>
                          <span className={`font-semibold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>
                            {timeline.metrics.happiness}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 overflow-hidden ${
                          isLight ? 'bg-slate-200' : 'bg-slate-800'
                        }`}>
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${timeline.metrics.happiness}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
