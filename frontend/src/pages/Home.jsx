import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const COURSES = [
  {
    id: 'c4',
    category: 'diseño',
    title: 'Diseño de Interfaces de Usuario con Figma y Tailwind',
    keywords: 'diseño ux ui figma tailwind prototipos experiencia de usuario interfaces',
  },
  {
    id: 'c1',
    category: 'desarrollo web',
    title: 'Desarrollo Full Stack con React & Node.js',
    keywords: 'desarrollo web react node javascript full stack backend base de datos',
  },
  {
    id: 'c3',
    category: 'cloud',
    title: 'Arquitectura Cloud y DevOps en AWS',
    keywords: 'cloud aws devops terraform kubernetes ecs ci/cd infraestructura nube',
  },
];

const CATEGORY_PILLS = [
  { id: 'all', label: 'Todos' },
  { id: 'diseño', label: 'Diseño UX/UI' },
  { id: 'desarrollo web', label: 'Desarrollo Web' },
  { id: 'cloud', label: 'Cloud & DevOps' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [enrolled, setEnrolled] = useState({});
  const [toast, setToast] = useState({
    visible: false,
    title: '¡Inscripción Exitosa!',
    desc: 'El curso ya está habilitado en tu panel.',
  });
  const toastTimer = useRef(null);
  const enrollTimer = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(enrollTimer.current);
    },
    [],
  );

  const [designCourse, webCourse, cloudCourse] = COURSES;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesCourse = (course) => {
    const matchesCategory = category === 'all' || course.category === category;
    const matchesQuery =
      !normalizedQuery ||
      course.title.toLowerCase().includes(normalizedQuery) ||
      course.keywords.includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  };

  const visibleCount = COURSES.filter(matchesCourse).length;

  const scrollToCatalog = () => {
    const section = document.getElementById('catalogo-seccion');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const applyQuickFilter = (value) => {
    setSearchQuery(value);
    scrollToCatalog();
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCategory('all');
  };

  const handleEnroll = (course) => {
    if (enrolled[course.id]) return;
    setEnrolled((prev) => ({ ...prev, [course.id]: true }));
    setToast({
      visible: true,
      title: '¡Inscripción Exitosa!',
      desc: `Te has inscrito en "${course.title}". Acceso concedido.`,
    });
    clearTimeout(toastTimer.current);
    clearTimeout(enrollTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 5500);
    enrollTimer.current = setTimeout(() => {
      setEnrolled((prev) => ({ ...prev, [course.id]: false }));
    }, 8000);
  };

  return (
    <div className="bg-[#f8faff] flex-1">
      <div
        id="toast-notification"
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 ease-out flex items-center gap-space-md bg-slate-900 text-white px- space-md py- space-sm rounded-xl shadow-2xl p-4 ${
          toast.visible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[18px]">check</span>
        </div>
        <div className="flex flex-col min-w-0 pr-2">
          <span id="toast-title" className="font-title-md text-sm font-bold text-white">
            {toast.title}
          </span>
          <span id="toast-desc" className="font-body-sm text-xs text-slate-300">
            {toast.desc}
          </span>
        </div>
        <Link
          to="/dashboard"
          className="font-label-sm text-xs text-indigo-300 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors ml-2 font-medium shrink-0"
        >
          Ir a Mis Cursos →
        </Link>
      </div>

      <main className="w-full flex-1 max-w-7xl mx-auto px-gutter py-space-lg">
        <section className="relative w-full rounded-3xl bg-gradient-to-b from-[#f3f6ff] via-[#eef3ff] to-[#f9faff] p-6 sm:p-10 lg:p-12 mb-8 overflow-hidden border border-indigo-50/80 shadow-sm">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-[#e8edff] text-indigo-700 px-3.5 py-1.5 rounded-full mb-5 border border-indigo-200/50 shadow-xs">
                <span className="text-sm">🎓</span>
                <span className="text-xs font-semibold tracking-wide">
                  Aprende hoy. Mejores oportunidades mañana.
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-4">
                Impulsa tu futuro<br className="hidden sm:inline" /> con{' '}
                <span className="text-indigo-600">cursos online</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
                Desarrolla habilidades reales con cursos en línea creados por expertos. Aprende a tu
                ritmo, desde cualquier lugar y construye la vida que quieres.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-all"
                >
                  <span>Explorar cursos</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <a
                  href="#caracteristicas-seccion"
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 font-semibold text-sm px-5 py-3.5 rounded-xl shadow-xs transition-all"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    ▶
                  </span>
                  <span>Ver cómo funciona</span>
                </a>
              </div>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-3.5 mb-8 pt-1">
                <div className="flex -space-x-2.5">
                  <img
                    alt="Estudiante"
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByk0LetNuifcUwY5w_SvS3zbfQuesmlRu7iBUDfOnNvmFoo_JruqK3EDIQmrDc7plFIsa_h7O8Geh3Hcfyyx9LEno2jA6Cn6UHt3oJFiFfXp6u3MT9ZaQGH5rSkz-WHwULcJtYntEYNg2K0Nejlna4H4DaevDfmqHG-Hom-vVAZyjpN8wyRIPhedVjcnhxx9KPy-Pzvs4SU-sXI8Bf4NeSnMAP0WwJnQiL7_lv5EQtzhjNSXiUXTdE"
                  />
                  <img
                    alt="Estudiante"
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoUHfLquzJsOvickKWZjmGDRbdfDa8j7hmloER5YjbfLw7l8493RAYrB8b0laNxZMpUaT2CMMqSvqE27wVgCxK09hT84UHRKSdK7o50mprF_PbpOOkc-mqVCcY6j2s-95OcLxEAeojjdfVX4UT_F5Sc7YF1nYCTIvLCX1-jBb0Cmab0yAmHioMC2ZJju6LYlU6g8TDrTcBFzBP5zsiA4PzAYFi0YlsQoobnye778BfWIJ6qEGn2yYb"
                  />
                  <img
                    alt="Estudiante"
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR_zYiEgssPm5yCXniLn_XUrPDgjcO3laGhh3Tmj_mP9vQts0Mu5dskc0KSYJqZjKwUDv11DvwQ8Mxd8vUGhXQNnYUqheLyerXS8F4qWbd9t7OFhzw_sc-MnAphDsuqe3sITX8DbhYwTszt4epI3OCm0aml0QgGkhKCuxgkJGpiy3niJvJel4PQx0EGPCKts2TZcFWPeSQ84RX2T5Yz_AiRFmT27xnI2t8wH0RugdT6-vz6PQhaMvR"
                  />
                  <img
                    alt="Estudiante"
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc77VgrVdjzeMm8c1i6dNAVj2_FnazpnDURHOP_SM6sRncwczv_n_bMg7EULCz6Gh9DlP7umASr6iYl6tidB7MetdE_wCnzxh_ONikgn0APt179AQuwfHbbRsLpY77B-JOBQ2g1l6F8o088WlMgXhzRPFnvgnuFZCRH3pL6SAQL5IY8zLwXVsYZwHrldnS1kA21_qYBexd_OMpSmMqKRjHCF4arME9jt985MiaS6eWKoS3ayCwaU_X"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    +10,000 estudiantes ya están aprendiendo
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                    <span className="text-xs font-semibold text-slate-700">4.8 de 5</span>
                    <span className="text-xs text-slate-500">(más de 1,200 reseñas)</span>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-xl bg-white p-2 rounded-2xl shadow-sm border border-indigo-100 flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl">
                  <span className="material-symbols-outlined text-indigo-500 text-[20px]">
                    search
                  </span>
                  <input
                    id="searchInput"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    placeholder="¿Qué habilidad técnica deseas dominar hoy? (React, Python, AWS...)"
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <button
                    id="clearSearchBtn"
                    type="button"
                    onClick={clearSearch}
                    className={
                      searchQuery
                        ? 'text-slate-400 hover:text-slate-600 p-1'
                        : 'hidden text-slate-400 hover:text-slate-600 p-1'
                    }
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                  <button
                    id="searchTriggerBtn"
                    type="button"
                    onClick={scrollToCatalog}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Buscar</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto px-1 py-0.5 scrollbar-none text-xs">
                  <span className="text-slate-400 font-medium shrink-0 mr-1">Filtros:</span>
                  <button
                    type="button"
                    data-filter="desarrollo web"
                    onClick={() => applyQuickFilter('desarrollo web')}
                    className="quick-filter-chip bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
                  >
                    Desarrollo Web
                  </button>
                  <button
                    type="button"
                    data-filter="inteligencia artificial"
                    onClick={() => applyQuickFilter('inteligencia artificial')}
                    className="quick-filter-chip bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
                  >
                    IA & Machine Learning
                  </button>
                  <button
                    type="button"
                    data-filter="cloud"
                    onClick={() => applyQuickFilter('cloud')}
                    className="quick-filter-chip bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
                  >
                    Cloud AWS
                  </button>
                  <button
                    type="button"
                    data-filter="diseño"
                    onClick={() => applyQuickFilter('diseño')}
                    className="quick-filter-chip bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
                  >
                    UX/UI
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] select-none">
              <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-indigo-200/50 to-blue-100/60 blur-xl"></div>
              <div className="absolute top-1 -right-2 sm:right-2 z-30 hidden sm:flex flex-col items-center">
                <div className="font-handwriting text-2xl font-bold text-indigo-600 leading-tight rotate-6 text-center">
                  Aprende<br />Crea<br />Avanza
                </div>
                <span className="font-handwriting text-3xl text-indigo-400 rotate-[70deg] translate-y-1">⤷</span>
              </div>
              <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center">
                <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-indigo-50 flex items-center justify-center">
                  <img
                    alt="Estudiante en SkillUp Campus con laptop y libros"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqq-pQLRc6XCvqax_Dyxh4j1oOlM5ZLP3Oi-Ui-bnbNyPYlWQGOwCf6TJO06jJkPkpx6BkaKf2ypX2cgSvECWV1mDLM9IyHKTHRWiSY3jSqIyapo5OPJjLj6tTAaEqAFSAy4_9tdNuJud7bNp-HdUbjFwqZv7B77njr7FT3VTIG2phclm5cKFAZl1i_xrVr4W0Wxz68RLnlYU_QwYHP4Zm9UFN-FtL9NTZxp4cM3-kFGf4A1QpFPjy"
                  />
                  <div className="absolute bottom-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
                    <span className="material-symbols-outlined text-[16px] text-indigo-600">
                      laptop_mac
                    </span>
                    <span>Laboratorios Activos 24/7</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-4 sm:left-10 z-20 flex items-end gap-2">
                  <div className="bg-indigo-600 text-white rounded-lg p-2.5 shadow-md text-left w-24 sm:w-28 leading-tight">
                    <div className="text-[9px] font-bold tracking-tight uppercase opacity-90">
                      SkillUp Pro
                    </div>
                    <div className="text-[10px] font-medium leading-none mt-1">
                      Mejores personas, mejores oportunidades
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-lg text-center w-24 sm:w-28">
                    <span className="text-sm">☕</span>
                    <p className="text-[9px] font-bold text-slate-700 leading-tight">
                      Disciplina hoy, Resultados mañana
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 left-0 sm:left-4 z-20 bg-white/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 w-44 sm:w-48 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="text-xs font-bold text-slate-900 mb-2.5 flex items-center justify-between">
                  <span>Aprende sin límites</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <ul className="space-y-1.5 text-[11px] font-medium text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>{' '}
                    Cursos online
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>{' '}
                    Certificados
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>{' '}
                    A tu ritmo
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>{' '}
                    Desde cualquier lugar
                  </li>
                </ul>
              </div>
              <div className="absolute top-2 right-0 sm:right-6 z-20 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-slate-100 w-40 sm:w-44 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-900">Avanza cada día</span>
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                    +70%
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-10 pt-2 px-1">
                  <div className="w-1/5 bg-indigo-200 rounded-t h-2"></div>
                  <div className="w-1/5 bg-indigo-300 rounded-t h-4"></div>
                  <div className="w-1/5 bg-indigo-400 rounded-t h-6"></div>
                  <div className="w-1/5 bg-indigo-500 rounded-t h-8"></div>
                  <div className="w-1/5 bg-indigo-600 rounded-t h-10 shadow-sm shadow-indigo-300"></div>
                </div>
                <div className="text-[9px] text-slate-400 mt-1.5 font-medium text-center">
                  Progreso continuo
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full bg-white rounded-2xl p-4 sm:p-6 mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100"
          id="caracteristicas-seccion"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-slate-100">
            <div className="flex items-center gap-3.5 px-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 leading-tight">
                  Cursos de calidad
                </span>
                <span className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Contenido actualizado por expertos
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-2 lg:pl-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 leading-tight">
                  Aprende a tu ritmo
                </span>
                <span className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Estudia cuando y donde quieras
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-2 lg:pl-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 leading-tight">Certificados</span>
                <span className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Valida tus habilidades
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-2 lg:pl-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <span className="material-symbols-outlined text-[24px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 leading-tight">
                  Oportunidades reales
                </span>
                <span className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Nuevas habilidades, un mejor futuro
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col pt-2 pb-16" id="catalogo-seccion">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                  Selección recomendada
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Cursos destacados
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Descubre algunos de nuestros cursos más populares y comienza hoy.
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group shrink-0 pb-1"
            >
              <span>Ver todos los cursos</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-6">
            {CATEGORY_PILLS.map((pill) => (
              <button
                key={pill.id}
                type="button"
                data-cat={pill.id}
                onClick={() => setCategory(pill.id)}
                className={
                  category === pill.id
                    ? 'active-pill bg-indigo-600 text-white shadow-xs px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors'
                    : 'text-on-surface-variant bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors'
                }
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100"
              style={matchesCourse(designCourse) ? undefined : { display: 'none' }}
            >
              <div>
                <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Diseño de Interfaces de Usuario con Figma y Tailwind"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPfSa_scwfFLjIcMtzRd0Ckqr0ia6oa8YMQkCQSj2uTDX6AQT6xbkycyNKY2igjHTbsigJXxFoFBQ0Yk_1TwX0Rcm1r-5p-dEZ7NLdkz1AficD1X8TaWU5UhaXhp5NTmRuQaa2f9k7XDHXhdIL38AUw8h_LbAU_I462dSCPXduedLsmaTPM-P2bzgFDfSoBF8F2fHZkIjhbMi3JMF9a9CryUrsQKc-IbsBVnNHOFc_NP-UJkv_Lo_g"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[11px] bg-white/95 backdrop-blur text-indigo-700 font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      Diseño UX/UI
                    </span>
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 font-medium px-2 py-1 rounded-md border border-indigo-100">
                      Intermedio
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>32 hrs</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-slate-600">
                      <span
                        className="material-symbols-outlined text-[16px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-sm text-slate-900 font-bold">4.9</span>
                      <span className="text-xs text-slate-400">(1,410 reseñas)</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                      Práctico
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Diseño de Interfaces de Usuario con Figma y Tailwind
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    Crea sistemas de diseño escalables y prototipos interactivos centrados en la
                    experiencia del usuario listos para desarrollo.
                  </p>
                  <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100">
                    <img
                      className="w-7 h-7 rounded-full object-cover"
                      alt="Lucía Cordero"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4INRtDXujLmnYs2sVvcVMGzYKPVe1Bi9XbVnskJ4iR2NPhl21h-o2kZLzO46TPjiTeg7cb26asHm9fNukqvB6Upteiv9-c8ZXd2hCZ9FJHT9YWAPuGWTC23VH0EGwNl_oELzKWReY5e3niT9bb0-4U_X6Jx39b5cUSaX9oZdyq93aBasIGu9lgJTkZK8TgqAmGNjqWFQ1S4p68f2Y2NWrdFwylSH8425Qa3byDWW6RQ38BMsOXAZn"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-slate-800 font-semibold truncate">
                        Lucía Cordero
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        Senior Product Designer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3 bg-white">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 line-through">$59.99</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-1.5 py-0.5 rounded">
                      -50%
                    </span>
                  </div>
                  <span className="text-lg text-slate-900 font-extrabold">
                    $29.99 <span className="text-xs text-slate-500 font-normal">USD</span>
                  </span>
                </div>
                <button
                  type="button"
                  disabled={enrolled[designCourse.id]}
                  onClick={() => handleEnroll(designCourse)}
                  className={`enroll-btn text-xs text-white active:scale-95 px-4 py-2.5 rounded-xl shadow-sm font-semibold transition-all flex items-center gap-1.5 ${
                    enrolled[designCourse.id]
                      ? 'bg-emerald-500'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {enrolled[designCourse.id] ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                      <span>¡Inscrito!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Comprar curso</span>
                    </>
                  )}
                </button>
              </div>
            </article>

            <article
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100"
              style={matchesCourse(webCourse) ? undefined : { display: 'none' }}
            >
              <div>
                <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Desarrollo Full Stack con React & Node.js"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bIaHplPwPMJnN_mRRxxY33KFQ5BcQZf5zhHxkmjL_DkPyxoy5CB9Q4n1iA2WF209DBYw_72wgCwiPqAIS7N0nFS4h2TpvnayLCJKwS1GTC1Id6qXvZDRQl4CXMTqIToox8lJgzYVXvm4FRQUu0WpKCzIARmm8MYDz0OnH2_Po3KFzSLHWwDQJeVTA6FcqUozNd1wLIdoekSoPjlJPAPKtY3YmhBKPmep6aPyqzV76kB7cYhwHuQg"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[11px] bg-white/95 backdrop-blur text-indigo-700 font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      Desarrollo Web
                    </span>
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 font-medium px-2 py-1 rounded-md border border-indigo-100">
                      Intermedio
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>40 hrs</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-slate-600">
                      <span
                        className="material-symbols-outlined text-[16px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-sm text-slate-900 font-bold">4.9</span>
                      <span className="text-xs text-slate-400">(2,140 reseñas)</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                      Certificado Oficial
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Desarrollo Full Stack con React & Node.js
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    Domina el stack moderno construyendo proyectos completos listos para producción
                    con autenticación JWT y base de datos SQL.
                  </p>
                  <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100">
                    <img
                      className="w-7 h-7 rounded-full object-cover"
                      alt="Ing. Carlos Mendoza"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLwVo_qujlxkqnyrizkWCGnWbNAYQS3mWY_YKFwvKqqReNpkBmUIf5kNfICQddwUy0dpHZB9mjJ4H-FzGkbG2cTajBVRzMjWq4eTaHlafIxyEDxPngTq0-SyoRQ7PxFyzKpXkh6hllFzP6aOHqcb35RXF8RJdE3gzIJDkVi0eygn9UdYIB5X4kDP6Ba9hWZD6-3bOcPQS8T-SuCXfWI6sir1HDemOwfPRGagIosR_P_ScGOJgLbOAX"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-slate-800 font-semibold truncate">
                        Ing. Carlos Mendoza
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        Tech Lead & Mentor SkillUp
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3 bg-white">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 line-through">$79.99</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-1.5 py-0.5 rounded">
                      -50%
                    </span>
                  </div>
                  <span className="text-lg text-slate-900 font-extrabold">
                    $39.99 <span className="text-xs text-slate-500 font-normal">USD</span>
                  </span>
                </div>
                <button
                  type="button"
                  disabled={enrolled[webCourse.id]}
                  onClick={() => handleEnroll(webCourse)}
                  className={`enroll-btn text-xs text-white active:scale-95 px-4 py-2.5 rounded-xl shadow-sm font-semibold transition-all flex items-center gap-1.5 ${
                    enrolled[webCourse.id] ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {enrolled[webCourse.id] ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                      <span>¡Inscrito!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Comprar curso</span>
                    </>
                  )}
                </button>
              </div>
            </article>

            <article
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100"
              style={matchesCourse(cloudCourse) ? undefined : { display: 'none' }}
            >
              <div>
                <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Arquitectura Cloud y DevOps en AWS"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWy5AtYOa7I3zaITJYdC0sjhAzOH5XvXxtvwtQO0QhnJk82BWqqNjzgfan54tI6_0KlgbeX4vllefvruruxlUX1h128u6LIHJA56kEEhoNRfqPCqYFTvt0FNWPre_-a1aeiiTb62_SwVXmnZmyAO7pDI5qwXiXivO-cKLLDrDC57yk5wIo_SYWDRqCux7iBOWOrlnf4ZfSevlVe9kF6wZAD8e6nkOgQYPaJfYW5jqo8fdrCYQdDIll"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[11px] bg-white/95 backdrop-blur text-indigo-700 font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      Cloud & DevOps
                    </span>
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 font-medium px-2 py-1 rounded-md border border-indigo-100">
                      Avanzado
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>45 hrs</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1 text-slate-600">
                      <span
                        className="material-symbols-outlined text-[16px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-sm text-slate-900 font-bold">5.0</span>
                      <span className="text-xs text-slate-400">(940 reseñas)</span>
                    </div>
                    <span className="text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold border border-indigo-100">
                      Top Calificado
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Arquitectura Cloud y DevOps en AWS
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    Implementa pipelines CI/CD, infraestructura con Terraform y despliegues en
                    contenedores ECS y Kubernetes en la nube.
                  </p>
                  <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100">
                    <img
                      className="w-7 h-7 rounded-full object-cover"
                      alt="Marcos Villanueva"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT56Ozjg5SqzjzE9VdxEuZoXWwyJMUvUbHbh88gPVRWu3GOnGwmWKaG0sbKO6uXgRgfUhUct-NuMxeiBJO4gp_-JESCkjk6Juc3-P3J6p6Fco-7VLjOIejsftMLfvWKfHPFSQAMs94q9gtYjPBZiOGaN0PyFqJ7Sv-gT8c8biwSVmoJzv2kOix8K4MJ161xI4kqg6b6nHgP4vCGKqGCyRrXYeRPAb_VG9bUAPT74xLPDofWETIzhwm"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-slate-800 font-semibold truncate">
                        Marcos Villanueva
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        AWS Certified Solutions Architect
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3 bg-white">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 line-through">$89.99</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-1.5 py-0.5 rounded">
                      -50%
                    </span>
                  </div>
                  <span className="text-lg text-slate-900 font-extrabold">
                    $44.99 <span className="text-xs text-slate-500 font-normal">USD</span>
                  </span>
                </div>
                <button
                  type="button"
                  disabled={enrolled[cloudCourse.id]}
                  onClick={() => handleEnroll(cloudCourse)}
                  className={`enroll-btn text-xs text-white active:scale-95 px-4 py-2.5 rounded-xl shadow-sm font-semibold transition-all flex items-center gap-1.5 ${
                    enrolled[cloudCourse.id] ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {enrolled[cloudCourse.id] ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                      <span>¡Inscrito!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                      <span>Comprar curso</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          </div>

          {visibleCount === 0 && (
            <div
              id="no-results-msg"
              className="w-full flex flex-col items-center justify-center gap-3 py-16 text-center bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <span className="material-symbols-outlined text-[40px] text-slate-300">
                search_off
              </span>
              <p className="text-base font-bold text-slate-900">
                No encontramos cursos que coincidan con tu búsqueda
              </p>
              <p className="text-sm text-slate-500">
                Probá con otro término o volvé a ver todo el catálogo.
              </p>
              <button
                id="resetSearchBtn"
                type="button"
                onClick={resetSearch}
                className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-4 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition-all"
              >
                Ver todos los cursos
              </button>
            </div>
          )}
        </section>

        <section className="w-full mb-space-xl" id="acreditacion-seccion">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
            <div className="lg:col-span-8 bg-white p-space-xl rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2 text-indigo-600 font-label-sm text-label-sm uppercase tracking-wider font-bold mb-space-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    workspace_premium
                  </span>
                  <span>Certificados Verificables en Blockchain</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-sm">
                  Titulaciones con respaldo institucional inmediato
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
                  Cada curso finalizado genera una credencial digital encriptada con código QR
                  único, validable ante empleadores y compatible con LinkedIn e insignias
                  OpenBadges.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md">
                  <div className="flex flex-col p-space-sm bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-title-md text-title-md text-indigo-600 font-bold">
                      100%
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Práctico con código
                    </span>
                  </div>
                  <div className="flex flex-col p-space-sm bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-title-md text-title-md text-secondary font-bold">
                      Sin Costo
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Fase beta abierta
                    </span>
                  </div>
                  <div className="flex flex-col p-space-sm bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                    <span className="font-title-md text-title-md text-tertiary font-bold">24/7</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Campus a tu ritmo
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block absolute right-0 bottom-0 w-72 h-72 translate-x-12 translate-y-12 rounded-full bg-indigo-100/50 pointer-events-none"></div>
            </div>
            <div className="lg:col-span-4 bg-slate-900 text-white p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-slate-300 font-semibold">
                      En tiempo real
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-indigo-300 font-mono">
                    SkillUp Stream
                  </span>
                </div>
                <p className="font-title-md text-title-md font-bold mb-space-md text-white">
                  Últimas inscripciones hoy
                </p>
                <div className="space-y-space-sm font-body-sm text-body-sm">
                  <div className="p-space-sm rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-emerald-400">
                        bolt
                      </span>
                      <span className="truncate text-white">Mateo V. se unió a React & Node</span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0">hace 3m</span>
                  </div>
                  <div className="p-space-sm rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-cyan-400">
                        smart_toy
                      </span>
                      <span className="truncate text-white">Sofía G. se unió a Intro a LLMs</span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0">hace 8m</span>
                  </div>
                  <div className="p-space-sm rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-indigo-400">
                        cloud_queue
                      </span>
                      <span className="truncate text-white">Javier P. se unió a AWS DevOps</span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0">hace 14m</span>
                  </div>
                </div>
              </div>
              <div className="mt-space-lg pt-space-md border-t border-white/10 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-slate-300">
                  ¿Listo para comenzar?
                </span>
                <Link
                  to="/register"
                  className="font-label-sm text-label-sm text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Crear cuenta</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative w-full rounded-3xl bg-indigo-600 text-white px-8 sm:px-12 shadow-xl overflow-hidden mb-12 flex items-center"
          style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', minHeight: '280px' }}
        >
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Comienza hoy tu próximo aprendizaje
              </h2>
              <p className="text-indigo-100 text-lg leading-relaxed max-w-xl">
                Únete a miles de estudiantes y desarrolla las habilidades que te acercarán a tus
                metas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-7 shrink-0">
              <Link
                to="/register"
                className="bg-white hover:bg-slate-50 text-indigo-600 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2.5"
              >
                <span>Registrarme ahora</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <div className="hidden md:flex items-center gap-3 text-indigo-200">
                <span className="font-handwriting text-4xl rotate-180">⤷</span>
                <span className="font-handwriting text-3xl text-white font-semibold leading-none">
                  Un mejor tú, empieza aquí
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
