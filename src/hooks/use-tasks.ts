import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt: number;
}

export const CATEGORIES = ["Personal", "Work", "Shopping", "Health"] as const;

const STORAGE_KEY = "sunny-tasks";

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hydrated]);

  const addTask = (title: string, category: string) => {
    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        category,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, hydrated, addTask, toggleTask, deleteTask };
}