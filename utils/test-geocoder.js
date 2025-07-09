// utils/test-geocoder.js
import dotenv from 'dotenv';
dotenv.config();

import geocoder from './geocoder.js'; // ✅ relative to current file

async function testGeocode() {
  try {
    const location = await geocoder.geocode('1 Infinite Loop, Cupertino, CA');
    console.log('Geocode Result:', location);
  } catch (error) {
    console.error('Error during geocoding:', error);
  }
}

testGeocode();
