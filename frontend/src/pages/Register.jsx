import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Ingresá tu nombre completo.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Ingresá tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Ingresá un correo electrónico válido, por ejemplo: ana@campus.edu.';
    }
    if (!form.password) {
      nextErrors.password = 'Ingresá una contraseña.';
    } else if (form.password.length < 8) {
      nextErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirmá tu contraseña.';
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    if (!terms) {
      nextErrors.terms = 'Debés aceptar los términos y condiciones.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      navigate('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between hero-radial-bg text-slate-800 antialiased selection:bg-brand-100 selection:text-brand-700"
      style={{ background: 'radial-gradient(circle at 18% 45%, #eff4ff 0%, #f8faff 45%, #ffffff 80%)' }}
    >
      <header className="w-full max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center justify-between" data-purpose="site-header">
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg py-1 px-1.5 transition">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            SkillUp <span className="text-slate-800 font-extrabold">Campus</span>
          </span>
        </Link>
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 gap-1.5 transition-colors group">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span className="">Volver al inicio</span>
        </Link>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-4 md:py-8 flex-1 flex items-center" data-purpose="registration-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full">
          <section className="lg:col-span-7 flex flex-col space-y-8" data-purpose="presentation-column">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-brand-700 text-xs md:text-sm font-semibold w-fit shadow-xs">
              <span className="flex items-center text-brand-600">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span className="">Únete a una comunidad de estudiantes que aprende y crece</span>
            </div>

            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Tu futuro empieza aquí con <span className="text-brand-600">SkillUp</span>
              </h1>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                Crea tu cuenta y accede a cientos de cursos online dictados por expertos. Aprende nuevas habilidades, impulsa tu carrera y alcanza tus metas.
              </p>
            </div>

            <div className="relative w-full max-w-xl bg-gradient-to-tr from-brand-50/60 to-indigo-100/40 rounded-3xl p-6 border border-brand-100/50 flex items-center justify-center min-h-[290px] overflow-hidden">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-brand-300/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-sm border border-slate-100 transform -rotate-6 text-[12px] font-semibold text-slate-700 flex flex-col items-center">
                <span className="">Un mejor</span>
                <span className="text-brand-600">tú, empieza</span>
                <span className="text-slate-500 font-normal">aquí ⤸</span>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-indigo-500 via-brand-600 to-indigo-700 p-1 shadow-lg shadow-indigo-300/50 relative flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-indigo-100 to-brand-50 flex items-center justify-center overflow-hidden">
                    <svg className="w-24 h-24 text-brand-600 translate-y-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                    </svg>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-white w-4 h-4 rounded-full"></span>
                </div>
                <div className="mt-3 flex gap-1 text-[11px] font-bold text-white tracking-wide">
                  <span className="bg-indigo-600 px-2.5 py-0.5 rounded-md shadow-xs">Aprende</span>
                  <span className="bg-brand-500 px-2.5 py-0.5 rounded-md shadow-xs">Crea</span>
                  <span className="bg-indigo-700 px-2.5 py-0.5 rounded-md shadow-xs">Avanza</span>
                </div>
              </div>
              <div className="absolute right-3 top-5 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-slate-100 space-y-2 text-left text-xs hidden sm:block">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                  <span className="">Nuevas habilidades</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                  <span className="">Mejores oportunidades</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                  <span className="">Tu crecimiento sin límites</span>
                </div>
              </div>
              <div className="absolute right-4 bottom-4 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-2xl shadow-sm border border-slate-100 hidden sm:flex flex-col gap-1 items-start">
                <span className="text-[10px] font-semibold text-slate-500">Avanza cada día</span>
                <div className="flex items-end gap-1 h-5">
                  <span className="w-1.5 h-2 bg-indigo-300 rounded-t"></span>
                  <span className="w-1.5 h-3 bg-indigo-400 rounded-t"></span>
                  <span className="w-1.5 h-2.5 bg-indigo-400 rounded-t"></span>
                  <span className="w-1.5 h-4 bg-brand-500 rounded-t"></span>
                  <span className="w-1.5 h-5 bg-brand-600 rounded-t"></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2" data-purpose="key-benefits">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-brand-600 flex items-center justify-center border border-indigo-100/70 shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                    <path d="M6 6h10"></path>
                    <path d="M6 10h10"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Aprende a tu ritmo</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Accede a los cursos cuando y donde quieras.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-brand-600 flex items-center justify-center border border-indigo-100/70 shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Acceso inmediato</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Comienza hoy mismo y no detengas tu progreso.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-brand-600 flex items-center justify-center border border-indigo-100/70 shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Certificados</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Valida tus habilidades y destaca en tu carrera.</p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5 w-full flex justify-center" data-purpose="registration-card-wrapper">
            <div
              className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 soft-card-shadow border border-slate-100 flex flex-col"
              style={{ boxShadow: '0 20px 45px -10px rgba(79, 70, 229, 0.08), 0 8px 24px -8px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="text-center mb-7">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Crear cuenta</h2>
                <p className="text-sm text-slate-500 mt-1.5 font-medium">Empieza tu aprendizaje hoy.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="full-name">Nombre completo</label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all bg-white overflow-hidden shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4"></circle>
                        <path d="M6 21v-2a6 6 0 0 1 12 0v2"></path>
                      </svg>
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none"
                      id="full-name"
                      name="fullName"
                      placeholder="Ej. Camila Torres"
                      required
                      type="text"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="email">Correo electrónico</label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all bg-white overflow-hidden shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect height="16" rx="2" width="20" x="2" y="4"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none"
                      id="email"
                      name="email"
                      placeholder="Ej. camila@ejemplo.com"
                      required
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="password">Contraseña</label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all bg-white overflow-hidden shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect height="11" rx="2" ry="2" width="18" x="3" y="11"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <input
                      className="w-full pl-11 pr-11 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none"
                      id="password"
                      name="password"
                      placeholder="Mínimo 8 caracteres"
                      required
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                      type="button"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="confirm-password">Confirmar contraseña</label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all bg-white overflow-hidden shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect height="11" rx="2" ry="2" width="18" x="3" y="11"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <input
                      className="w-full pl-11 pr-11 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 border-0 focus:ring-0 focus:outline-none"
                      id="confirm-password"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      required
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                      type="button"
                      aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center gap-2 pt-1 pb-2">
                  <input
                    className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    id="terms"
                    name="terms"
                    required
                    type="checkbox"
                    checked={terms}
                    onChange={(event) => setTerms(event.target.checked)}
                  />
                  <label className="text-xs text-slate-600 cursor-pointer select-none" htmlFor="terms">
                    Acepto{' '}
                    <button type="button" className="text-brand-600 hover:underline font-semibold">
                      términos y condiciones
                    </button>
                  </label>
                </div>
                {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

                <button
                  className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  type="submit"
                >
                  <span className="">Crear cuenta</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </form>

              <div className="relative my-6 text-center">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-400 font-medium">o regístrate con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3" data-purpose="social-login-actions">
                <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer" type="button">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                  </svg>
                  <span className="">Google</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer" type="button">
                  <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.6-0.73 1-1.73.89-2.73-.86.03-1.9.57-2.51 1.28-.54.62-.99 1.63-.87 2.61.96.07 1.89-.43 2.49-1.16z"></path>
                  </svg>
                  <span className="">Apple</span>
                </button>
              </div>

              <div className="mt-8 text-center text-xs text-slate-600">
                ¿Ya tienes cuenta?
                <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700 ml-1 hover:underline">
                  Inicia sesión
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200/80 bg-white/60 backdrop-blur-xs py-6 mt-12" data-purpose="site-footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <span className="font-bold text-slate-800">SkillUp Campus</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="italic text-slate-500 hidden sm:inline">Aprendizaje hoy. Oportunidades mañana.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3.5 text-slate-400">
              <button aria-label="LinkedIn" className="hover:text-brand-600 transition" type="button">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5Z"></path></svg>
              </button>
              <button aria-label="Instagram" className="hover:text-brand-600 transition" type="button">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </button>
              <button aria-label="YouTube" className="hover:text-brand-600 transition" type="button">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
              </button>
              <button aria-label="X / Twitter" className="hover:text-brand-600 transition" type="button">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </button>
            </div>
            <span className="">© 2024 SkillUp Campus. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
