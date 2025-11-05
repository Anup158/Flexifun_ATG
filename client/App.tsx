import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSelection from "./pages/LoginSelection";
import ChildHome from "./pages/ChildHome";
import ChildLogin from "./pages/ChildLogin";
import TherapistLogin from "./pages/TherapistLogin";
import TherapistDashboard from "./pages/TherapistDashboard";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSelection />} />
          <Route path="/child-login" element={<ChildLogin />} />
          <Route path="/therapist-login" element={<TherapistLogin />} />
          <Route path="/home" element={<ChildHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game/:gameId" element={<Game />} />
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
