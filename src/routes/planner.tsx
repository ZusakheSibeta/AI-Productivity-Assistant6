import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { ToolPage } from "@/components/app/ToolPage";
import { ToolForm } from "@/components/app/ToolForm";
import { Textarea } from "@/components/ui/textarea";
import { planTasks } from "@/lib/ai-tools.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      { name: "description", content: "Break any goal into a prioritized step-by-step plan." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <ToolPage
      title="AI Task Planner"
      description="Describe a goal or project. Get a clear, prioritized task plan."
      icon={<Sparkles className="h-5 w-5" />}
    >
      <ToolForm
        buttonLabel="Plan"
        outputLabel="Task plan"
        generate={(data) => planTasks({ data })}
        buildPayload={() => {
          const goal = ref.current?.value.trim() ?? "";
          return goal ? { goal } : null;
        }}
        inputs={
          <div>
            <label className="mb-1.5 block text-sm font-medium">Goal or project</label>
            <Textarea
              ref={ref}
              placeholder="e.g. Launch a customer feedback program for our SaaS product within 6 weeks."
              className="min-h-[160px]"
            />
          </div>
        }
      />
    </ToolPage>
  );
}