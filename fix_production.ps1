Write-Host "🚀 INICIANDO REPARACIÓN DE PRODUCCIÓN (TITANIUM)" -ForegroundColor Cyan
Set-Location "c:\Users\Usuario\.gemini\antigravity\scratch\monorepo-crm-activa"

# 1. Re-Autenticación (Requerido por error de credenciales)
Write-Host "1. Renovando credenciales de Firebase..." -ForegroundColor Yellow
firebase login --reauth

# 2. Despliegue de Reglas (Arregla notas clínicas y permisos)
Write-Host "2. Desplegando Reglas de Seguridad (Firestore)..." -ForegroundColor Yellow
firebase deploy --only firestore:rules

# 3. Configuración CORS (Arregla PDFs e Imágenes)
Write-Host "3. Aplicando parche CORS a Storage..." -ForegroundColor Yellow
# Usando ruta relativa ya que el script está en la raíz
cmd /c "gsutil cors set cors.json gs://webycrm-activa.firebasestorage.app"

Write-Host "✅ REPARACION COMPLETADA." -ForegroundColor Green
Write-Host "Por favor, recarga la pagina web (F5) y prueba de nuevo." -ForegroundColor White
