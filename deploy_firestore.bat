@echo off
cd /d "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

echo --- DESPLEGANDO REGLAS DE FIRESTORE "TITANIUM" ---
echo Hotfix: Habilitando escritura en 'patients/{id}/documents'
echo.

call firebase deploy --only firestore

echo.
echo Reglas aplicadas. La subida de archivos deberia completar el paso final (Metadata Sync).
pause
