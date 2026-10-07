# SkillUp Campus

Repositorio de la plataforma educativa SkillUp Campus.

## Estructura

- `frontend/` — SPA construida con React, Vite y Tailwind CSS.
- `back/` — backend (por definir).
- `qa/` — documentación y recursos de QA (por definir).
- `ux/` — links de diseño: prototipo, journey map, brief y docs de UX.

## Setup Local (frontend)

1. Entrar a la carpeta: `cd frontend`
2. Instalar dependencias: `npm install`
3. Variables de entorno: `cp .env.example .env`
4. Correr en modo desarrollo: `npm run dev`

## Flujo de trabajo (Git)

Nada se sube directo a `main`: siempre por rama `<rol>/feature/<nombre>` + PR.
Reglas completas en [AGENTS.md](AGENTS.md). Setup por colaborador (una vez): `.\scripts\setup.ps1`.

1. `.\scripts\feature.ps1 start -Rol frontend -Feature mi-cambio`
2. Trabajar y commitear
3. `.\scripts\feature.ps1 finish` → push + `REGISTRO.md` + PR

El historial de lo que se hizo queda en [REGISTRO.md](REGISTRO.md).

## Arquitectura (frontend)

- `frontend/src/components`: Componentes reutilizables (Navbar, Cards, Modales).
- `frontend/src/pages`: Vistas del MVP (Catálogo, Login, Dashboard de Alumno, Admin).
- `frontend/src/routes`: Sistema de enrutamiento con React Router DOM.
