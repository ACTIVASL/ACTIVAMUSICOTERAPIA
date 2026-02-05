# @monorepo/shared

**The Single Source of Truth for Data Types and Schemas.**

This package defines the contract between the database, the backend (Functions), and the frontend clients.

## Contents

### 1. Schemas (Zod)

Runtime validation for critical data structures.

- `PatientSchema`
- `SessionSchema`
- `InvoiceSchema`

### 2. Types (TypeScript)

Static types inferred from Zod schemas or defined manually for legacy support.

- `Patient`, `ClinicalRecord`
- `Session`, `GroupSession`
- `Invoice`, `Transaction`

### 3. Utils

Shared logic that must behave identically everywhere.

- `deepSanitize()`: Removes `undefined` values for Firestore compatibility.
- `cn()`: Class merging utility (if moved here).

## Usage

```typescript
import { PatientSchema, type Patient } from '@monorepo/shared';

const safeData = PatientSchema.parse(rawData);
```
