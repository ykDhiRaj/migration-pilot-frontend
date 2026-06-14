# Migration Pilot

Convert any database schema to production-ready Liquibase XML changesets in seconds.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — fast dev server & bundler
- **Tailwind CSS v3** + **PostCSS** + **Autoprefixer**
- **shadcn/ui** components (Button, Input, Label, Checkbox)
- **Radix UI** primitives
- **React Router v6**
- **Lucide React** icons

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing page |
| `/login` | Sign in page |

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── checkbox.tsx
│   ├── Navbar.tsx
│   └── CodeWindow.tsx
├── lib/
│   └── utils.ts     # cn() helper
├── pages/
│   ├── LandingPage.tsx
│   └── LoginPage.tsx
├── App.tsx
├── main.tsx
└── index.css        # Tailwind directives + CSS variables
```
