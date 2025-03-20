const express = require('express');
const { getCoordinates, findNearbyCourts } = require('../config/maps');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Search courts by address
router.get('/search', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }

    const location = await getCoordinates(address);
    if (!location) {
        return res.status(404).json({ message: 'Could not find coordinates for address' });
    }

    const courts = await findNearbyCourts(location.lat, location.lng);
    res.json(courts);
});

// Get nearby courts (Protected Route)
router.get('/nearby', authenticateUser, async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    const courts = await findNearbyCourts(latitude, longitude);
    res.json(courts);
});

module.exports = router;
