import { FaLinkedin } from 'react-icons/fa';

const TEAM = [
  {
    name: 'Vincent Tang',
    linkedin: 'https://www.linkedin.com/in/vincent-tang-40368b356/',
  },
  {
    name: 'Kevin Mei',
    linkedin: 'https://www.linkedin.com/in/kmeixyz/',
  },
  {
    name: 'Abby Hou',
    linkedin: 'https://www.linkedin.com/in/abigail-hou/',
  },
];

/** Prefer react-icons; set false to use `LinkedIn_Icon.png` if react-icons is unavailable. */
const USE_REACT_LINKEDIN_ICON = true;

function LinkedInMark({ className }) {
  if (!USE_REACT_LINKEDIN_ICON) {
    return (
      <img
        src={linkedInPng}
        alt=""
        width={32}
        height={32}
        className={className}
        draggable={false}
      />
    );
  }
  return <FaLinkedin className={className} aria-hidden />;
}

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
            WildHacks 2026: How Choices Shape Futures
          </p>
        </div>

        {/* Philosophy Section */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 mb-8 hover:border-purple-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text">
            Overview
          </h2>
          <div className={`space-y-4 leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            <p>
              Life doesn’t always feel like a straight line. It’s a series of choices, each leading to a different path. 
            </p>
            <p>
              Paralytica explores this idea: every decision can lead to a different version of your future. 
            </p>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                <ul className={`space-y-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <li>• What if you chose differently?</li>
                  <li>• How would your life change over time?</li>
                  <li>• What outcomes matter most to you?</li>
                </ul>
              </p>
            <p>
              This project turns those questions into simple simulations. It shows how choices can affect your career, finances, and well-being.  
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 mb-8 hover:border-sky-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                Frontend
              </h3>
              <ul className={`space-y-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <li>• React (useState, useEffect)</li>
                <li>• React Router</li>
                <li>• Tailwind CSS</li>
                <li>• Lucide Icons</li>
                <li>• Animations</li>
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
                <li>• Dark Mode</li>
                <li>• High-contrast Accents</li>
                <li>• Glass-style UI</li>
                <li>• Theme Switching</li>
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
              <ul className={`space-y-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <li>• Simulated Scenarios (Mock API)</li>
                <li>• Adjustable Variables</li>
                <li>• Tracks Outcomes Across Timelines</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Purpose */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 mb-8 hover:border-emerald-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text">
            Purpose
          </h2>
          <div className={`space-y-4 leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            <p>
              Paralytica isn’t about predicting the future. It’s about understanding decisions.
            </p>
            <p className={`font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              It helps you:
            </p>
            <ul className={`space-y-2 pl-1 list-none ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              <li className="flex gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>Explore “what if” scenarios</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>Think through trade-offs</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>See how small decisions lead to different outcomes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Our Team */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 mb-8 hover:border-sky-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text">
            Our Team
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 list-none p-0 m-0">
            {TEAM.map(({ name, linkedin }) => (
              <li
                key={name}
                className={`flex flex-col items-center text-center gap-3 rounded-lg p-4 border ${
                  isLight
                    ? 'border-slate-200 bg-slate-50/80'
                    : 'border-slate-700/80 bg-slate-800/40'
                }`}
              >
                <span
                  className={`text-lg font-semibold ${
                    isLight ? 'text-slate-800' : 'text-slate-100'
                  }`}
                >
                  {name}
                </span>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                    isLight
                      ? 'text-[#0A66C2] hover:bg-sky-100'
                      : 'text-[#0A66C2] hover:bg-slate-700/80'
                  } ${isLight ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-slate-900'}`}
                  aria-label={`${name} on LinkedIn`}
                >
                  <LinkedInMark className="h-8 w-8" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Credits */}
        <div className={`backdrop-blur-sm border rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text">
            Credits
          </h2>
          <div className={`space-y-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <p
              className={`text-lg font-bold ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              Built at WildHacks 2026
            </p>
            <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
              Theme: Time as Branching Decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
