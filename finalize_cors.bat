@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- ULTIMO PASO: APLICAR CANDADO DIGITAL (CORS) ---
echo Bucket confirmado: gs://webycrm-activa.firebasestorage.app
echo.

:: 1. Force Project Context again just to be safe
call gcloud config set project webycrm-activa

:: 2. Apply CORS to the NOW EXISTING bucket
echo Configurando permisos de subida...
call gsutil cors set cors.json gs://webycrm-activa.firebasestorage.app

echo.
echo --- VERIFICACION FINAL ---
call gsutil cors get gs://webycrm-activa.firebasestorage.app

echo.
echo Si ves texto JSON arriba, FELICIDADES.
echo Recarga la web y sube tu PDF.
pause
