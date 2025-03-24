const express = require("express");
const pool = require("../models/db");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware: Only allow admins
const requireAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

/**
 * GET /admin/reservations
 * Admin: View all reservations
 */
router.get(
  "/reservations",
  authenticateUser,
  requireAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM reservations ORDER BY reservation_time"
      );
      res.json({ reservations: result.rows });
    } catch (err) {
      console.error("Error fetching reservations:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * DELETE /admin/reservations/:id
 * Admin: Delete any reservation by ID
 */
router.delete(
  "/reservations/:id",
  authenticateUser,
  requireAdmin,
  async (req, res) => {
    try {
      const reservation_id = req.params.id;

      // Check if reservation exists
      const check = await pool.query(
        "SELECT * FROM reservations WHERE id = $1",
        [reservation_id]
      );
      if (check.rows.length === 0) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      // Delete it
      await pool.query("DELETE FROM reservations WHERE id = $1", [
        reservation_id,
      ]);
      res.json({ message: "Reservation deleted successfully by admin" });
    } catch (err) {
      console.error("Error deleting reservation:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * DELETE /admin/users/:id
 * Admin: Delete a user and their reservations
 */
router.delete(
  "/users/:id",
  authenticateUser,
  requireAdmin,
  async (req, res) => {
    try {
      const user_id = req.params.id;

      // Check if user exists
      const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
        user_id,
      ]);
      if (userCheck.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete all reservations for the user
      await pool.query("DELETE FROM reservations WHERE user_id = $1", [
        user_id,
      ]);

      // Delete the user
      await pool.query("DELETE FROM users WHERE id = $1", [user_id]);

      res.json({ message: "User and their reservations deleted successfully" });
    } catch (err) {
      console.error("Error deleting user:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * GET /admin/users
 * Admin: View all users
 */
router.get("/users", authenticateUser, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, is_admin FROM users ORDER BY id"
    );

    res.json({ users: result.rows });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
