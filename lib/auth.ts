import { betterAuth } from "better-auth";
import { magicLink, openAPI, admin, apiKey, organization } from "better-auth/plugins";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {
  users,
  accounts,
  sessions,
  verifications,
  apikeys,
  organizations,
  members,
  invitations,
} from "@/db/schema/auth-schema";
import { EmailService } from "@/lib/email/email-service";
import { ac, adminRoles, organizationRoles } from "./auth/permissions-access-control";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      account: accounts,
      session: sessions,
      verification: verifications,
      apikey: apikeys,
      organization: organizations,
      member: members,
      invitation: invitations
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    admin({
      ac: ac,
      roles: {
        ...adminRoles
      },
      adminUserIds: [],
      // async hasPermission({ permission, user, role }) {
      //   return true;
      // },
      defaultRole: 'super_admin'

    }),
    apiKey(),
    organization({
      ac: ac,
      roles: {
        ...organizationRoles
      },
    }),
    openAPI(),
    magicLink({
      async sendMagicLink({ email, url }) {
        await EmailService.sendMagicLinkEmail({ email, url });
      },
    }),
  ],
  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
});
