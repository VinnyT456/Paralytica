import { FaLinkedin } from 'react-icons/fa';
import WildHacksLogo from '../assets/wildhacks_logo.png';

const TEAM = [
  {
    name: 'Vincent Tang',
    role: 'Software Engineer & Tech Lead',
    linkedin: 'https://www.linkedin.com/in/vincent-tang-40368b356/',
  },
  {
    name: 'Kevin Mei',
    role: 'Product Manager & UX Designer',
    linkedin: 'https://www.linkedin.com/in/kmeixyz/',
  },
  {
    name: 'Abby Hou',
    role: 'Brand Designer & Creative Lead',
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
    <div className="min-h-screen px-4 py-6 pt-20 sm:p-6 sm:pt-24">
      <div className="max-w-4xl mx-auto min-w-0">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div>
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                Data & Simulation
              </h3>
              <ul className={`space-y-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <li>• Simulated Scenarios (Mock API)</li>
                <li>• Adjustable Variables</li>
                <li>• Tracks Outcomes Across Timelines</li>
              </ul>
            </div>
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
            {TEAM.map(({ name, role, linkedin }) => (
              <li
                key={name}
                className={`group relative flex flex-col items-center text-center gap-4 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5 ${
                  isLight
                    ? 'border-slate-200/80 bg-white/70 hover:bg-white/85 hover:border-sky-300 shadow-sm hover:shadow-md'
                    : 'border-slate-700/80 bg-slate-900/35 hover:bg-slate-900/55 hover:border-sky-500/40 shadow-sm shadow-black/10 hover:shadow-lg hover:shadow-black/20'
                } focus-within:ring-2 focus-within:ring-sky-400/70`}
              >
                {/* Decorative gradient glow */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${
                    isLight
                      ? 'bg-gradient-to-br from-sky-200/70 via-purple-200/40 to-emerald-200/50'
                      : 'bg-gradient-to-br from-sky-500/20 via-purple-500/10 to-emerald-500/15'
                  }`}
                />

                <div className="relative flex flex-col items-center gap-2">
                  <span
                    className={`text-lg font-semibold tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-slate-50'
                    }`}
                  >
                    {name}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isLight ? 'text-slate-600' : 'text-slate-300/80'
                    }`}
                  >
                    {role}
                  </span>
                </div>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative inline-flex items-center justify-center rounded-xl p-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                    isLight
                      ? 'text-[#0A66C2] hover:bg-sky-100/80'
                      : 'text-[#0A66C2] hover:bg-slate-700/70'
                  } ${isLight ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-slate-900'}`}
                  aria-label={`${name} on LinkedIn`}
                >
                  <LinkedInMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
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
              className={`text-lg font-bold inline-flex flex-nowrap items-center gap-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              <span className="shrink-0">Built at</span>
              <span className="inline-flex items-center shrink-0">
                <img
                  src={WildHacksLogo}
                  alt=""
                  className="h-10 w-auto"
                  draggable={false}
                />
                <a
                  href="https://www.wildhacks.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline-offset-2 hover:underline ${
                    isLight ? 'text-sky-700 hover:text-sky-800' : 'text-sky-400 hover:text-sky-300'
                  }`}
                >
                  WildHacks 2026
                </a>
              </span>
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
