🏠 Real Estate Backend API
A complete backend API for a real estate platform built with Node.js, Express.js, MongoDB, and JWT Authentication.

🔗 Live Backend URL
https://real-estate-api-w14p.onrender.com


server/
├── controllers/        # Route handler logic
├── routes/             # API endpoints
├── models/             # Mongoose schemas
├── middleware/         # Auth, error, and role middleware
├── utils/              # Utility functions (e.g. geocoder)
├── config/             # DB, Cloudinary, etc.
├── .env                # Environment variables
└── app.js              # App entry point

git clone https://github.com/your-username/real-estate-backend.git
cd real-estate-backend


npm install

npm run dev


 API Base URLs
Local: http://localhost:5000/api

Production: https://real-estate-api-w14p.onrender.com/api

| Method | Route            | Access  | Description                |
| ------ | ---------------- | ------- | -------------------------- |
| POST   | `/auth/register` | Public  | Register agent or admin    |
| POST   | `/auth/login`    | Public  | Login and receive token    |
| GET    | `/auth/profile`  | Private | Get logged-in user profile |


| Method | Route         | Access      | Description                |
| ------ | ------------- | ----------- | -------------------------- |
| GET    | `/agents`     | Agent/Admin | Get all agents             |
| GET    | `/agents/:id` | Agent/Admin | Get agent by ID + listings |
| POST   | `/agents`     | Admin       | Manually create agent      |
| PUT    | `/agents/:id` | Admin       | Update agent details       |
| DELETE | `/agents/:id` | Admin       | Delete agent               |

| Method | Route             | Access | Description         |
| ------ | ----------------- | ------ | ------------------- |
| GET    | `/properties`     | Public | List all properties |
| GET    | `/properties/:id` | Public | Get property by ID  |
| POST   | `/properties`     | Agent  | Create new property |
| PUT    | `/properties/:id` | Agent  | Update property     |
| DELETE | `/properties/:id` | Agent  | Delete property     |


| Method | Route               | Access      | Description           |
| ------ | ------------------- | ----------- | --------------------- |
| POST   | `/appointments`     | Agent/Admin | Book an appointment   |
| GET    | `/appointments`     | Admin       | Get all appointments  |
| GET    | `/appointments/:id` | Admin       | Get appointment by ID |
| DELETE | `/appointments/:id` | Admin       | Cancel appointment    |


| Method | Route           | Access | Description            |
| ------ | --------------- | ------ | ---------------------- |
| POST   | `/messages`     | Public | Send inquiry message   |
| GET    | `/messages`     | Admin  | View all inquiries     |
| DELETE | `/messages/:id` | Admin  | Delete inquiry message |


 Connecting Frontend (React)
.env in React App:

VITE_API_URL=https://real-estate-api-w14p.onrender.com/api




// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;


Authorization: Bearer <your_token_here>


✅ Testing Checklist
 Register / Login

 Create & Manage Agents

 Create, Update, Delete Properties

 Book & View Appointments

 Send & View Messages


📌 Deployment Notes
Database: MongoDB Atlas

Hosting: Render.com

Frontend URL: Must be added to FRONTEND_URL in backend .env

CORS: Properly configured using cors middleware to allow frontend requests

✅ Example CORS Setup:

const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

