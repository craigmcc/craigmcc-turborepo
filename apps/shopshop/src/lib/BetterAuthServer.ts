/**
 * Server side configuration for BetterAuth.
 */

// External Modules ----------------------------------------------------------

import { dbBetterAuth } from "@repo/db-betterauth/dist";
import { dbShopShop } from "@repo/db-shopshop/dist";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import "server-only";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

const auth = betterAuth({
  database: prismaAdapter(dbBetterAuth, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    customSession(async ({ session, user }) => {
      // Add the Profile to the Session object.
      const profile = await dbShopShop.profile.findUnique({
        where: { email: user.email },
      });
      return {
        session: {
          ...session,
          // Add the Profile to the session object.
          profile,
        },
        user,
      }
    }),
    nextCookies(), // Recognizes when a server action creates/updates a cookie.
  ],
});

export default auth;
export type Session = typeof auth.$Infer.Session;

