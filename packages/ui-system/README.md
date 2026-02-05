# @monorepo/ui-system

**The Titanium Design System for Activa CRM.**

This package contains all shared UI components, hooks, and utilities used across the Activa ecosystem (`crm-client`, `landing-web`).

## Philosophy

- **Titanium Standard**: Components must be robust, typed, and visually premium.
- **Zero Logic**: Components should not contain business logic. They receive data via props.
- **Tailwind Native**: Styled exclusively with Tailwind CSS.

## Usage

```tsx
import { Button, Card, Badge } from '@monorepo/ui-system';

export const MyComponent = () => (
  <Card>
    <h1 className="text-xl font-bold">Hello Titanium</h1>
    <Button variant="premium">Action</Button>
    <Badge variant="success">Active</Badge>
  </Card>
);
```

## Key Components

- **Layout**: `Card`, `Modal`, `PageTransition`
- **Forms**: `Button`, `Input` (coming soon), `SignaturePad`
- **Feedback**: `Toast`, `Loader`, `EmptyState`
- **Domain**: `PatientAvatar`, `SessionTimer`

## Development

Run `pnpm lint` to ensure code quality.
