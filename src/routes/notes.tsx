import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { NotebookPen } from "lucide-react";
import { ToolPage } from "@/components/app/ToolPage";
import { ToolForm } from "@/components/app/ToolForm";
import { Textarea } from "@/components/ui/textarea";
import { summarizeNotes } from "@/lib/ai-tools.functions";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      { name: "description", content: "Turn raw meeting notes into summary, key points, and action items." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <ToolPage
      title="Meeting Notes Summarizer"
      description="Paste raw notes — get a clean summary, key points, and action items."
      icon={<NotebookPen className="h-5 w-5" />}
    >
      <ToolForm
        buttonLabel="Summarize"
        outputLabel="Summary"
        generate={(data) => summarizeNotes({ data })}
        buildPayload={() => {
          const notes = ref.current?.value.trim() ?? "";
          return notes ? { notes } : null;
        }}
        inputs={
          <div>
            <label className="mb-1.5 block text-sm font-medium">Raw meeting notes</label>
            <Textarea
              ref={ref}
              placeholder="Paste your meeting transcript or notes here"
              className="min-h-[220px]"
            />
          </div>
        }
      />
    </ToolPage>
  );
}