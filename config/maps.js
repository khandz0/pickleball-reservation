const axios = require('axios');
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding API Error: ${response.data.status}`);
    }

    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return null;
  }
};

const findNearbyCourts = async (latitude, longitude, radius = 5000) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${latitude},${longitude}`,
        radius,
        keyword: 'pickleball',
        type: 'establishment',
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Places API Error: ${response.data.status}`);
    }

    return response.data.results.map(place => ({
      name: place.name,
      address: place.vicinity,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    }));
  } catch (error) {
    console.error('Error fetching courts:', error.message);
    return [];
  }
};

module.exports = { getCoordinates, findNearbyCourts };
