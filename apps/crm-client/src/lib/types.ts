import {
  Patient,
  Session,
  ClinicalFormulation,
  CognitiveScores,
  ClinicalSafetyProfile,
  MusicalIdentity,
  PsychosocialContext,
  ForensicMetadata,
  DocumentCategoryEnum,
  GroupSession, // IMPORTED FROM SHARED
} from '@monorepo/shared';

// Re-exporting for local usage
export type { Patient, Session, ClinicalFormulation, CognitiveScores, ClinicalSafetyProfile, MusicalIdentity, PsychosocialContext, ForensicMetadata, GroupSession };
export { DocumentCategoryEnum };

// TITANIUM NAVIGATION
export interface NavigationOptions {
  mode?: 'new' | 'edit';
  id?: string | number;
  action?: string;
}
export type NavigationPayload = Patient | string | number | NavigationOptions | undefined;

export interface CalendarEvent {
  date: string;
  time: string;
  type: 'individual' | 'group';
  title?: string;
  patientName?: string;
}

// --- FRONTEND SPECIFIC TYPES ---

export interface ClinicSettings {
  name?: string;
  cif?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  legalText?: string;
  notificationsEnabled?: boolean;
  billing?: {
    legalName: string;
    nif: string;
    address: string;
    logoUrl: string; // URL or Base64
    email?: string;
    phone?: string;
  };
}

export interface FormulationData {
  selected: string[];
  text: string;
}

// LEGACY ADAPTERS (To be phased out)
// Some components might still expect specific structures not fully covered by Zod yet, 
// or Zod is stricter. We keep these compatible.

export interface SessionSelfReflection {
  positive: string;
  improve: string;
}

export interface QualitativeEval {
  musical?: string;
  emotional?: string;
  cognitive?: string;
  physical?: string;
}

// (GroupSession is now imported from shared)

// --- COMMERCE & BILLING ---

export interface InvoiceData {
  clientName: string;
  clientMeta?: string;
  sessions: Session[];
  invoiceNumber?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  number: string;
  patientId: string;
  patientName: string;
  items: InvoiceItem[];
  total: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  validUntil: string;
  createdAt: string;
}

// --- NEW FEATURES ---

export interface RecurrenceRule {
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  daysOfWeek: number[]; // 1=Monday, 7=Sunday
  endDate?: string;
  occurrences?: number;
}

export interface WaitlistEntry {
  id: string;
  patientId: string;
  patientName: string;
  preferredDays: string[];
  notes: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
}

export interface ClinicalReportConfig {
  includeDiagnosis: boolean;
  includeEvolutionCharts: boolean;
  includeSessions: boolean;
  dateRange: { start: string; end: string };
}

export interface ClinicalReport {
  id: string;
  patientId: string;
  patientName: string;
  type: 'initial' | 'evolution' | 'discharge';
  date: string;
  content: string;
  status: 'draft' | 'final';
  generatedBy: string;
}

export interface ClinicalGuide {
  title: string;
  objectives: string[];
  techniques: string[];
  precautions: string[];
  focus: string;
}
