# One command: save all changes and push to GitHub (triggers Vercel deploy).
param(
  [string]$Message = "Update site"
)

Set-Location $PSScriptRoot\..

git add -A
$status = git status --porcelain
if (-not $status) {
  Write-Host "Nothing to commit — working tree clean."
  git push origin HEAD
  exit 0
}

git -c user.name="Oluwasegun315" -c user.email="Oluwasegun315@users.noreply.github.com" commit -m $Message
git push origin HEAD
Write-Host "Pushed to GitHub. Vercel will redeploy in a few minutes."
