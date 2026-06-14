import { useNavigate } from "react-router-dom";
import { DatabaseZap, FileCode2, GitBranch, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeWindow from "@/components/CodeWindow";

const features = [
  {
    icon: <DatabaseZap className="w-5 h-5 text-accent" />,
    title: "Schema Detection",
    desc: "Automatically detects tables, columns, indexes, foreign keys and constraints from your SQL.",
  },
  {
    icon: <FileCode2 className="w-5 h-5 text-accent" />,
    title: "Liquibase XML Output",
    desc: "Generates valid, production-ready Liquibase changesets you can drop straight into your repo.",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-accent" />,
    title: "Version Tracking",
    desc: "Every migration is tracked with a unique changeSet ID so you never have conflicts.",
  },
  {
    icon: <Zap className="w-5 h-5 text-accent" />,
    title: "Instant Preview",
    desc: "See your generated XML side-by-side with your input before copying or downloading.",
  },
];

const steps = [
  { num: "1", title: "Paste Schema", desc: "Drop in your CREATE TABLE SQL from any PostgreSQL or MySQL database." },
  { num: "2", title: "Auto-Convert", desc: "Our engine parses columns, constraints, indexes and foreign keys instantly." },
  { num: "3", title: "Export XML", desc: "Copy or download the ready-to-use Liquibase changeset for your repo." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-[clamp(52px,8vw,88px)] font-black leading-none tracking-tighter text-white mb-7">
          Convert your<br />
          schemas to<br />
          Liquibase XML<br />
          in seconds.
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
          Paste your SQL schema, get a production-ready Liquibase changelog
          instantly. Supports PostgreSQL, MySQL.
        </p>
        <div className="flex items-center justify-center gap-5 mb-20">
          <Button size="lg" onClick={() => navigate("/login")} className="text-base font-semibold px-8">
            Start for free <ArrowRight className="w-4 h-4" />
          </Button>
          <button
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
            className="text-base text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            See how it works
          </button>
        </div>
        <CodeWindow />
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-[3px] text-accent uppercase mb-4">FEATURES</p>
        <h2 className="text-center text-4xl font-bold text-white tracking-tight mb-3">Everything you need</h2>
        <p className="text-center text-muted-foreground text-base max-w-md mx-auto mb-14">
          No manual XML wrangling. No outdated docs. Just paste your schema and ship.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-background-secondary border border-border rounded-xl p-7 hover:border-accent/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[3px] text-accent uppercase mb-4">HOW IT WORKS</p>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-3">Three steps, done</h2>
        <p className="text-muted-foreground text-base max-w-sm mx-auto mb-16">
          From raw SQL to production changelog in under a minute.
        </p>
        <div className="flex flex-col md:flex-row gap-0">
          {steps.map((s, i) => (
            <div key={s.num} className="flex-1 px-6 relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 right-0 w-1/2 h-px bg-border" />
              )}
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-lg font-bold text-accent mx-auto mb-4">
                {s.num}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">{s.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2025 MigrationPilot. Built for database engineers who ship fast.
      </footer>
    </div>
  );
}
