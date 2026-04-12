function About({ bgTheme }) {
  const isLight = bgTheme === 'light';

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            About Paralytica
          </h1>
          <p className={`text-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            A WildHacks 2026 Project: Time as Branching Decisions
          </p>
        </div>

        {/* Philosophy Section */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 mb-8 hover:border-purple-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text">
            The Philosophy of Time
          </h2>
          <div className={`space-y-4 leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            <p>
              Time is not a linear path but a branching tree of infinite possibilities. Each decision we make splits reality into parallel timelines—worlds where we chose differently, where we became someone else.
            </p>
            <p>
              Paralytica is an exploration of the many-worlds interpretation applied to human choice. It asks: What if you could see the ghost of the life you didn't live? What if every crossroads spawned a new universe?
            </p>
            <p>
              This project visualizes decision-driven divergence through data storytelling, transforming abstract regret into concrete alternate trajectories. It's a meditation on choice, consequence, and the weight of roads not taken.
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 hover:border-sky-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text">
            The Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                Frontend Architecture
              </h3>
              <ul className={`space-y-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <li>• React 19 with Hooks (useState, useEffect)</li>
                <li>• React Router for navigation</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Lucide React for iconography</li>
                <li>• Custom animations & transitions</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                <div className="w-2 h-2 bg-sky-500 rounded-full" />
                Design System
              </h3>
              <ul className={`space-y-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <li>• Dark mode neon aesthetic</li>
                <li>• Glassmorphism effects</li>
                <li>• Gradient accents (purple/sky/emerald)</li>
                <li>• Dynamic theme switching</li>
              </ul>
            </div>
          </div>

          <div className={`border-t pt-6 ${isLight ? 'border-slate-200' : 'border-slate-700'}`}>
            <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              Data & Simulation
            </h3>
            <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
              Mock API generates branching narratives with configurable social dynamics.
              Three-node projection system (Year +1, +3, +5) with metrics tracking for wealth trajectory,
              job satisfaction, and overall happiness across alternate timelines.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
          <p>Built with curiosity and code at WildHacks 2026</p>
          <p className="text-sm mt-2">Theme: Time as Branching Decisions</p>
        </div>
      </div>
    </div>
  );
}

export default About;
