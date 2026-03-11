import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isChatInputFocused, setIsChatInputFocused] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isInputFocusedRef = useRef(false);
  const openedAtRef = useRef(0);

  const syncBodyChatOpenAttribute = (open: boolean) => {
    if (typeof window === "undefined") return;
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;

    if (open && isMobileViewport) {
      const bg = "linear-gradient(to bottom, #082f49, #172554, #020617)";
      document.documentElement.setAttribute("data-chat-open", "true");
      document.documentElement.style.background = bg;
      document.documentElement.style.backgroundColor = "#020617";
      document.body.setAttribute("data-chat-open", "true");
      document.body.style.background = bg;
      document.body.style.backgroundColor = "#020617";
      return;
    }

    document.documentElement.removeAttribute("data-chat-open");
    document.documentElement.style.background = "";
    document.documentElement.style.backgroundColor = "";
    document.body.removeAttribute("data-chat-open");
    document.body.style.background = "";
    document.body.style.backgroundColor = "";
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  const shouldUseBackdrop = isOpen && isMobile;

  useEffect(() => {
    if (!isOpen) {
      isInputFocusedRef.current = false;
      setIsChatInputFocused(false);
      setKeyboardOffset(0);
      return;
    }

    const isTextInput = (el: Element | null) => {
      if (!el) return false;
      if (el instanceof HTMLTextAreaElement) return true;
      if (el instanceof HTMLInputElement) {
        const type = (el.type || "text").toLowerCase();
        return type !== "checkbox" && type !== "radio" && type !== "button";
      }
      return (el as HTMLElement).isContentEditable;
    };

    const updateFocusState = () => {
      const active = document.activeElement;
      const panel = panelRef.current;
      const isFocused = Boolean(panel && active && panel.contains(active) && isTextInput(active));
      isInputFocusedRef.current = isFocused;
      setIsChatInputFocused(isFocused);

      if (isFocused) {
        // Reinforce immediately when keyboard is about to open so iOS scroll animation
        // doesn't expose the page behind the overlay.
        syncBodyChatOpenAttribute(true);
      } else {
        setKeyboardOffset(0);
      }
    };

    document.addEventListener("focusin", updateFocusState);
    document.addEventListener("focusout", updateFocusState);
    updateFocusState();

    return () => {
      document.removeEventListener("focusin", updateFocusState);
      document.removeEventListener("focusout", updateFocusState);
    };
  }, [isOpen]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv || !isOpen) {
      setKeyboardOffset(0);
      return;
    }

    let rafId: number | null = null;

    const update = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const elapsedSinceOpen = Date.now() - openedAtRef.current;
        if (elapsedSinceOpen < 220) {
          setKeyboardOffset(0);
          return;
        }

        const rawKeyboardHeight = Math.max(0, window.innerHeight - vv.offsetTop - vv.height);
        const hasInputFocus = isInputFocusedRef.current;
        const keyboardHeight = hasInputFocus && rawKeyboardHeight > 120 ? rawKeyboardHeight : 0;

        setKeyboardOffset((prev) => (Math.abs(prev - keyboardHeight) < 2 ? prev : keyboardHeight));
      });
    };

    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    update();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!shouldUseBackdrop) return;
    const htmlStyle = document.documentElement.style;
    const bodyStyle = document.body.style;

    const previousHtmlOverflow = htmlStyle.overflow;
    const previousHtmlOverscroll = htmlStyle.overscrollBehavior;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousBodyTouchAction = bodyStyle.touchAction;
    const previousBodyOverscroll = bodyStyle.overscrollBehavior;

    htmlStyle.overflow = "hidden";
    htmlStyle.overscrollBehavior = "none";
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";
    bodyStyle.overscrollBehavior = "none";

    const preventBackgroundScroll = (event: TouchEvent | WheelEvent) => {
      const panel = panelRef.current;
      const target = event.target as Node | null;

      if (panel && target && panel.contains(target)) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });
    document.addEventListener("wheel", preventBackgroundScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventBackgroundScroll);
      document.removeEventListener("wheel", preventBackgroundScroll);
      htmlStyle.overflow = previousHtmlOverflow;
      htmlStyle.overscrollBehavior = previousHtmlOverscroll;
      bodyStyle.overflow = previousBodyOverflow;
      bodyStyle.touchAction = previousBodyTouchAction;
      bodyStyle.overscrollBehavior = previousBodyOverscroll;
    };
  }, [shouldUseBackdrop]);

  useEffect(() => {
    const body = document.body;

    if (shouldUseBackdrop) {
      body.setAttribute("data-chat-open", "true");
    } else {
      body.removeAttribute("data-chat-open");
    }

    return () => {
      body.removeAttribute("data-chat-open");
      document.documentElement.removeAttribute("data-chat-open");
      document.documentElement.style.background = "";
      document.documentElement.style.backgroundColor = "";
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
    };
  }, [shouldUseBackdrop]);

  const panelClassName = useMemo(() => {
    if (isExpanded) {
      return "fixed inset-4 md:inset-8 z-[90]";
    }

    return "fixed bottom-4 right-4 md:bottom-24 md:right-6 z-[90] w-[min(92vw,420px)] h-[min(78dvh,620px)] transition-[bottom] duration-150 ease-out";
  }, [isExpanded]);

  const panelStyle = useMemo(() => {
    if (isExpanded || !isChatInputFocused || keyboardOffset === 0) return undefined;
    // Sit flush with keyboard top while open to avoid exposing a page strip behind the chat.
    return { bottom: `${keyboardOffset}px` };
  }, [isExpanded, isChatInputFocused, keyboardOffset]);

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
        <>
          {shouldUseBackdrop && <div className="fixed inset-x-0 top-0 z-[80] bg-gradient-to-b from-sky-950 via-blue-950 to-slate-950" style={{ height: "100lvh" }} />}

          <div ref={panelRef} className={panelClassName} style={panelStyle}>
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
                    onClick={() => {
                      syncBodyChatOpenAttribute(false);
                      setKeyboardOffset(0);
                      setIsChatInputFocused(false);
                      setIsOpen(false);
                    }}
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
        </>
      )}

      <button
        onClick={() => {
          if (isOpen) {
            syncBodyChatOpenAttribute(false);
            setKeyboardOffset(0);
            setIsChatInputFocused(false);
            setIsOpen(false);
          } else {
            syncBodyChatOpenAttribute(true);
            openedAtRef.current = Date.now();
            setKeyboardOffset(0);
            setIsChatInputFocused(false);
            setIsOpen(true);
            setIsExpanded(false);
          }
        }}
        className="fixed top-6 right-4 md:top-auto md:bottom-6 md:right-6 z-[95] group flex h-14 items-center gap-2 rounded-full border border-cyan-300/40 bg-gradient-to-r from-sky-500 to-blue-600 px-4 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(59,130,246,0.42)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_38px_rgba(14,165,233,0.55)]"
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
