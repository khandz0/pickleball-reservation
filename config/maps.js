const axios = require('axios');
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Function to get latitude & longitude from an address
const getCoordinates = async (address) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
        
        console.log("Geocoding API URL:", url);

        const response = await axios.get(url);

        console.log("Geocoding API Full Response:", JSON.stringify(response.data, null, 2));

        if (response.data.status !== "OK" || response.data.results.length === 0) {
            console.log("Geocoding API Error:", response.data.status);
            return null;
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
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${latitude},${longitude}`,
                radius,
                type: 'establishment', // Google doesn't have a "pickleball" type, so we use gym/sports
                keyword: 'pickleball',
                key: GOOGLE_MAPS_API_KEY
            }
        });
        
        // 🟢 Add this debugging log to see the raw response from Google Maps API
        console.log('Google Maps API Response:', JSON.stringify(response.data, null, 2));

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
