import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_OPTIONS = [
  { value: 'web', label: 'Desarrollo Web', count: 12 },
  { value: 'ia', label: 'Inteligencia Artificial', count: 8 },
  { value: 'cloud', label: 'Cloud Computing', count: 6 },
  { value: 'design', label: 'Diseño UI/UX', count: 5 },
  { value: 'security', label: 'Ciberseguridad', count: 4 },
  { value: 'data', label: 'Ciencia de Datos', count: 3 },
];

const LEVEL_OPTIONS = [
  { value: 'all', label: 'Todos los niveles', dot: null },
  { value: 'principiante', label: 'Principiante', dot: 'bg-emerald-500' },
  { value: 'intermedio', label: 'Intermedio', dot: 'bg-indigo-500' },
  { value: 'avanzado', label: 'Avanzado', dot: 'bg-purple-500' },
];

const LEVEL_META = {
  principiante: { label: 'Principiante', textClass: 'text-emerald-600', dotClass: 'bg-emerald-500' },
  intermedio: { label: 'Intermedio', textClass: 'text-primary', dotClass: 'bg-primary' },
  avanzado: { label: 'Avanzado', textClass: 'text-purple-600', dotClass: 'bg-purple-500' },
};

const QUICK_TAGS = [
  { label: '🔥 React & Node', query: 'React & Node' },
  { label: '🤖 Inteligencia Artificial', query: 'Inteligencia Artificial' },
  { label: '☁️ Cloud AWS', query: 'Cloud AWS' },
  { label: '🎨 UI/UX Design', query: 'UI/UX Design' },
  { label: '🔒 Ciberseguridad', query: 'Ciberseguridad' },
  { label: '📊 Python & Datos', query: 'Python & Datos' },
  { label: '⚡ DevOps CI/CD', query: 'DevOps CI/CD' },
];

const SORT_TABS = [
  { value: 'popular', label: 'Más populares', icon: 'local_fire_department', iconClass: 'text-[16px] text-amber-500', filled: true },
  { value: 'rated', label: 'Más valorados', icon: 'star', iconClass: 'text-[16px] text-amber-400', filled: true },
  { value: 'recent', label: 'Más recientes', icon: 'schedule', iconClass: 'text-[16px]', filled: false },
];

