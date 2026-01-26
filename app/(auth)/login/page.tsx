"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Mail,
  Loader2,
  Lock,
  Shield,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { signInWithMagicLink, signInWithPassword } from "@/lib/auth-client";
import React from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"password" | "magic-link">(
    "password",
  );

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

  const adminFeatures = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Dashboard Analytics",
      description: "Monitor quotes, contacts, and conversions",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Contact Management",
      description: "View and respond to customer inquiries",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Quote Management",
      description: "Track and manage solar installation quotes",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Content Control",
      description: "Update website content and pricing",
    },
  ];

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      {/* Left Side - Admin Features */}
      <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="relative h-full p-6 lg:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 lg:mb-6">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="p-1 border border-white/10 rounded-lg">
                <Image
                  src="/img/logo-round.png"
                  alt="SolarAdmin Logo"
                  width={44}
                  height={44}
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white">SolarAdmin</div>
                <div className="text-xs text-emerald-400">Control Panel</div>
              </div>
            </Link>
          </div>

          {/* Admin Features - Compact Layout */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4 lg:mb-6">
              <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">
                Solar Company
                <span className="block text-emerald-400 text-sm lg:text-lg">
                  Administration Portal
                </span>
              </h1>

              <p className="text-sm lg:text-base text-slate-300">
                Manage quotes, customer contacts, and website content from a
                single dashboard.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
              {adminFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group p-2 lg:p-3 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-1.5 lg:p-2 bg-emerald-500/20 rounded-md group-hover:bg-emerald-500/30 transition-colors shrink-0">
                      <div className="text-emerald-400">
                        {React.cloneElement(feature.icon, {
                          className: "w-4 h-4 lg:w-5 lg:h-5",
                        })}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-xs lg:text-sm mb-0.5 truncate">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-4">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  SolarAdmin
                </div>
                <div className="text-xs text-emerald-600">Control Panel</div>
              </div>
            </Link>
          </div>

          {/* Login Container */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-200">
            <div className="text-center mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-4">
                <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                Admin Login
              </h1>
              <p className="text-xs lg:text-sm text-gray-600">
                Restricted access to authorized personnel
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <p className="text-xs text-red-800">{error}</p>
              </div>
            )}

            {/* Login Method Tabs */}
            <div className="flex mb-4 border-b border-gray-200">
              <button
                onClick={() => {
                  setLoginMethod("password");
                  setError("");
                  setMagicLinkSent(false);
                }}
                className={`flex-1 py-2 text-xs lg:text-sm font-medium border-b-2 transition-colors ${
                  loginMethod === "password"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Password Login
              </button>
              <button
                onClick={() => {
                  setLoginMethod("magic-link");
                  setError("");
                  setMagicLinkSent(false);
                }}
                className={`flex-1 py-2 text-xs lg:text-sm font-medium border-b-2 transition-colors ${
                  loginMethod === "magic-link"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Magic Link
              </button>
            </div>

            {magicLinkSent ? (
              <div className="text-center space-y-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-xs lg:text-sm">
                    Check Your Email
                  </h3>
                  <p className="text-xs text-gray-600">
                    Admin login link sent to:
                  </p>
                  <p className="font-medium text-gray-900 text-xs mt-1 truncate">
                    {email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMagicLinkSent(false)}
                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs"
                >
                  Back to Login
                </Button>
              </div>
            ) : loginMethod === "password" ? (
              <form
                onSubmit={handlePasswordLogin}
                className="space-y-3 lg:space-y-4"
              >
                <div className="space-y-2 lg:space-y-3">
                  <div>
                    <label className="text-xs lg:text-sm font-medium text-gray-700 mb-1 block">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="admin@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-9 lg:h-10 pl-8 lg:pl-9 text-xs lg:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs lg:text-sm font-medium text-gray-700 mb-1 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-9 lg:h-10 pl-8 lg:pl-9 pr-8 text-xs lg:text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-1.5">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 lg:w-4 lg:h-4"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-emerald-600 hover:text-emerald-700 text-xs"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-9 lg:h-10 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-lg text-xs lg:text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={handleMagicLinkLogin}
                className="space-y-3 lg:space-y-4"
              >
                <div>
                  <label className="text-xs lg:text-sm font-medium text-gray-700 mb-1 block">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="admin@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-9 lg:h-10 pl-8 lg:pl-9 text-xs lg:text-sm"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    We&apos;ll email you a secure login link
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-9 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg text-xs lg:text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      Sending Link...
                    </>
                  ) : (
                    "Send Magic Link"
                  )}
                </Button>
              </form>
            )}

            {/* Security Notice */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-500" />
                <span>All login activities are logged and monitored</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 lg:mt-4 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} SolarAdmin Dashboard
              <Link
                href="/support"
                className="text-gray-600 hover:text-gray-900"
              >
                Need Help?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
