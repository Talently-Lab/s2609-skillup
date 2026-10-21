import { useState } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/layout/Topbar';

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'tecnicos', label: 'Técnicos' },
  { id: 'diseno', label: 'Diseño' },
];

const COURSES = [
  { id: 1, cat: 'tecnicos' },
  { id: 2, cat: 'diseno' },
  { id: 3, cat: 'tecnicos' },
];

export default function Dashboard() {
  const [filter, setFilter] = useState('todos');

  const visibleCourses = COURSES.filter((c) => filter === 'todos' || c.cat === filter);

  return (
    <>
      <Topbar />
      <main className="w-full flex-1 max-w-7xl mx-auto px-gutter py-space-lg">
        <div className="flex flex-col w-full gap-space-xl">
          <section className="relative w-full rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden p-space-lg lg:p-space-xl">
            <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary-fixed via-secondary-fixed/40 to-transparent blur-3xl pointer-events-none opacity-60"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <div className="inline-flex items-center gap-2 self-start bg-secondary-container/60 text-on-secondary-fixed-variant px-3 py-1 rounded-full font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>Semana Académica 08 • Ritmo Constante</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  ¡Hola de nuevo, Elena! 🎓
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Tienes 3 cursos en progreso activo. Continúa donde lo dejaste y alcanza tu meta
                  semanal de 5 horas de dedicación.
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start lg:self-center">
                <Link
                  className="inline-flex items-center gap-space-xs px-space-md py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-md text-title-md transition-all duration-200 hover:scale-[1.02] shadow-sm"
                  to="/catalog"
                >
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  <span>Explorar más cursos</span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-space-xl pt-space-lg border-t border-transparent bg-surface-container-low/60 rounded-xl p-space-md">
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[26px]">school</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                    3 Cursos
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Inscritos actualmente
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[26px]">schedule</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                    16 Horas
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Acumuladas este mes
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[26px]">verified</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                    2 Certificados
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Listos para examen final
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
            <div className="xl:col-span-8 flex flex-col gap-space-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Cursos Activos
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm">
                    {visibleCourses.length} en curso
                  </span>
                </div>
                <div className="flex items-center gap-space-xs bg-surface-container-low px-2 py-1 rounded-lg">
                  {FILTERS.map((f) => (
                    <button
                      key={f.id}
                      className={
                        filter === f.id
                          ? 'px-2.5 py-1 text-primary bg-surface-container-lowest rounded shadow-sm font-label-sm text-label-sm'
                          : 'px-2.5 py-1 text-on-surface-variant hover:text-on-surface rounded font-label-sm text-label-sm transition-colors'
                      }
                      type="button"
                      onClick={() => setFilter(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              {visibleCourses.some((c) => c.id === 1) && (
                <article className="group bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-space-lg flex flex-col md:flex-row gap-space-lg relative overflow-hidden">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Setup de desarrollo web moderno con dos monitores mostrando componentes React con código de colores, luz ambiental índigo, cuaderno con arquitectura de código, entorno educativo minimalista."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFdxn5MVuJrvfGrFOzPPLsF6GPu9Z_qpgKi03SwBOvn1uBIoYVUO13-jAUf5mwwrUif5t99WtrwBx_FeLOWUgxMZ3JS4yamnNO6wRyxEfxtrWP7kp_Xw3xk1-d8oBn1dcQ3D0FwWJjaXDZdlmujRN7MSSbspIy8l50e9t-gzv3PxdC_k-AqlIUK-Ed_xl1Ir2B1L0BAsOlA4US7YtfyRvrHBzQZWg8YR1FFCSkxoCpPP9d-cDcSZIm"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-primary-container text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      En curso
                    </span>
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-space-sm mb-1">
                        <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                          Desarrollo Web • Semestre V
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">history</span>
                          Ayer a las 18:30
                        </span>
                      </div>
                      <h2 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Desarrollo Full Stack con React & Node.js
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-1">
                        Módulo 4 de 7: Autenticación segura y Tokens de sesión (JWT)
                      </p>
                    </div>
                    <div className="my-space-md">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Progreso del programa
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-primary">
                          65% completado
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full bg-primary-container rounded-full transition-all duration-700"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-space-md pt-space-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px] text-on-surface font-bold">
                          12
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          lecciones restantes
                        </span>
                      </div>
                      <Link
                        className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary font-title-md text-label-md rounded-lg shadow-sm transition-transform active:scale-95"
                        to="/classroom/crs-101"
                      >
                        <span>Continuar curso</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}
              {visibleCourses.some((c) => c.id === 2) && (
                <article className="group bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-space-lg flex flex-col md:flex-row gap-space-lg relative overflow-hidden">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Diseño de interfaz UI/UX pulido en monitor de alta resolución con bibliotecas de componentes de Figma, tableros de escala tipográfica y wireframes modernos, luz cálida sobre escritorio de madera."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9puyuKZFjdUCZoq8Y-99LsIgENVr0z6JYiZ--q1RN313GafZE0T7zfUS55kJ_2Q4NzMa29dm2sABvR7FEPCDOgjTBnt5YJhOUPmCHB7NrLTIU-5XbG6At7r4G15HYnYKpXsVmx6kwRcdv2w-nRI21Iwb3poteaQN3fYMN1rOfPhv0kLs_tKjsKB0LcSCQ5htpuQZ1aQwOZXMBuz7HVbuD4JpKaNl0UjakYEuOoGfRoHB9mkmOnuBa"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-secondary text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">flag</span>
                      Casi terminado
                    </span>
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-space-sm mb-1">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                          Diseño Digital • Certificación
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">history</span>
                          Hace 3 días
                        </span>
                      </div>
                      <h2 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Diseño de Interfaces de Usuario con Figma y Tailwind
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-1">
                        Módulo final: Sistema de Tokens semánticos y entrega de prototipo
                      </p>
                    </div>
                    <div className="my-space-md">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Progreso del programa
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-secondary">
                          90% completado
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all duration-700"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-space-md pt-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                          workspace_premium
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary font-medium">
                          Proyecto final pendiente
                        </span>
                      </div>
                      <Link
                        className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary font-title-md text-label-md rounded-lg shadow-sm transition-transform active:scale-95"
                        to="/classroom/crs-101"
                      >
                        <span>Continuar curso</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}
              {visibleCourses.some((c) => c.id === 3) && (
                <article className="group bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-space-lg flex flex-col md:flex-row gap-space-lg relative overflow-hidden">
                  <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Visualización futurista de red neuronal digital con nodos de datos teal y cian interconectados, estética de laboratorio de inteligencia artificial de alta tecnología, enfoque nítido."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWm387diV9znqe4iph2fLuYf9t-imhsgULaTiaRnNlut_eGT4AXLYRfwIj6GxdFLTqlJzqoNm5LnUq5dkauagt1xKszroblcGTjkKyfEEeqgQAsLUfVuG4TPcMceAMxzQR89Hie4lbIgVS8KNTXmK1EhSTatVOzIKD-Zq0GaKmDckRezIETxdHD7oeFBtAcqVjmg_mggnte7fjIXi6C-Fu4o5vkkKQsl0-9DdfpKk3UhDoIjbldKbZ"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-tertiary-container text-on-tertiary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">fiber_new</span>
                      Nuevo
                    </span>
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-space-sm mb-1">
                        <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
                          Ciencia de Datos • Especialización
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">event</span>
                          Inscrito hoy
                        </span>
                      </div>
                      <h2 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                        Introducción Práctica a la Inteligencia Artificial y LLMs
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-1">
                        Módulo 1: Fundamentos de IA, prompts contextuales y arquitecturas
                      </p>
                    </div>
                    <div className="my-space-md">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Progreso del programa
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-tertiary">
                          15% completado
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full bg-tertiary rounded-full transition-all duration-700"
                          style={{ width: '15%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-space-md pt-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-tertiary">
                          play_circle
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Siguiente: Clase interactiva 2
                        </span>
                      </div>
                      <Link
                        className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary font-title-md text-label-md rounded-lg shadow-sm transition-transform active:scale-95"
                        to="/classroom/crs-101"
                      >
                        <span>Comenzar clase</span>
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )}
            </div>
            <div className="xl:col-span-4 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-surface-container text-primary">
                      <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface">
                        Próximas Entregas
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Calendario académico activo
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm font-semibold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded-full">
                    Al día
                  </span>
                </div>
                <div className="flex flex-col gap-space-sm">
                  <div className="p-3 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center bg-surface-container-lowest text-primary rounded-lg p-2 min-w-[44px] shadow-sm">
                      <span className="font-label-sm text-label-sm uppercase font-bold">OCT</span>
                      <span className="font-title-md text-title-md font-bold leading-none">28</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                        Entrega Proyecto Figma
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Diseño UI • Prototipo navegable
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-medium mt-1">
                        Vence en 2 días (23:59 hrs)
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center bg-surface-container-lowest text-primary rounded-lg p-2 min-w-[44px] shadow-sm">
                      <span className="font-label-sm text-label-sm uppercase font-bold">NOV</span>
                      <span className="font-title-md text-title-md font-bold leading-none">04</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                        Evaluación Módulo JWT
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Full Stack React & Node
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                        Cuestionario técnico (20 mins)
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low transition-colors flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center bg-surface-container-lowest text-tertiary rounded-lg p-2 min-w-[44px] shadow-sm">
                      <span className="font-label-sm text-label-sm uppercase font-bold">NOV</span>
                      <span className="font-title-md text-title-md font-bold leading-none">12</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                        Taller de Prompt Engineering
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Intro a la IA y LLMs
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                        Sesión síncrona grabada
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full text-center py-2 text-primary font-label-md text-label-md hover:bg-surface-container-low rounded-lg transition-colors"
                  type="button"
                >
                  Ver todas las fechas académicas
                </button>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface">
                    Horas de Estudio
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Últimos 7 días
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tu ritmo es un 24% mayor que el promedio del curso.
                </p>
                <div className="pt-2">
                  <svg
                    className="w-full h-20 text-primary-container"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 280 80"
                  >
                    <rect className="fill-surface-container-high" height="35" rx="4" width="22" x="10" y="45"></rect>
                    <rect className="fill-surface-container-high" height="50" rx="4" width="22" x="50" y="30"></rect>
                    <rect className="fill-primary-container" height="65" rx="4" width="22" x="90" y="15"></rect>
                    <rect className="fill-surface-container-high" height="30" rx="4" width="22" x="130" y="50"></rect>
                    <rect className="fill-primary-container" height="60" rx="4" width="22" x="170" y="20"></rect>
                    <rect className="fill-primary" height="70" rx="4" width="22" x="210" y="10"></rect>
                    <rect className="fill-secondary-container" height="40" rx="4" width="22" x="250" y="40"></rect>
                  </svg>
                  <div className="flex justify-between text-center pt-2 font-label-sm text-[10px] text-on-surface-variant">
                    <span>L</span>
                    <span>M</span>
                    <span>M</span>
                    <span>J</span>
                    <span>V</span>
                    <span className="font-bold text-primary">S</span>
                    <span>D</span>
                  </div>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-space-lg shadow-sm overflow-hidden flex flex-col gap-space-md">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[24px] text-white">
                      support_agent
                    </span>
                  </div>
                  <span className="bg-white/20 text-white font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-medium">
                    Soporte Activo
                  </span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md font-bold text-white">
                    ¿Tienes dudas o feedback?
                  </h4>
                  <p className="font-body-sm text-body-sm text-white/80 mt-1">
                    Tu tutora académica y el equipo técnico de SkillUp Campus están disponibles para
                    resolver incidencias de plataforma y contenido.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-space-xs pt-1">
                  <Link
                    className="w-full text-center px-4 py-2.5 rounded-lg bg-white text-primary font-title-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm"
                    to="/#acreditacion-seccion"
                  >
                    Contactar Tutoría
                  </Link>
                  <button
                    className="w-full text-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-title-md text-label-md transition-colors"
                    type="button"
                  >
                    Enviar Sugerencia
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
