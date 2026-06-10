import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Workplace AI" },
      { name: "description", content: "Chat with your AI workplace assistant." },
    ],
  }),
  component: ChatPage,
});

const transport = new DefaultChatTransport({ api: "/api/chat" });

function ChatPage() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (err) => {
      console.error(err);
      toast.error("Chat failed. Please try again.");
    },
  });
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading, messages.length]);

  return (
    <div className="flex h-[calc(100svh-7rem)] w-full flex-col">
      <div className="flex-1 overflow-hidden">
        <Conversation className="h-full">
          <ConversationContent className="mx-auto max-w-3xl">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="h-8 w-8 text-primary" />}
                title="Ask me anything"
                description="Draft a reply, brainstorm a project, debug an idea — I'm here to help."
              />
            ) : (
              messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <Message key={m.id} from={m.role}>
                    {m.role === "assistant" ? (
                      <MessageResponse>{text}</MessageResponse>
                    ) : (
                      <MessageContent>{text}</MessageContent>
                    )}
                  </Message>
                );
              })
            )}
            {status === "submitted" && (
              <Message from="assistant">
                <Shimmer>Thinking</Shimmer>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl">
          <PromptInput
            onSubmit={(msg) => {
              const text = msg.text.trim();
              if (!text || isLoading) return;
              sendMessage({ text });
              setInput("");
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Workplace AI"
              autoFocus
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                disabled={!input.trim() || isLoading}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}