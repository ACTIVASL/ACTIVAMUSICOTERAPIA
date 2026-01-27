@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- REPARACION DE PERMISOS (GCLOUD) ---
echo.
echo ! IMPORTANTE !
echo La terminal esta usando una cuenta ROBOT (github-deployer) que no tiene permisos.
echo Vamos a cambiar a tu cuenta de dueo (la que usas en el navegador).
echo.
echo 1. Se abrira el navegador.
echo 2. Elige tu cuenta de Google.
echo 3. Dale a "Permitir" a todo.
echo.
pause

echo --- PASO 1: CAMBIO DE IDENTIDAD ---
call gcloud auth login --force

echo.
echo --- PASO 2: FIJAR PROYECTO ---
call gcloud config set project webycrm-activa

echo.
echo --- PASO 3: APLICAR CORS (AHORA SI) ---
call gsutil cors set cors.json gs://webycrm-activa.firebasestorage.app

echo.
echo --- VERIFICACION ---
call gsutil cors get gs://webycrm-activa.firebasestorage.app

echo.
echo SI VES TEXTO JSON ARRIBA = PROCESO EXITOSO.
pause
