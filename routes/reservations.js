const express = require("express");
const pool = require("../models/db"); // This connects to PostgreSQL
const authenticateUser = require("../middleware/authMiddleware"); // Checks JWT

const router = express.Router();

/**
 * POST /reservations
 * Create a new reservation
 */
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { court_name, court_address, reservation_time } = req.body;
    const user_id = req.user.id; // Comes from the decoded JWT

    if (!court_name || !court_address || !reservation_time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO reservations (user_id, court_name, court_address, reservation_time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, court_name, court_address, reservation_time]
    );

    res.status(201).json({ reservation: result.rows[0] });
  } catch (err) {
    console.error("Error creating reservation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /reservations
 * Get all reservations for the logged-in user
 */
router.get("/", authenticateUser, async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      "SELECT * FROM reservations WHERE user_id = $1 ORDER BY reservation_time",
      [user_id]
    );

    res.json({ reservations: result.rows });
  } catch (err) {
    console.error("Error fetching reservations:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /reservations/:id
 * Delete a reservation by ID (if it belongs to the user)
 */
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const reservation_id = req.params.id;
    const user_id = req.user.id;

    // First, check if the reservation belongs to this user
    const check = await pool.query(
      "SELECT * FROM reservations WHERE id = $1 AND user_id = $2",
      [reservation_id, user_id]
    );

    if (check.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Reservation not found or unauthorized" });
    }

    // If it belongs to the user, delete it
    await pool.query("DELETE FROM reservations WHERE id = $1", [
      reservation_id,
    ]);

    res.json({ message: "Reservation cancelled successfully" });
  } catch (err) {
    console.error("Error deleting reservation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /reservations/:id
 * Update an existing reservation
 */
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const reservation_id = req.params.id;
    const user_id = req.user.id;
    const { court_name, court_address, reservation_time } = req.body;

    if (!court_name || !court_address || !reservation_time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Make sure the reservation exists and belongs to the user
    const check = await pool.query(
      "SELECT * FROM reservations WHERE id = $1 AND user_id = $2",
      [reservation_id, user_id]
    );

    if (check.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Reservation not found or unauthorized" });
    }

    // Perform the update
    const result = await pool.query(
      `UPDATE reservations
       SET court_name = $1, court_address = $2, reservation_time = $3
       WHERE id = $4
       RETURNING *`,
      [court_name, court_address, reservation_time, reservation_id]
    );

    res.json({
      message: "Reservation updated successfully",
      reservation: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating reservation:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
