import { useEffect, useState } from 'react';
import Topbar from '../components/layout/Topbar';

const USERS = [
  {
    id: 1,
    name: 'Dra. Elena Ramos',
    email: 'elena.ramos@campus.edu',
    role: 'Administrador',
    extraRole: 'Docente',
    date: '14 Ene 2023',
    courses: 5,
    status: 'Activo',
    initials: null,
    initialsClass: '',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbhFBQI_vYx-wfhN3Sc40fV5zdaIcFzETWcbPopmZxpTbn1y48oHO2Uc7HUyjDWl6bICs2KpP7XVoiMwcjNgiZjqq-m4-7pZZ4UdmrbMac_YB3eGrhoEASEXaBl7PkCQKXPb76pvcqI41UtPkHO23sBq86AQmhI4H0z1jAD5B8qHGXgXkyDZwQDs7gO1UDiLjivCpsZZ6hJUplJ3Bei6e1MN6C-nF8Do5MbYFBhR5nG6VXZ2l0g0hD',
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@student.edu',
    role: 'Estudiante',
    extraRole: null,
    date: '02 Mar 2024',
    courses: 3,
    status: 'Activo',
    initials: null,
    initialsClass: '',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmja7RIe80cH4VYpuPqeLq1_raKJUj6pqvUuozOOBHOmusblqpR8FfFSzw_VE2OztmtUiD20B4XjgJTQPFSmM5Al6NJbOL3FswtAVU-wulO53JRB2fb8bC-wJiBXCVyx6tch-Qb1WXD0e7YpVCfHDI7lCknakoSQnTc6nnaklaYjqsZRK_ebAd1Nl5roqdwZ3vTC8X18ijaJnrYz39LY2iYDudTBeRE0Gip2xel8X00DannXnYw9K1',
  },
  {
    id: 3,
    name: 'Sofía Valenzuela',
    email: 'sofia.v@student.edu',
    role: 'Estudiante',
    extraRole: null,
    date: '19 Ago 2024',
    courses: 2,
    status: 'Activo',
    initials: null,
    initialsClass: '',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhF4PfXMswGN6iJVdiWKnJ5x2VuQxVLXwGbhn7LR57RgnfburTy4iYYGdmwdATolAO3qbenjVLJePdrHP4Ls83ms6HPeX4SjloPpifZRhjA7vS765RQkolUspfzwt6bWrYfzLSwxAZ-BlTd75OKFn_4yOGxPzY5NeBO3mdY7kNw_cAoITjEcdJHBmQpsAfkUm8N_yVKFyS0Z0F-rg_elVRCspW5p9vtvWrOnvrTKz60o38fe3g7_Cn',
  },
  {
    id: 4,
    name: 'Javier Ortiz',
    email: 'j.ortiz@campus.edu',
    role: 'Docente',
    extraRole: null,
    date: '10 Nov 2023',
    courses: 4,
    status: 'Activo',
    initials: 'JO',
    initialsClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    avatar: null,
  },
  {
    id: 5,
    name: 'Mariana Gómez',
    email: 'mariana.g@student.edu',
    role: 'Estudiante',
    extraRole: null,
    date: '05 Ene 2025',
    courses: 1,
    status: 'Activo',
    initials: null,
    initialsClass: '',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtZiOkQm-2JUnRzgk8Whl9yHC2Hqnea4UDNoq8zpvNYxUSVNzpdU2t8X5u-0h4NmE37BKYTa9I5JUZgOt1ZV7DgoMOhY8gdJCQ82EnwjCKwCgCXEehZUL0Z3_mmBpB8mnMVpzhPAwD-YCkOc8iReSbD0yyTusktm5Lj3OibdSJo7-Lkaybaygv9dTxt3T-NsnniGdIJuk7nEaXqGf9VKUB6pAlNeqPAY1_iV9XW27uMVQnTAIhqWf8',
  },
  {
    id: 6,
    name: 'Lucas Paredes',
    email: 'lucas.p@student.edu',
    role: 'Estudiante',
    extraRole: null,
    date: '28 Feb 2025',
    courses: 0,
    status: 'Pendiente',
    initials: 'LP',
    initialsClass: 'bg-surface-container-high text-on-surface',
    avatar: null,
  },
];

