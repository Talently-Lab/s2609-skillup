# Flujo de trabajo Git: start | finish | sync  (ver AGENTS.md)
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [ValidateSet("start", "finish", "sync")]
    [string]$Action,

    [string]$Rol = "",
    [string]$Feature = "",
    [string]$Titulo = "",
    [string]$Resumen = ""
)

$ErrorActionPreference = "Continue"
try { [Console]::OutputEncoding = [Text.Encoding]::UTF8 } catch { }
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot
$rolesValidos = @("frontend", "backend", "qa", "ux")

function Fail([string]$msg) { Write-Host "`n✗ $msg" -ForegroundColor Red; exit 1 }
function Ok([string]$msg)   { Write-Host "✓ $msg" -ForegroundColor Green }
function Warn([string]$msg) { Write-Host "! $msg" -ForegroundColor Yellow }

function Invoke-Git {
    param([string[]]$GitArgs)
    $out = & git @GitArgs 2>&1
    if ($LASTEXITCODE -ne 0) {
        Fail ("git " + ($GitArgs -join ' ') + "`n" + (($out | Out-String).Trim()))
    }
    return ($out | Out-String).Trim()
}

function Get-Dirty {
    return (git status --porcelain | Where-Object { $_ -ne "" }).Count -gt 0
}

function Update-Registro {
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { Warn "gh CLI no instalado: REGISTRO.md no se pudo regenerar."; return }
    $prs = gh pr list --state all --limit 300 --json number,title,url,headRefName,mergedAt,closedAt,author,state 2>$null | ConvertFrom-Json
    if (-not $prs) { Warn "No se pudieron leer los PRs de GitHub (¿auth de gh?)."; return }

    $rows = foreach ($p in ($prs | Sort-Object number)) {
        $fecha = if ($p.mergedAt) { $p.mergedAt.Substring(0, 10) }
                 elseif ($p.closedAt) { $p.closedAt.Substring(0, 10) }
                 else { "—" }
        $estado = switch ($p.state) { "MERGED" { "✅ merged" } "OPEN" { "🔵 abierto" } "CLOSED" { "❌ cerrado" } default { $p.state } }
        $autor = if ($p.author) { $p.author.login } else { "—" }
        $titulo = $p.title -replace '\|', '/'
        "| #$($p.number) | [$titulo]($($p.url)) | ``$($p.headRefName)`` | $autor | $fecha | $estado |"
    }

    $tabla = (@(
        "| # | PR | Rama | Autor | Fecha | Estado |",
        "|---|----|------|-------|-------|--------|"
    ) + $rows) -join "`n"

    $file = "REGISTRO.md"
    $content = Get-Content $file -Raw -Encoding UTF8
    $nuevo = [regex]::Replace($content, "(?s)<!-- registro:inicio -->.*?<!-- registro:fin -->",
        "<!-- registro:inicio -->`n$tabla`n<!-- registro:fin -->")
    if ($nuevo -ne $content) {
        Set-Content -Path $file -Value $nuevo -Encoding UTF8 -NoNewline
        Ok "REGISTRO.md actualizado con los PRs de GitHub."
    } else {
        Ok "REGISTRO.md ya estaba al día."
    }
}

switch ($Action) {

    "start" {
        if (-not $Rol -or -not $Feature) { Fail "Usá: .\scripts\feature.ps1 start -Rol frontend -Feature login-google" }
        if ($rolesValidos -notcontains $Rol) { Fail "Rol inválido '$Rol'. Válidos: $($rolesValidos -join ', ')" }
        $branch = "$Rol/feature/$Feature"

        Ok "Consultando el remoto (no pisa nada, solo lee)..."
        Invoke-Git @("fetch", "origin")

        if (Get-Dirty) { Fail "Hay cambios sin commitear en el árbol. Commiteá o stash-eá antes de crear la rama (nunca piso cambios locales)." }

        Ok "Actualizando main con --ff-only (solo avanza; si diverge, aborta)..."
        Invoke-Git @("checkout", "main")
        Invoke-Git @("pull", "--ff-only", "origin", "main")

        $existe = git rev-parse -q --verify $branch 2>$null
        if ($existe) {
            Invoke-Git @("checkout", $branch)
            Ok "Rama existente: $branch (ya estaba al día con main)."
        } else {
            Invoke-Git @("checkout", "-b", $branch)
            Ok "Rama creada desde main actualizada: $branch"
        }
        Write-Host "`nTrabajá cuando quieras. Al terminar:  .\scripts\feature.ps1 finish" -ForegroundColor Cyan
    }

    "finish" {
        $branch = git branch --show-current
        if ($branch -notmatch '^(frontend|backend|qa|ux)/feature/.+') {
            Fail "Estás en '$branch'. Para terminar hay que estar en una rama <rol>/feature/<nombre>."
        }
        if (Get-Dirty) { Fail "Hay cambios sin commitear. Commitealos antes de subir." }

        Invoke-Git @("fetch", "origin")

        $remoteTip = git rev-parse -q --verify "refs/remotes/origin/$branch" 2>$null
        $localTip  = git rev-parse HEAD
        if ($remoteTip -and $remoteTip -ne $localTip) {
            & git merge-base --is-ancestor $remoteTip $localTip 2>$null
            if ($LASTEXITCODE -ne 0) {
                Fail "El remoto tiene cambios en '$branch' que no tenés. Ejecutá: git pull --ff-only origin $branch (si aborta, no fuerces: pedí instrucciones)."
            }
        }

        Invoke-Git @("push", "-u", "origin", $branch)
        Ok "Rama subida: $branch"

        if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { Fail "Instalá gh CLI para abrir el PR: https://cli.github.com" }
        $existePr = gh pr view $branch --json url -q .url 2>$null
        if ($existePr) {
            Ok "El PR ya existe: $existePr"
        } else {
            $tit = if ($Titulo) { $Titulo }
                   elseif ($Resumen) { $Resumen }
                   else { $branch -replace '^[^/]+/feature/', '' -replace '-', ' ' }
            $stat = git diff --stat "origin/main...HEAD" | Out-String
            $body = @"
## Qué se hizo
$Resumen

## Cómo se probó
-

## Archivos tocados
``````
$($stat.Trim())
``````

## Notas / riesgos para revisión
-
"@
            $url = gh pr create --base main --head $branch --title $tit --body $body 2>&1
            if ($LASTEXITCODE -ne 0) { Fail ("No se pudo abrir el PR:`n$url") }
            Ok "PR abierto: $url"
        }

        Update-Registro
        if (Get-Dirty) {
            Invoke-Git @("add", "-A")
            Invoke-Git @("commit", "-m", "docs(registro): actualiza REGISTRO.md con los PRs de GitHub")
            Invoke-Git @("push")
        }
        Write-Host "`nListo. Cuando el PR se merge-e, cualquiera puede regenerar el registro con:  .\scripts\feature.ps1 sync" -ForegroundColor Cyan
    }

    "sync" {
        Update-Registro
        if (Get-Dirty) {
            Warn "REGISTRO.md cambió: commitealo dentro de tu PR (o abrí un PR solo para eso)."
        }
    }
}
