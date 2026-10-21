import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PAGE_BACKGROUND = {
  background:
    'radial-gradient(circle at 10% 20%, rgba(238, 242, 255, 0.8) 0%, rgba(255, 255, 255, 1) 45%), radial-gradient(circle at 90% 85%, rgba(224, 231, 255, 0.45) 0%, rgba(255, 255, 255, 1) 50%)',
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Ingresá tu correo electrónico y tu contraseña para continuar.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresá un correo electrónico válido, por ejemplo: ana@campus.edu.');
      return;
    }
    setError('');
    navigate('/dashboard');
  };

  return (
    <div
      className="font-sans text-slate-800 antialiased flex flex-col justify-between min-h-screen selection:bg-brand-500 selection:text-white"
      style={PAGE_BACKGROUND}
    >
      <header
        className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10"
        data-purpose="site-navigation-header"
      >
        <Link
          to="/"
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
            SkillUp <span className="text-brand-600 font-extrabold">Campus</span>
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="">Volver al inicio</span>
        </Link>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-6 md:py-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <section
            className="lg:col-span-7 flex flex-col items-start space-y-7"
            data-purpose="value-proposition"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-50/90 border border-brand-100/80 text-brand-700 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xs">
              <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
              </svg>
              <span className="">Aprende hoy. Mejores oportunidades mañana.</span>
            </div>
            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl sm:text-5xl xl:text-[3.25rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Bienvenida de nuevo a{' '}
                <span className="text-brand-600 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-600">
                  SkillUp Campus
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Continúa tu aprendizaje, accede a tus cursos y sigue construyendo la mejor
                versión de ti.
              </p>
            </div>
            <div className="space-y-4 pt-1 w-full max-w-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100/70 flex items-center justify-center text-brand-600 shrink-0 shadow-xs">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Cursos prácticos</h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Contenido aplicado al mundo real.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100/70 flex items-center justify-center text-brand-600 shrink-0 shadow-xs">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Desarrolla nuevas habilidades</h2>
                  <p className="text-sm text-slate-500 font-medium">
                    A tu ritmo, desde cualquier lugar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100/70 flex items-center justify-center text-brand-600 shrink-0 shadow-xs">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Únete a una comunidad</h2>
                  <p className="text-sm text-slate-500 font-medium">Miles de estudiantes como tú.</p>
                </div>
              </div>
            </div>
            <div
              className="relative w-full max-w-lg mt-6 pt-4 hidden sm:block"
              data-purpose="decorative-illustration-container"
            >
              <div className="absolute -top-6 left-1/3 w-64 h-64 bg-indigo-100/50 rounded-full blur-2xl -z-10"></div>
              <div className="relative flex items-end justify-between">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-indigo-100 border border-slate-100 max-w-[170px] -rotate-3 z-10">
                  <span className="text-[11px] font-bold text-slate-700 block leading-tight">
                    Tu futuro empieza aquí
                  </span>
                  <div className="flex items-end gap-1.5 h-10 mt-3 px-1">
                    <div className="w-2.5 h-3 bg-indigo-200 rounded-t"></div>
                    <div className="w-2.5 h-5 bg-indigo-300 rounded-t"></div>
                    <div className="w-2.5 h-7 bg-brand-400 rounded-t"></div>
                    <div className="w-2.5 h-9 bg-brand-600 rounded-t"></div>
                    <div className="w-2.5 h-10 bg-indigo-700 rounded-t"></div>
                  </div>
                </div>
                <div className="relative flex-1 flex flex-col items-center">
                  <div className="space-y-1 mb-2">
                    <div className="bg-indigo-600 text-[10px] text-white font-bold py-1 px-5 rounded-md shadow-sm">
                      Aprende
                    </div>
                    <div className="bg-brand-500 text-[10px] text-white font-bold py-1 px-5 rounded-md shadow-sm">
                      Crea
                    </div>
                    <div className="bg-blue-700 text-[10px] text-white font-bold py-1 px-5 rounded-md shadow-sm">
                      Avanza
                    </div>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 rotate-6 text-center max-w-[150px] z-10">
                  <p className="text-xs font-bold text-brand-600 leading-snug">
                    Mismas metas, nuevas historias
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1">✨ Crece con nosotros</div>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5 w-full max-w-md mx-auto" data-purpose="login-form-card">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100/80 p-8 sm:p-10 transition-all">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Iniciar sesión
                </h2>
                <p className="text-sm text-slate-500 mt-2 font-normal">
                  Accede a tus cursos y continúa aprendiendo
                </p>
              </div>
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="email">
                    Correo electrónico
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShowPassword((visible) => !visible)}
                      className={`absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none${showPassword ? ' text-brand-600' : ''}`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer transition"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <span className="text-xs sm:text-sm font-medium text-slate-600 select-none">
                      Recordarme
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                {error && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    {error}
                  </p>
                )}
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 active:scale-[0.99] transition duration-200 cursor-pointer"
                  type="submit"
                >
                  <span className="">Ingresar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400 font-medium">o continúa con</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-semibold text-xs text-slate-700 focus:outline-none"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all font-semibold text-xs text-slate-700 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 shrink-0 fill-current text-slate-800"
                    viewBox="0 0 170 170"
                  >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.93-12.01-14.54-6.3-9.67-11.13-20.7-14.48-33.09-3.35-12.39-5.03-24.31-5.03-35.77 0-14.45 3.51-26.4 10.53-35.86 7.02-9.46 16.03-14.28 27.02-14.47 5.18 0 10.9 1.34 17.15 4.02 6.25 2.68 10.19 4.07 11.83 4.17 2.12 0 6.38-1.5 12.77-4.51 6.39-3.01 12.07-4.35 17.06-4.02 12.59.84 22.56 5.6 29.9 14.28-11.05 6.69-16.42 16.06-16.11 28.11.31 9.46 4.07 17.47 11.28 24.03 7.21 6.56 15.82 10.33 25.82 11.31-2.12 6.25-4.66 12.63-7.61 19.14zM119.22 31.84c0-7.37 2.68-14.31 8.04-20.82 5.36-6.51 12-10.47 19.92-11.88.22 1.45.33 2.79.33 4.02 0 7.25-2.73 14.15-8.19 20.7-5.46 6.55-12.19 10.49-20.1 11.81v-3.83z" />
                  </svg>
                  <span className="">Apple</span>
                </button>
              </div>
              <div className="text-center mt-7">
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  ¿No tienes cuenta?{' '}
                  <Link
                    to="/register"
                    className="font-bold text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline ml-1"
                  >
                    Regístrate
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer
        className="w-full border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-6 mt-12"
        data-purpose="site-footer"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-500 font-medium">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-center sm:text-left justify-center">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <div className="w-5 h-5 rounded-md bg-brand-600 flex items-center justify-center text-white">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
              </div>
              <span className="">SkillUp Campus</span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-slate-500">Aprendizaje hoy. Oportunidades mañana.</span>
          </div>
          <nav aria-label="Footer Navigation" className="flex items-center gap-6">
            <button type="button" className="hover:text-brand-600 transition-colors">
              Cursos
            </button>
            <button type="button" className="hover:text-brand-600 transition-colors">
              Nosotros
            </button>
            <button type="button" className="hover:text-brand-600 transition-colors">
              Contacto
            </button>
          </nav>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3 text-slate-400">
              <button type="button" aria-label="LinkedIn" className="hover:text-brand-600 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.3a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64Z" />
                </svg>
              </button>
              <button type="button" aria-label="Instagram" className="hover:text-brand-600 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
              <button type="button" aria-label="YouTube" className="hover:text-brand-600 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </button>
              <button type="button" aria-label="X" className="hover:text-brand-600 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </div>
            <span className="">© 2024 SkillUp Campus. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
