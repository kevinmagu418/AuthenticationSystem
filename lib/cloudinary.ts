import { v2 as cloudinary } from 'cloudinary';

const { CLOUD_NAME, APIKEYCLOUDINARY, API_SECRET } = process.env;

if (!CLOUD_NAME || !APIKEYCLOUDINARY || !API_SECRET) {
  throw new Error('Missing Cloudinary environment variables');
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: APIKEYCLOUDINARY,
  api_secret: API_SECRET,
});

export default cloudinary;
