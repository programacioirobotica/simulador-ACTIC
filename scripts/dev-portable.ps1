param(
  [string]$NodeRoot = ".tools\\node"
)

$nodeExe = Join-Path $NodeRoot "node.exe"
$npmCli = Join-Path $NodeRoot "node_modules\\npm\\bin\\npm-cli.js"

if (!(Test-Path $nodeExe)) {
  Write-Host "No se encuentra node portable en $NodeRoot" -ForegroundColor Red
  Write-Host "Descarga el ZIP de Node para Windows x64 y descomprímelo en .tools/node" -ForegroundColor Yellow
  exit 1
}

if (!(Test-Path $npmCli)) {
  Write-Host "No se encuentra npm-cli.js en $npmCli" -ForegroundColor Red
  Write-Host "Asegúrate de usar una distribución de Node que incluya npm." -ForegroundColor Yellow
  exit 1
}

& $nodeExe $npmCli install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $nodeExe $npmCli run dev
exit $LASTEXITCODE
