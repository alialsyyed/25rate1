import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import FeedbackHome from "@/pages/feedback-home";
import FeedbackRating from "@/pages/feedback-rating";
import FeedbackSource from "@/pages/feedback-source";
import FeedbackSuccess from "@/pages/feedback-success";
import Analytics from "@/pages/analytics";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={FeedbackHome} />
      <Route path="/feedback/rating" component={FeedbackRating} />
      <Route path="/feedback/source" component={FeedbackSource} />
      <Route path="/feedback/success" component={FeedbackSuccess} />
      <Route path="/analytics" component={Analytics} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
