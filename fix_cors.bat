@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- INICIANDO CORRECCION (BATCH MODE) ---
echo 1. Autentiscacion...
call firebase login --reauth

echo 2. Aplicando CORS bucket 1...
call gsutil cors set cors.json gs://webycrm-activa.firebasestorage.app

echo 3. Aplicando CORS bucket 2...
call gsutil cors set cors.json gs://webycrm-activa.appspot.com

echo --- TERMINADO ---
pause
