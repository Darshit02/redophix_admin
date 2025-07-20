// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/login/login-page";
// import Dashboard from "./pages/dashboard/dashboard";
// import Portfolio from "./pages/dashboard/portfolio";
// import Inquiries from "./pages/dashboard/inquiries";
// import PendingWork from "./pages/dashboard/pending-work";
// import Settings from "./pages/dashboard/settings";
// import Services from "./pages/dashboard/services";
// import CallBooking from "./pages/dashboard/call-booking";
// import AdminLayout from "./components/globle/dashboard/admin-layout";
// import { ThemeProvider } from "@/components/theme-provider"
// import AddPortfolio from "./components/forms/portfolio/add-portfolio";

// function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="portfolio" element={<Portfolio />} />
            
//             <Route path="inquiries" element={<Inquiries />} />
//             <Route path="pending-work" element={<PendingWork />} />
//             <Route path="call-bookings" element={<CallBooking />} />
//             <Route path="services" element={<Services />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>
//           <Route path="/admin/portfolio/add" element={<AddPortfolio />} />
//         </Routes>

//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// export default App;


import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login-page";
import Portfolio from "./pages/dashboard/portfolio";
import Inquiries from "./pages/dashboard/inquiries";
import PendingWork from "./pages/dashboard/pending-work";
import Settings from "./pages/dashboard/settings";
import Services from "./pages/dashboard/services";
import CallBooking from "./pages/dashboard/call-booking";
import AdminLayout from "./components/globle/dashboard/admin-layout";
import { ThemeProvider } from "@/components/theme-provider";
import AddPortfolio from "./components/forms/portfolio/add-portfolio";
import AdminLayout from "./components/globle/dashboard/admin-layout";
import Dashboard from "./pages/dashboard/dashboard";

import GuestRoute from "@/middleware/GuestRoute";
import AuthRoute from "@/middleware/AuthRoute";

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

          {/* Protected Admin Layout - Blocked for Non-Logged-in Users */}
          <Route
            path="/admin"
            element={
              <AuthRoute>
                <AdminLayout />
              </AuthRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="pending-work" element={<PendingWork />} />
            <Route path="call-bookings" element={<CallBooking />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Also Protected - Add Portfolio Page */}
          <Route
            path="/admin/portfolio/add"
            element={
              <AuthRoute>
                <AddPortfolio />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
