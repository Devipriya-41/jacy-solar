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

export const { signIn, signOut, signUp, useSession } = authClient;

// Sign in with email and password
export const signInWithPassword = async ({ 
  email, 
  password 
}: { 
  email: string; 
  password: string; 
}) => {
  return await signIn.email(
    {
      email,
      password,
      callbackURL: "/admin/dashboard",
    },
    {
      onSuccess: async (ctx) => {
        console.log("Login successful", ctx);
      },
      onError: async (ctx) => {
        console.error("Login error:", ctx.error.message);
        throw new Error(ctx.error.message);
      },
    }
  );
};

// Sign in with Magic Link
export const signInWithMagicLink = async ({ email }: { email: string }) => {
  return await signIn.magicLink(
    {
      email: email,
      callbackURL: "/admin/dashboard",
    },
    {
      onSuccess: async (ctx) => {
        console.log("Magic link sent", ctx);
      },
      onError: async (ctx) => {
        console.error("Magic link error:", ctx.error.message);
        throw new Error(ctx.error.message);
      },
    }
  );
};

// Sign in with social providers
export const signInWithSocialProvider = async (
  provider: "google" | "linkedin" | "apple"
) => {
  return await signIn.social(
    {
      provider,
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