/** TAC SERVICE BOOKING APP – LANDING PAGE */

import LandingBrand from "../components/landing-page-components/LandingBrand";
import Login from "../components/auth-form-components/Login";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useAuthContext();

  // ✅ If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="landing-page">
      <LandingBrand />

      {/* User Login Form */}
      <Login />

      {/* Admin Login Button */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link to="/admin-login">
          <button type="button" className="auth-btn">
            Admin Login
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;
