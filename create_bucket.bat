@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- INTENTO DE CREACION DE BUCKET (RESCATE) ---
echo Al parecer tu proyecto NO TIENE un bucket de almacenamiento principal.
echo Vamos a intentar crearlo ahora mismo.
echo.

:: 1. Authentication Check (Just in case)
call gcloud config set project webycrm-activa

:: 2. Create the bucket (Standard Regional)
echo Intentando crear: gs://webycrm-activa.appspot.com ...
call gsutil mb -l europe-west1 gs://webycrm-activa.appspot.com
:: If it fails with "already exists", god. If "forbidden", permissions.

:: 3. Apply CORS (Just in case it worked)
echo.
echo Aplicando CORS (por si acaso)...
call gsutil cors set cors.json gs://webycrm-activa.appspot.com

echo.
echo --- RESULTADO ---
echo Si dice "Bucket created", HEMOS TRIUNFADO.
echo Si dice "409 Already Exists", entonces existe y es invisible.
echo Si dice "403 Forbidden", tu cuenta no puede crear buckets.
pause
