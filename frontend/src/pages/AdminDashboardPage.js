// import React, { useEffect, useState } from "react";
// import SummaryCards from "../components/dashboard-components/SummaryCards";
// import UsersTable from "../components/dashboard-components/UsersTable";
// import BookingsTable from "../components/dashboard-components/BookingsTable";
// import { useAuthContext } from "../hooks/useAuthContext";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const AdminDashboardPage = () => {
//   const { user } = useAuthContext();
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       return;
//     }
//     const fetchData = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };

//         const usersRes = await axios.get("/api/admin/users", config);
//         const bookingsRes = await axios.get("/api/admin/bookings", config);

//         setUsers(usersRes.data);
//         setBookings(bookingsRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user]);

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/admin-login" />;
//   }

//   if (loading) return <p className="admin-loading">Loading admin dashboard...</p>;

//   const totalUsers = users.length;
//   const totalAgents = users.filter((u) => u.role === "agent").length;
//   const totalBookings = bookings.length;

//   return (
//     <div className="admin-shell">
//       <header className="admin-header">
//         <div>
//           <p className="admin-kicker">Operations</p>
//           <h1 className="admin-title">Admin Dashboard</h1>
//           <p className="admin-subtitle">
//             Review users and manage service bookings.
//           </p>
//         </div>
//       </header>
//       <SummaryCards
//         totalUsers={totalUsers}
//         totalAgents={totalAgents}
//         totalBookings={totalBookings}
//       />
//       <div className="admin-section">
//         <div className="admin-section-head">
//           <h2>All Users</h2>
//           <span>{totalUsers} total</span>
//         </div>
//         <UsersTable users={users} />
//       </div>
//       <div className="admin-section">
//         <div className="admin-section-head">
//           <h2>All Bookings</h2>
//           <span>{totalBookings} total</span>
//         </div>
//         <BookingsTable bookings={bookings} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;
// frontend/src/pages/AdminDashboardPage.js
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SummaryCards from "../components/dashboard-components/SummaryCards";
import UsersTable from "../components/dashboard-components/UsersTable";
import BookingsTable from "../components/dashboard-components/BookingsTable";

import { useNavigate, Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";

const AdminDashboardPage = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logOut } = useLogOut();

  const handleBackToLogin = () => {
    logOut();
    navigate("/login");
    logOut();
  };


  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const usersRes = await axios.get("/api/admin/users", config);
        const bookingsRes = await axios.get("/api/admin/bookings", config);

        setUsers(usersRes.data);
        setBookings(bookingsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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

      <SummaryCards
        totalUsers={totalUsers}
        totalAgents={totalAgents}
        totalBookings={totalBookings}
      />

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
