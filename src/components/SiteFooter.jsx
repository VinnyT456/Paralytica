function SiteFooter({ bgTheme }) {
  const isLight = bgTheme === 'light';

  return (
    <footer
      className={`shrink-0 border-t py-4 text-center text-xs sm:text-sm pb-[max(1rem,env(safe-area-inset-bottom))] ${
        isLight
          ? 'border-slate-200/80 bg-slate-100/50 text-slate-500'
          : 'border-slate-800/80 bg-slate-950/50 text-slate-500'
      }`}
    >
      <p className="px-4">© 2026 Paralytica. All rights reserved.</p>
    </footer>
  );
}

export default SiteFooter;
