import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, DatabaseZap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  registerSchema,
  RegisterFormValues,
} from "@/validations/registerValidations";
import { getPasswordStrength } from "@/utils/passwordStrength";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Replaced manual useState fields and error object with React Hook Form, validated via Zod resolver
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    },
  });

  // Watch password field for live strength meter, since it is no longer plain useState
  const password = watch("password");
  const passwordStrength = getPasswordStrength(password || "");

  // Replaced manual validation call with React Hook Form submit handler
  const onRegister = (data: RegisterFormValues) => {
    console.log("Register data:", data);
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 py-10"
      style={{
        // Removed the DOT_POSITIONS array and span loop, now using background-dots.svg as page background
        backgroundImage: "url('/background-dots.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-background-secondary/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center mx-auto mb-2.5">
            <DatabaseZap className="w-6 h-6 text-white" />
          </div>
          <p className="text-[17px] font-bold text-white tracking-tight">
            Migration<span className="text-accent">Pilot</span>
          </p>
          <p className="text-[10px] tracking-[3px] text-muted-foreground uppercase mt-0.5">
            Schema → Liquibase
          </p>
        </div>

        <h1 className="text-center text-2xl font-bold text-white mb-1.5">
          Create an account
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-7">
          Start converting schemas for free — no credit card needed.
        </p>

        {/* Form wrapped with handleSubmit from React Hook Form */}
        <form onSubmit={handleSubmit(onRegister)}>
          {/* Email */}
          <div className="mb-5">
            <Label htmlFor="email" className="mb-2 block">
              Email Address
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className={`pl-10 ${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <Label htmlFor="password" className="mb-2 block">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Create a strong password"
                className={`pr-10 ${
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {password && (
              <div className="mt-3 rounded-lg border border-border/50 bg-background/40 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    Password Strength
                  </span>

                  <span
                    className={`text-xs font-medium ${
                      passwordStrength.label === "Weak"
                        ? "text-red-500"
                        : passwordStrength.label === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength.label === "Weak"
                        ? "w-1/3 bg-red-500"
                        : passwordStrength.label === "Medium"
                          ? "w-2/3 bg-yellow-500"
                          : "w-full bg-green-500"
                    }`}
                  />
                </div>

                {passwordStrength.label !== "Strong" && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Missing:
                    {password.length < 8 && " 8+ chars,"}
                    {!/[A-Z]/.test(password) && " uppercase,"}
                    {!/[a-z]/.test(password) && " lowercase,"}
                    {!/\d/.test(password) && " number,"}
                    {!/[@$!%*?&^#()_\-+=]/.test(password) &&
                      " special character"}
                  </p>
                )}
              </div>
            )}

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <Label htmlFor="confirm" className="mb-2 block">
              Confirm Password
            </Label>

            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                className={`pr-10 ${
                  errors.confirmPassword
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("confirmPassword")}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms agreement checkbox, now registered with React Hook Form instead of plain useState */}
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <Checkbox id="agreed" {...register("agreed")} />
              <Label
                htmlFor="agreed"
                className="text-muted-foreground font-normal cursor-pointer"
              >
                I agree to the Terms and Privacy Policy
              </Label>
            </div>

            {errors.agreed && (
              <p className="mt-1 text-sm text-red-500">
                {errors.agreed.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-base font-semibold mb-5"
          >
            Create account →
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google button, icon now loaded from public/google.svg instead of inline svg */}
        <Button variant="google" size="lg" className="w-full mb-6 text-[15px]">
          <img src="/google.svg" alt="Google" className="w-[18px] h-[18px]" />
          Sign up with Google
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-accent font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
