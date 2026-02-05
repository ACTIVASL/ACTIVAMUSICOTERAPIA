# @monorepo/engine-auth

**The Authentication Core.**

Manages user identity, session persistence, and security context.

## Key Features

- **Firebase Auth Wrapper**: `auth`, `db`, `storage` instances initialized securely.
- **Hooks**: `useAuth()` for reactive session state.
- **Login View**: Standardized login screen for all apps.
- **Persistence**: Handles token refresh and local storage.

## Usage

```tsx
import { useAuth } from '@monorepo/engine-auth';

const { user, login, logout } = useAuth();
```
