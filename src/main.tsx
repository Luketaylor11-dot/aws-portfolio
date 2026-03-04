import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);

  const renderBootError = (error: unknown) => {
    const message = error instanceof Error ? (error.stack || error.message) : String(error);
    root.render(
      <div style={{ minHeight: "100vh", background: "#111827", color: "#f9fafb", padding: "24px", fontFamily: "ui-sans-serif, system-ui" }}>
        <h1 style={{ fontSize: "20px", marginBottom: "12px" }}>Root app failed to start</h1>
        <pre style={{ whiteSpace: "pre-wrap", background: "#0b1220", padding: "12px", borderRadius: "8px", overflowX: "auto" }}>{message}</pre>
      </div>
    );
  };

  try {
    let appTree: ReactNode = <App />;

    try {
      const trpcClient = trpc.createClient({
        links: [
          httpBatchLink({
            url: "/api/trpc",
            transformer: superjson,
            fetch(input, init) {
              return globalThis.fetch(input, {
                ...(init ?? {}),
                credentials: "include",
              });
            },
          }),
        ],
      });

      appTree = (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </trpc.Provider>
      );
    } catch (providerError) {
      console.error("Provider bootstrap failed, rendering App directly:", providerError);
    }

    root.render(appTree);
  } catch (error) {
    console.error("App bootstrap failed:", error);
    renderBootError(error);
  }
}
