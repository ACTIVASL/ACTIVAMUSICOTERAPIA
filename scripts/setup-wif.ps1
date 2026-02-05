# Configuacion
$PROJECT_ID = "webycrm-activa"
$POOL_NAME = "github-pool"
$PROVIDER_NAME = "github-provider"
$SA_NAME = "github-actions-sa"
$REPO_NAME = "ACTIVASL/ACTIVAMUSICOTERAPIA" 

Write-Host ">>> CONFIGURANDO WORKLOAD IDENTITY FEDERATION (WIF)"
Write-Host "Proyecto: $PROJECT_ID"
Write-Host "Repo: $REPO_NAME"
Write-Host ""

# 1. Habilitar APIs necesarias
Write-Host "[1/6] Habilitando IAM Credentials API..."
cmd /c "gcloud services enable iamcredentials.googleapis.com --project=$PROJECT_ID --quiet"

# 2. Crear Service Account (si no existe)
Write-Host "[2/6] Verificando Service Account..."
cmd /c "gcloud iam service-accounts create $SA_NAME --display-name=`"GitHub Actions Deployer`" --project=$PROJECT_ID --quiet" 2>$null

# 3. Crear Identity Pool
Write-Host "[3/6] Creando Identity Pool..."
cmd /c "gcloud iam workload-identity-pools create $POOL_NAME --project=$PROJECT_ID --location=global --display-name=`"GitHub Pool`" --quiet" 2>$null

# 4. Crear Provider (GitHub OIDC)
Write-Host "[4/6] Creando Identity Provider..."
cmd /c "gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME --project=$PROJECT_ID --location=global --workload-identity-pool=$POOL_NAME --display-name=`"GitHub Provider`" --attribute-mapping=`"google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository`" --issuer-uri=`"https://token.actions.githubusercontent.com`" --quiet" 2>$null

# 5. Obtener el ID completo del Provider
$POOL_ID = cmd /c "gcloud iam workload-identity-pools describe $POOL_NAME --project=$PROJECT_ID --location=global --format=`"value(name)`""
$PROVIDER_ID = "$POOL_ID/providers/$PROVIDER_NAME"

# 6. Conectar GitHub Repo -> Service Account
Write-Host "[5/6] Autorizando repositorio (IAM Binding)..."
$SA_EMAIL = "$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"
# Permitir que cualquier rama del repo impersone la SA
cmd /c "gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL --project=$PROJECT_ID --role=`"roles/iam.workloadIdentityUser`" --member=`"principalSet://iam.googleapis.com/$POOL_ID/attribute.repository/$REPO_NAME`" --quiet"

# Roles necesarios para la SA (si no los tiene)
cmd /c "gcloud projects add-iam-policy-binding $PROJECT_ID --member=`"serviceAccount:$SA_EMAIL`" --role=`"roles/firebase.admin`" --quiet"
cmd /c "gcloud projects add-iam-policy-binding $PROJECT_ID --member=`"serviceAccount:$SA_EMAIL`" --role=`"roles/serviceusage.serviceUsageAdmin`" --quiet"
cmd /c "gcloud projects add-iam-policy-binding $PROJECT_ID --member=`"serviceAccount:$SA_EMAIL`" --role=`"roles/cloudrun.admin`" --quiet"
cmd /c "gcloud projects add-iam-policy-binding $PROJECT_ID --member=`"serviceAccount:$SA_EMAIL`" --role=`"roles/storage.admin`" --quiet"

Write-Host ""
Write-Host ">>> CONFIGURACION COMPLETA!"
Write-Host ""
Write-Host "ACCION REQUERIDA EN GITHUB:"
Write-Host "1. Ve a GitHub > Settings > Secrets and variables > Actions > Variables"
Write-Host "2. Crea una VARIABLE llamada: GCP_WORKLOAD_IDENTITY_PROVIDER"
Write-Host "   Valor: $PROVIDER_ID"
Write-Host "3. Crea una VARIABLE llamada: GCP_SERVICE_ACCOUNT"
Write-Host "   Valor: $SA_EMAIL"
Write-Host ""
Write-Host "Nota: No necesitas Secrets. Son variables publicas (Repository variables)."
