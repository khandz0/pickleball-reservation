require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middleware setup
app.use(helmet()); // Security headers should be first
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("../routes/auth");
const courtRoutes = require("../routes/courts");
const reservationRoutes = require("../routes/reservations");
const adminRoutes = require("../routes/adminRoutes");

app.use("/auth", authRoutes);
app.use("/courts", courtRoutes);
app.use("/reservations", reservationRoutes);
app.use("/admin", adminRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Pickleball Court Reservation API is running...");
});

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
