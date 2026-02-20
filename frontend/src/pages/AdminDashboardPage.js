import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";
import SummaryCards from "../components/dashboard-components/SummaryCards";
import UsersTable from "../components/dashboard-components/UsersTable";
import BookingsTable from "../components/dashboard-components/BookingsTable";
import {
  approveProvider,
  getAdminBookings,
  getAdminUsers,
  getPendingProviders,
} from "../services/adminApi";

const AdminDashboardPage = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { logOut } = useLogOut();

  const loadAdminData = useCallback(async () => {
    if (!user || user.role !== "admin") return;

    try {
      const [usersData, bookingsData, pendingData] = await Promise.all([
        getAdminUsers(user.token),
        getAdminBookings(user.token),
        getPendingProviders(user.token),
      ]);
      setUsers(usersData);
      setBookings(bookingsData);
      setPendingProviders(pendingData);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleApprove = async (providerId) => {
    try {
      await approveProvider(user.token, providerId);
      await loadAdminData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve provider");
    }
  };

  const handleBackToLogin = () => {
    logOut();
    navigate("/login");
  };

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    loadAdminData();
  }, [user, loadAdminData]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  if (loading) return <p>Loading admin dashboard...</p>;

  const totalUsers = users.length;
  const totalAgents = users.filter((u) => u.role === "agent").length;
  const totalBookings = bookings.length;

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Operations</p>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Review users and manage service bookings.</p>
        </div>
        <button className="link-btn" type="button" onClick={handleBackToLogin}>
          Back to Login
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <SummaryCards
        totalUsers={totalUsers}
        totalAgents={totalAgents}
        totalBookings={totalBookings}
      />

      <div className="admin-section">
        <div className="admin-section-head">
          <h2>Pending Provider Approvals</h2>
          <span>{pendingProviders.length} pending</span>
        </div>
        {pendingProviders.length === 0 ? (
          <p>No pending providers.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingProviders.map((provider) => (
                  <tr key={provider._id}>
                    <td>{provider.firstName} {provider.lastName}</td>
                    <td>{provider.email}</td>
                    <td>{provider.role}</td>
                    <td>{provider.isApproved ? "Approved" : "Pending"}</td>
                    <td>
                      <button
                        type="button"
                        className="link-btn"
                        onClick={() => handleApprove(provider._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <h2>All Users</h2>
          <span>{totalUsers} total</span>
        </div>
        <UsersTable users={users} />
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <h2>All Bookings</h2>
          <span>{totalBookings} total</span>
        </div>
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
