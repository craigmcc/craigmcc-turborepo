/**
 * Client side configuration for BetterAuth.
 */

// External Modules ----------------------------------------------------------

import { createAuthClient } from "better-auth/client";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default authClient;
