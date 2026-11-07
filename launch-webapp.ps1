$ErrorActionPreference = "Stop"
$webappUrl = "http://127.0.0.1:4173"
$serverPath = Join-Path $PSScriptRoot "local-server.cjs"

function Test-WebAppReady {
  try {
    $response = Invoke-WebRequest -Uri $webappUrl -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -eq 200 -and $response.Content.Contains("PROSet Wireless")
  } catch {
    return $false
  }
}

if (Test-WebAppReady) {
  Start-Process $webappUrl
  exit 0
}

$node = Get-Command node.exe -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Host "Node.js is required to start this webapp, but node.exe was not found." -ForegroundColor Red
  exit 1
}
if (-not (Test-Path -LiteralPath $serverPath -PathType Leaf)) {
  Write-Host "The local web service was not found: $serverPath" -ForegroundColor Red
  exit 1
}

try {
  $server = Start-Process -FilePath $node.Source -ArgumentList ('"{0}"' -f $serverPath) -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru
} catch {
  Write-Host "Could not start the local web service: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}

for ($attempt = 0; $attempt -lt 40; $attempt += 1) {
  if (Test-WebAppReady) {
    Start-Process $webappUrl
    exit 0
  }
  if ($server.HasExited) { break }
  Start-Sleep -Milliseconds 250
}

if (-not $server.HasExited) {
  Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
Write-Host "The webapp did not become ready. Check whether port 4173 is available, then try again." -ForegroundColor Red
exit 1