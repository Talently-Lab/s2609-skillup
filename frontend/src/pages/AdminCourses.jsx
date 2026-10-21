import { useEffect, useRef, useState } from 'react';
import Topbar from '../components/layout/Topbar';

const CATEGORY_META = {
  Programación: {
    category: 'Programación',
    catLabel: 'Programación',
    catIcon: 'terminal',
    catIconClass: 'text-primary',
    catChipClass: 'bg-surface-container-high text-on-surface',
  },
  IA: {
    category: 'IA',
    catLabel: 'IA',
    catIcon: 'psychology',
    catIconClass: 'text-tertiary',
    catChipClass: 'bg-tertiary-fixed/40 text-on-tertiary-fixed font-medium',
  },
  Diseño: {
    category: 'Diseño',
    catLabel: 'Diseño',
    catIcon: 'palette',
    catIconClass: '',
    catChipClass: 'bg-primary-fixed text-primary font-medium',
  },
  DevOps: {
    category: 'DevOps',
    catLabel: 'DevOps',
    catIcon: 'cloud_done',
    catIconClass: 'text-primary',
    catChipClass: 'bg-surface-container-high text-on-surface',
  },
};

const INITIAL_COURSES = [
  {
    id: 'CRS-101',
    title: 'Full Stack React & Node',
    category: 'Programación',
    catLabel: 'Programación',
    catIcon: 'terminal',
    catIconClass: 'text-primary',
    catChipClass: 'bg-surface-container-high text-on-surface',
    level: 'Intermedio',
    weeks: 12,
    enrolled: 420,
    status: 'published',
    cover: 'https://assets.skillup.campus/covers/fullstack-react.webp',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMo8Fx8crLPCoxajMeIVJ1iTE0XEonBUMRHG80gDJcEQ8OUG6iMzsSXirqtG3vDq-Ow-2akznaXlPXBRBVkHiDJP3TljsUVq74JMeqKCnrb-71xVLTc70eXtZIp3_B1M6tlDaSmnmFucHmRDu8uLtAS9rq-_JYYHDapZvqiiPMo63LCqqIK1Cp3ItRL3Tw8981jY6tLOOzvup69tMWaPOMzSFYoF--tdFkc05kuKTBPQ7Cg5hPF0EW',
    desc: 'Construye aplicaciones web de escala productiva integrando React 19, TypeScript, Express y MongoDB con patrones avanzados de arquitectura.',
  },
  {
    id: 'CRS-102',
    title: 'IA & LLMs Práctico',
    category: 'IA',
    catLabel: 'IA',
    catIcon: 'psychology',
    catIconClass: 'text-tertiary',
    catChipClass: 'bg-tertiary-fixed/40 text-on-tertiary-fixed font-medium',
    level: 'Avanzado',
    weeks: 8,
    enrolled: 315,
    status: 'published',
    cover: 'https://assets.skillup.campus/covers/ai-llms.webp',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk-7-uEuBIDZ1CSfO6Lkcri2UW4956gdtRpvhsk4K8VW79QkcpWTuifqhOemWm-9jcZcHx_62aWsfnZNb8UAo19PR7QMVMlJ1nGGVEJIQpTmueImHcLiNGBxIP-uXafEUqf2stZ1leWp411Oeib6IZoPvbZKX4yskpxV5wFiTi67JWldewGBZwabPMUc2BNMuwT973ypxv82yQjRoY5C9mwo7LSxMtI1Vtdg99HsP89vyaMzx61jhY',
    desc: 'Entrenamiento, fine-tuning y orquestación de agentes autónomos con LangChain, Llama 3 y APIs vectoriales de alto rendimiento.',
  },
  {
    id: 'CRS-103',
    title: 'Arquitectura Cloud AWS',
    category: 'DevOps',
    catLabel: 'DevOps',
    catIcon: 'cloud_done',
    catIconClass: 'text-primary',
    catChipClass: 'bg-surface-container-high text-on-surface',
    level: 'Avanzado',
    weeks: 10,
    enrolled: 189,
    status: 'published',
    cover: 'https://assets.skillup.campus/covers/cloud-aws.webp',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0_EnN3X93Lb9dfwdqSjwtAhNpsAlWcIU6mirWsvZ0MVjObk_tMFt2KGhSTu5anmaP80Pr_PRWjZul-vihq3NqLLLMRnQDRvbA2ZriIjVyB8wj0Zqk3xQkKDJqA-GZBi32bMgy5sDI5wb6VT-IuA4eBU_V2mNyDQZD6gZhmKdaqvc1wy0cuLpCFy8htI63sOU9gfRzcvWDoLG7rGgnOEw6YP_GL5ocGPGe9OjVvSyreePc30h3r6t',
    desc: 'Diseño de infraestructuras elásticas, seguras y de alta disponibilidad con Terraform, ECS, Lambda y VPC peering corporativo.',
  },
  {
    id: 'CRS-104',
    title: 'UI/UX con Figma & Tailwind',
    category: 'Diseño',
    catLabel: 'Diseño',
    catIcon: 'palette',
    catIconClass: '',
    catChipClass: 'bg-primary-fixed text-primary font-medium',
    level: 'Principiante',
    weeks: 6,
    enrolled: 275,
    status: 'published',
    cover: 'https://assets.skillup.campus/covers/uiux-design.webp',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNLO6uBfBfpDZP3W4aZCpepHq-rLpuq-PeD0Mdq35UJZjI6uD3clIQ5qxJkQ1LTtsba2oYDgWl0ceUQlcRIGnhz0gLVpCA3ocbwqr4c14NuK_v3ozoMHF2owWyg_aYPN1Dv9l13dFQVjnGUI5wScKPXLaMTnOiXUal1kZ8S4vYfg1HepOUia6Bdu-cU1lwuItwlVSyNbui5Ohhcbf7pL1iQ-DN_7Cz2aU-Y4SqOYSrZWdP8kum1WXt',
    desc: 'Flujo completo de diseño centrado en el usuario, tokens de diseño y entrega de componentes con sistemas accesibles y modernos.',
  },
  {
    id: 'CRS-105',
    title: 'Ciberseguridad Defensiva',
    category: 'DevOps',
    catLabel: 'DevOps',
    catIcon: 'security',
    catIconClass: 'text-tertiary',
    catChipClass: 'bg-surface-container-high text-on-surface',
    level: 'Intermedio',
    weeks: 10,
    enrolled: 94,
    status: 'draft',
    cover: 'https://assets.skillup.campus/covers/cybersecurity.webp',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp4bZDaACmY48UQ6cbK8bTphT_O6nbL41u-btAZGOYxSlS8Y-X9JZxE0ZU7wfMiM59agUZnk7ILS30fRWLb5WKFuKjYtmF9e9iLdhvLmvF7Z5f5lnIanVlQNnE7Y9NIoSL-3ytvvDAsSG_Rnj3HXpr26gMYnxbFtvsYmbz60konwg0D2_zByf8VIiIUw5YYmmsrRNl_SST3lDxjaJ9UEZGANtQn6tEJvwJUHTt6blpOeHrCY-poqka',
    desc: 'Fundamentos de SOC, análisis de vulnerabilidades, respuesta a incidentes y mitigación de amenazas en entornos Linux empresariales.',
  },
];

