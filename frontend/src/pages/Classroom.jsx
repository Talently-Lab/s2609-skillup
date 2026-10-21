import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PROFILE_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDbhFBQI_vYx-wfhN3Sc40fV5zdaIcFzETWcbPopmZxpTbn1y48oHO2Uc7HUyjDWl6bICs2KpP7XVoiMwcjNgiZjqq-m4-7pZZ4UdmrbMac_YB3eGrhoEASEXaBl7PkCQKXPb76pvcqI41UtPkHO23sBq86AQmhI4H0z1jAD5B8qHGXgXkyDZwQDs7gO1UDiLjivCpsZZ6hJUplJ3Bei6e1MN6C-nF8Do5MbYFBhR5nG6VXZ2l0g0hD';
const VIDEO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB1bIaHplPwPMJnN_mRRxxY33KFQ5BcQZf5zhHxkmjL_DkPyxoy5CB9Q4n1iA2WF209DBYw_72wgCwiPqAIS7N0nFS4h2TpvnayLCJKwS1GTC1Id6qXvZDRQl4CXMTqIToox8lJgzYVXvm4FRQUu0WpKCzIARmm8MYDz0OnH2_Po3KFzSLHWwDQJeVTA6FcqUozNd1wLIdoekSoPjlJPAPKtY3YmhBKPmep6aPyqzV76kB7cYhwHuQg';
const INSTRUCTOR_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBLwVo_qujlxkqnyrizkWCGnWbNAYQS3mWY_YKFwvKqqReNpkBmUIf5kNfICQddwUy0dpHZB9mjJ4H-FzGkbG2cTajBVRzMjWq4eTaHlafIxyEDxPngTq0-SyoRQ7PxFyzKpXkh6hllFzP6aOHqcb35RXF8RJdE3gzIJDkVi0eygn9UdYIB5X4kDP6Ba9hWZD6-3bOcPQS8T-SuCXfWI6sir1HDemOwfPRGagIosR_P_ScGOJgLbOAX';

const TABS = [
  { id: 'overview', icon: 'description', label: 'Descripción general' },
  { id: 'qa', icon: 'forum', label: 'Preguntas y Respuestas' },
  { id: 'notes', icon: 'sticky_note_2', label: 'Notas', nbsp: true },
  { id: 'files', icon: 'attach_file', label: 'Recursos', nbsp: true, badge: '3' },
  { id: 'announcements', icon: 'campaign', label: 'Avisos del Tutor' },
];

const MODULE_LESSONS = [
  { id: 10, title: '10. Conceptos y amenazas OWASP en APIs', right: '12 min', status: 'done' },
  { id: 11, title: '11. Hasheo seguro con Bcrypt & Salt', right: '18 min', status: 'done' },
  { id: 12, title: '12. Middleware de JWT y Cookies HttpOnly', right: '28 min', status: 'todo' },
  { id: 13, title: '13. Estrategia de Refresh Tokens silenciosa', right: '22 min', status: 'todo' },
  { id: 14, title: '14. Interceptores en React con Axios', right: '35 min', status: 'todo' },
  { id: 15, title: '15. Cuestionario de Evaluación Módulo 4', right: '10 preguntas', status: 'quiz' },
];

const SECTIONS = [
  {
    id: 1,
    tone: 'done',
    title: 'Sección 1: Entorno de Desarrollo',
    meta: '4 / 4 clases • 45 min',
    lessons: [],
  },
  {
    id: 2,
    tone: 'done',
    title: 'Sección 2: Fundamentos Express & API',
    meta: '5 / 5 clases • 1h 20 min',
    lessons: [],
  },
  {
    id: 3,
    tone: 'done',
    title: 'Sección 3: Modelado Postgres & Prisma',
    meta: '3 / 3 clases • 55 min',
    lessons: [],
  },
  {
    id: 4,
    tone: 'active',
    title: 'Sección 4: Autenticación & JWT',
    meta: '2 / 6 clases completadas • 2h 10 min',
    lessons: MODULE_LESSONS,
  },
  {
    id: 5,
    tone: 'locked',
    title: 'Sección 5: Despliegue en AWS & Docker',
    meta: '0 / 4 clases • Próximamente',
    lessons: [],
  },
];

