const express = require('express');
const { getCoordinates, findNearbyCourts } = require('../config/maps');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Search courts by address
router.get('/search', async (req, res) => {
    try {
        const { address } = req.query;

        if (!address || typeof address !== 'string') {
            return res.status(400).json({ message: 'Valid address is required' });
        }

        const location = await getCoordinates(address);
        if (!location) {
            return res.status(404).json({ message: 'Could not find coordinates for the provided address' });
        }

        const courts = await findNearbyCourts(location.lat, location.lng);
        if (!courts || courts.length === 0) {
            return res.status(404).json({ message: 'No pickleball courts found near this location' });
        }

        res.json(courts);
    } catch (error) {
        console.error('Error in court search:', error);
        res.status(500).json({ message: 'An error occurred while searching for courts' });
    }
});

// Get nearby courts (Protected Route)
router.get('/nearby', authenticateUser, async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate coordinates
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Latitude and Longitude are required' });
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lng) || 
            lat < -90 || lat > 90 || 
            lng < -180 || lng > 180) {
            return res.status(400).json({ message: 'Invalid coordinates provided' });
        }

        const courts = await findNearbyCourts(lat, lng);
        if (!courts || courts.length === 0) {
            return res.status(404).json({ message: 'No pickleball courts found near this location' });
        }

        res.json(courts);
    } catch (error) {
        console.error('Error in nearby courts:', error);
        res.status(500).json({ message: 'An error occurred while fetching nearby courts' });
    }
});

module.exports = router;
