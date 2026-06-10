import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Mail } from "lucide-react";
import { ToolPage } from "@/components/app/ToolPage";
import { ToolForm } from "@/components/app/ToolForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateEmail } from "@/lib/ai-tools.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      { name: "description", content: "Generate professional emails from a short intent." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const intentRef = useRef<HTMLTextAreaElement>(null);
  const audienceRef = useRef<HTMLInputElement>(null);
  const toneRef = useRef<string>("professional");
  const purposeRef = useRef<string>("inform");

  return (
    <ToolPage
      title="Smart Email Generator"
      description="Describe what you want to say. We'll write the email for you."
      icon={<Mail className="h-5 w-5" />}
    >
      <ToolForm
        buttonLabel="Generate Email"
        outputLabel="Generated email"
        generate={(data) => generateEmail({ data })}
        buildPayload={() => {
          const intent = intentRef.current?.value.trim() ?? "";
          if (!intent) return null;
          return {
            intent,
            audience: audienceRef.current?.value.trim() || "colleague",
            tone: toneRef.current,
            purpose: purposeRef.current,
          };
        }}
        inputs={
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">What's the email about?</label>
              <Textarea
                ref={intentRef}
                placeholder="e.g. Follow up with Jamie about the Q3 marketing budget and ask for revised numbers by Friday."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Audience</label>
                <Input ref={audienceRef} placeholder="e.g. Client, Manager" defaultValue="colleague" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Tone</label>
                <Select defaultValue="professional" onValueChange={(v) => (toneRef.current = v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Purpose</label>
                <Select defaultValue="inform" onValueChange={(v) => (purposeRef.current = v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inform">Inform</SelectItem>
                    <SelectItem value="request">Request</SelectItem>
                    <SelectItem value="follow-up">Follow up</SelectItem>
                    <SelectItem value="apologize">Apologize</SelectItem>
                    <SelectItem value="thank">Thank</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        }
      />
    </ToolPage>
  );
}