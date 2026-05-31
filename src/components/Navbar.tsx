import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DatabaseZap } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md border-b border-border">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center">
          <DatabaseZap className="w-4 h-4 text-white" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight">
          Migration<span className="text-accent">Pilot</span>
        </span>
      </button>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {["features", "how"].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
          >
            {id === "how" ? "How it works" : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
          Sign in
        </Button>
        <Button size="sm" onClick={() => navigate("/login")}>
          Get started →
        </Button>
      </div>
    </nav>
  );
}
