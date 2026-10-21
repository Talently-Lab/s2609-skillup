import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ADMIN_ITEMS = [
  { label: 'Gestión de Cursos (Admin)', to: '/admin/courses' },
  { label: 'Materiales (Admin)', to: '/admin/materials' },
  { label: 'Usuarios (Admin)', to: '/admin/users' },
];

const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Cursos', to: '/catalog', hash: 'catalogo-seccion' },
  { label: 'Mis Cursos', to: '/dashboard' },
  { label: 'Nosotros', to: '/', hash: 'caracteristicas-seccion' },
  { label: 'Contacto', to: '/', hash: 'acreditacion-seccion' },
];

const ADMIN_PROFILE = {
  name: 'Dra. Elena Ramos',
  role: 'Facultad & Admin',
  email: 'elena.ramos@campus.edu',
  roleClass: 'bg-indigo-100 text-indigo-800',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDbhFBQI_vYx-wfhN3Sc40fV5zdaIcFzETWcbPopmZxpTbn1y48oHO2Uc7HUyjDWl6bICs2KpP7XVoiMwcjNgiZjqq-m4-7pZZ4UdmrbMac_YB3eGrhoEASEXaBl7PkCQKXPb76pvcqI41UtPkHO23sBq86AQmhI4H0z1jAD5B8qHGXgXkyDZwQDs7gO1UDiLjivCpsZZ6hJUplJ3Bei6e1MN6C-nF8Do5MbYFBhR5nG6VXZ2l0g0hD',
};

const STUDENT_PROFILE = {
  name: 'Elena Ramos',
  role: 'Estudiante',
  email: 'elena.ramos@campus.edu',
  roleClass: 'bg-emerald-100 text-emerald-800',
  avatar: ADMIN_PROFILE.avatar,
};

function isActivePath(pathname, hash, item) {
  if (item.hash === 'catalogo-seccion') {
    return pathname === '/catalog' || (pathname === '/' && hash === '#catalogo-seccion');
  }
  if (item.hash) return pathname === '/' && hash === `#${item.hash}`;
  if (item.to === '/') return pathname === '/' && !hash;
  return pathname === item.to;
}

export default function SiteHeader() {
  const { pathname, hash } = useLocation();
  const guest = pathname === '/' || pathname === '/catalog';
  const isAdminArea = pathname.startsWith('/admin');
  const adminActive = isAdminArea;
  const profile = isAdminArea ? ADMIN_PROFILE : STUDENT_PROFILE;

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    const frame = requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div className="hidden sm:flex items-baseline">
            <span className="font-headline-sm text-xl font-bold tracking-tight text-slate-900">
              SkillUp
            </span>
            <span className="font-headline-sm text-xl font-bold tracking-tight text-indigo-600 ml-1">
              Campus
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const to = item.hash ? `${item.to}#${item.hash}` : item.to;
            const active = isActivePath(pathname, hash, item);
            return (
              <Link
                key={item.label}
                to={to}
                className={
                  active
                    ? 'relative py-2 font-body-md text-sm font-semibold text-indigo-600 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:rounded-full'
                    : 'py-2 font-body-md text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors'
                }
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative group ml-2">
            <button
              type="button"
              className={
                adminActive
                  ? 'flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors'
                  : 'flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors'
              }
            >
              {adminActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
              <span>Admin</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
            <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 hidden group-hover:block z-50">
              {ADMIN_ITEMS.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={
                      active
                        ? 'flex items-center justify-between px-3 py-1.5 text-xs text-indigo-600 bg-indigo-50/70 font-semibold'
                        : 'block px-3 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors'
                    }
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          {guest ? (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5"
              >
                <span>Registrarme</span>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label="Notificaciones"
                className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              <div className="flex items-center gap-2.5 pl-2 py-1 pr-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <img
                  alt={profile.name}
                  className="w-9 h-9 rounded-full object-cover shadow-sm ring-1 ring-slate-200"
                  src={profile.avatar}
                />
                <div className="hidden md:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-900 leading-tight">
                      {profile.name}
                    </span>
                    <span
                      className={`${profile.roleClass} text-[10px] font-semibold px-1.5 py-0.5 rounded leading-none`}
                    >
                      {profile.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    {profile.email}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-slate-700 transition-transform">
                  expand_more
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
