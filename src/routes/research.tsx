import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Search } from "lucide-react";
import { ToolPage } from "@/components/app/ToolPage";
import { ToolForm } from "@/components/app/ToolForm";
import { Textarea } from "@/components/ui/textarea";
import { researchTopic } from "@/lib/ai-tools.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      { name: "description", content: "Structured insights and summaries on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <ToolPage
      title="AI Research Assistant"
      description="Ask a research question. Get a structured brief you can edit."
      icon={<Search className="h-5 w-5" />}
    >
      <ToolForm
        buttonLabel="Research"
        outputLabel="Research brief"
        generate={(data) => researchTopic({ data })}
        buildPayload={() => {
          const topic = ref.current?.value.trim() ?? "";
          return topic ? { topic } : null;
        }}
        inputs={
          <div>
            <label className="mb-1.5 block text-sm font-medium">Topic or question</label>
            <Textarea
              ref={ref}
              placeholder="e.g. What are best practices for onboarding remote engineers?"
              className="min-h-[140px]"
            />
          </div>
        }
      />
    </ToolPage>
  );
}