import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MAYA_CHEN, JORDAN_REYES, getDemoPersonaById } from '../data/personas';

function Demo({ bgTheme }) {
  const isLight = bgTheme === 'light';
  const navigate = useNavigate();
  const { setHeuristicProfile, setDemoPersonaId } = useAppContext();

  const personas = [
    {
      name: "Maya Chen",
      role: "UX Researcher",
      age: 22,
      vibe: "Curious, Thoughtful, Driven",
      description: "Recent graduate who blends analytical thinking with empathy. She reflects deeply and can overthink big decisions. She’s motivated by helping people and finding meaningful work aligned with her values.",
      data: MAYA_CHEN
    },
    {
      name: "Jordan Reyes",
      role: "Data Analyst",
      age: 24,
      vibe: "Practical, Ambitious, Competitive",
      description: "First-generation college graduate focused on building a stable, successful career. Confident and goal-oriented, but sometimes wonders what they might miss by playing it safe and sticking to a clear plan.",
      data: JORDAN_REYES
    }
  ];

  const handleExploreTimeline = (persona) => {
    const id = persona.data.id;
    const resolved = getDemoPersonaById(id);
    if (!resolved) return;

    // Always from canonical frozen persona — not user-controlled input
    setHeuristicProfile(resolved.heuristicProfile);
    setDemoPersonaId(id);

    // Pass only id in history state; Simulate resolves via getDemoPersonaById (not spoofable data blobs)
    navigate('/simulate', { state: { demoPersonaId: id } });
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto min-w-0">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2 bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent`}>
            Try Sample Profiles
          </h1>
          <p className={`text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Explore how different lives can unfold
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personas.map((persona, index) => (
            <div
              key={index}
              className={`p-5 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                isLight
                  ? 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-xl'
                  : 'bg-slate-900/50 border-purple-500/30 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
              }`}
            >
              {/* Avatar Circle */}
              <div className="flex justify-center mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                  isLight
                    ? 'bg-gradient-to-br from-purple-100 to-sky-100 text-purple-600'
                    : 'bg-gradient-to-br from-purple-900/50 to-sky-900/50 text-purple-400'
                }`}>
                  {persona.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Name */}
              <h2 className={`text-2xl font-bold text-center mb-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {persona.name}
              </h2>

              {/* Role & Age */}
              <p className={`text-center mb-4 ${
                isLight ? 'text-purple-600' : 'text-purple-400'
              }`}>
                {persona.role}, {persona.age}
              </p>

              {/* Vibe Badge */}
              <div className="flex justify-center mb-4">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  isLight
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-sky-900/30 text-sky-400'
                }`}>
                  {persona.vibe}
                </span>
              </div>

              {/* Description */}
              <p className={`text-center text-sm leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {persona.description}
              </p>

              {/* CTA Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => handleExploreTimeline(persona)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    isLight
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  }`}
                >
                  {`Explore ${persona.name.split(' ')[0]}'s Path`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Demo;
