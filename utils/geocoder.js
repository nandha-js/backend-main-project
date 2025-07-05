import NodeGeocoder from 'node-geocoder';
import dotenv from 'dotenv';

dotenv.config();

const provider = process.env.GEOCODER_PROVIDER || 'mapbox';
const apiKey = process.env.GEOCODER_API_KEY;

if (!apiKey) {
  throw new Error('GEOCODER_API_KEY must be defined in environment variables');
}

const options = {
  provider,
  apiKey,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
