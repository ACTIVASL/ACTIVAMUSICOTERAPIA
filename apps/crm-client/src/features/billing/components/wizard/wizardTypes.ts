// Imports removed as they were unused in type definitions

export type WizardMode = 'INDIVIDUAL' | 'GROUP';

export type WizardStep = 1 | 2 | 3 | 4;

export interface BillableSession {
  id: string | number;
  price: number;
  date: string;
  time?: string;
  _type: 'individual' | 'group';
  patientId?: string; // For individual sessions
  groupName?: string; // For group sessions
  type?: string; // 'individual' | 'group' from raw session
}
