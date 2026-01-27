@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- DESPLEGANDO REGLAS DE STORAGE "TITANIUM" ---
echo Reglas actualizadas para permitir 100MB y Audio.
echo.

call firebase deploy --only storage

echo.
echo Si ves "Deploy complete", el error 403 deberia desaparecer.
echo Prueba subir un archivo ahora.
pause
