import { Fragment, useEffect, useRef, useState } from 'react';
import Topbar from '../components/layout/Topbar';

const COURSES = [
  { id: 'crs-101', label: '[CRS-101] Full Stack React & Node (420 alumnos)' },
  { id: 'crs-102', label: '[CRS-102] Inteligencia Artificial Aplicada a Negocios (310 alumnos)' },
  { id: 'crs-103', label: '[CRS-103] Cloud Computing & DevOps con AWS (280 alumnos)' },
  { id: 'crs-104', label: '[CRS-104] UI/UX Design Systems Avanzado (195 alumnos)' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'Todos los Tipos' },
  { value: 'pdf', label: 'Documentos PDF' },
  { value: 'video', label: 'Videos de Clase' },
  { value: 'zip', label: 'Paquetes ZIP' },
  { value: 'json', label: 'JSON y Código' },
  { value: 'other', label: 'Otros Archivos' },
];

const INITIAL_MODULES = [
  {
    id: 'm1',
    index: '01',
    shortLabel: 'Módulo 1: Arquitectura Web',
    title: 'Módulo 1: Introducción a la Arquitectura Web',
    subtitle: 'Bases de cliente-servidor, HTTP/3, renderizado y estándares 2025',
    numberClass: 'bg-primary-fixed text-primary',
    resources: [
      {
        id: 'r1',
        type: 'pdf',
        name: 'Silabo_Oficial_FullStack_2025.pdf',
        icon: 'picture_as_pdf',
        iconBox: 'bg-rose-50 text-rose-600',
        badge: 'Descarga Pública',
        badgeClass: 'bg-secondary-container/70 text-on-secondary-container',
        meta: [
          { text: '2.4 MB' },
          { text: 'Subido el 12 Mar 2025' },
          { text: 'Descargado 382 veces', className: 'text-secondary font-medium' },
        ],
        actions: [
          { icon: 'visibility', title: 'Vista Previa' },
          { icon: 'cached', title: 'Reemplazar archivo' },
        ],
      },
      {
        id: 'r2',
        type: 'video',
        name: 'Clase01_Configuracion_Entorno.mp4',
        icon: 'play_circle',
        iconBox: 'bg-purple-50 text-purple-600',
        badge: 'Streaming HD (1080p)',
        badgeClass: 'bg-primary-fixed text-primary',
        meta: [
          { text: '480 MB' },
          { text: 'Duración: 42m 15s' },
          { text: 'Subtítulos ES/EN listos', className: 'text-primary font-medium' },
        ],
        actions: [
          { icon: 'play_arrow', title: 'Reproducir' },
          { icon: 'subtitles', title: 'Gestionar subtítulos' },
        ],
      },
      {
        id: 'r3',
        type: 'zip',
        name: 'Starter_Pack_Ejercicios.zip',
        icon: 'folder_zip',
        iconBox: 'bg-amber-50 text-amber-600',
        badge: 'Solo Alumnos',
        badgeClass: 'bg-surface-container-highest text-on-surface-variant',
        meta: [
          { text: '14.8 MB' },
          { text: 'Node 22 boilerplate + configs' },
          { text: 'SHA-256 verificado' },
        ],
        actions: [{ icon: 'download', title: 'Descargar paquete' }],
      },
    ],
  },
  {
    id: 'm2',
    index: '02',
    shortLabel: 'Módulo 2: Node.js & Mongo',
    title: 'Módulo 2: Backend Robusto con Node.js & Mongo',
    subtitle: 'APIs RESTful seguras, Middlewares, validación Zod y Mongoose ODM',
    numberClass: 'bg-secondary-fixed text-secondary',
    resources: [
      {
        id: 'r4',
        type: 'pdf',
        name: 'Guia_Diseno_REST_API.pdf',
        icon: 'picture_as_pdf',
        iconBox: 'bg-rose-50 text-rose-600',
        badge: 'Descarga Pública',
        badgeClass: 'bg-secondary-container/70 text-on-secondary-container',
        meta: [
          { text: '1.8 MB' },
          { text: 'Actualizado 10 Mar 2025' },
          { text: 'Lectura obligatoria', className: 'text-secondary font-medium' },
        ],
        actions: [
          { icon: 'visibility', title: 'Vista Previa' },
          { icon: 'cached', title: 'Reemplazar' },
        ],
      },
      {
        id: 'r5',
        type: 'json',
        name: 'Coleccion_Postman_Endpoints.json',
        icon: 'terminal',
        iconBox: 'bg-emerald-50 text-emerald-600',
        badge: 'Recurso Práctico',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        meta: [
          { text: '340 KB' },
          { text: 'Colección v2.1 importable' },
          { text: '32 tests automatizados' },
        ],
        actions: [{ icon: 'download', title: 'Descargar JSON' }],
      },
    ],
  },
  {
    id: 'm3',
    index: '03',
    shortLabel: 'Módulo 3: React 19 Avanzado',
    title: 'Módulo 3: React 19 Avanzado & Server Components',
    subtitle: 'Server Components, RSC y streaming en el servidor',
    numberClass: 'bg-surface-container-highest text-on-surface',
    resources: [],
  },
];

