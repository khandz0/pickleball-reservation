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

module.exports = router;
