import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login-page";
import Portfolio from "@/pages/portfolio/portfolio";
import Inquiries from "./pages/dashboard/inquiries";
import PendingWork from "./pages/dashboard/pending-work";
import Settings from "@/pages/settings/settings";
import Services from "./pages/dashboard/services";
import AdminLayout from "./components/globle/dashboard/admin-layout";
import { ThemeProvider } from "@/components/theme-provider";
import AddPortfolio from "./components/forms/portfolio/add-portfolio";
import Dashboard from "./pages/dashboard/dashboard";

import GuestRoute from "@/middleware/GuestRoute";
import AuthRoute from "@/middleware/AuthRoute";
import Teams from "./pages/teams/teams";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AddMamber from "./components/forms/teams/add-mamber";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Login Page - Blocked for Logged-in Users */}
          <Route
            path="/"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          {/* Reset Password Route - Should be outside admin layout */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Admin Layout - Blocked for Non-Logged-in Users */}
          <Route
            path="/admin"
            element={
              <AuthRoute>
                <AdminLayout />
              </AuthRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="pending-work" element={<PendingWork />} />
            <Route path="teams" element={<Teams />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />

            {/* Nested routes for admin sub-pages */}
            <Route path="portfolio/add-projects" element={<AddPortfolio />} />
            <Route path="teams/add-member" element={<AddMamber/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
