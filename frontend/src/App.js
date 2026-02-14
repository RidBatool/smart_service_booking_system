import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ThemeToggle from "./components/ThemeToggle";

import LandingPage from "./pages/LandingPage";
import CreateAccPage from "./pages/CreateAccPage";
import ScheduleBookingPage from "./pages/ScheduleBookingPage";
import UpdateBookingPage from "./pages/UpdateBookingPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";

export default function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
  
      <Routes>
        

        {/* ✅ PUBLIC ROUTES */}
        <Route path="/login" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* ✅ ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin"
              ? <AdminDashboardPage />
              : <Navigate to="/admin-login" />
          }
        />

        {/* ✅ USER PROTECTED ROUTES */}
        <Route
          path="/"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/schedule-booking"
          element={user ? <ScheduleBookingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-booking/:id"
          element={user ? <UpdateBookingPage /> : <Navigate to="/login" />}
        />

        {/* ✅ FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} />}
        />

      </Routes>
    </BrowserRouter>


  );
}