const EMPTY_FORM = {
  title: '',
  category: 'Programación',
  level: 'Principiante',
  cover: 'https://assets.skillup.campus/covers/nuevo-programa.webp',
  desc: '',
  status: 'draft',
};

export default function AdminCourses() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [editingId, setEditingId] = useState('CRS-101');
  const [form, setForm] = useState({
    title: 'Full Stack React & Node',
    category: 'Programación',
    level: 'Intermedio',
    cover: 'https://assets.skillup.campus/covers/fullstack-react.webp',
    desc: INITIAL_COURSES[0].desc,
    status: 'published',
  });
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const titleInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const showToast = (message) => {
    setToast({ message });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3800);
  };

  const populateFormForEdit = (course, message) => {
    if (!course) return;
    setEditingId(course.id);
    setForm({
      title: course.title,
      category: course.category,
      level: course.level,
      cover: course.cover,
      desc: course.desc,
      status: course.status,
    });
    if (message) showToast(message);
    setTimeout(() => {
      titleInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0);
  };

  const resetFormForCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    const titleVal = form.title.trim();
    if (!titleVal) {
      titleInputRef.current?.focus();
      return;
    }
    const existing = courses.find((c) => c.id === editingId);
    if (existing) {
      const meta = CATEGORY_META[form.category] || CATEGORY_META.Programación;
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, ...meta, title: titleVal, level: form.level, cover: form.cover, desc: form.desc, status: form.status }
            : c,
        ),
      );
      showToast(`Curso "${titleVal}" actualizado correctamente.`);
    } else {
      const maxId = courses.reduce((max, c) => Math.max(max, Number(c.id.replace('CRS-', '')) || 0), 100);
      const newId = `CRS-${maxId + 1}`;
      const meta = CATEGORY_META[form.category] || CATEGORY_META.Programación;
      const newCourse = {
        ...meta,
        id: newId,
        title: titleVal,
        level: form.level,
        weeks: 8,
        enrolled: 0,
        status: form.status,
        cover: form.cover,
        thumb: form.cover,
        desc: form.desc,
      };
      setCourses((prev) => [newCourse, ...prev]);
      showToast(`¡Nuevo curso "${titleVal}" creado con éxito!`);
      resetFormForCreate();
    }
  };

  const handleCancelEditor = () => {
    const target = courses.find((c) => c.id === 'CRS-101') || courses[0];
    if (target) {
      populateFormForEdit(target, 'Edición cancelada. Valores restaurados.');
    } else {
      resetFormForCreate();
      showToast('Edición cancelada. Valores restaurados.');
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const courseTitle = deleteTarget.title || 'Curso';
    setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast(`"${courseTitle}" ha sido eliminado del campus.`);
    if (editingId === deleteTarget.id) resetFormForCreate();
  };

  const q = query.toLowerCase().trim();
  const visibleCourses = courses.filter((c) => {
    const matchesQuery =
      !q ||
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
  const publishedCount = courses.filter((c) => c.status === 'published').length;
  const draftCount = courses.filter((c) => c.status === 'draft').length;
  const archivedCount = courses.filter((c) => c.status === 'archived').length;
  const editingCourse = courses.find((c) => c.id === editingId);
  const isCreateMode = !editingCourse;

  return (
    <>
      <Topbar />
      <main className="w-full flex-1 max-w-7xl mx-auto px-gutter py-space-lg">
        <div className="flex flex-col w-full gap-space-lg">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-fixed text-primary text-label-sm font-label-sm font-bold">
                    ADM
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Centro de Control Académico
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Gestión de Cursos del Campus
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                  Administra el catálogo académico, crea nuevos programas y actualiza información en tiempo real.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md flex flex-wrap items-center gap-space-sm">
                <div className="relative flex-1 min-w-[220px]">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-space-md py-2 text-body-md font-body-md text-on-surface bg-surface-container-low rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline"
                    placeholder="Buscar por título, ID o tecnología..."
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="relative min-w-[160px]">
                  <select
                    className="w-full appearance-none pl-3 pr-8 py-2 text-body-md font-body-md text-on-surface bg-surface-container-low rounded-lg focus:outline-none focus:bg-surface-container-lowest transition-all cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="published">Publicados ({publishedCount})</option>
                    <option value="draft">Borradores ({draftCount})</option>
                    <option value="archived">Archivados ({archivedCount})</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                    expand_more
                  </span>
                </div>
                <button
                  className="inline-flex items-center gap-space-xs font-title-md text-title-md text-on-primary bg-primary-container hover:bg-primary px-space-md py-2 rounded-lg shadow-sm transition-all transform active:scale-95"
                  type="button"
                  onClick={resetFormForCreate}
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>+ Crear nuevo curso</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Capacidad Activa
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {courses.reduce((acc, c) => acc + c.enrolled, 0).toLocaleString('es-AR')} Alumnos
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">groups</span>
                </div>
              </div>
              <div className="my-space-xs bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Ocupación Promedio
                  </span>
                  <span className="font-title-md text-title-md text-secondary font-bold">86.4%</span>
                </div>
                <svg className="w-28 h-10 overflow-visible text-secondary" fill="none" viewBox="0 0 100 35">
                  <path
                    d="M0,28 Q15,18 30,22 T60,10 T85,15 T100,4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle className="fill-secondary" cx="100" cy="4" r="3.5" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-space-xs pt-space-xs text-center font-label-sm text-label-sm">
                <div className="bg-surface-container-low py-1.5 px-2 rounded-lg">
                  <span className="text-on-surface-variant">Cursos Activos:</span>
                  <span className="font-bold text-primary ml-1">{publishedCount}</span>
                </div>
                <div className="bg-surface-container-low py-1.5 px-2 rounded-lg">
                  <span className="text-on-surface-variant">En Revisión:</span>
                  <span className="font-bold text-tertiary ml-1">{draftCount}</span>
                </div>
              </div>
            </div>
          </section>
          <section className="relative grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
            <div className="xl:col-span-8 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="px-space-lg py-space-md bg-surface-container-lowest flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-title-md text-title-md text-on-surface">Catálogo Oficial de Cursos</span>
                    <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface font-semibold px-2 py-0.5 rounded-full">
                      {visibleCourses.length} registros
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">sync</span> Sincronizado con
                    base académica
                  </span>
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                        <th className="py-3 px-space-md">Curso</th>
                        <th className="py-3 px-space-md">Categoría</th>
                        <th className="py-3 px-space-md">Nivel</th>
                        <th className="py-3 px-space-md text-right">Inscritos</th>
                        <th className="py-3 px-space-md text-center">Estado</th>
                        <th className="py-3 px-space-md text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md text-on-surface divide-y-0">
                      {visibleCourses.map((course) => (
                        <tr
                          key={course.id}
                          className="course-row hover:bg-surface-container-low/70 transition-colors group"
                        >
                          <td className="py-space-md px-space-md">
                            <div className="flex items-center gap-space-sm">
                              <img
                                alt={course.title}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 shadow-sm"
                                src={course.thumb}
                              />
                              <div className="flex flex-col min-w-0">
                                <span className="font-title-md text-title-md text-on-surface font-semibold truncate group-hover:text-primary transition-colors course-title">
                                  {course.title}
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  ID: {course.id} • {course.weeks} Semanas
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-label-sm font-label-sm ${course.catChipClass}`}
                            >
                              <span className={`material-symbols-outlined text-[14px] ${course.catIconClass}`}>
                                {course.catIcon}
                              </span>{' '}
                              {course.catLabel}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                              {course.level}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md text-right whitespace-nowrap font-title-md text-title-md font-semibold text-on-surface">
                            {course.enrolled} <span className="text-body-sm font-normal text-on-surface-variant">est.</span>
                          </td>
                          <td className="py-space-md px-space-md text-center whitespace-nowrap">
                            {course.status === 'published' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-secondary-container/60 text-on-secondary-fixed font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Publicado
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface-variant font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-outline" /> Borrador
                              </span>
                            )}
                          </td>
                          <td className="py-space-md px-space-md text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1">
                              <button
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                                title="Ver detalles rápidos"
                                type="button"
                                onClick={() =>
                                  populateFormForEdit(
                                    course,
                                    `Inspeccionando métricas y configuración de "${course.title}".`,
                                  )
                                }
                              >
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                              </button>
                              <button
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                                title="Editar curso"
                                type="button"
                                onClick={() =>
                                  populateFormForEdit(course, `Cargados datos de "${course.title}" en el editor lateral.`)
                                }
                              >
                                <span className="material-symbols-outlined text-[20px]">edit_square</span>
                              </button>
                              <button
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors"
                                title="Eliminar curso"
                                type="button"
                                onClick={() => setDeleteTarget(course)}
                              >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-md bg-surface-container-low/50 flex flex-wrap items-center justify-between gap-space-sm">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Mostrando {visibleCourses.length > 0 ? 1 : 0} a {visibleCourses.length} de {courses.length} programas
                    académicos registrados
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1 rounded bg-surface-container-lowest text-outline hover:text-on-surface transition-colors"
                      disabled
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <span className="font-label-sm text-label-sm font-bold bg-primary text-on-primary w-6 h-6 rounded flex items-center justify-center">
                      1
                    </span>
                    <button
                      className="p-1 rounded bg-surface-container-lowest text-outline hover:text-on-surface transition-colors"
                      disabled
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
              {toast && (
                <div className="bg-secondary-container text-on-secondary-fixed p-space-md rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[22px] text-secondary">check_circle</span>
                    <span className="font-body-md text-body-md font-medium">{toast.message}</span>
                  </div>
                  <button
                    className="text-on-secondary-fixed hover:opacity-75"
                    type="button"
                    onClick={() => setToast(null)}
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              )}
            </div>
            <div className="xl:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-md sticky top-28 flex flex-col">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    {isCreateMode ? 'note_add' : 'edit_document'}
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      {isCreateMode ? 'Crear Nuevo Curso' : 'Editar Curso'}
                    </h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {isCreateMode ? 'Nuevo programa para el catálogo' : `Modificando ${editingCourse.id}`}
                    </span>
                  </div>
                </div>
                <button
                  className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-0.5"
                  title="Cambiar a modo creación"
                  type="button"
                  onClick={resetFormForCreate}
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> Nuevo
                </button>
              </div>
              <form className="flex flex-col gap-space-md" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="inputCourseTitle">
                    Título del Curso <span className="text-error">*</span>
                  </label>
                  <input
                    ref={titleInputRef}
                    className="px-space-md py-2 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline"
                    id="inputCourseTitle"
                    placeholder="Ej: Microservicios en Go & Kubernetes"
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-label-sm text-label-sm text-on-surface font-semibold"
                      htmlFor="selectCourseCategory"
                    >
                      Categoría
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none px-space-sm py-2 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest cursor-pointer"
                        id="selectCourseCategory"
                        value={form.category}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      >
                        <option value="Programación">Programación</option>
                        <option value="IA">IA & Modelos</option>
                        <option value="Diseño">Diseño UI/UX</option>
                        <option value="DevOps">DevOps & Cloud</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="selectCourseLevel">
                      Nivel
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none px-space-sm py-2 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest cursor-pointer"
                        id="selectCourseLevel"
                        value={form.level}
                        onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="inputCoverImage">
                    URL / Placeholder Portada
                  </label>
                  <div className="flex items-center gap-space-xs">
                    <input
                      className="w-full px-space-md py-2 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline"
                      id="inputCoverImage"
                      placeholder="https://..."
                      type="text"
                      value={form.cover}
                      onChange={(e) => setForm((f) => ({ ...f, cover: e.target.value }))}
                    />
                    <span
                      className="p-2 rounded-lg bg-surface-container-high text-primary flex-shrink-0"
                      title="Previsualización de imagen"
                    >
                      <span className="material-symbols-outlined text-[20px]">image</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="font-label-sm text-label-sm text-on-surface font-semibold"
                    htmlFor="inputCourseDescription"
                  >
                    Descripción breve del curso
                  </label>
                  <textarea
                    className="px-space-md py-2 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline resize-none"
                    id="inputCourseDescription"
                    placeholder="Describe el contenido, objetivos pedagógicos y competencias adquiridas..."
                    rows="3"
                    value={form.desc}
                    onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Estado de Publicación</span>
                  <div className="grid grid-cols-2 gap-space-xs">
                    <label className="cursor-pointer">
                      <input
                        className="peer sr-only"
                        name="courseStatusRadio"
                        type="radio"
                        value="published"
                        checked={form.status === 'published'}
                        onChange={() => setForm((f) => ({ ...f, status: 'published' }))}
                      />
                      <div className="p-2.5 rounded-lg bg-surface-container-low text-center peer-checked:bg-secondary-container/70 peer-checked:text-on-secondary-fixed transition-all flex items-center justify-center gap-1.5 font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Publicado</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        className="peer sr-only"
                        name="courseStatusRadio"
                        type="radio"
                        value="draft"
                        checked={form.status === 'draft'}
                        onChange={() => setForm((f) => ({ ...f, status: 'draft' }))}
                      />
                      <div className="p-2.5 rounded-lg bg-surface-container-low text-center peer-checked:bg-surface-container-high peer-checked:text-on-surface transition-all flex items-center justify-center gap-1.5 font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                        <span>Borrador</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm pt-space-sm mt-space-xs">
                  <button
                    className="flex-1 inline-flex items-center justify-center gap-1.5 font-title-md text-title-md text-on-primary bg-primary-container hover:bg-primary py-2.5 px-space-md rounded-lg shadow-sm transition-all transform active:scale-95"
                    type="button"
                    onClick={handleSave}
                  >
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    <span>{isCreateMode ? 'Publicar Curso' : 'Guardar Cambios'}</span>
                  </button>
                  <button
                    className="inline-flex items-center justify-center font-title-md text-title-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high py-2.5 px-space-md rounded-lg transition-colors"
                    type="button"
                    onClick={handleCancelEditor}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </section>
          {deleteTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
              <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-2xl flex flex-col gap-space-md animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">warning</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">¿Eliminar este curso?</h3>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Esta acción desvinculará a los alumnos asociados.
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface bg-surface-container-low p-space-sm rounded-lg font-semibold">
                  {deleteTarget.title}
                </p>
                <div className="flex items-center justify-end gap-space-sm">
                  <button
                    className="font-title-md text-title-md px-space-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    type="button"
                    onClick={() => setDeleteTarget(null)}
                  >
                    No, Mantener
                  </button>
                  <button
                    className="font-title-md text-title-md px-space-md py-2 rounded-lg bg-error text-on-error hover:opacity-90 shadow-sm transition-all"
                    type="button"
                    onClick={handleConfirmDelete}
                  >
                    Sí, Eliminar del Campus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
