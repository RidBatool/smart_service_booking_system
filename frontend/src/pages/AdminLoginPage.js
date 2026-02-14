// // frontend/src/pages/AdminLoginPage.js
// import React, { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminLoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login } = useAuthContext();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // Send login request to backend
//       const res = await axios.post("/api/login", { email, password });
//       const user = res.data;

//       // Check if user is admin
//       if (user.role !== "admin") {
//         setError("Access denied, admin only");
//         return;
//       }

//       // Save user in context + localStorage
//       login(user);

//       // Redirect to admin dashboard
//       navigate("/admin");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="p-2 border rounded"
//           required
//         />
//         <button type="submit" className="p-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLoginPage;
// frontend/src/pages/AdminLoginPage.js
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useNavigate, Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";

import axios from "axios";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { logOut } = useLogOut();

  const handleBackToLogin = () => {
    logOut();
    logOut();
    navigate("/login");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send login request to backend
      const res = await axios.post("/api/login", { email, password });
      console.log("LOGIN RESPONSE:", res.data); // 🔴 ADD THIS
      const user = res.data;

      // ADMIN ROLE CHECK
      if (!user || user.role !== "admin") {
        setError("Access denied, admin only");
        return;
      }

      // Save user in context + localStorage
      login(user);

      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button className="auth-btn" type="button" onClick={handleBackToLogin}>
          Back to Login
        </button>


      </form>
    </div>
  );
};

export default AdminLoginPage;
