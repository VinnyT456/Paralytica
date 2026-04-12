import { Loader2 } from 'lucide-react';

function Step3Loading({ bgTheme }) {
  const isLight = bgTheme === 'light';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-8 sm:p-6 sm:pt-24">
      <div className="text-center max-w-md mx-auto px-2">
        <div className="relative inline-block mb-8">
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-pulse-ring" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
            <div className="w-24 h-24 border-4 border-sky-500/30 rounded-full animate-pulse-ring" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 border-4 border-emerald-500/30 rounded-full animate-pulse-ring" />
          </div>

          {/* Center icon */}
          <div className="relative z-10 w-40 h-40 flex items-center justify-center">
            <Loader2 className="text-purple-400 animate-spin" size={60} />
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Simulating Multiverse...
        </h2>
        <p className="text-slate-400 text-sm sm:text-lg">Projecting new reality vector</p>
      </div>
    </div>
  );
}

export default Step3Loading;
