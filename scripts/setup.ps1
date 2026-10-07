param()

try { [Console]::OutputEncoding = [Text.Encoding]::UTF8 } catch { }
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

git config core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) { Write-Host "✗ No se pudo configurar core.hooksPath" -ForegroundColor Red; exit 1 }

git config pull.ff only
if ($LASTEXITCODE -ne 0) { Write-Host "✗ No se pudo configurar pull.ff only" -ForegroundColor Red; exit 1 }

Write-Host "✓ Hooks activos (.githooks/pre-push): no se sube a main, no se borran ramas, no se pisa trabajo ajeno." -ForegroundColor Green
Write-Host "✓ pull.ff only: 'git pull' nunca sobreescribe, solo avanza (si diverge, aborta)." -ForegroundColor Green
