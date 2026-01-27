// TITANIUM CONFIG: Centralized Firebase Config Proxy
// Redirects to the SINGLE source of truth in the monorepo engine.
// This prevents "Double Initialization" bugs and Permission Denied errors.
export { app, db, auth, storage } from '@monorepo/engine-auth';