function formatSize(bytes) {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)} GB`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

function typeFromName(name) {
  const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
  if (ext === 'pdf') return 'pdf';
  if (['mp4', 'mkv', 'webm', 'mov'].includes(ext)) return 'video';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'zip';
  if (['json', 'js', 'ts', 'jsx', 'tsx'].includes(ext)) return 'json';
  return 'other';
}

function appearanceFor(name) {
  const type = typeFromName(name);
  if (type === 'pdf') return { icon: 'picture_as_pdf', iconBox: 'bg-rose-50 text-rose-600' };
  if (type === 'video') return { icon: 'play_circle', iconBox: 'bg-purple-50 text-purple-600' };
  if (type === 'zip') return { icon: 'folder_zip', iconBox: 'bg-amber-50 text-amber-600' };
  if (type === 'json') return { icon: 'terminal', iconBox: 'bg-emerald-50 text-emerald-600' };
  return { icon: 'draft', iconBox: 'bg-surface-container-high text-on-surface-variant' };
}

function ResourceRow({ resource, onAction, onDelete }) {
  return (
    <div className="p-3.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
      <div className="flex items-start sm:items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-xl ${resource.iconBox} flex items-center justify-center shrink-0`}
        >
          <span className="material-symbols-outlined text-[22px]">{resource.icon}</span>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-title-md font-title-md text-on-surface truncate font-medium">
              {resource.name}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full ${resource.badgeClass} text-label-sm font-label-sm font-semibold`}
            >
              {resource.badge}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
            {resource.meta.map((item, index) => (
              <Fragment key={item.text}>
                <span className={item.className}>{item.text}</span>
                {index < resource.meta.length - 1 && <span>•</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:self-center shrink-0">
        {resource.actions.map((action) => (
          <button
            key={action.title}
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
            title={action.title}
            type="button"
            onClick={() => onAction(action, resource)}
          >
            <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
          </button>
        ))}
        <button
          className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors"
          title="Eliminar"
          type="button"
          onClick={() => onDelete(resource.id)}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
}

function ModuleCard({ mod, resources, onAdd, onDelete, onAction }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all duration-200">
      <div className="p-4 sm:p-5 bg-surface-container-low flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl ${mod.numberClass} flex items-center justify-center shrink-0 font-title-md font-title-md`}
          >
            {mod.index}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-title-md font-title-md text-on-surface truncate">{mod.title}</h3>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm shrink-0">
                {mod.resources.length} recursos
              </span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant truncate">
              {mod.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors"
            title="Reordenar Módulo"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
          </button>
          <button
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
            title="Opciones"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4 space-y-2.5">
        {resources.map((resource) => (
          <ResourceRow
            key={resource.id}
            resource={resource}
            onAction={onAction}
            onDelete={(resourceId) => onDelete(mod.id, resourceId)}
          />
        ))}
        {resources.length === 0 && (
          <p className="py-4 text-center text-body-sm font-body-sm text-on-surface-variant">
            No hay recursos que coincidan con la búsqueda o el filtro seleccionado.
          </p>
        )}
        <button
          className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-2 mt-2"
          type="button"
          onClick={() => onAdd(mod.id)}
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>+ Agregar recurso a este módulo</span>
        </button>
      </div>
    </div>
  );
}

function ModulePreview({ mod, onSelect }) {
  return (
    <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between text-on-surface-variant">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl ${mod.numberClass} flex items-center justify-center font-title-md font-title-md`}
        >
          {mod.index}
        </div>
        <div>
          <span className="text-title-md font-title-md text-on-surface">{mod.title}</span>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Sin archivos asignados actualmente
          </p>
        </div>
      </div>
      <button
        className="px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-primary-fixed text-primary text-label-md font-label-md font-semibold transition-colors flex items-center gap-1"
        type="button"
        onClick={() => onSelect(mod.id)}
      >
        <span className="material-symbols-outlined text-[18px]">add</span> Subir Primer Recurso
      </button>
    </div>
  );
}

