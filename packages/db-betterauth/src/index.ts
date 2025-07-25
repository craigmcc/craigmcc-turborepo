/**
 * Export the Prisma client (dbBetterAuth) and all generated types.
 */

// Internal Modules ----------------------------------------------------------

import { PrismaClient } from "../generated/prisma";

// Public Objects ------------------------------------------------------------

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * A singleton instance of PrismaClient.
 */
if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient();
}
export const dbBetterAuth = globalThis.prisma;
export * from "../generated/prisma";
