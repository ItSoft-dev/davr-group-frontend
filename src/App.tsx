import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Admin pages
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminFleet from "./pages/admin/AdminFleet";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminStats from "./pages/admin/AdminStats";
import AdminCompanyInfo from "./pages/admin/AdminCompanyInfo";
import AdminTimeline from "./pages/admin/AdminTimeline";
import AdminValues from "./pages/admin/AdminValues";
import AdminWhyUs from "./pages/admin/AdminWhyUs";
import AdminHero from "./pages/admin/AdminHero";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<Layout><Index /></Layout>} path="/" />
            <Route element={<Layout><About /></Layout>} path="/about" />
            <Route element={<Layout><Services /></Layout>} path="/services" />
            <Route element={<Layout><Fleet /></Layout>} path="/fleet" />
            <Route element={<Layout><Contact /></Layout>} path="/contact" />
            <Route element={<Layout><Quote /></Layout>} path="/quote" />
            <Route element={<Layout><PrivacyPolicy /></Layout>} path="/privacy" />
            <Route element={<Layout><TermsOfService /></Layout>} path="/terms" />

            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="fleet" element={<AdminFleet />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="quotes" element={<AdminQuotes />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="company" element={<AdminCompanyInfo />} />
              <Route path="timeline" element={<AdminTimeline />} />
              <Route path="values" element={<AdminValues />} />
              <Route path="why-us" element={<AdminWhyUs />} />
              <Route path="hero" element={<AdminHero />} />
            </Route>

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
