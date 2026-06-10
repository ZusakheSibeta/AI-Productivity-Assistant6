import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageSquare, NotebookPen, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Workplace AI — Productivity Assistant" },
      {
        name: "description",
        content:
          "AI tools to draft emails, summarize meetings, plan projects, and research topics fast.",
      },
      { property: "og:title", content: "Workplace AI — Productivity Assistant" },
      {
        property: "og:description",
        content:
          "AI tools to draft emails, summarize meetings, plan projects, and research topics fast.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Turn an intent into a polished, ready-to-send email.",
    href: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Get a summary, key points, and action items from raw notes.",
    href: "/notes",
    icon: NotebookPen,
  },
  {
    title: "AI Task Planner",
    description: "Break any goal into a prioritized, step-by-step plan.",
    href: "/planner",
    icon: Sparkles,
  },
  {
    title: "Research Assistant",
    description: "Structured insights and summaries on any topic.",
    href: "/research",
    icon: Search,
  },
  {
    title: "AI Chat",
    description: "Conversational assistant for any workplace task.",
    href: "/chat",
    icon: MessageSquare,
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Welcome back</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Your AI productivity workspace
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Five focused tools to draft, plan, summarize, and research without the busywork.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.href}
            to={t.href}
            className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-base font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