const COURSES = [
  {
    id: 'crs-101',
    category: 'web',
    level: 'intermedio',
    date: '2025-01-10',
    keywords: 'react node fullstack javascript express postgresql frontend backend',
    popularity: 98,
    rating: 4.9,
    reviews: '2,140',
    hours: 40,
    title: 'Desarrollo Full Stack con React & Node.js',
    description:
      'Domina arquitectura cliente-servidor moderna, APIs RESTful, bases de datos y despliegue continuo en la nube.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALwD1Yl54xB7JOBIG6sFiz3y0U4lWC_NvZpq9uqo2DYiL7ANQYvK7SrXBBMBAmcAEbxooRmJJeRZAkzudelFCS1BAWqpn7WW0Al-Aho8q6UI3gzjiR2XqFGqJ9h54i0GshjW5AEJslkdWZGiBijmF_NhP_YONkYwbfVXUhF_O_OnKBu-v2wfJk9r2mxyaQ8umyOjUjOAH0z2VMgOMMhWK7nQEVJ7Gj8rE-Ex0D0lt1LojJAyRRU6y5',
    imageAlt:
      'Modern clean software development workspace with multiple monitors displaying React code snippets, glowing syntax highlights, purple and blue ambient lighting, minimalist desk setup, ultra-sharp rendering.',
    badge: { text: 'Top Ventas', icon: 'local_fire_department', filled: true, className: 'bg-primary text-on-primary' },
    tag: 'Web',
    mentor: { name: 'Ing. Carlos Mendoza', initials: 'CM', className: 'bg-primary-fixed text-primary' },
    pro: true,
    price: { old: '$89.99 USD', current: '$29.99' },
  },
  {
    id: 'crs-102',
    category: 'ia',
    level: 'principiante',
    date: '2025-02-01',
    keywords: 'inteligencia artificial llm gpt machine learning prompts python beginners',
    popularity: 95,
    rating: 4.8,
    reviews: '1,890',
    hours: 28,
    title: 'Introducción Práctica a la Inteligencia Artificial y LLMs',
    description:
      'Comprende modelos de lenguaje, transformers, ajuste fino y crea aplicaciones asistidas por inteligencia artificial generativa.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY7--7tJd0n1Rv37ci8z4hKIM4hFB2rMTVhW3PIhqu3VxxIWqNDZ3yPjrxnV8elzw6dW4qZiMBO-3qGN37DjCzQ1AIOVFsoFYj9Uw9kEUDe_9odg4iCplBeUE1uj3PCX3scrZ0WZAbEKjzCxkIyaTmv8wzX_hhEiHuA17SGDHXIgphatAY4ejt7htBxCgwI0GivzyodVcMsEq_MUjtMPdgmsecs-UQHz0SGjNW-wQ4n3xMCKHbcWPq',
    imageAlt:
      'Futuristic artificial intelligence visualization with luminous neural network nodes, deep blue and electric cyan luminescence, 3D abstract geometric intelligence core, ultra high detail educational visual.',
    badge: { text: 'Tendencia', icon: 'trending_up', filled: false, className: 'bg-secondary-container text-on-secondary-container' },
    tag: 'IA',
    mentor: { name: 'Dra. Valeria Soler', initials: 'VS', className: 'bg-surface-variant text-primary' },
    pro: true,
    price: { old: '$79.99 USD', current: '$24.99' },
  },
  {
    id: 'crs-103',
    category: 'cloud',
    level: 'avanzado',
    date: '2025-01-20',
    keywords: 'cloud aws devops kubernetes docker terraform s3 ec2 lambda',
    popularity: 92,
    rating: 5.0,
    reviews: '940',
    hours: 45,
    title: 'Arquitectura Cloud y DevOps en AWS',
    description:
      'Diseño de infraestructuras de alta disponibilidad, orquestación, CI/CD automatizado y preparación para certificación AWS Solutions Architect.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUnnuauhr7_KWY9EPJl1HJy5wcB44gHpKrPZCA3I6JO3gSv5xv8TQDeMngLzf2WX4mGRqK5rmBq-VsC_IVzXEGrvhqC0Fr0Au7fwoPhIrmOb0XcBujAf5wg_R-Hhf_FUwZ8KvVaxXDjrXNa3mzWtnUIVAriIpHK9O252o6Ohtu3ltvdO89_gRrRaBQCxkH9IttDqgbeNV4R8nO_0Ml7yzC7vJA60n3YiWm9PRQ84BfHHM9nokqDVnG',
    imageAlt:
      'Cloud data infrastructure and cloud architecture diagram on high tech holographic display, servers, fiber optic lights, deep indigo atmosphere, professional cloud computing concept.',
    badge: { text: 'Más valorado', icon: 'star', filled: true, className: 'bg-amber-500 text-white' },
    tag: 'Cloud',
    mentor: { name: 'Marcos Villanueva', initials: 'MV', className: 'bg-tertiary-fixed text-tertiary' },
    pro: false,
    price: null,
  },
  {
    id: 'crs-104',
    category: 'design',
    level: 'intermedio',
    date: '2025-01-25',
    keywords: 'diseño ui ux figma tailwind css prototipado wireframes interfaces',
    popularity: 89,
    rating: 4.9,
    reviews: '1,410',
    hours: 32,
    title: 'Diseño de Interfaces de Usuario con Figma y Tailwind',
    description:
      'Construye design systems escalables, tokens semánticos, prototipos dinámicos y traduce tus vistas a código con Tailwind CSS.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZj25ta2w98VgtTQr52FLzXyfTDdbJ4K8pf-xCaz3k90ydSSvDrFGm3gCToVRAwQrDUoegyucxduiHaqy6mbHuqec1U4PM1fPzGynfqmWhPVdI7OCYVY3DMSgKt6dKmrUFJ4ReMwNM_uUyH0stJBtuYlpFEkJSQvZexBzDFmYAhegmr2EVqRAA_fT7AUYg9d3NAfapovNzo6XPXMtpFnBn-GSwP6f_OALthq7XuEnsDo6qELjzqrrF',
    imageAlt:
      'Vibrant modern digital design studio scene with Figma interface components, mobile app wireframes, isometric design system tokens, neat aesthetic pastel color palette.',
    badge: { text: 'Práctico', icon: 'brush', filled: false, className: 'bg-surface-container-high text-primary' },
    tag: 'Diseño',
    mentor: { name: 'Lucía Cordero', initials: 'LC', className: 'bg-secondary-fixed text-on-secondary-fixed' },
    pro: false,
    price: null,
  },
  {
    id: 'crs-105',
    category: 'security',
    level: 'intermedio',
    date: '2025-01-18',
    keywords: 'ciberseguridad hacking etico soc forense red blue team defensiva',
    popularity: 86,
    rating: 4.7,
    reviews: '870',
    hours: 36,
    title: 'Ciberseguridad Defensiva y Análisis Forense',
    description:
      'Aprende detección de incidentes en entornos SOC, prevención de intrusiones, protocolos criptográficos y análisis de malware.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_lgwiRRe9Fn6P5iCRgj0zvH1Rp1Vo4lGvVw9ifJwbVzA_I5HLwmSvDuSAqnStDBlWwCvpJJDWcJTiF-ZSQ7iDYSEzxfnxVh1p3wvy-b9l79q81fXl2UBjsoEY0lHybkma6dyu6mspJq6j6WLN9irp-w2m3MJjSKCVKjDjyRpgXlQbYaD1wNljJ4g3NHR-wrLvPG8lWpdkYK-IwVfdilq91LYECH24I2M0TY21obBSx5RnwYN8oGBG',
    imageAlt:
      'Cybersecurity defense operations room with matrix codes, glowing blue biometric lock icon, cyber forensic terminal, dark high security aesthetic.',
    badge: { text: 'Laboratorio Virtual', icon: 'shield', filled: false, className: 'bg-inverse-surface text-inverse-on-surface' },
    tag: 'Seguridad',
    mentor: { name: 'Héctor Navas, CISSP', initials: 'HN', className: 'bg-surface-container-high text-on-surface' },
    pro: false,
    price: null,
  },
  {
    id: 'crs-106',
    category: 'data',
    level: 'principiante',
    date: '2025-01-12',
    keywords: 'data science python machine learning pandas numpy big data analisis',
    popularity: 94,
    rating: 4.9,
    reviews: '2,830',
    hours: 50,
    title: 'Ciencia de Datos y Machine Learning con Python',
    description:
      'Desde manipulación con Pandas y NumPy hasta modelado predictivo, regresiones y visualizaciones impactantes para la toma de decisiones.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQKNo18jiVyjlxhaRuGyr9B7xemT4XukF-We5Y-YjNPkElcwQVtw0FHk83zgdhlynbWmEEaa7CCNRe0Y30Ey8F9PjaoYj5J_sutrTMFMuQAuHMDM6pBx882qKQFv9sPP0AmoN4RQy_UrZBrsIAR9senMEIotkT_ViBye23XtpSkFlUPso93NY_pPQXHzdkJPaBzpiJtbNoielkQJNGYn2zfvdZehw91zeVF0EKkQFnNS-8oeEQyjkY',
    imageAlt:
      'Complex 3D data visualization charts, colorful glowing statistical nodes, Python code interface, futuristic business analytics concept with crisp details.',
    badge: { text: 'Proyecto Final', icon: 'science', filled: false, className: 'bg-surface-container-highest text-on-surface' },
    tag: 'Datos',
    mentor: { name: 'Dr. Fernando Morales', initials: 'FM', className: 'bg-secondary-container text-on-secondary-fixed' },
    pro: false,
    price: null,
  },
  {
    id: 'crs-107',
    category: 'web',
    level: 'avanzado',
    date: '2025-02-14',
    keywords: 'nextjs react typescript server components prisma fullstack web',
    popularity: 91,
    rating: 4.9,
    reviews: '620',
    hours: 35,
    title: 'Next.js 14 y Arquitecturas Fullstack Modernas',
    description:
      'Explora App Router, React Server Components, Server Actions, integración con Prisma ORM y optimización de rendimiento extremo.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVEDltfptoHYe09GubVV89T2g0XsizAW1Nq6XBnoP2U7PkZsE3_CgU8UUIslycUGubXjIBgm1RT24XYQMEaV-FP1RV98T0TspTxdhuP_liYGnCRSA0CMQifVjU02CtOj_ibOymGMivouqSNjSFaenCtJ0VZk9RM3_2roVaMiUReq8ddzYN8OwZrSXcQqmu2oCe3kNjQryBoxwjQsBD30ZZeJAbUNwdgpVh8Ij0gNIefoYF2rdRAthx',
    imageAlt:
      'Next generation web engineering concept with sleek black laptops showcasing dark mode code editor, Next.js server actions, glowing modern tech accents.',
    badge: { text: 'Nuevo', icon: 'auto_awesome', filled: false, className: 'bg-primary-fixed text-on-primary-fixed' },
    tag: 'Web',
    mentor: { name: 'Andrea Silva', initials: 'AS', className: 'bg-primary-fixed-dim text-on-primary-fixed' },
    pro: false,
    price: null,
  },
  {
    id: 'crs-108',
    category: 'cloud',
    level: 'avanzado',
    date: '2025-01-30',
    keywords: 'docker kubernetes microservicios devops containers cloud produccion',
    popularity: 88,
    rating: 4.8,
    reviews: '810',
    hours: 42,
    title: 'Microservicios con Docker y Kubernetes en Producción',
    description:
      'Despliegue y escalado horizontal de contenedores, service mesh, monitoreo con Prometheus y estrategias Zero-Downtime.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2RAAMqt8SUbtDbkmfno9ELCwxjp6gX33EpeG7HGHmi2Y_7kK5SFge78qkdSrjQ1IsxzRvkoBajCgT0h27tcm6VZB5QphLztYftkqkaVDG77UDb6KD9BzSC8gJ6xNI2aUWdXnejrhGT7f_bjQvWCvdSdhA3fymBvV7phnG_KtalOUmHy4fjJHqU9fGIG4XWGJAEkUzM-WSYf1jl2N-6g3EHObFFQwFgC13Bco-L3jMGGu-Z_m9QTXV',
    imageAlt:
      'Container ships metaphor combined with technical Kubernetes pods and Docker whale motifs in glowing geometric grid, clean engineering visual tone.',
    badge: { text: 'Cloud Pro', icon: 'cloud_sync', filled: false, className: 'bg-tertiary-container text-on-tertiary-container' },
    tag: 'DevOps',
    mentor: { name: 'Roberto Peña', initials: 'RP', className: 'bg-surface-dim text-on-surface' },
    pro: false,
    price: null,
  },
  {
    id: 'crs-109',
    category: 'ia',
    level: 'intermedio',
    date: '2025-02-10',
    keywords: 'prompt engineering langchain agentes autonomos ia generative ai rag vector database',
    popularity: 96,
    rating: 5.0,
    reviews: '1,150',
    hours: 25,
    title: 'Prompt Engineering y Agentes Autónomos con LangChain',
    description:
      'Construye arquitecturas RAG, memorias vectoriales y agentes autónomos capaces de ejecutar tareas complejas con APIs externas.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGze8GAMZIMVXA8uaEFkYED3-gcDODIMH002PDpamEh6vCU8NYi-YT1hIFvwuLv0mBXwxormUqJPsc-eLPrLozXiGHpYL1JosLUnmRLNVlqDeA5nt81Z5MlsDgNf0u1d0o8_5WhRoSAzpkRPqFUweEiDCbwyOPMnV2ewt3m271c9KfGpMaojLFIH4nx9O18zz3xBDx46B-aMrYQSLGAb2uc7iFg9mO3kngMpaFQkV8wtrd_2GKf5o7',
    imageAlt:
      'Autonomous AI multi-agent workflow system with interconnected floating node diagram, clean glowing futuristic interface with soft shadows and indigo tones.',
    badge: { text: 'Más valorado', icon: 'star', filled: true, className: 'bg-amber-500 text-white' },
    tag: 'IA & LangChain',
    mentor: { name: 'Lic. Gabriel Soto', initials: 'GS', className: 'bg-surface-container-high text-primary' },
    pro: false,
    price: null,
  },
];

