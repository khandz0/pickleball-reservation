const axios = require('axios');
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Function to get latitude & longitude from an address
const getCoordinates = async (address) => {
    try {
        if (!address || typeof address !== 'string') {
            throw new Error('Invalid address provided');
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
        
        const response = await axios.get(url);

        if (response.data.status === "ZERO_RESULTS") {
            return null;
        }

        if (response.data.status !== "OK") {
            throw new Error(`Geocoding API Error: ${response.data.status}`);
        }

        return response.data.results[0].geometry.location;
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
};

// Function to find nearby pickleball courts
const findNearbyCourts = async (latitude, longitude, radius = 5000) => {
    try {
        // Validate coordinates
        if (!latitude || !longitude || 
            latitude < -90 || latitude > 90 || 
            longitude < -180 || longitude > 180) {
            throw new Error('Invalid coordinates provided');
        }

        // Validate radius
        if (radius < 0 || radius > 50000) {
            radius = 5000; // Default to 5km if invalid
        }

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${latitude},${longitude}`,
                radius,
                type: 'establishment',
                keyword: 'pickleball',
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status !== "OK") {
            throw new Error(`Places API Error: ${response.data.status}`);
        }

        return response.data.results.map(place => ({
            name: place.name,
            address: place.vicinity,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng
        }));
    } catch (error) {
        console.error('Error fetching courts:', error.message);
        return [];
    }
};

module.exports = { getCoordinates, findNearbyCourts };
