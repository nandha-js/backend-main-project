import dotenv from 'dotenv';
dotenv.config();

import geocoder from './geocoder.js';

const testGeocode = async () => {
  const res = await geocoder.geocode('1600 Amphitheatre Parkway, Mountain View, CA');
  console.log(res);
};

testGeocode();
