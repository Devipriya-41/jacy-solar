import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  organizationClient,
  magicLinkClient,
} from "better-auth/client/plugins";
import {
  ac,
  adminRoles,
  organizationRoles
} from "./auth/permissions-access-control";

// This creates an auth client with the magic link plugin
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    adminClient({
      ac: ac,
      roles: {
        ...adminRoles,
      },
    }),
    organizationClient({
      ac: ac,
      roles: {
        ...organizationRoles
      },
    }),
    magicLinkClient(),
  ],
});

// This exports the signIn, signOut, signUp and use
export const { signIn, signOut, signUp, useSession } = authClient;

// This function is used to sign in with social providers
export const signInWithSocialProvider = async (
  provider: "google" | "linkedin" | "apple"
) => {
  return await signIn.social(
    {
      provider,
      callbackURL: "/admin/dashboard",
      // errorCallbackURL: "/error",
      // newUserCallbackURL: "/new-user",
    },
    {
      onSuccess: async (ctx) => {
        console.log(ctx);
      },
      onError: async (ctx) => {
        console.error(ctx.error.message);
      },
    }
  );
};

// This function is used to sign in with Magic Link
export const signInWithMagicLink = async ({ email }: { email: string }) => {
  return await signIn.magicLink(
    {
      email: email,
      callbackURL: "/admin/dashboard",
    },
    {
      onSuccess: async (ctx) => {
        console.log(ctx);
      },
      onError: async (ctx) => {
        console.error(ctx.error.message);
      },
    }
  );
};
