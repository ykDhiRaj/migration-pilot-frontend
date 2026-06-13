import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, DatabaseZap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginFormValues } from "@/validations/loginValidations";

export default function LoginPage() {
  const navigate = useNavigate();

  // Removed password and remember me state, form now only handles email
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  // Submit handler now only sends the email, password verification will be added later
  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4"
      style={{
        backgroundImage: "url('/background-dots.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-background-secondary border border-border rounded-2xl p-9">
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
          Welcome back
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-7">
          Sign in to your MigrationPilot workspace
        </p>

        {/* Form now only contains the email field */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-5">
            <Label htmlFor="email" className="mb-1.5 block">
              Email
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className={`pl-9 ${
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

          {/* Password field, show/hide toggle, and remember me removed, will be reintroduced later */}

          <Button
            type="submit"
            size="lg"
            className="w-full text-base font-semibold mb-5"
          >
            Continue →
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google button, icon loaded from public/google.svg */}
        <Button variant="google" size="lg" className="w-full mb-6 text-[15px]">
          <img src="/google.svg" alt="Google" className="w-[18px] h-[18px]" />
          Sign in with Google
        </Button>

        {/* Footer */}
        {/* Footer, link now uses shadcn Button with link variant instead of plain button */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button
            variant="ghost"
            onClick={() => navigate("/register")}
            className="text-accent font-medium p-0 h-auto"
          >
            Sign up free
          </Button>
        </p>
      </div>
    </div>
  );
}
