@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- CONSTRUYENDO Y DESPLEGANDO FRONTEND "TITANIUM" ---
echo 1. Building...
call npm run build

echo.
echo 2. Deploying to Firebase Hosting...
call firebase deploy --only hosting

echo.
echo === DESPLIEGUE COMPLETADO ===
echo Por favor recarga la pagina web.
pause
