# Reglas de Git del repo

Vinculante para agentes y colaboradores. El hook `.githooks/pre-push` las hace cumplir.

## Prohibido

- Subir directo a `main` (siempre vía PR).
- `git push --force` / `--force-with-lease`.
- Borrar o renombrar ramas ajenas.
- Pisar trabajo de otro: `git pull` sin `--ff-only`, `reset --hard`, `rebase` sobre ramas
  ajenas, checkout con cambios sin commitear, o cualquier operación destructiva.
  Cualquier operación de este tipo requiere **autorización explícita del usuario**.

## Flujo de trabajo

1. **Antes de tocar nada**: `git fetch origin` y verificar que no haya commits nuevos.
   Si los hay, `git pull --ff-only` (solo avanza; si divergió, aborta y se pide indicaciones).
2. **Arrancar un cambio**: `.\scripts\feature.ps1 start -Rol <rol> -Feature <nombre>`
   (fetch, valida árbol limpio, actualiza `main` con `--ff-only` y crea la rama).
3. **Trabajar y commitear** normalmente.
4. **Terminar**: `.\scripts\feature.ps1 finish` → push de la rama + actualiza `REGISTRO.md`
   + abre el PR a `main` con la plantilla (qué se hizo, cómo se probó, archivos, riesgos).

## Nombre de rama

`<rol>/feature/<nombre-del-feature>` con rol ∈ `frontend` | `backend` | `qa` | `ux`.
Ejemplo: `frontend/feature/login-google`. El hook rechaza cualquier otro formato.

## Registro

`REGISTRO.md` concentra el historial de PRs (qué se hizo, cuándo, quién, estado) para poder
rastrear de dónde salió un error técnico. Se regenera desde GitHub con
`.\scripts\feature.ps1 sync` y se commitea dentro del PR.

## Configuración por colaborador (una vez por clone)

`.\scripts\setup.ps1` → activa los hooks (`core.hooksPath`) y `pull.ff only`.
Sin esto, los bloqueos del hook no están activos.
