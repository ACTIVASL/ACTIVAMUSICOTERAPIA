@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- INICIANDO CONFIGURACION DEFINITIVA ---
echo Asegurando que estamos en el proyecto correcto...
echo.

:: 1. Force GCloud to look at the right project
call gcloud config set project webycrm-activa

echo.
echo 2. Aplicando CORS al bucket CONFIRMADO: webycrm-activa.firebasestorage.app
call gsutil cors set cors.json gs://webycrm-activa.firebasestorage.app

echo.
echo 3. Verificando si se guardo...
call gsutil cors get gs://webycrm-activa.firebasestorage.app

echo.
echo --- PROCESO TERMINADO ---
pause
