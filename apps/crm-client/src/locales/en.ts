import { es } from './es';

// Type-check: EN must match structure of ES (Partial in practice, but ideally complete)
export const en: typeof es = {
    translation: {
        sidebar: {
            brand: {
                enterprise: "ENTERPRISE"
            },
            nav: {
                dashboard: "Dashboard",
                patients: {
                    section: "PATIENTS",
                    all: "All Patients",
                    adults: "Adults",
                    kids: "Children"
                },
                management: {
                    section: "MANAGEMENT",
                    individual: "Individual",
                    group: "Group",
                    calendar: "Calendar"
                },
                tools: {
                    section: "TOOLS",
                    resources: "Resources",
                    settings: "Settings"
                }
            },
            pwa: {
                install_short: "App",
                install_long: "Install App",
                download: "Download App"
            },
            user: {
                verified: "VERIFIED"
            },
            billing: {
                title: "Invoicing",
                subtitle: "Financial management, revenue and collection control.",
                kpis: {
                    revenue_year: "Revenue (Year)",
                    pending: "Pending",
                    month: "This Month"
                },
                filters: {
                    search_placeholder: "Search by client or number...",
                    all: "All",
                    draft: "Draft",
                    pending: "Pending",
                    paid: "Paid"
                },
                actions: {
                    new_invoice: "New Invoice",
                    charge: "Charge",
                    pdf: "PDF",
                    download_pdf: "Invoice",
                    delete: "Delete",
                    mark_paid: "Paid"
                },
                empty: "No invoices found."
            }
        }
    }
};
