@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- LISTADO DE BUCKETS (AUTENTICADO) ---
echo Ahora que estas logueado como info@activamusicoterapia.com,
echo vamos a preguntar a Google cuales son tus buckets reales.
echo.

call gsutil ls

echo.
echo --- RECOPILACION TERMINADA ---
echo Copia el resultado que empieza por gs://
pause
