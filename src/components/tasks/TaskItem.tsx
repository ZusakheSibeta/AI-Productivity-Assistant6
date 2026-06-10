import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Task } from "@/hooks/use-tasks";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="task-enter group flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-soft transition-colors hover:bg-accent/40">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        className="h-5 w-5 rounded-full"
      />
      <span
        className={cn(
          "flex-1 text-sm transition-all",
          task.completed && "text-muted-foreground line-through opacity-60",
        )}
      >
        {task.title}
      </span>
      <Badge variant="secondary" className="rounded-full font-normal">
        {task.category}
      </Badge>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}