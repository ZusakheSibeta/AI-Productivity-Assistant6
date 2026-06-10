import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, DEFAULT_MODEL } from "./ai-gateway.server";

function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key)(DEFAULT_MODEL);
}

async function run(system: string, prompt: string) {
  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });
  return { text };
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      intent: z.string().min(1),
      tone: z.string().default("professional"),
      audience: z.string().default("colleague"),
      purpose: z.string().default("inform"),
    }),
  )
  .handler(({ data }) =>
    run(
      "You are an expert business writer. Draft clear, concise, professional emails. Output only the email (subject line on first line as 'Subject: ...', then a blank line, then the body). No commentary.",
      `Tone: ${data.tone}\nAudience: ${data.audience}\nPurpose: ${data.purpose}\n\nIntent / what to say:\n${data.intent}`,
    ),
  );

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator(z.object({ notes: z.string().min(1) }))
  .handler(({ data }) =>
    run(
      "You summarize raw meeting notes. Always respond in markdown with exactly three sections in this order: '## Summary' (2-4 sentences), '## Key Points' (bullet list), '## Action Items' (bullet list with owner if mentioned). No preamble.",
      data.notes,
    ),
  );

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator(z.object({ goal: z.string().min(1) }))
  .handler(({ data }) =>
    run(
      "You are an expert project planner. Break the user's goal into a clear, ordered step-by-step plan in markdown. For each step include: a numbered title, a one-line description, and a priority tag of [High], [Medium], or [Low]. End with a brief 'Suggested next step' line.",
      data.goal,
    ),
  );

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator(z.object({ topic: z.string().min(1) }))
  .handler(({ data }) =>
    run(
      "You are a research assistant. Produce a structured markdown brief with these sections: '## Summary' (3-5 sentences), '## Key Insights' (bullets), '## Important Considerations' (bullets), '## Suggested Further Reading' (bullets of topic areas, not links). Be factual and clearly mark uncertainty.",
      data.topic,
    ),
  );