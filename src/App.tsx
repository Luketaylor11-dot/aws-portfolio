import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import KnowledgeAssistantWidget from "./components/KnowledgeAssistantWidget";
import ScrollToTop from "./components/ScrollToTop";
import { ENABLE_KNOWLEDGE_ASSISTANT } from "./const";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Resources from "./pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/projects/:slug"} component={ProjectDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <div data-site-content="true">
            <Router />
          </div>
          {ENABLE_KNOWLEDGE_ASSISTANT ? <KnowledgeAssistantWidget /> : null}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
