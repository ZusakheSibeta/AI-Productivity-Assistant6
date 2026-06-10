import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function ToolForm<TInput>({
  inputs,
  buildPayload,
  generate,
  buttonLabel,
  outputLabel = "AI Output",
  outputPlaceholder = "Output will appear here.",
}: {
  inputs: ReactNode;
  buildPayload: () => TInput | null;
  generate: (data: TInput) => Promise<{ text: string }>;
  buttonLabel: string;
  outputLabel?: string;
  outputPlaceholder?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = buildPayload();
    if (!payload) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await generate(payload);
      setOutput(res.text);
    } catch (err) {
      console.error(err);
      toast.error("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border bg-card p-5 shadow-sm">{inputs}</div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="min-w-32">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Working
            </>
          ) : (
            buttonLabel
          )}
        </Button>
      </div>
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium">{outputLabel}</label>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            disabled={!output}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <Textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder={outputPlaceholder}
          className="min-h-[280px] font-mono text-sm leading-relaxed"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Edit freely — outputs are fully editable.
        </p>
      </div>
    </form>
  );
}