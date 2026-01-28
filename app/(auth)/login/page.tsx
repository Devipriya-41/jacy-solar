"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { signInWithPassword, signInWithMagicLink } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"password" | "magic-link">(
    "password",
  );
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithPassword({ email, password });
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Password login error:", error);
      setError(error instanceof Error ? error.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithMagicLink({ email });
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Magic link error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to send magic link",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#0a2e2e]">
      {/* Left Side - Logo and Branding */}
      <div className="w-1/2 flex items-center justify-center relative">
        {/* Vertical Divider Line */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>

        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div>
              <Image
                src="/img/logo-round.png"
                alt="Bailey and Co."
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-white">
              JACY TRADING & CONSULTING
            </h2>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white mb-3 tracking-wide">
              Welcome
            </h1>
            <p className="text-sm text-gray-300 uppercase tracking-widest">
              Please login to Admin Dashboard.
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("password");
                setError("");
                setMagicLinkSent(false);
              }}
              className={`flex-1 py-3 px-4 rounded text-sm font-medium uppercase tracking-wider transition-all ${
                loginMethod === "password"
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <Lock className="w-4 h-4 inline-block mr-2" />
              Password
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("magic-link");
                setError("");
                setMagicLinkSent(false);
              }}
              className={`flex-1 py-3 px-4 rounded text-sm font-medium uppercase tracking-wider transition-all ${
                loginMethod === "magic-link"
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <Mail className="w-4 h-4 inline-block mr-2" />
              Magic Link
            </button>
          </div>

          {/* Magic Link Sent Success Message */}
          {magicLinkSent ? (
            <div className="space-y-6">
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/50 rounded text-center">
                <Mail className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  Check Your Email
                </h3>
                <p className="text-sm text-gray-300 mb-1">
                  We&apos;ve sent a secure login link to:
                </p>
                <p className="text-white font-medium mb-4">{email}</p>
                <p className="text-xs text-gray-400">
                  Click the link in the email to access your dashboard.
                </p>
              </div>
              <Button
                onClick={() => setMagicLinkSent(false)}
                className="w-full h-12 bg-white/10 hover:bg-white/20 text-white font-medium uppercase tracking-widest text-sm rounded transition-all"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              {/* Login Form */}
              <form
                onSubmit={
                  loginMethod === "password"
                    ? handlePasswordLogin
                    : handleMagicLinkLogin
                }
                className="space-y-6"
              >
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-sm text-red-300 text-center">
                    {error}
                  </div>
                )}

                {/* Email/Username Input */}
                <div>
                  <Input
                    type="email"
                    placeholder="USERNAME"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-white text-gray-800 placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-wider border-0 rounded focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                {/* Password Input - Only show for password login */}
                {loginMethod === "password" && (
                  <div>
                    <Input
                      type="password"
                      placeholder="PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 bg-white text-gray-800 placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-wider border-0 rounded focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                )}

                {/* Magic Link Info Text */}
                {loginMethod === "magic-link" && (
                  <p className="text-sm text-gray-300 text-center">
                    We&apos;ll email you a secure, one-time login link
                  </p>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium uppercase tracking-widest text-sm rounded shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {loginMethod === "password"
                        ? "Logging in..."
                        : "Sending Link..."}
                    </>
                  ) : loginMethod === "password" ? (
                    "Login"
                  ) : (
                    "Send Magic Link"
                  )}
                </Button>

                {/* Forgot Password Link - Only show for password login */}
                {loginMethod === "password" && (
                  <div className="text-center">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-white hover:text-orange-400 uppercase tracking-widest transition-colors"
                    >
                      Forgotten Your Password?
                    </Link>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
