@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- DIAGNOSTICO DE CORS ---
echo Leyendo configuracion actual del bucket...
echo.

echo 1. webycrm-activa.firebasestorage.app:
call gsutil cors get gs://webycrm-activa.firebasestorage.app

echo.
echo 2. webycrm-activa.appspot.com:
call gsutil cors get gs://webycrm-activa.appspot.com

echo.
echo --- FIN DEL DIAGNOSTICO ---
pause
