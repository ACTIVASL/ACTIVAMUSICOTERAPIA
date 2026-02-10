<div align="center">

# 🏥 ACTIVA S.L.

### TITANIUM™ CLINICAL OPERATING SYSTEM

[![Status](https://img.shields.io/badge/system-OPERATIONAL-success?style=for-the-badge)](https://app-activamusicoterapia.web.app)
[![Version](https://img.shields.io/badge/release-V2.0_TITANIUM-EC008C?style=for-the-badge)](https://github.com/ACTIVASL/ACTIVA-MUSICOTERAPIA/releases)
[![Security](https://img.shields.io/badge/security-FORENSIC_AUDIT-blue?style=for-the-badge)](./docs/SECURITY.md)
[![Compliance](https://img.shields.io/badge/legal-GDPR%20%2F%20LOPD-lightgrey?style=for-the-badge)](./docs/LEGAL.md)

**[🌐 Portal Corporativo](https://www.activamusicoterapia.com)** • **[🔐 Acceso Clínico](https://app-activamusicoterapia.web.app)** • **[📄 Documentación Técnica](./docs)**

</div>

---

## 🏢 Sobre ACTIVA S.L.

**ACTIVA S.L.** (Sociedad Limitada) es la entidad líder en innovación clínica y musicoterapia avanzada. Este repositorio aloja el código fuente de nuestro **Sistema Operativo Clínico Propietario (Titanium OS)**, una plataforma de gestión integral desarrollada in-house para garantizar la máxima calidad asistencial, seguridad del dato y eficiencia operativa.

No utilizamos software de terceros. Creamos nuestra propia tecnología para controlar cada píxel de la experiencia del paciente.

---

## 💎 Estándar TITANIUM™ (V2026)

El sello **Titanium** certifica que este software cumple con los estándares más rigurosos de la industria del desarrollo de software clínico:

### 1. 👁️ Auditoría Forense ("God Mode")

Cada interacción en el sistema deja una huella inmutable y trazable.

- **Sesiones & Citas**: Registro exacto de creación, modificación y cancelación.
- **Historia Clínica**: Control de versiones de informes y evolutivos.
- **Facturación**: Trazabilidad financiera completa (Emisión, Cobro, Anulación).
- **Ciclo de Vida del Paciente**: Registro de altas, bajas y reingresos.

### 2. 🛡️ Seguridad Zero-Trust

- Arquitectura **Serverless** sobre Google Cloud (Firebase).
- Reglas de seguridad estrictas a nivel de base de datos.
- **Content Security Policy (CSP)** de grado militar anti-XSS.
- Encriptación en tránsito y en reposo.

### 3. 🎨 Experiencia de Usuario "Premium"

- Interfaz **Glassmorphism** propietaria diseñada para reducir la fatiga cognitiva clínica.
- **Mobile First**: Aplicación Web Progresiva (PWA) instalable como nativa en iOS y Android.
- Tiempos de carga < 100ms (Optimizaciones Titanium).

---

## 🏗️ Arquitectura del Sistema

Este proyecto es un **Monorepo** moderno que centraliza toda nuestra tecnología:

```
ACTIVA-SL-CORE/
├── apps/
│   ├── crm-client/       # 🚀 Titanium CRM (Herramienta Clínica del Terapeuta)
│   │   ├── src/features/ # Módulos: Pacientes, Agenda, Facturación, Informes
│   │   └── src/data/     # Capa de Datos con Auditoría Integrada
│   ├── landing-web/      # 🌐 Web Corporativa (Captación de Pacientes)
├── packages/
│   ├── shared/           # 🧬 Lógica Compartida (Tipos, Validaciones Zod)
│   ├── ui-system/        # 🎨 Sistema de Diseño "Activa UI"
│   └── engine-auth/      # 🔐 Núcleo de Autenticación
└── ...
```

### Stack Tecnológico

Utilizamos una pila tecnológica de vanguardia para garantizar estabilidad a largo plazo:

| Capa         | Tecnología          | Propósito                                |
| :----------- | :------------------ | :--------------------------------------- |
| **Frontend** | React 18 + Vite     | Rendimiento extremo y reactividad.       |
| **Lenguaje** | TypeScript 5.6      | Seguridad de tipos y mantenibilidad.     |
| **Database** | Cloud Firestore     | Base de datos NoSQL en tiempo real.      |
| **Auth**     | Identity Platform   | Gestión de identidad segura.             |
| **Hosting**  | Firebase Global CDN | Entrega de contenido milimétrica.        |
| **Audit**    | Titanium Logger     | Sistema de registro forense propietario. |

---

## 🚀 Despliegue y Operaciones

El sistema utiliza **CI/CD** (Integración y Despliegue Continuo) para asegurar que cada línea de código en producción ha sido verificada.

### Comandos de Ingeniería

```bash
# Instalación del Entorno
npm install

# Iniciar Sistema en Desarrollo
npm run dev

# Compilación "Titanium Build" (Optimized)
npm run build

# Despliegue a Producción (Requiere Credenciales de Admin)
firebase deploy
```

---

## ⚖️ Legal y Propiedad Intelectual

**Copyright © 2026 ACTIVA S.L.** Todos los derechos reservados.

El código fuente contenido en este repositorio es **PROPIEDAD INTELECTUAL PRIVADA** de ACTIVA S.L. Queda estrictamente prohibida su copia, distribución, modificación o uso no autorizado sin el consentimiento expreso y por escrito de la dirección de la empresa.

_Desarrollado por la división de tecnología de Activa S.L._
