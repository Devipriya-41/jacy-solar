"use client";

import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  signInWithSocialProvider,
  signInWithMagicLink,
} from "@/lib/auth-client";
import { GoogleSignInButton } from "@/components/ui/google-sign-in-button";
import { LinkedInSignInButton } from "@/components/ui/linkedin-sign-in-button";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithMagicLink({
        email,
      });
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Magic link error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Right Side - Login Form */}
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={250}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-600">Log in to your account</p>
          </div>

          {magicLinkSent ? (
            <div className="bg-blue-50 p-4 rounded-lg text-center space-y-2">
              <h3 className="font-semibold text-blue-800">Check your email</h3>
              <p className="text-blue-600 text-sm">
                We&apos;ve sent a magic link to {email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleMagicLinkLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                Continue with Email
              </Button>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <GoogleSignInButton className="w-full"
              onClick={async () => await signInWithSocialProvider("google")}
              disabled={isLoading}
            />
            <LinkedInSignInButton  className="w-full"
              onClick={async () => await signInWithSocialProvider("linkedin")}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
