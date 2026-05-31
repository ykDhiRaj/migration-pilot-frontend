import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, DatabaseZap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { validateRegister } from "@/validations/registerValidations";
import { getPasswordStrength } from "@/utils/passwordStrength";

const DOT_POSITIONS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${Math.round((i * 37 + 11) % 100)}%`,
  left: `${Math.round((i * 53 + 7) % 100)}%`,
  size: 2 + (i % 3),
  opacity: 0.2 + (i % 4) * 0.07,
}));

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreed: "",
  });
  const passwordStrength = getPasswordStrength(password);

  const handleRegister = () => {
    const validationErrors = validateRegister(
      email,
      password,
      confirmPassword,
      agreed,
    );

    setErrors({
      email: validationErrors.email || "",
      password: validationErrors.password || "",
      confirmPassword: validationErrors.confirmPassword || "",
      agreed: validationErrors.agreed || "",
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Floating dots */}
      {DOT_POSITIONS.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-accent pointer-events-none"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
          }}
        />
      ))}

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
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (errors.email) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }
              }}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (errors.password) {
                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }
              }}
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
                  {!/[@$!%*?&^#()_\-+=]/.test(password) && " special character"}
                </p>
              )}
            </div>
          )}

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

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
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);

                if (errors.confirmPassword) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "",
                  }));
                }
              }}
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
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          size="lg"
          className="w-full text-base font-semibold mb-5"
          onClick={handleRegister}
        >
          Create account →
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google — below fields */}
        <Button variant="google" size="lg" className="w-full mb-6 text-[15px]">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
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
