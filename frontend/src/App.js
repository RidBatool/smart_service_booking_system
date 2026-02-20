import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import LandingPage from "./pages/LandingPage";
import CreateAccPage from "./pages/CreateAccPage";
import ScheduleBookingPage from "./pages/ScheduleBookingPage";
import UpdateBookingPage from "./pages/UpdateBookingPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProviderDashboardPage from "./pages/ProviderDashboardPage";

export default function App() {
  const { user } = useAuthContext();
  const defaultRoute = user
    ? user.role === "admin"
      ? "/admin"
      : user.role === "agent"
        ? "/provider"
        : "/"
    : "/login";

  return (
    <BrowserRouter>
  
      <Routes>
        

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={!user ? <LandingPage /> : <Navigate to={defaultRoute} />} />
        <Route path="/create-account" element={!user ? <CreateAccPage /> : <Navigate to={defaultRoute} />} />
        <Route path="/admin-login" element={!user ? <AdminLoginPage /> : <Navigate to={defaultRoute} />} />

        {/*  ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin"
              ? <AdminDashboardPage />
              : <Navigate to="/admin-login" />
          }
        />

        {/* PROVIDER PROTECTED ROUTE */}
        <Route
          path="/provider"
          element={
            user && user.role === "agent"
              ? <ProviderDashboardPage />
              : <Navigate to="/login" />
          }
        />

        {/* USER PROTECTED ROUTES */}
        <Route
          path="/"
          element={user && user.role === "customer" ? <DashboardPage /> : <Navigate to={defaultRoute} />}
        />
        <Route
          path="/schedule-booking"
          element={user && user.role === "customer" ? <ScheduleBookingPage /> : <Navigate to={defaultRoute} />}
        />
        <Route
          path="/update-booking/:id"
          element={user && user.role === "customer" ? <UpdateBookingPage /> : <Navigate to={defaultRoute} />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={defaultRoute} />}
        />

      </Routes>
    </BrowserRouter>


  );
}
