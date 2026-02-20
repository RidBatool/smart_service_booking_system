const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bp = require("body-parser");

const routes = require("./routes/routes");
const userLoginRoutes = require("./routes/user");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/bookings", routes);
app.use("/api/services", serviceRoutes);
app.use("/api", userLoginRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB connection
const connectDB = require("./dbs/db");
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
