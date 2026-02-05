import React from 'react';
import { WizardMode, BillableSession } from './wizardTypes';
import { ClinicSettings } from '../../../../lib/types';
import { InvoicePreview } from '../InvoicePreview';
import { IssuerConfigForm } from '../IssuerConfigForm';

interface WizardStep4Props {
  mode: WizardMode;
  selectedName: string;
  invoiceDate: string;
  setInvoiceDate: (d: string) => void;
  customInvoiceNumber: string;
  setCustomInvoiceNumber: (n: string) => void;
  selectedSessions: BillableSession[];
  billingData: NonNullable<ClinicSettings['billing']>;
  setBillingData: (d: NonNullable<ClinicSettings['billing']>) => void;
}

export const WizardStep4_Summary: React.FC<WizardStep4Props> = ({
  selectedName,
  invoiceDate,
  setInvoiceDate,
  customInvoiceNumber,
  setCustomInvoiceNumber,
  selectedSessions,
  billingData,
  setBillingData,
}) => {
  const totalAmount = selectedSessions.reduce((acc, s) => acc + (Number(s.price) || 0), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* LEFT: INVOICE PREVIEW */}
      <InvoicePreview
        selectedName={selectedName}
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        customInvoiceNumber={customInvoiceNumber}
        setCustomInvoiceNumber={setCustomInvoiceNumber}
        selectedSessions={selectedSessions}
        totalAmount={totalAmount}
      />

      {/* RIGHT: ISSUER CONFIG */}
      <IssuerConfigForm billingData={billingData} setBillingData={setBillingData} />
    </div>
  );
};
