/**
 * API Routes for BetterAuth.
 */

// External Modules ----------------------------------------------------------

import { toNextJsHandler } from "better-auth/next-js";

// Internal Modules ----------------------------------------------------------

import auth from "@/lib/BetterAuthServer";

// Public Objects ------------------------------------------------------------

export const { GET, POST } = toNextJsHandler(auth.handler);