export default function AdminMaterials() {
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [course, setCourse] = useState('crs-101');
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [docTitle, setDocTitle] = useState(
    'Guía Práctica Avanzada: TypeScript 5.7 en Entornos Node y React',
  );
  const [targetModule, setTargetModule] = useState('m3');
  const [accessLevel, setAccessLevel] = useState('enrolled');
  const [docNotes, setDocNotes] = useState('');
  const [notify, setNotify] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(true);
  const [uploadPaused, setUploadPaused] = useState(false);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);
  const typeMenuRef = useRef(null);
  const idCounterRef = useRef(100);

  const normalizedQuery = query.toLowerCase().trim();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!typeMenuOpen) return undefined;
    const handleOutsideClick = (event) => {
      if (typeMenuRef.current && !typeMenuRef.current.contains(event.target)) {
        setTypeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [typeMenuOpen]);

  const showToast = (title, message) => setToast({ title, message });

  const matchesFilters = (resource) => {
    if (typeFilter !== 'all' && resource.type !== typeFilter) return false;
    if (!normalizedQuery) return true;
    const haystack = [resource.name, resource.badge, ...resource.meta.map((item) => item.text)]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  };

  const visibleModules =
    moduleFilter === 'all'
      ? modules
      : modules.filter((mod) => mod.id === moduleFilter);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (incoming.length === 0) return;
    const mapped = incoming.map((file) => {
      idCounterRef.current += 1;
      return {
        id: `file-${idCounterRef.current}`,
        name: file.name,
        size: formatSize(file.size),
      };
    });
    setPendingFiles((prev) => [...prev, ...mapped]);
    if (!docTitle.trim()) {
      setDocTitle(mapped[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleFileInput = (event) => {
    addFiles(event.target.files);
    event.target.value = '';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const removePending = (fileId) => {
    setPendingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleDelete = (moduleId, resourceId) => {
    const target = modules.find((mod) => mod.id === moduleId);
    const removed = target ? target.resources.find((res) => res.id === resourceId) : null;
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === moduleId
          ? { ...mod, resources: mod.resources.filter((res) => res.id !== resourceId) }
          : mod,
      ),
    );
    showToast('Recurso Eliminado', removed ? removed.name : 'El archivo fue quitado de la lista.');
  };

  const handleAction = (action, resource) => {
    showToast(action.title, resource.name);
  };

  const handleAddResource = (moduleId) => {
    setTargetModule(moduleId);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleNewModule = () => {
    setModules((prev) => {
      const number = prev.length + 1;
      const padded = String(number).padStart(2, '0');
      return [
        ...prev,
        {
          id: `m${number}`,
          index: padded,
          shortLabel: `Módulo ${number}: Nuevo Contenido`,
          title: `Módulo ${number}: Nuevo Contenido Académico`,
          subtitle: 'Espacio listo para recursos del programa formativo',
          numberClass: 'bg-surface-container-highest text-on-surface',
          resources: [],
        },
      ];
    });
    showToast('Módulo Creado', 'Se agregó un nuevo módulo al programa formativo.');
  };

  const handlePublish = (event) => {
    event.preventDefault();
    if (pendingFiles.length === 0) {
      showToast(
        'Formulario Guardado',
        docTitle.trim()
          ? 'Los metadatos quedaron listos para asociar a un archivo.'
          : 'Completá el título público antes de continuar.',
      );
      return;
    }
    const published = pendingFiles.map((file) => ({
      id: file.id,
      type: typeFromName(file.name),
      name: file.name,
      ...appearanceFor(file.name),
      badge: accessLevel === 'public' ? 'Descarga Pública' : 'Solo Alumnos',
      badgeClass:
        accessLevel === 'public'
          ? 'bg-secondary-container/70 text-on-secondary-container'
          : 'bg-surface-container-highest text-on-surface-variant',
      meta: [
        { text: file.size },
        { text: 'Subido hoy' },
        {
          text: notify ? 'Notificación enviada' : 'Sin notificación',
          className: 'text-primary font-medium',
        },
      ],
      actions: [{ icon: 'download', title: 'Descargar archivo' }],
    }));
    setModules((prev) =>
      prev.map((mod) =>
        mod.id === targetModule
          ? { ...mod, resources: [...mod.resources, ...published] }
          : mod,
      ),
    );
    setPendingFiles([]);
    showToast(
      'Archivo Publicado',
      `${published.length} ${published.length === 1 ? 'archivo publicado' : 'archivos publicados'} en el módulo seleccionado.`,
    );
  };

  return (
    <>
      <Topbar />
      <main className="w-full flex-1 max-w-7xl mx-auto px-gutter py-space-lg">
        <div className="flex flex-col w-full gap-space-lg">
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-xs">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary text-label-sm font-label-sm tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span>ADM CONTENIDO & RECURSOS ACADÉMICOS</span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
                Creación y Subida de Materiales de Cursos
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Sube recursos didácticos, guías PDF, videos de clases, repositorios y ejercicios
                prácticos asignados a cada módulo del programa formativo.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 p-2 bg-surface-container-lowest rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-xl min-w-0 w-full sm:w-auto">
                <span className="material-symbols-outlined text-primary text-[20px]">layers</span>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Curso Activo
                  </span>
                  <select
                    className="bg-transparent text-title-md font-title-md text-on-surface font-semibold focus:outline-none cursor-pointer pr-4 w-full min-w-0"
                    id="courseSelector"
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
                  >
                    {COURSES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="px-3.5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5"
                type="button"
                onClick={() =>
                  showToast(
                    'Cambio de Curso',
                    'Elegí en el desplegable el programa formativo sobre el que trabajar.',
                  )
                }
              >
                <span className="material-symbols-outlined text-[18px]">sync</span>
                <span>Cambiar</span>
              </button>
              <button
                className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-all shadow-sm shadow-primary/20 flex items-center gap-1.5"
                type="button"
                onClick={handleNewModule}
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Nuevo Módulo</span>
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Total Recursos
                  </span>
                  <p className="text-headline-md font-headline-md text-on-surface font-bold mt-1">
                    38 Archivos
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">folder_copy</span>
                </div>
              </div>
              <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span className="font-semibold">+4 subidos esta semana</span>
              </div>
              <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-primary/5 pointer-events-none"></div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Almacenamiento CDN
                  </span>
                  <p className="text-headline-md font-headline-md text-on-surface font-bold mt-1">
                    4.2 GB{' '}
                    <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">
                      / 20 GB
                    </span>
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
              </div>
              <div className="mt-4 pt-3 space-y-1.5">
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-700"
                    style={{ width: '21%' }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                  <span>21% cuota ocupada</span>
                  <span className="text-primary font-semibold">15.8 GB libres</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Distribución Activa
                  </span>
                  <p className="text-title-md font-title-md text-on-surface font-bold mt-1">
                    18 PDFs • 12 Vids • 8 ZIPs
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">pie_chart</span>
                </div>
              </div>
              <div className="mt-4 pt-3">
                <div className="w-full h-2 rounded-full flex gap-1 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-sm"
                    style={{ width: '47%' }}
                    title="PDFs: 47%"
                  ></div>
                  <div
                    className="bg-purple-600 h-full rounded-sm"
                    style={{ width: '32%' }}
                    title="Videos: 32%"
                  ></div>
                  <div
                    className="bg-amber-500 h-full rounded-sm"
                    style={{ width: '21%' }}
                    title="Archivos ZIP: 21%"
                  ></div>
                </div>
                <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mt-2">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Docs
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Clases
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Paquetes
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Estado de Red CDN
                  </span>
                  <p className="text-headline-md font-headline-md text-secondary font-bold mt-1">
                    100% Online
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-secondary-container/60 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant">AWS S3 + Cloudflare CDN</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Activo
                </span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <section className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-surface-container-low rounded-xl text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    id="searchInput"
                    placeholder="Buscar por nombre, extensión o etiqueta..."
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="px-3 py-2 bg-surface-container-low rounded-xl text-label-md font-label-md text-on-surface font-medium focus:outline-none cursor-pointer"
                    value={moduleFilter}
                    onChange={(event) => setModuleFilter(event.target.value)}
                  >
                    <option value="all">Todos los Módulos</option>
                    {modules.map((mod) => (
                      <option key={mod.id} value={mod.id}>
                        {mod.shortLabel}
                      </option>
                    ))}
                  </select>
                  <div className="relative" ref={typeMenuRef}>
                    <button
                      className={`p-2 bg-surface-container-low hover:bg-surface-container-high rounded-xl text-on-surface-variant hover:text-on-surface transition-colors ${
                        typeFilter !== 'all' ? 'ring-2 ring-primary/40' : ''
                      }`}
                      title="Filtrar por tipo"
                      type="button"
                      aria-expanded={typeMenuOpen}
                      onClick={() => setTypeMenuOpen((open) => !open)}
                    >
                      <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    </button>
                    {typeMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-surface-container-lowest border border-surface-container-high rounded-xl shadow-lg py-1.5 z-50">
                        {TYPE_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            className={`flex items-center justify-between w-full px-3 py-1.5 text-xs text-left transition-colors ${
                              typeFilter === option.value
                                ? 'text-primary bg-primary-fixed/40 font-semibold'
                                : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                            }`}
                            type="button"
                            onClick={() => {
                              setTypeFilter(option.value);
                              setTypeMenuOpen(false);
                            }}
                          >
                            <span>{option.label}</span>
                            {typeFilter === option.value && (
                              <span className="material-symbols-outlined text-[14px]">check</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {visibleModules.map((mod) =>
                mod.resources.length === 0 ? (
                  <ModulePreview key={mod.id} mod={mod} onSelect={handleAddResource} />
                ) : (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    resources={mod.resources.filter(matchesFilters)}
                    onAdd={handleAddResource}
                    onDelete={handleDelete}
                    onAction={handleAction}
                  />
                ),
              )}

              {visibleModules.length === 0 && (
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg text-center">
                  <span className="material-symbols-outlined text-[40px] text-outline-variant">
                    filters_alt_off
                  </span>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                    No hay módulos disponibles con el filtro seleccionado.
                  </p>
                </div>
              )}
            </section>

            <section className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                    </div>
                    <h2 className="text-title-md font-title-md text-on-surface font-bold">
                      Subir Nuevos Archivos
                    </h2>
                  </div>
                  <span className="text-label-sm font-label-sm text-secondary bg-secondary-container/60 px-2 py-0.5 rounded-full font-semibold">
                    CDN Direct Sync
                  </span>
                </div>

                <div
                  className={`group relative p-7 rounded-2xl hover:bg-surface-container-low border-2 border-dashed border-primary/40 hover:border-primary transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                    dragging ? 'bg-primary-fixed/20' : 'bg-surface-container-low/70'
                  }`}
                  id="dropZone"
                  onDragEnter={handleDragOver}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    id="fileUpload"
                    multiple
                    type="file"
                    onChange={handleFileInput}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed/80 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-all mb-3 shadow-sm">
                    <span className="material-symbols-outlined text-[30px]">upload_file</span>
                  </div>
                  <p className="text-title-md font-title-md text-on-surface font-semibold">
                    Arrastra y suelta tus archivos aquí
                  </p>
                  <p className="text-body-sm font-body-sm text-primary font-medium mt-0.5">
                    o haz clic para explorar en tu equipo
                  </p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-2 max-w-xs">
                    Soporta PDF, MP4, MKV, ZIP, DOCX, EPUB (Hasta 500 MB por archivo)
                  </p>
                </div>

                {pendingFiles.length > 0 && (
                  <div className="space-y-2">
                    {pendingFiles.map((file) => (
                      <div
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-container-low"
                        key={file.id}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                            attach_file
                          </span>
                          <span className="text-body-sm font-body-sm text-on-surface font-medium truncate">
                            {file.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-label-sm font-label-sm text-on-surface-variant">
                            {file.size}
                          </span>
                          <button
                            className="p-1 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors"
                            title="Quitar de la lista"
                            type="button"
                            onClick={() => removePending(file.id)}
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {uploadVisible && (
                  <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2">
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                          task
                        </span>
                        <span className="text-on-surface font-medium truncate">
                          Guia_Avanzada_TypeScript.pdf
                        </span>
                      </div>
                      <span className="text-primary font-semibold shrink-0">85% • 4.1 MB/s</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-primary h-2 rounded-full transition-all duration-300 ${
                          uploadPaused ? '' : 'animate-pulse'
                        }`}
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                      <span>
                        {uploadPaused
                          ? 'Subida en pausa (6.8 MB / 8.0 MB)'
                          : 'Restante: ~3 segundos (6.8 MB / 8.0 MB)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-on-surface-variant hover:text-on-surface font-medium"
                          type="button"
                          onClick={() => setUploadPaused((paused) => !paused)}
                        >
                          {uploadPaused ? 'Reanudar' : 'Pausar'}
                        </button>
                        <span>•</span>
                        <button
                          className="text-error hover:underline font-medium"
                          type="button"
                          onClick={() => setUploadVisible(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-4 pt-1" onSubmit={handlePublish}>
                  <div>
                    <label
                      className="block text-label-md font-label-md text-on-surface font-semibold mb-1.5"
                      htmlFor="docTitle"
                    >
                      Título público para los alumnos *
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      id="docTitle"
                      placeholder="Ej: Laboratorio 01 - Configuración de Vite"
                      type="text"
                      value={docTitle}
                      onChange={(event) => setDocTitle(event.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-label-md font-label-md text-on-surface font-semibold mb-1.5"
                      htmlFor="targetModule"
                    >
                      Asignar al Módulo *
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                      id="targetModule"
                      value={targetModule}
                      onChange={(event) => setTargetModule(event.target.value)}
                    >
                      {modules.map((mod) => (
                        <option key={mod.id} value={mod.id}>
                          {mod.title}
                        </option>
                      ))}
                      <option value="resources_general">Recursos Generales y Bienvenida</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2">
                      Nivel de Visibilidad y Permisos
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors border border-transparent has-[:checked]:bg-primary-fixed/40">
                        <input
                          className="accent-primary"
                          name="accessLevel"
                          type="radio"
                          value="public"
                          checked={accessLevel === 'public'}
                          onChange={() => setAccessLevel('public')}
                        />
                        <div className="flex flex-col">
                          <span className="text-label-md font-label-md text-on-surface font-semibold">
                            Público / Demo
                          </span>
                          <span className="text-label-sm font-label-sm text-on-surface-variant">
                            Visible sin registro
                          </span>
                        </div>
                      </label>
                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors border border-transparent has-[:checked]:bg-primary-fixed/40">
                        <input
                          className="accent-primary"
                          name="accessLevel"
                          type="radio"
                          value="enrolled"
                          checked={accessLevel === 'enrolled'}
                          onChange={() => setAccessLevel('enrolled')}
                        />
                        <div className="flex flex-col">
                          <span className="text-label-md font-label-md text-on-surface font-semibold">
                            Exclusivo Matriculados
                          </span>
                          <span className="text-label-sm font-label-sm text-on-surface-variant">
                            Requiere inscripción
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-label-md font-label-md text-on-surface font-semibold mb-1.5"
                      htmlFor="docNotes"
                    >
                      Instrucciones de estudio o notas del profesor (Opcional)
                    </label>
                    <textarea
                      className="w-full px-3.5 py-2 bg-surface-container-low rounded-xl text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      id="docNotes"
                      placeholder="Revisar las páginas 14 a 32 antes del taller sincrónico del jueves..."
                      rows="2"
                      value={docNotes}
                      onChange={(event) => setDocNotes(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-3">
                    <input
                      className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                      id="notifyStudents"
                      type="checkbox"
                      checked={notify}
                      onChange={(event) => setNotify(event.target.checked)}
                    />
                    <label
                      className="text-body-sm font-body-sm text-on-surface cursor-pointer select-none"
                      htmlFor="notifyStudents"
                    >
                      <span className="font-medium block">
                        Notificar a los 420 estudiantes inscritos
                      </span>
                      <span className="text-on-surface-variant text-label-sm font-label-sm">
                        Enviar alerta al campus y resumen al correo electrónico de los alumnos
                        activos.
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                    <button
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-title-md text-title-md font-semibold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[20px]">publish</span>
                      <span>Confirmar y Publicar Archivo</span>
                    </button>
                    <button
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-medium transition-colors"
                      type="button"
                      onClick={() =>
                        showToast('Borrador Guardado', 'Los metadatos quedaron guardados en esta sesión.')
                      }
                    >
                      Guardar Borrador
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                </div>
                <div className="space-y-1">
                  <span className="text-label-md font-label-md text-on-surface font-bold">
                    Consejo de Optimización de Archivos
                  </span>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Para videos superiores a 30 minutos, el transcodificador automático generará
                    versiones de 480p, 720p y 1080p con streaming adaptativo HLS en segundo plano.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-on-surface p-space-md text-surface shadow-2xl flex items-center gap-space-sm">
            <div className="p-1 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-title-md text-[13px] font-semibold text-surface">{toast.title}</p>
              <p className="font-body-sm text-body-sm text-surface-variant/80 truncate">
                {toast.message}
              </p>
            </div>
            <button
              className="text-surface-variant hover:text-surface"
              type="button"
              onClick={() => setToast(null)}
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}
      </main>
    </>
  );
}
