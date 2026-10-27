"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);

  // Check if admin is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/admin");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Welcome back! Redirecting to dashboard...");
      router.push("/admin");
    } catch (err: any) {
      console.error("Sign-in error:", err);
      let message = "Invalid email or password.";

      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        message = "Incorrect email or password. Please try again.";
      } else if (err.code === "auth/user-not-found") {
        message = "No admin account found with this email address.";
      } else if (err.code === "auth/too-many-requests") {
        message =
          "Access temporarily blocked due to multiple failed attempts. Please reset password or try again later.";
      } else if (err.code === "auth/operation-not-allowed") {
        message =
          "Email/Password sign-in is not enabled in Firebase Console. Please enable it under Authentication -> Sign-in method.";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your admin email to receive a password reset link.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      toast.success("Password reset email sent!", {
        description: `Check your inbox at ${email} for recovery instructions.`,
      });
      setIsResetMode(false);
    } catch (err: any) {
      console.error("Password reset error:", err);
      toast.error(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-brand" />
          <p className="text-sm text-muted-foreground font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-linear-to-b from-background via-card/30 to-background">
      {/* Back to public site button */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Feeling Healthy Website
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
        {/* Brand Header */}
        <div className="p-8 pb-6 border-b border-border/60 text-center bg-muted/20">
          <Link href="/" className="inline-block mb-3">
            <img
              src="/images/logo.png"
              alt="Feeling Healthy"
              className="h-18 w-auto mx-auto object-contain"
            />
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-foreground font-display">
            {isResetMode ? "Reset Admin Password" : "Sign in to Dashboard"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-xs mx-auto">
            {isResetMode
              ? "Enter your email address to receive password reset instructions"
              : "Manage clinic bookings, blogs, PEMF products, inquiries, and Stripe orders"}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {isResetMode ? (
            /* Password Reset Form */
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reset-email" className="text-xs font-medium">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@feelinghealthy.com.au"
                    className="pl-10 h-11 text-sm bg-background/60"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-brand text-brand-foreground hover:bg-brand/90 font-medium gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <KeyRound className="size-4" />
                    Send Reset Link
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={() => setIsResetMode(false)}
                className="w-full flex items-center gap-2 justify-center text-center text-xs text-muted-foreground hover:text-foreground pt-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="size-3.5" /> Back to Sign In
              </button>
            </form>
          ) : (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@feelinghealthy.com.au"
                    className="pl-10 h-11 text-sm bg-background/60"
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password" className="text-xs font-medium">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-xs text-brand hover:underline font-medium cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 text-sm bg-background/60"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-brand text-brand-foreground hover:bg-brand/90 font-medium gap-2 mt-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    Sign In to Admin
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Security notice footer */}
      <p className="text-center text-[11px] text-muted-foreground/70 mt-6 max-w-xs">
        Secured by Firebase Authentication. Unauthorized access attempts are monitored and logged.
      </p>
    </div>
  );
}
