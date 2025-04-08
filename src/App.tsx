
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Challenges from "./pages/Challenges";
import Challenge from "./pages/Challenge";
import ChallengeEnvironment from "./pages/ChallengeEnvironment";
import LoginBypassLab from "./lab-environments/LoginBypassLab";
import UnionAttacksLab from "./lab-environments/UnionAttacksLab";
import BlindInjectionLab from "./lab-environments/BlindInjectionLab";
import Learn from "./pages/Learn";
import Scoreboard from "./pages/Scoreboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:challengeId" element={<Challenge />} />
          <Route path="/challenge-env/:challengeId" element={<ChallengeEnvironment />} />
          <Route path="/lab-environments/login-bypass" element={<LoginBypassLab />} />
          <Route path="/lab-environments/union-attacks" element={<UnionAttacksLab />} />
          <Route path="/lab-environments/blind-injection" element={<BlindInjectionLab />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
