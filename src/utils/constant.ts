import { DatabaseZap, FileCode2, GitBranch, Zap} from "lucide-react";


export const features = [
  {
    icon: DatabaseZap,
    title: "Schema Detection",
    desc: "Automatically detects tables, columns, indexes, foreign keys and constraints from your SQL.",
  },
  {
    icon: FileCode2,
    title: "Liquibase XML Output",
    desc: "Generates valid, production-ready Liquibase changesets you can drop straight into your repo.",
  },
  {
    icon: GitBranch,
    title: "Version Tracking",
    desc: "Every migration is tracked with a unique changeSet ID so you never have conflicts.",
  },
  {
    icon: Zap,
    title: "Instant Preview",
    desc: "See your generated XML side-by-side with your input before copying or downloading.",
  },
];

export const steps = [
  { num: "1", title: "Paste Schema", desc: "Drop in your CREATE TABLE SQL from any PostgreSQL or MySQL database." },
  { num: "2", title: "Auto-Convert", desc: "Our engine parses columns, constraints, indexes and foreign keys instantly." },
  { num: "3", title: "Export XML", desc: "Copy or download the ready-to-use Liquibase changeset for your repo." },
];
