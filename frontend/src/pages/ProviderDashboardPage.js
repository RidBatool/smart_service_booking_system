import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogOut } from "../hooks/useLogOut";
import {
  createService,
  deleteService,
  getMyServices,
} from "../services/serviceApi";

const ProviderDashboardPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logOut } = useLogOut();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });
  const [error, setError] = useState("");

  const loadServices = useCallback(async () => {
    if (!user || user.role !== "agent") return;

    try {
      const data = await getMyServices(user.token);
      setServices(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== "agent") return;
    loadServices();
  }, [user, loadServices]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onCreateService = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createService(user.token, {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        duration: Number(form.duration),
      });
      setForm({ title: "", description: "", price: "", duration: "" });
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create service");
    }
  };

  const onDeleteService = async (serviceId) => {
    try {
      await deleteService(user.token, serviceId);
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete service");
    }
  };

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  if (!user || user.role !== "agent") {
    return <Navigate to="/login" />;
  }

  if (user.isApproved === false) {
    return (
      <div className="admin-shell">
        <div className="admin-section">
          <h1 className="admin-title">Provider Approval Pending</h1>
          <p className="admin-subtitle">
            Your provider account is waiting for admin approval.
          </p>
          <button className="link-btn" onClick={handleLogout} type="button">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Provider</p>
          <h1 className="admin-title">Service Dashboard</h1>
          <p className="admin-subtitle">Manage your service catalog.</p>
        </div>
        <button className="link-btn" onClick={handleLogout} type="button">
          Logout
        </button>
      </header>

      <section className="admin-section">
        <h2>Add New Service</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={onCreateService}>
          <input
            className="auth-form-input"
            type="text"
            name="title"
            value={form.title}
            onChange={onInputChange}
            placeholder="Service title"
            required
          />
          <input
            className="auth-form-input"
            type="text"
            name="description"
            value={form.description}
            onChange={onInputChange}
            placeholder="Service description"
            required
          />
          <input
            className="auth-form-input"
            type="number"
            name="price"
            value={form.price}
            onChange={onInputChange}
            placeholder="Price"
            min="0"
            required
          />
          <input
            className="auth-form-input"
            type="number"
            name="duration"
            value={form.duration}
            onChange={onInputChange}
            placeholder="Duration (minutes)"
            min="1"
            required
          />
          <button className="link-btn" type="submit">
            Create Service
          </button>
        </form>
      </section>

      <section className="admin-section">
        <div className="admin-section-head">
          <h2>My Services</h2>
          <span>{services.length} total</span>
        </div>
        {loading ? (
          <p>Loading services...</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>{service.price}</td>
                    <td>{service.duration} mins</td>
                    <td>
                      <button
                        type="button"
                        className="link-btn"
                        onClick={() => onDeleteService(service._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProviderDashboardPage;
