param(
  [int]$Port = 4173
)

$dist = "dist"
if (!(Test-Path $dist)) {
  Write-Host "No existe ./dist. Primero ejecuta build (local o CI)." -ForegroundColor Red
  exit 1
}

$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
  Write-Host "Sirviendo dist en http://localhost:$Port" -ForegroundColor Green
  python -m http.server $Port --directory $dist
  exit $LASTEXITCODE
}

$py = Get-Command py -ErrorAction SilentlyContinue
if ($py) {
  Write-Host "Sirviendo dist en http://localhost:$Port" -ForegroundColor Green
  py -m http.server $Port --directory $dist
  exit $LASTEXITCODE
}

Write-Host "No se encontró Python para servir dist." -ForegroundColor Red
exit 1
