import { useState } from 'react';
import { Play, Plus, Trash2, ArrowRight } from 'lucide-react';

function Step1MapTimeline({ onNext, bgTheme }) {
  const isLight = bgTheme === 'light';
  const [lifePoints, setLifePoints] = useState([
    { id: 1, year: '2019', role: 'Computer Science Student', company: 'Northwestern University', location: 'Evanston, IL', happiness: 7 },
    { id: 2, year: '2021', role: 'Software Engineer', company: 'Meta', location: 'Menlo Park, CA', happiness: 8 },
    { id: 3, year: '2024', role: 'Senior Software Engineer', company: 'Meta', location: 'Menlo Park, CA', happiness: 4 }
  ]);
  const [includeSocial, setIncludeSocial] = useState(true);

  const addLifePoint = () => {
    const newId = Math.max(...lifePoints.map(p => p.id), 0) + 1;
    setLifePoints([...lifePoints, { id: newId, year: '', role: '', company: '', location: '', happiness: 5 }]);
  };

  const removeLifePoint = (id) => {
    if (lifePoints.length > 1) {
      setLifePoints(lifePoints.filter(p => p.id !== id));
    }
  };

  const updateLifePoint = (id, field, value) => {
    setLifePoints(lifePoints.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validPoints = lifePoints.filter(p => p.year && p.role);
    if (validPoints.length > 0) {
      const sortedPoints = validPoints.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      onNext(sortedPoints, includeSocial);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            NEXUS: Multiverse Builder
          </h1>
          <p className={`text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Map your timeline. Explore what could have been.</p>
        </div>

        <div className={`backdrop-blur-sm border rounded-xl p-8 shadow-lg ${
          isLight
            ? 'bg-white/90 border-slate-200'
            : 'bg-slate-900/60 border-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-3 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            <Play className="text-purple-500" size={28} />
            Step 1: Map the Timeline
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {lifePoints.map((point, index) => (
              <div
                key={point.id}
                className={`border rounded-lg p-5 hover:border-purple-500/50 transition-all duration-300 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-sm font-mono ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>Life Point #{index + 1}</span>
                  {lifePoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLifePoint(point.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className={`block text-sm mb-2 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Year</label>
                    <input
                      type="number"
                      value={point.year}
                      onChange={(e) => updateLifePoint(point.id, 'year', e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900'
                          : 'bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                      placeholder="2024"
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className={`block text-sm mb-2 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Role/Title</label>
                    <input
                      type="text"
                      value={point.role}
                      onChange={(e) => updateLifePoint(point.id, 'role', e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900'
                          : 'bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={`block text-sm mb-2 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Company/Institution</label>
                    <input
                      type="text"
                      value={point.company}
                      onChange={(e) => updateLifePoint(point.id, 'company', e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900'
                          : 'bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                      placeholder="Google"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm mb-2 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Location</label>
                    <input
                      type="text"
                      value={point.location}
                      onChange={(e) => updateLifePoint(point.id, 'location', e.target.value)}
                      className={`w-full border rounded px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900'
                          : 'bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                      placeholder="Austin, TX"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={`block text-sm mb-2 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                    Current Happiness: <span className={`font-semibold ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>{point.happiness}/10</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={point.happiness}
                    onChange={(e) => updateLifePoint(point.id, 'happiness', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 (Low)</span>
                    <span>10 (High)</span>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addLifePoint}
              className={`w-full border-2 border-dashed rounded-lg py-4 hover:border-sky-500 hover:text-sky-500 transition-all duration-300 flex items-center justify-center gap-2 ${
                isLight
                  ? 'border-slate-300 text-slate-600'
                  : 'border-slate-700 text-slate-400'
              }`}
            >
              <Plus size={20} />
              Add Milestone
            </button>

            {/* Social Dynamics Toggle */}
            <div className={`bg-gradient-to-r border rounded-lg p-5 ${
              isLight
                ? 'from-purple-50 to-sky-50 border-purple-200'
                : 'from-purple-900/20 to-sky-900/20 border-purple-500/30'
            }`}>
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    Include Social & Relationship Dynamics
                  </h3>
                  <p className={`text-sm ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Simulate how relationships, dating, and family planning evolve in alternate timelines
                  </p>
                </div>
                <div className="ml-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={includeSocial}
                      onChange={(e) => setIncludeSocial(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-sky-600"></div>
                  </div>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
            >
              Render Base Timeline
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Step1MapTimeline;
