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

## Arquitectura (frontend)

- `frontend/src/components`: Componentes reutilizables (Navbar, Cards, Modales).
- `frontend/src/pages`: Vistas del MVP (Catálogo, Login, Dashboard de Alumno, Admin).
- `frontend/src/routes`: Sistema de enrutamiento con React Router DOM.
