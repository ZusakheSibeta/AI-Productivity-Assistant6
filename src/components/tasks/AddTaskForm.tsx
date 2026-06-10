import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/hooks/use-tasks";

interface AddTaskFormProps {
  onAdd: (title: string, category: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setTitle("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 rounded-2xl border bg-card p-3 shadow-soft sm:flex-row"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-32 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="gradient-warm rounded-xl text-primary-foreground">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </form>
  );
}