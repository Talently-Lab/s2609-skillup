export default function Topbar() {
  return (
    <div className="w-full bg-surface-container-low py-2.5">
      <div className="max-w-7xl mx-auto px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-primary">school</span>
          <span>Plataforma de Aprendizaje Activo</span>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-medium">
            Entorno Universitario &amp; Certificaciones
          </span>
        </div>
        <div className="hidden md:flex items-center gap-space-sm">
          <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/50 px-2 py-0.5 rounded-full font-semibold">
            Periodo Académico 2025-1
          </span>
        </div>
      </div>
    </div>
  );
}
