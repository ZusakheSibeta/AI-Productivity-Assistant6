import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { AddTaskForm } from "@/components/tasks/AddTaskForm";
import { TaskItem } from "@/components/tasks/TaskItem";
import { ThemeToggle } from "@/components/tasks/ThemeToggle";
import { Button } from "@/components/ui/button";
import { CATEGORIES, useTasks } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunny Tasks — Minimal Task Manager" },
      {
        name: "description",
        content:
          "A calm, minimal task manager. Add tasks, organize by category, and stay on track.",
      },
      { property: "og:title", content: "Sunny Tasks — Minimal Task Manager" },
      {
        property: "og:description",
        content:
          "A calm, minimal task manager. Add tasks, organize by category, and stay on track.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { tasks, hydrated, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () => (filter === "All" ? tasks : tasks.filter((t) => t.category === filter)),
    [tasks, filter],
  );
  const remaining = tasks.filter((t) => !t.completed).length;
  const done = filtered.filter((t) => t.completed);
  const todo = filtered.filter((t) => !t.completed);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl gradient-warm shadow-soft">
              <Sun className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Sunny Tasks</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {hydrated
                ? remaining === 0
                  ? "All clear — enjoy your day ☀️"
                  : `${remaining} task${remaining === 1 ? "" : "s"} to go`
                : "Loading your tasks…"}
            </p>
          </div>
          <ThemeToggle />
        </header>

        <AddTaskForm onAdd={addTask} />

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <Button
              key={c}
              variant={filter === c ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full",
                filter === c && "gradient-warm text-primary-foreground",
              )}
            >
              {c}
            </Button>
          ))}
        </div>

        <section className="mt-6 space-y-2" aria-label="Tasks">
          {todo.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}

          {hydrated && filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed py-14 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {filter === "All"
                  ? "No tasks yet. Add your first one above."
                  : `No ${filter.toLowerCase()} tasks.`}
              </p>
            </div>
          )}

          {done.length > 0 && (
            <>
              <p className="pt-4 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Completed · {done.length}
              </p>
              {done.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