function CourseCard({ course, enrolled, onEnroll }) {
  const levelMeta = LEVEL_META[course.level];
  return (
    <article className="course-item group bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden bg-surface-container">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={course.image}
          alt={course.imageAlt}
        />
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${course.badge.className} font-label-sm text-label-sm shadow-sm`}
        >
          <span
            className="material-symbols-outlined text-[14px]"
            style={course.badge.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {course.badge.icon}
          </span>
          <span>{course.badge.text}</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm">
          {course.tag}
        </div>
      </div>
      <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-2 flex-wrap text-on-surface-variant font-label-sm text-label-sm">
            <span className={`inline-flex items-center gap-1 ${levelMeta.textClass} font-semibold`}>
              <span className={`w-1.5 h-1.5 rounded-full ${levelMeta.dotClass}`}></span>
              {levelMeta.label}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {course.hours} hrs
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {course.rating.toFixed(1)} <span className="text-outline font-normal">({course.reviews})</span>
            </span>
          </div>
          <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{course.description}</p>
        </div>
        <div className="flex flex-col gap-3 pt-space-xs">
          <div className="flex items-center justify-between text-body-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${course.mentor.className} flex items-center justify-center text-label-sm font-bold`}
              >
                {course.mentor.initials}
              </div>
              <span className="text-on-surface-variant font-medium">{course.mentor.name}</span>
            </div>
            {course.pro ? (
              <span className="font-label-sm text-label-sm font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-md">
                Certificado Pro
              </span>
            ) : (
              <span className="font-label-sm text-label-sm font-bold text-secondary">Campus Free</span>
            )}
          </div>
          <div className="w-full h-px bg-surface-container"></div>
          <div className="flex items-center justify-between gap-2">
            {course.price ? (
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 line-through">{course.price.old}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-slate-900">{course.price.current}</span>
                  <span className="text-xs font-medium text-slate-500">USD</span>
                </div>
              </div>
            ) : (
              <div>
                <span className="font-label-sm text-label-sm text-outline block">Acceso</span>
                <span className="font-title-md text-title-md font-bold text-on-surface">Gratuito</span>
              </div>
            )}
            <button
              onClick={() => onEnroll(course)}
              disabled={enrolled}
              className={`catalog-enroll-btn font-label-md text-label-md px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-all active:scale-95 ${
                enrolled ? 'bg-emerald-600 text-white' : 'bg-primary-container hover:bg-primary text-on-primary'
              }`}
              type="button"
            >
              {enrolled ? (
                <>
                  <span className="material-symbols-outlined text-label-md">check_circle</span>
                  <span>¡Inscrito!</span>
                </>
              ) : course.price ? (
                <>
                  <span className="material-symbols-outlined text-label-md">shopping_bag</span>
                  <span>Comprar curso</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-label-md">add_circle</span>
                  <span>Inscribirse gratis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(CATEGORY_OPTIONS.map((c) => c.value));
  const [level, setLevel] = useState('all');
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [toast, setToast] = useState({
    visible: false,
    title: '¡Inscripción Exitosa!',
    desc: 'El curso ya está habilitado en tu panel.',
  });
  const toastTimer = useRef(null);
  const enrollTimers = useRef({});
  const searchInputRef = useRef(null);

  useEffect(() => {
    const timers = enrollTimers.current;
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      Object.values(timers).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const visibleCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = COURSES.filter((course) => {
      const matchesQuery =
        !query || course.title.toLowerCase().includes(query) || course.keywords.includes(query);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesLevel = level === 'all' || course.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
    return filtered.sort((a, b) => {
      if (sort === 'rated') return b.rating - a.rating;
      if (sort === 'recent') return new Date(b.date) - new Date(a.date);
      return b.popularity - a.popularity;
    });
  }, [searchQuery, selectedCategories, level, sort]);

  const gridClassName =
    view === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md'
      : 'grid grid-cols-1 gap-space-md';

  function showToast(title, desc, duration) {
    setToast({ visible: true, title, desc });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
  }

  function handleEnroll(course) {
    if (enrolledIds.includes(course.id)) return;
    setEnrolledIds((prev) => [...prev, course.id]);
    showToast(
      '¡Inscripción Exitosa!',
      `Acceso concedido a "${course.title}". Ya está listo en tu campus.`,
      4500
    );
    enrollTimers.current[course.id] = setTimeout(() => {
      setEnrolledIds((prev) => prev.filter((id) => id !== course.id));
    }, 7000);
  }

  function handleSupport() {
    showToast(
      'Solicitud de Soporte Enviada',
      'Un asesor académico se pondrá en contacto en menos de 2 horas.',
      4000
    );
  }

  function clearSearch() {
    setSearchQuery('');
    if (searchInputRef.current) searchInputRef.current.focus();
  }

  function resetAll() {
    setSearchQuery('');
    setSelectedCategories(CATEGORY_OPTIONS.map((c) => c.value));
    setLevel('all');
  }

  function toggleCategory(value) {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <div className="bg-[#f8faff] font-body-md text-on-surface flex-1">
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-500 ease-out flex items-center gap-space-md bg-slate-900 text-white rounded-xl shadow-2xl p-4 ${
          toast.visible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[18px]">check</span>
        </div>
        <div className="flex flex-col min-w-0 pr-2">
          <span className="font-title-md text-sm font-bold text-white">{toast.title}</span>
          <span className="font-body-sm text-xs text-slate-300">{toast.desc}</span>
        </div>
        <Link
          className="font-label-sm text-xs text-indigo-300 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors ml-2 font-medium shrink-0"
          to="/dashboard"
        >
          Ir a Mis Cursos →
        </Link>
      </div>
      <main className="w-full flex-1 max-w-7xl mx-auto px-gutter py-6 flex flex-col">
        <div className="flex flex-col w-full">
          <section className="relative w-full rounded-2xl bg-surface-container-lowest shadow-sm p-space-md sm:p-space-lg md:p-space-xl mb-space-lg overflow-hidden">
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-space-md">
              <nav className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                  <span className="material-symbols-outlined text-body-md">home</span>
                  <span>Inicio</span>
                </Link>
                <span className="material-symbols-outlined text-body-sm text-outline-variant">chevron_right</span>
                <span className="hover:text-primary transition-colors cursor-pointer">Cursos</span>
                <span className="material-symbols-outlined text-body-sm text-outline-variant">chevron_right</span>
                <span className="text-primary font-semibold">Catálogo Completo</span>
              </nav>
              <div className="max-w-3xl flex flex-col gap-space-xs mt-space-xs">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                  <span
                    className="material-symbols-outlined text-label-md"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <span>Campus Abierto 2025 • Acreditación Certificada</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Explora todos nuestros cursos y programas certificados
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Aprende de expertos de la industria, domina las habilidades tecnológicas más demandadas y
                  potencia tu carrera académica y profesional sin límites.
                </p>
              </div>
              <div className="mt-space-sm w-full bg-surface-container-low rounded-xl p-2 shadow-sm flex flex-col sm:flex-row gap-2 items-center">
                <div className="relative w-full flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-headline-sm">
                    search
                  </span>
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline"
                    placeholder="¿Qué habilidad técnica o curso deseas buscar hoy? (ej. React, Machine Learning, AWS, Figma...)"
                    type="text"
                  />
                  {searchQuery.length > 0 && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-label-md">close</span>
                    </button>
                  )}
                </div>
                <button
                  className="w-full sm:w-auto shrink-0 bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md px-6 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-title-md">search</span>
                  <span>Buscar cursos</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-label-md text-primary">bolt</span>
                  <span>Búsqueda Rápida:</span>
                </span>
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag.query}
                    onClick={() => setSearchQuery(tag.query)}
                    className="quick-tag px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
                    type="button"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full bg-surface-container-lowest rounded-xl shadow-xs px-space-md py-space-sm mb-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-3">
              <span className="font-title-md text-title-md text-on-surface">
                Mostrando <span className="font-bold text-primary">{visibleCourses.length}</span> de 38 cursos
                disponibles
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              <button
                onClick={resetAll}
                className="text-primary hover:text-on-primary-fixed-variant font-label-sm text-label-sm inline-flex items-center gap-1 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-label-sm">filter_alt_off</span>
                <span>Limpiar filtros</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-wrap items-center bg-surface-container-low p-1 rounded-lg gap-1 max-w-full">
                {SORT_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setSort(tab.value)}
                    className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm flex items-center gap-1.5 transition-all ${
                      sort === tab.value
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined ${tab.iconClass}`}
                      style={tab.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg gap-1">
                <button
                  onClick={() => setView('grid')}
                  aria-label="Vista cuadrícula"
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                    view === 'grid'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-title-md">grid_view</span>
                </button>
                <button
                  onClick={() => setView('list')}
                  aria-label="Vista lista"
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                    view === 'list'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-title-md">view_agenda</span>
                </button>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <aside className="w-full lg:col-span-3 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-headline-sm">tune</span>
                    <h2 className="font-title-md text-title-md text-on-surface">Filtros Avanzados</h2>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                    38 Cursos
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Categorías</h3>
                  <div className="flex flex-col gap-2 mt-1">
                    {CATEGORY_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center justify-between text-body-md font-body-md text-on-surface cursor-pointer select-none"
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            checked={selectedCategories.includes(option.value)}
                            onChange={() => toggleCategory(option.value)}
                            className="filter-category rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                            type="checkbox"
                            value={option.value}
                          />
                          <span>{option.label}</span>
                        </span>
                        <span className="font-label-sm text-label-sm text-outline-variant bg-surface-container px-2 py-0.5 rounded-full">
                          {option.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-surface-container"></div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Nivel Académico
                  </h3>
                  <div className="flex flex-col gap-2 mt-1">
                    {LEVEL_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none"
                      >
                        <input
                          checked={level === option.value}
                          onChange={() => setLevel(option.value)}
                          className="filter-level text-primary focus:ring-primary w-4 h-4"
                          name="levelFilter"
                          type="radio"
                          value={option.value}
                        />
                        {option.dot ? (
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${option.dot}`}></span>
                            {option.label}
                          </span>
                        ) : (
                          <span>{option.label}</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="w-full h-px bg-surface-container"></div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Duración Estimada
                  </h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span>Menos de 20 horas</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        defaultChecked
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span>20 a 40 horas</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        defaultChecked
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span>+40 horas intensivas</span>
                    </label>
                  </div>
                </div>
                <div className="w-full h-px bg-surface-container"></div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Certificación y Metodología
                  </h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        defaultChecked
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span className="flex items-center gap-1.5">
                        <span
                          className="material-symbols-outlined text-label-md text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        <span>Con certificado oficial</span>
                      </span>
                    </label>
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        defaultChecked
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-label-md text-primary">terminal</span>
                        <span>Proyectos de código</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="w-full h-px bg-surface-container"></div>
                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Modalidad de Aprendizaje
                  </h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        defaultChecked
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span>100% Online y flexible</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-body-md font-body-md text-on-surface cursor-pointer select-none">
                      <input
                        className="rounded text-primary focus:ring-primary w-4 h-4 bg-surface-container-low"
                        type="checkbox"
                      />
                      <span>En vivo / Mentoría 1-a-1</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-sm relative overflow-hidden flex flex-col gap-space-xs">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-title-md">workspace_premium</span>
                </div>
                <h4 className="font-title-md text-title-md font-bold mt-1">Garantía SkillUp</h4>
                <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
                  Todos los cursos incluyen validez curricular con código QR verificable y asesorías directas
                  con especialistas.
                </p>
              </div>
            </aside>
            <div className="w-full lg:col-span-9 flex flex-col gap-space-lg">
              {visibleCourses.length > 0 ? (
                <div className={gridClassName}>
                  {visibleCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      enrolled={enrolledIds.includes(course.id)}
                      onEnroll={handleEnroll}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-space-xl bg-surface-container-lowest rounded-2xl shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high text-primary flex items-center justify-center mb-space-sm">
                    <span className="material-symbols-outlined text-display-hero-mobile">search_off</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    No encontramos cursos para esa búsqueda
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1">
                    Intenta remover filtros o buscar términos generales como &quot;React&quot;, &quot;Python&quot;,
                    &quot;Cloud&quot; o &quot;IA&quot;.
                  </p>
                  <button
                    onClick={resetAll}
                    className="mt-space-md px-5 py-2.5 rounded-xl bg-primary text-on-primary font-title-md text-title-md hover:bg-primary-container transition-all"
                    type="button"
                  >
                    Restablecer búsqueda
                  </button>
                </div>
              )}
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-xs p-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Página <span className="font-semibold text-on-surface">1</span> de{' '}
                  <span className="font-semibold text-on-surface">5</span>
                </span>
                <nav aria-label="Paginación de catálogo" className="flex items-center gap-1">
                  <button
                    className="px-3 py-1.5 rounded-lg text-outline-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-1 transition-colors cursor-not-allowed opacity-60"
                    disabled
                    type="button"
                  >
                    <span className="material-symbols-outlined text-label-md">chevron_left</span>
                    <span className="hidden sm:inline">Anterior</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold shadow-xs"
                    type="button"
                  >
                    1
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors"
                    type="button"
                  >
                    2
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors"
                    type="button"
                  >
                    3
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center text-outline-variant font-label-md">
                    ...
                  </span>
                  <button
                    className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors"
                    type="button"
                  >
                    5
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md text-label-md flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <span className="material-symbols-outlined text-label-md">chevron_right</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
          <section className="mt-space-xl w-full rounded-2xl bg-gradient-to-r from-primary via-primary-container to-surface-tint p-space-lg md:p-space-xl text-on-primary shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-full bg-white/5 skew-x-12 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-lg">
              <div className="flex flex-col gap-space-xs text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-white/15 text-white font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-label-md">support_agent</span>
                  <span>Soporte Curricular Personalizado</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">
                  ¿No encuentras la especialidad que buscas?
                </h2>
                <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
                  Solicita un nuevo programa tecnológico o propón una ruta formativa a medida para tu equipo
                  universitario o grupo de investigación.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-space-sm w-full lg:w-auto">
                <button
                  onClick={handleSupport}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container font-title-md text-title-md font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-title-md">mail</span>
                  <span>Contactar con soporte académico</span>
                </button>
                <Link
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-title-md text-title-md text-center transition-colors"
                  to="/dashboard"
                >
                  Ver mis cursos actuales
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