const ROLE_BADGE_CLASSES = {
  Administrador: 'bg-primary-fixed text-on-primary-fixed',
  Docente: 'bg-tertiary-fixed text-on-tertiary-fixed',
  Estudiante: 'bg-surface-container text-on-surface-variant',
};

const STATUS_BADGE_CLASSES = {
  Activo: 'bg-secondary-container/60 text-on-secondary-fixed-variant',
  Pendiente: 'bg-surface-container-high text-on-surface-variant',
  Inactivo: 'bg-error-container/60 text-on-error-container',
};

const STATUS_DOT_CLASSES = {
  Activo: 'bg-secondary',
  Pendiente: 'bg-outline',
  Inactivo: 'bg-error',
};

function RoleBadge({ role }) {
  const tone = ROLE_BADGE_CLASSES[role] || ROLE_BADGE_CLASSES.Estudiante;
  return (
    <span
      className={`user-badge-role px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${tone}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const tone = STATUS_BADGE_CLASSES[status] || STATUS_BADGE_CLASSES.Inactivo;
  const dot = STATUS_DOT_CLASSES[status] || STATUS_DOT_CLASSES.Inactivo;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium ${tone}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      <span>{status}</span>
    </span>
  );
}

function UserAvatar({ user }) {
  if (user.avatar) {
    return (
      <img
        alt={`Avatar ${user.name}`}
        className="w-10 h-10 rounded-full object-cover shadow-sm"
        src={user.avatar}
      />
    );
  }
  return (
    <div
      className={`w-10 h-10 rounded-full ${user.initialsClass} flex items-center justify-center font-title-md font-bold shadow-sm`}
    >
      {user.initials}
    </div>
  );
}

function CoursesCell({ courses }) {
  if (courses === 0) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface font-label-md text-label-md text-on-surface-variant opacity-80">
        <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
        <span>0 cursos</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface font-label-md text-label-md text-on-surface">
      <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span>
      <span className="font-semibold">{courses}</span> {courses === 1 ? 'curso' : 'cursos'}
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState(USERS);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [menu, setMenu] = useState(null);
  const [modalUserId, setModalUserId] = useState(null);
  const [modalRole, setModalRole] = useState('Estudiante');
  const [toast, setToast] = useState(null);
  const [fadingId, setFadingId] = useState(null);

  const normalizedQuery = query.toLowerCase().trim();
  const filteredUsers = users.filter((user) => {
    const matchesQuery =
      !normalizedQuery ||
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesQuery && matchesRole && matchesStatus;
  });

  const modalUser = users.find((user) => user.id === modalUserId) || null;

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!menu) return undefined;
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (target.closest?.('.btn-row-menu') || target.closest?.('#rowDropdown')) return;
      setMenu(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menu]);

  const showToast = (title, message) => setToast({ title, message });

  const resetFilters = () => {
    setQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const openMenu = (user, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenu({ id: user.id, name: user.name, top: rect.bottom + 6, left: rect.right - 224 });
  };

  const openRoleModal = (user) => {
    setMenu(null);
    setModalUserId(user.id);
    setModalRole(user.role);
  };

  const closeRoleModal = () => setModalUserId(null);

  const saveRoleModal = () => {
    if (!modalUser) return;
    const newRole = modalRole;
    setUsers((prev) =>
      prev.map((user) => (user.id === modalUser.id ? { ...user, role: newRole } : user)),
    );
    setModalUserId(null);
    showToast('Rol Actualizado', `Se ha asignado el rol '${newRole}' a ${modalUser.name}.`);
  };

  const suspendUser = () => {
    if (!menu) return;
    const name = menu.name;
    setMenu(null);
    showToast(
      'Estado Modificado',
      `El acceso para ${name} ha sido suspendido temporalmente.`,
    );
  };

  const deleteUser = () => {
    if (!menu) return;
    const id = menu.id;
    const name = menu.name;
    setMenu(null);
    setFadingId(id);
    setTimeout(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setFadingId(null);
      showToast('Registro eliminado', `Se eliminó exitosamente a ${name}.`);
    }, 300);
  };

  const showHistory = () => {
    if (!menu) return;
    const name = menu.name;
    setMenu(null);
    showToast(
      'Historial de Inscripciones',
      `Se consultó el historial académico de ${name}.`,
    );
  };

  return (
    <>
      <Topbar />
      <main className="w-full flex-1 max-w-7xl mx-auto px-gutter py-space-lg">
        <div className="flex flex-col w-full gap-space-lg">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
            <div className="absolute right-40 -bottom-20 h-48 w-48 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none"></div>
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                  <span>Consola Administrativa • Módulo de Identidades</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Directorio y Gestión de Usuarios
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                  Control de acceso, visualización de roles (Estudiantes, Docentes,
                  Administradores) y estado de cuentas registradas en el ecosistema
                  institucional.
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start lg:self-center">
                <button
                  className="inline-flex items-center gap-space-xs px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
                  id="btnExportCSV"
                  type="button"
                  onClick={() =>
                    showToast(
                      'Exportación Iniciada',
                      'El archivo CSV del directorio de usuarios se está descargando.',
                    )
                  }
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Exportar CSV</span>
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm"
                  id="btnNewUser"
                  type="button"
                  onClick={() =>
                    showToast(
                      'Formulario de Registro',
                      'Apertura de modal de invitación a usuarios enviada a administradores.',
                    )
                  }
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>+ Invitar / Agregar Usuario</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm mt-space-lg">
              <div className="rounded-xl bg-surface p-space-md shadow-sm">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase">Total Usuarios</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">groups</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface">1,420</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    +4.2%
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-space-md shadow-sm">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase">Estudiantes</span>
                  <span className="material-symbols-outlined text-[18px] text-primary-container">
                    school
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface">1,350</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    95% total
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-space-md shadow-sm">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase">Docentes</span>
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    co_present
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface">45</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    100% activo
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-space-md shadow-sm">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase">Administradores</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    admin_panel_settings
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface">25</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Supervisores
                  </span>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-xl bg-secondary-container/40 p-space-md shadow-sm">
                <div className="flex items-center justify-between text-secondary">
                  <span className="font-label-sm text-label-sm uppercase font-semibold">
                    Activos hoy
                  </span>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                    312
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    en campus virtual
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="relative flex-1 min-w-[280px]">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest shadow-sm"
                  id="searchInput"
                  placeholder="Buscar por nombre, correo institucional o ID..."
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-space-sm">
                <div className="flex items-center bg-surface-container-low px-2 py-1 rounded-lg gap-1">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant pl-1">
                    tune
                  </span>
                  <select
                    className="bg-transparent text-on-surface font-label-md text-label-md py-1.5 px-2 focus:outline-none cursor-pointer"
                    id="roleFilter"
                    value={roleFilter}
                    onChange={(event) => setRoleFilter(event.target.value)}
                  >
                    <option value="all">Rol: Todos</option>
                    <option value="Estudiante">Estudiantes</option>
                    <option value="Docente">Docentes</option>
                    <option value="Administrador">Administradores</option>
                  </select>
                </div>
                <div className="flex items-center bg-surface-container-low px-2 py-1 rounded-lg gap-1">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant pl-1">
                    verified_user
                  </span>
                  <select
                    className="bg-transparent text-on-surface font-label-md text-label-md py-1.5 px-2 focus:outline-none cursor-pointer"
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="all">Estado: Todos</option>
                    <option value="Activo">Activos</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Inactivo">Inactivos</option>
                  </select>
                </div>
                <button
                  className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
                  id="resetFilters"
                  title="Restablecer filtros"
                  type="button"
                  onClick={resetFilters}
                >
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3.5 px-space-md">Usuario</th>
                    <th className="py-3.5 px-space-md">Rol en Sistema</th>
                    <th className="py-3.5 px-space-md">Fecha Registro</th>
                    <th className="py-3.5 px-space-md">Cursos Activos</th>
                    <th className="py-3.5 px-space-md">Estado</th>
                    <th className="py-3.5 px-space-md text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md text-on-surface" id="usersTableBody">
                  {filteredUsers.map((user) => (
                    <tr
                      className="user-row hover:bg-surface-container-low/70 transition-colors"
                      data-email={user.email}
                      data-id={user.id}
                      data-name={user.name}
                      data-role={user.role}
                      data-status={user.status}
                      key={user.id}
                      style={fadingId === user.id ? { opacity: 0.3 } : undefined}
                    >
                      <td className="py-3.5 px-space-md">
                        <div className="flex items-center gap-space-sm">
                          <UserAvatar user={user} />
                          <div className="flex flex-col min-w-0">
                            <span className="font-title-md text-title-md font-semibold text-on-surface truncate">
                              {user.name}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-md">
                        {user.extraRole ? (
                          <div className="flex flex-wrap gap-1 items-center">
                            <RoleBadge role={user.role} />
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                              {user.extraRole}
                            </span>
                          </div>
                        ) : (
                          <RoleBadge role={user.role} />
                        )}
                      </td>
                      <td className="py-3.5 px-space-md font-body-sm text-body-sm text-on-surface-variant">
                        {user.date}
                      </td>
                      <td className="py-3.5 px-space-md">
                        <CoursesCell courses={user.courses} />
                      </td>
                      <td className="py-3.5 px-space-md">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-3.5 px-space-md text-right relative">
                        <div className="inline-flex items-center gap-1">
                          <button
                            className="btn-quick-role p-1.5 hover:bg-surface-container rounded-lg text-primary transition-colors"
                            title="Cambiar rol rápido"
                            type="button"
                            onClick={() => openRoleModal(user)}
                          >
                            <span className="material-symbols-outlined text-[20px]">badge</span>
                          </button>
                          <button
                            className="btn-row-menu p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors"
                            title="Más opciones"
                            type="button"
                            onClick={(event) => openMenu(user, event)}
                          >
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div
                className="p-space-xl flex flex-col items-center justify-center text-center"
                id="noResultsState"
              >
                <span className="material-symbols-outlined text-[48px] text-outline-variant mb-2">
                  person_search
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  No se encontraron usuarios
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-1">
                  No hay coincidencias con los criterios de búsqueda o filtros seleccionados.
                  Intenta modificar los términos.
                </p>
              </div>
            )}

            <div className="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Mostrando{' '}
                <span className="font-semibold text-on-surface" id="visibleCount">
                  {filteredUsers.length}
                </span>{' '}
                de <span className="font-semibold text-on-surface">1,420</span> usuarios
                registrados
              </span>
              <div className="inline-flex items-center gap-1">
                <button
                  className="px-3 py-1.5 rounded-lg bg-surface font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
                  disabled
                >
                  Anterior
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-semibold">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center">
                  3
                </button>
                <span className="px-1 text-on-surface-variant">•••</span>
                <button className="w-8 h-8 rounded-lg bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center justify-center">
                  71
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-surface font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {menu && (
            <div
              className="fixed z-50 w-56 rounded-xl bg-surface-container-lowest p-1.5 shadow-xl transition-all"
              id="rowDropdown"
              style={{ top: menu.top, left: menu.left }}
            >
              <div className="px-3 py-2 border-b border-surface-container-low mb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Opciones de Cuenta
                </span>
                <span
                  className="font-title-md text-[13px] text-on-surface font-semibold truncate block"
                  id="dropdownUserName"
                >
                  {menu.name}
                </span>
              </div>
              <button
                className="w-full flex items-center gap-space-xs px-3 py-2 rounded-lg text-left font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
                id="menuEditRole"
                type="button"
                onClick={() => {
                  const user = users.find((item) => item.id === menu.id);
                  if (user) openRoleModal(user);
                }}
              >
                <span className="material-symbols-outlined text-[18px] text-primary">edit</span>
                <span>Editar rol y permisos</span>
              </button>
              <button
                className="w-full flex items-center gap-space-xs px-3 py-2 rounded-lg text-left font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
                id="menuViewHistory"
                type="button"
                onClick={showHistory}
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  history_edu
                </span>
                <span>Historial inscripciones</span>
              </button>
              <button
                className="w-full flex items-center gap-space-xs px-3 py-2 rounded-lg text-left font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
                id="menuSuspend"
                type="button"
                onClick={suspendUser}
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  block
                </span>
                <span>Suspender acceso</span>
              </button>
              <button
                className="w-full flex items-center gap-space-xs px-3 py-2 rounded-lg text-left font-label-md text-label-md text-error hover:bg-error-container/40 transition-colors"
                id="menuDelete"
                type="button"
                onClick={deleteUser}
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span>Eliminar registro</span>
              </button>
            </div>
          )}

          {modalUser && (
            <div
              className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4"
              id="roleModalBackdrop"
              onClick={(event) => {
                if (event.target === event.currentTarget) closeRoleModal();
              }}
            >
              <div
                className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl relative transform transition-all"
                id="roleModalCard"
              >
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                  <div className="flex items-center gap-space-xs">
                    <div className="p-2 rounded-xl bg-primary-fixed text-primary">
                      <span className="material-symbols-outlined text-[24px]">verified_user</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Asignación de Rol
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Modificación inmediata de privilegios
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                    id="closeRoleModal"
                    type="button"
                    onClick={closeRoleModal}
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="py-space-md space-y-space-md">
                  <div className="p-space-sm rounded-xl bg-surface flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold" id="modalUserAvatar">
                      {modalUser.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className="font-title-md text-title-md text-on-surface font-semibold"
                        id="modalTargetName"
                      >
                        {modalUser.name}
                      </span>
                      <span
                        className="font-body-sm text-body-sm text-on-surface-variant truncate"
                        id="modalTargetEmail"
                      >
                        {modalUser.email}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-space-xs">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Selecciona el nuevo rol
                    </label>
                    <div className="grid grid-cols-1 gap-2.5">
                      <label className="flex items-start gap-space-sm p-3 rounded-xl bg-surface cursor-pointer hover:bg-surface-container transition-colors">
                        <input
                          className="mt-1 text-primary focus:ring-primary h-4 w-4"
                          name="modalRoleInput"
                          type="radio"
                          value="Estudiante"
                          checked={modalRole === 'Estudiante'}
                          onChange={() => setModalRole('Estudiante')}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-title-md text-[14px] text-on-surface font-semibold">
                              Estudiante
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-surface-container text-on-surface-variant">
                              Estándar
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Acceso a clases, tareas, certificaciones y foros de debate.
                          </p>
                        </div>
                      </label>
                      <label className="flex items-start gap-space-sm p-3 rounded-xl bg-surface cursor-pointer hover:bg-surface-container transition-colors">
                        <input
                          className="mt-1 text-primary focus:ring-primary h-4 w-4"
                          name="modalRoleInput"
                          type="radio"
                          value="Docente"
                          checked={modalRole === 'Docente'}
                          onChange={() => setModalRole('Docente')}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-title-md text-[14px] text-on-surface font-semibold">
                              Docente
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                              Facultad
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Gestión de syllabus, evaluación académica y seguimiento de
                            estudiantes.
                          </p>
                        </div>
                      </label>
                      <label className="flex items-start gap-space-sm p-3 rounded-xl bg-surface cursor-pointer hover:bg-surface-container transition-colors">
                        <input
                          className="mt-1 text-primary focus:ring-primary h-4 w-4"
                          name="modalRoleInput"
                          type="radio"
                          value="Administrador"
                          checked={modalRole === 'Administrador'}
                          onChange={() => setModalRole('Administrador')}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-title-md text-[14px] text-on-surface font-semibold">
                              Administrador
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary-fixed text-on-primary-fixed font-semibold">
                              Control Total
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Control global de plataforma, facturación, auditoría y seguridad.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs p-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-primary">info</span>
                    <span>
                      El cambio surtirá efecto inmediatamente tras la confirmación de
                      credenciales.
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-high">
                  <button
                    className="px-4 py-2 rounded-lg bg-surface font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
                    id="cancelRoleModal"
                    type="button"
                    onClick={closeRoleModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm flex items-center gap-1.5"
                    id="saveRoleModal"
                    type="button"
                    onClick={saveRoleModal}
                  >
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {toast && (
            <div
              className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl bg-on-surface p-space-md text-surface shadow-2xl flex items-center gap-space-sm transform transition-all duration-300"
              id="toastNotification"
            >
              <div className="p-1 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-title-md text-[13px] font-semibold text-surface" id="toastTitle">
                  {toast.title}
                </p>
                <p
                  className="font-body-sm text-body-sm text-surface-variant/80 truncate"
                  id="toastMessage"
                >
                  {toast.message}
                </p>
              </div>
              <button
                className="text-surface-variant hover:text-surface"
                id="closeToast"
                type="button"
                onClick={() => setToast(null)}
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
