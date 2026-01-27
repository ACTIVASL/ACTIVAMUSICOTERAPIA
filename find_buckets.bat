@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- BUSCANDO BUCKETS REALES ---
echo Listando todos los buckets del proyecto...
echo.

call gsutil ls

echo.
echo --- RECOPILACION TERMINADA ---
echo Por favor, copia la lista de arriba (empiezan por gs://)
pause
