🏡 Real Estate Backend Summary (MERN Stack) 

🚀 Technologies Used:
Node.js + Express.js – REST API framework

MongoDB + Mongoose – Database & ODM

JWT – Authentication

Nodemailer (Mailtrap) – Email sending

Cloudinary – Image upload

OpenStreetMap (via Mapbox) – Geolocation

Express-Validator – Input validation

Render.com – Deployment


               Backend Folder Structure 


 backend-main-project/
├── config/               # DB, Cloudinary, Mail, Geocoder configs
├── controllers/          # Route logic
├── models/               # Mongoose Schemas
├── routes/               # API Endpoints
├── validators/           # Request body validations
├── middleware/           # Auth, role, error handling, rate limit
├── utils/                # Helpers (email, geocoder)
├── .env                  # Environment variables
├── app.js                # Express app setup
├── server.js             # Server entry point
 

 Auth & Roles System
Roles: user, agent, admin

Login returns a JWT token → Required in protected routes

Role-based access:

User: Browse properties, send messages

Agent: CRUD properties, view own profile & appointments

Admin: Full access to users, agents, properties, dashboard  
 
               Deployed API Base URL 

    https://backend-main-project.onrender.com/api


        🔌 How to Connect Frontend (React)   
          ✅ Step 1: Add API Base in .env

VITE_API_URL=https://backend-main-project.onrender.com/api

          ✅ Step 2: Axios Setup (src/services/api.js)

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



Main API Routes Summary  



| Method | Route          | Access  | Description               |
| ------ | -------------- | ------- | ------------------------- |
| POST   | /auth/register | Public  | Register user/agent/admin |
| POST   | /auth/login    | Public  | Login + token             |
| GET    | /auth/profile  | Private | Logged-in user profile    |
| PUT    | /auth/profile  | Private | Update profile            |
| PUT    | /auth/password | Private | Update password           |




👤 Admin (requires role: admin)

| Method | Route                  | Description                       |
| ------ | ---------------------- | --------------------------------- |
| GET    | /admin/dashboard       | View counts of users, agents, etc |
| GET    | /admin/users           | List all users                    |
| DELETE | /admin/users/\:id      | Delete a user                     |
| GET    | /admin/agents          | List all agents                   |
| DELETE | /admin/agents/\:id     | Delete an agent                   |
| GET    | /admin/properties      | List all properties               |
| DELETE | /admin/properties/\:id | Delete a property                 |

🏠 Properties


| Method | Route            | Access      |
| ------ | ---------------- | ----------- |
| GET    | /properties      | Public      |
| GET    | /properties/\:id | Public      |
| POST   | /properties      | Agent/Admin |
| PUT    | /properties/\:id | Agent/Admin |
| DELETE | /properties/\:id | Agent/Admin |

📅 Appointments


| Method | Route                      | Access      |
| ------ | -------------------------- | ----------- |
| POST   | /appointments/\:propertyId | Agent/Admin |
| GET    | /appointments              | Admin       |
| GET    | /appointments/\:id         | Admin       |
| DELETE | /appointments/\:id         | Admin       |


📩 Messages

| Method | Route          | Access |
| ------ | -------------- | ------ |
| POST   | /messages      | Public |
| GET    | /messages      | Admin  |
| DELETE | /messages/\:id | Admin  |


✅ Frontend Auth Flow
Register or Login from React

Store the JWT token in localStorage

Axios sends it via header for protected routes

Use role (user, agent, admin) from token to control frontend access



📦 Deployment Recap

| Component | Hosted On                                           |
| --------- | --------------------------------------------------- |
| Backend   | Render.com                                          |
| Frontend  | Vite + React (You can also host on Netlify, Vercel) |
| Database  | MongoDB Atlas                                       |
| Email     | Mailtrap.io                                         |
| Images    | Cloudinary                                          |
