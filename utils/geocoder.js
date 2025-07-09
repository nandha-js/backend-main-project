import NodeGeocoder from 'node-geocoder';
import dotenv from 'dotenv';
dotenv.config();


if (process.env.NODE_ENV !== 'production') {
  console.log('GEOCODER_API_KEY:', process.env.GEOCODER_API_KEY);
}


const options = {
  provider: process.env.GEOCODER_PROVIDER || 'mapbox',
  apiKey: process.env.GEOCODER_API_KEY || 'pk.eyJ1IjoibmFuZGhhMDA3IiwiYSI6ImNtY3VkZGF5ajAwMHUyanF5d3hqY3ZnamEifQ.XUIZbSEKl_qROshULrR3WA',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
