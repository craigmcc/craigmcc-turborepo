/**
 * Extend the BetterAuth session type to include a Profile.
 */

import { Profile } from "@repo/db-shopshop/dist";

declare module "better-auth" {
  interface Session {
    profile?: Profile | null;
  }
}