export default function Classroom() {
  const { courseId } = useParams();
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSection, setOpenSection] = useState(4);
  const [activeLesson, setActiveLesson] = useState(12);
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const visibleSections = needle
    ? SECTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(needle) ||
          s.lessons.some((l) => l.title.toLowerCase().includes(needle)),
      )
    : SECTIONS;

  const renderLesson = (lesson) => {
    const isActive = lesson.id === activeLesson;
    const select = () => setActiveLesson(lesson.id);

    if (isActive) {
      return (
        <div
          key={lesson.id}
          className="p-2.5 rounded-lg flex items-center justify-between gap-2 bg-primary/10 text-primary cursor-pointer shadow-sm"
          onClick={select}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm leading-none animate-pulse">
                play_arrow
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md text-primary truncate text-sm">
                {lesson.title}
              </span>
              <span className="font-label-sm text-label-sm text-primary/80 font-medium">
                Reproduciendo ahora
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-mono font-bold shrink-0">
            {lesson.right}
          </span>
        </div>
      );
    }

    if (lesson.status === 'quiz') {
      return (
        <div
          key={lesson.id}
          className="p-2.5 rounded-lg flex items-center justify-between gap-2 hover:bg-surface-container-low transition-colors cursor-pointer group bg-surface-container-high/20"
          onClick={select}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-primary text-base shrink-0">
              quiz
            </span>
            <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
              {lesson.title}
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-semibold shrink-0">
            {lesson.right}
          </span>
        </div>
      );
    }

    const completed = lesson.status === 'done';
    return (
      <div
        key={lesson.id}
        className="p-2.5 rounded-lg flex items-center justify-between gap-2 hover:bg-surface-container-low transition-colors cursor-pointer group"
        onClick={select}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`material-symbols-outlined text-base shrink-0 ${completed ? 'text-secondary' : 'text-outline'}`}
            style={completed ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {completed ? 'check_circle' : 'radio_button_unchecked'}
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface truncate">
            {lesson.title}
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-outline shrink-0 font-mono">
          {lesson.right}
        </span>
      </div>
    );
  };

  const renderSection = (section) => {
    const open = openSection === section.id;
    const isSection4 = section.tone === 'active';

    if (section.tone === 'locked') {
      return (
        <div
          key={section.id}
          className="rounded-xl overflow-hidden bg-surface-container-low/40 opacity-75"
        >
          <div className="p-3.5 flex items-center justify-between cursor-not-allowed">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-outline text-lg">lock</span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-outline truncate text-sm">
                  {section.title}
                </span>
                <span className="font-label-sm text-label-sm text-outline">{section.meta}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-base">expand_more</span>
          </div>
        </div>
      );
    }

    if (isSection4) {
      const lessons = needle
        ? section.lessons.filter((l) => l.title.toLowerCase().includes(needle))
        : section.lessons;
      return (
        <div key={section.id} className="rounded-xl overflow-hidden bg-surface-container-low">
          <div
            className="p-3.5 bg-surface-container flex items-center justify-between cursor-pointer"
            onClick={() => setOpenSection(open ? null : section.id)}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-primary truncate text-sm">
                  {section.title}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {section.meta}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-base">
              {open ? 'expand_less' : 'expand_more'}
            </span>
          </div>
          {open && lessons.length > 0 && (
            <div className="p-2 space-y-1 bg-surface-container-lowest">
              {lessons.map(renderLesson)}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={section.id} className="rounded-xl overflow-hidden bg-surface-container-low/60">
        <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-surface-container-high/40 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="material-symbols-outlined text-secondary text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md text-on-surface truncate text-sm">
                {section.title}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {section.meta}
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-base">
            expand_more
          </span>
        </div>
      </div>
    );
  };

  return (
    <div key={courseId}>
      <header className="fixed top-0 left-0 w-full h-16 bg-surface/90 backdrop-blur-xl z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full h-16 px-space-md lg:px-margin flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md min-w-0">
            <Link
              aria-label="SkillUp Campus"
              className="h-8 w-8 rounded-lg bg-primary-container flex items-center justify-center text-white shrink-0 hover:scale-105 transition-transform"
              to="/"
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
            </Link>
            <Link
              className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors shrink-0"
              to="/dashboard"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span>Volver a Mis Cursos</span>
            </Link>
            <div className="h-4 w-px bg-surface-container-high hidden md:block shrink-0"></div>
            <div className="hidden md:flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider truncate">
                Campus Virtual
              </span>
              <span className="font-title-md text-title-md text-on-surface truncate">
                [CRS-101] Desarrollo Full Stack con React & Node.js
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <div className="hidden xl:flex items-center gap-space-md bg-surface-container-low px-space-md py-1.5 rounded-xl">
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Tu progreso
                </span>
                <span className="font-title-md text-title-md text-secondary">65% completado</span>
              </div>
              <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full w-[65%]"></div>
              </div>
            </div>
            <button
              className="p-2 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-colors flex items-center justify-center"
              title="Compartir curso"
              type="button"
            >
              <span className="material-symbols-outlined">share</span>
            </button>
            <button
              className="p-2 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-lg transition-colors flex items-center justify-center"
              title="Recursos y Descargas"
              type="button"
            >
              <span className="material-symbols-outlined">folder_open</span>
            </button>
            <div className="flex items-center gap-space-sm pl-space-xs">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                src={PROFILE_SRC}
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface">Elena Ramos</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Estudiante
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="relative pt-16 w-full min-h-screen bg-surface">
        <div className="flex flex-col w-full">
          <div className="bg-surface-container-lowest px-space-md lg:px-margin py-space-sm flex flex-wrap items-center justify-between gap-space-sm shadow-sm">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-primary-fixed text-on-primary-fixed-variant">
                Módulo 4: Seguridad & Backend
              </span>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <span className="text-on-surface-variant font-label-md text-label-md hidden sm:inline">
                Lección 12 de 22
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-base text-primary">
                  auto_awesome
                </span>
                <span>AI Tutor</span>
              </button>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-base">download_for_offline</span>
                <span className="hidden md:inline">Descargar Recursos</span>
              </button>
              <div className="relative group">
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/40 text-on-secondary-container font-label-md text-label-md hover:bg-secondary-container transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">emoji_events</span>
                  <span>14/22 completadas</span>
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1536px] mx-auto px-space-xs sm:px-space-md lg:px-margin py-space-md">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
              <section className="xl:col-span-8 flex flex-col gap-space-md">
                <div className="relative w-full rounded-2xl overflow-hidden bg-on-background shadow-xl flex flex-col group/player select-none">
                  <div className="relative w-full aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-screen"
                      data-alt="A dark-mode high-tech modern software development screen showing code editor syntax in JavaScript Express routes and JWT token payload architecture with soft purple and indigo ambient backlight."
                      style={{ backgroundImage: `url('${VIDEO_SRC}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none"></div>
                    <button
                      aria-label="Reproducir video"
                      className="relative z-10 w-20 h-20 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-2xl backdrop-blur-md transform transition-all duration-300 hover:scale-110 hover:bg-primary active:scale-95 group-hover/player:opacity-100"
                      type="button"
                      onClick={() => setPlaying((p) => !p)}
                    >
                      <span
                        className="material-symbols-outlined text-4xl leading-none ml-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {playing ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-on-primary text-label-sm font-label-sm">
                        <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                        <span className="tracking-wide uppercase font-semibold">1080p HD Ultra</span>
                      </div>
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-on-primary text-label-sm font-label-sm">
                        Capítulo 3: Verificación de JWT Tokens
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-20">
                      <div className="relative w-full py-1 cursor-pointer group/scrub">
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative backdrop-blur-sm">
                          <div className="absolute top-0 bottom-0 left-0 w-3/4 bg-white/30 rounded-full"></div>
                          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-primary-fixed to-primary-container rounded-full"></div>
                        </div>
                        <div className="absolute left-1/2 -top-0.5 w-3.5 h-3.5 bg-on-primary rounded-full shadow-md -translate-x-1/2 scale-0 group-hover/scrub:scale-100 transition-transform duration-150"></div>
                        <div className="absolute inset-x-0 top-1 flex justify-between pointer-events-none px-1">
                          <span className="w-0.5 h-1.5 bg-black/40"></span>
                          <span className="w-0.5 h-1.5 bg-black/40"></span>
                          <span className="w-0.5 h-1.5 bg-black/40"></span>
                          <span className="w-0.5 h-1.5 bg-black/40"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-on-primary pt-1">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            aria-label="Pausar o Reproducir"
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                            type="button"
                            onClick={() => setPlaying((p) => !p)}
                          >
                            <span
                              className="material-symbols-outlined text-2xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {playing ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                          <button
                            aria-label="Retroceder 10 segundos"
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-xl">replay_10</span>
                          </button>
                          <button
                            aria-label="Avanzar 10 segundos"
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-xl">forward_10</span>
                          </button>
                          <div className="flex items-center gap-1.5 ml-1 group/vol">
                            <button
                              aria-label="Silenciar"
                              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-xl">volume_up</span>
                            </button>
                            <div className="w-16 h-1 bg-white/30 rounded-full hidden sm:block relative cursor-pointer">
                              <div className="w-3/4 h-full bg-on-primary rounded-full"></div>
                            </div>
                          </div>
                          <span className="font-label-sm text-label-sm text-white/90 ml-2 font-mono">
                            14:28 / 28:50
                          </span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            className="px-2 py-1 rounded font-label-sm text-label-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors"
                            type="button"
                          >
                            1.25x
                          </button>
                          <button
                            className="p-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors"
                            title="Subtítulos en español"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-xl">subtitles</span>
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                            title="Ajustes de calidad"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-xl">settings</span>
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors hidden sm:block"
                            title="Pantalla en pantalla"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-xl">
                              picture_in_picture_alt
                            </span>
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                            title="Pantalla completa"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-xl">fullscreen</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-md lg:p-space-lg rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="space-y-1">
                    <span className="text-primary font-label-sm text-label-sm tracking-wide uppercase font-semibold">
                      Lección en curso
                    </span>
                    <h1 className="font-headline-md text-headline-md text-on-surface">
                      4.3 Implementación de JWT y middleware de autenticación en Express & React
                    </h1>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-secondary">
                        verified
                      </span>
                      <span>Actualizado recientemente para Node 20+ y Express 5</span>
                      <span>•</span>
                      <span>28 minutos de duración</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-space-sm shrink-0">
                    <button
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-on-secondary font-title-md text-title-md hover:bg-secondary/90 transition-all shadow-md active:scale-95"
                      type="button"
                    >
                      <span>Completar y continuar</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-surface-container-low px-space-md pt-space-xs flex items-center gap-space-sm overflow-x-auto border-none no-scrollbar">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        className={
                          activeTab === tab.id
                            ? 'flex items-center gap-2 px-4 py-3 font-title-md text-title-md text-primary bg-surface-container-lowest rounded-t-xl transition-all shadow-sm'
                            : 'flex items-center gap-2 px-4 py-3 font-label-md text-label-md text-on-surface-variant hover:text-on-surface rounded-t-xl hover:bg-surface-container transition-all'
                        }
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                        <span className="hidden sm:inline">
                          {tab.label}
                          {tab.nbsp && '\u00A0'}
                        </span>
                        {tab.badge && (
                          <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-primary-fixed text-on-primary-fixed-variant">
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-space-md lg:p-space-lg flex flex-col gap-space-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                      <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary text-2xl">key</span>
                        <h2 className="font-title-md text-title-md text-on-surface mt-1">
                          Arquitectura Stateless
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Sin necesidad de guardar sesiones en memoria de servidor redis para
                          peticiones REST.
                        </p>
                      </div>
                      <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                        <h2 className="font-title-md text-title-md text-on-surface mt-1">
                          Cookies HttpOnly
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Prevención rigurosa contra vulnerabilidades XSS blindando los tokens del
                          cliente.
                        </p>
                      </div>
                      <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                        <span className="material-symbols-outlined text-secondary text-2xl">
                          sync
                        </span>
                        <h2 className="font-title-md text-title-md text-on-surface mt-1">
                          Refresh Handshake
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Rotación automatizada de llaves criptográficas mediante Axios
                          Interceptors.
                        </p>
                      </div>
                    </div>
                    <div className="p-space-md rounded-2xl bg-surface-container-high/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                      <div className="flex items-center gap-space-md">
                        <img
                          className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-primary/20 shrink-0"
                          data-alt="Close-up professional portrait of a senior male software engineer with glasses smiling in a modern tech office setting with soft background lighting."
                          src={INSTRUCTOR_SRC}
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h3 className="font-title-md text-title-md text-on-surface">
                              Álvaro Chirou & Walter Coto
                            </h3>
                            <span
                              className="material-symbols-outlined text-primary text-base"
                              title="Instructor Certificado"
                            >
                              verified
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Senior Full Stack Architect & CyberSec Educator
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-label-sm text-label-sm font-semibold text-secondary flex items-center gap-0.5">
                              ★ 4.9{' '}
                              <span className="text-on-surface-variant font-normal">
                                (1,842 reseñas de estudiantes)
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors shadow-sm self-end sm:self-center"
                        type="button"
                      >
                        Mensaje al tutor
                      </button>
                    </div>
                    <div className="space-y-space-sm text-on-surface-variant font-body-md text-body-md">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Objetivo formativo del capítulo
                      </h2>
                      <p>
                        En esta clase construimos paso a paso un sistema de autenticación de nivel
                        bancario. Revisamos cómo firmar tokens criptográficos con claves simétricas
                        usando la librería{' '}
                        <code className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-mono text-xs">
                          jsonwebtoken
                        </code>{' '}
                        en Express, y cómo proteger rutas críticas mediante un middleware
                        reutilizable.
                      </p>
                      <p>
                        Al finalizar esta lección, serás capaz de desacoplar por completo la
                        autenticación entre tu backend API REST y tu Single Page Application en
                        React con Tailwind CSS.
                      </p>
                    </div>
                    <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-md">
                      <div className="px-4 py-2.5 bg-black/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-error/80"></span>
                          <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim/80"></span>
                          <span className="w-3 h-3 rounded-full bg-secondary/80"></span>
                          <span className="font-mono text-xs text-white/70 ml-2">
                            middleware/authJwt.js
                          </span>
                        </div>
                        <button
                          className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                          <span>Copiar código</span>
                        </button>
                      </div>
                      <pre className="p-4 font-mono text-xs md:text-sm overflow-x-auto text-emerald-300 leading-relaxed"><code><span className="text-indigo-300">import</span> jwt <span className="text-indigo-300">from</span>{' '}<span className="text-amber-200">'jsonwebtoken'</span>;{'\n\n'}<span className="text-indigo-300">export const</span> <span className="text-sky-300">verifyAuthToken</span> = (req, res, next) ={'>'}{' '}{'{'}{'\n'}{'  '}<span className="text-zinc-400">// 1. Extraer cookie segura HttpOnly o header Bearer</span>{'\n'}{'  '}<span className="text-indigo-300">const</span> token = req.cookies.session_token || req.headers[<span className="text-amber-200">'authorization'</span>]?.split(<span className="text-amber-200">' '</span>)[1];{'\n\n'}{'  '}<span className="text-indigo-300">if</span> (!token) {'{'}{'\n'}{'    '}<span className="text-indigo-300">return</span> res.status(401).json({'{'} error: <span className="text-amber-200">'Acceso restringido: Token no detectado'</span>{' }'});{'\n'}{'  '}{'}'}{'\n\n'}  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) ={'>'}{' '}{'{'}{'\n'}{'    '}<span className="text-indigo-300">if</span> (err) <span className="text-indigo-300">return</span> res.status(403).json({'{'} error: <span className="text-amber-200">'Token vencido o firma inválida'</span>{' }'});{'\n'}    req.user = decodedUser;{'\n'}    next();{'\n'}{'  '}{'}'});{'\n'}{'}'};</code></pre>
                    </div>
                    <div className="space-y-space-sm pt-space-xs">
                      <h3 className="font-title-md text-title-md text-on-surface">
                        Material complementario descargable
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                        <div className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between gap-3 hover:bg-surface-container-high transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined">folder_zip</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                                auth-middleware-jwt.zip
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                1.4 MB • Código fuente
                              </span>
                            </div>
                          </div>
                          <button
                            className="p-2 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">download</span>
                          </button>
                        </div>
                        <div className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between gap-3 hover:bg-surface-container-high transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-error/10 text-error flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined">picture_as_pdf</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                                Guia_Seguridad_Web_2025.pdf
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                3.8 MB • Cheatsheet
                              </span>
                            </div>
                          </div>
                          <button
                            className="p-2 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <aside className="xl:col-span-4 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-space-md bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        format_list_bulleted
                      </span>
                      <h2 className="font-title-md text-title-md text-on-surface">
                        Contenido del curso
                      </h2>
                    </div>
                    <button
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                      title="Ocultar temario"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                  <div className="p-space-md bg-surface-container-lowest">
                    <div className="relative w-full">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg pointer-events-none">
                        search
                      </span>
                      <input
                        className="w-full bg-surface-container-low rounded-xl pl-9 pr-4 py-2 font-label-md text-label-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Buscar en el temario..."
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 p-space-xs">
                    {visibleSections.map(renderSection)}
                  </div>
                </div>
                <div className="p-space-md m-space-xs rounded-xl bg-gradient-to-br from-primary-fixed/40 via-surface-container-high to-surface-container-lowest">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="material-symbols-outlined text-primary text-lg animate-spin"
                      style={{ animationDuration: '4s' }}
                    >
                      arrow_back_ios_new
                    </span>
                    <span className="font-title-md text-title-md text-on-surface font-semibold text-xs uppercase tracking-wide">
                      SkillUp Assistant
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                    ¿Dudas con la expiración del token? Pídele al asistente que te explique el
                    algoritmo{' '}
                    <code className="font-mono text-primary text-xs">HS256</code> en lenguaje
                    simple.
                  </p>
                  <button
                    className="w-full py-2 px-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Hacer pregunta ahora</span>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
