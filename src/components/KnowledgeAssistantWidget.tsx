import { useMemo, useState } from "react";
import { Bot, Maximize2, Minimize2, X } from "lucide-react";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { cn } from "@/lib/utils";

type ChatApiResponse = {
  answer: string;
  sessionId: string;
  sources?: string[];
};

const starterMessage: Message = {
  role: "assistant",
  content:
    "Ask me anything about my experience with Laravel, Neworking, AWS, or my latest projects.",
};

const suggestedPrompts = [
  "What is your tech stack?",
  "Can I contact you?",
  "What jobs are you searching for?",
];

export default function KnowledgeAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([starterMessage]);

  const panelClassName = useMemo(() => {
    if (isExpanded) {
      return "fixed inset-4 md:inset-8 z-[70]";
    }

    return "fixed top-24 right-4 md:top-auto md:bottom-24 md:right-6 z-[70] w-[min(92vw,420px)] h-[min(78dvh,620px)]";
  }, [isExpanded]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/knowledge/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: content,
          sessionId,
        }),
      });

      const payload = (await response.json()) as ChatApiResponse & { message?: string; error?: string };

      if (!response.ok) {
        const errorMessage = payload?.error || payload?.message || "I hit an issue contacting AWS Bedrock.";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I couldn't complete that request. ${errorMessage}`,
          },
        ]);
        return;
      }

      setSessionId(payload.sessionId ?? null);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: payload.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I couldn't reach the chat service. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={panelClassName}>
          <div
            className={cn(
              "h-full rounded-2xl border border-blue-400/30 bg-slate-950/95 shadow-[0_12px_60px_rgba(14,165,233,0.28)] backdrop-blur-xl",
              "animate-in fade-in duration-300"
            )}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 p-2 text-slate-950">
                  <Bot className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Luke's AI Assistant</p>
                  <p className="text-xs text-slate-300">Powered by Amazon AWS Bedrock</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="rounded-md border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-cyan-300/60 hover:text-white"
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                >
                  {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-cyan-300/60 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <AIChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              suggestedPrompts={suggestedPrompts}
              emptyStateMessage="Ask about Luke's background, certifications, and cloud projects."
              height="calc(100% - 61px)"
              className="h-full rounded-none border-0 bg-transparent shadow-none"
              placeholder="Ask about Luke's AWS experience..."
            />
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen) {
            setIsExpanded(false);
          }
        }}
        className="fixed top-6 right-4 md:top-auto md:bottom-6 md:right-6 z-[75] group flex h-14 items-center gap-2 rounded-full border border-cyan-300/40 bg-gradient-to-r from-sky-500 to-blue-600 px-4 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(59,130,246,0.42)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_38px_rgba(14,165,233,0.55)]"
        aria-label={isOpen ? "Hide assistant" : "Open assistant"}
      >
        <Bot className="size-5 transition-transform duration-300 group-hover:rotate-6" />
        <span>{isOpen ? "Hide AI" : "Ask AI"}</span>
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-200 opacity-80" />
          <span className="relative inline-flex size-2 rounded-full bg-cyan-100" />
        </span>
      </button>
    </>
  );
}
