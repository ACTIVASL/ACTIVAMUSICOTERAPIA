# @monorepo/engine-billing

**The Financial Engine.**

Handles atomic invoice generation, sequence management, and financial calculations.

## Core Logic

- **Atomic Transactions**: Ensures invoice numbers are unique (e.g., `INV-2026-001`) via `sequences` collection lock.
- **Generators**: `InvoiceGenerator` component for PDF rendering/printing.
- **Logic**: `BillingRepository` (located in app data layer, but using types from here).

## Dependencies

- Requires `@monorepo/shared` for Invoice types.
