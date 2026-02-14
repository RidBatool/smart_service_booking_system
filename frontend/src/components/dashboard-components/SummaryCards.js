import React from "react";

const SummaryCards = ({ totalUsers, totalAgents, totalBookings }) => {
  return (
    <div className="admin-cards">
      <div className="admin-card admin-card-users">
        <h3>Total Users</h3>
        <p>{totalUsers}</p>
      </div>
      <div className="admin-card admin-card-agents">
        <h3>Total Agents</h3>
        <p>{totalAgents}</p>
      </div>
      <div className="admin-card admin-card-bookings">
        <h3>Total Bookings</h3>
        <p>{totalBookings}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
