const SOCIALS = [
  {
    label: 'LinkedIn',
    path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46V10.9M7.84 6.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
  {
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
];

function SocialIcons({ itemClass = '' }) {
  return (
    <div className="flex items-center gap-3 text-slate-400">
      {SOCIALS.map((social) => (
        <a key={social.label} href="#" aria-label={social.label} className={itemClass}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d={social.path}></path>
          </svg>
        </a>
      ))}
    </div>
  );
}

export default function SiteFooter({ variant = 'compact' }) {
  if (variant === 'full') {
    return (
      <footer className="w-full border-t border-slate-200/80 bg-white/90 backdrop-blur-md py-6 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs shadow-sm">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <span className="font-bold text-slate-800 text-sm tracking-tight">
                SkillUp <span className="text-indigo-600">Campus</span>
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 italic">
              Aprendizaje hoy. Oportunidades mañana.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <SocialIcons itemClass="hover:text-indigo-600 transition-colors p-1" />
            <p className="text-slate-400">
              © 2024 SkillUp Campus. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-white/95 backdrop-blur-md border-t border-slate-100 mt-auto py-4">
      <div className="max-w-7xl mx-auto px-gutter flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[16px]">school</span>
          </div>
          <span className="font-headline-sm text-sm font-bold tracking-tight text-slate-900">
            SkillUp <span className="text-indigo-600">Campus</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500">
            Aprendizaje hoy. Oportunidades mañana.
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3 text-slate-400">
            <SocialIcons className="hover:text-slate-600 transition-colors" />
          </div>
          <span className="text-slate-300">•</span>
          <span>© 2024 SkillUp Campus. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
