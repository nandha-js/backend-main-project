🏡 Real Estate Backend – MERN Stack
A full-featured real estate backend built with Node.js, Express.js, MongoDB, and JWT Auth, supporting multi-role access for users, agents, and admins. Agents can manage their own properties and appointments; admins have full control.


🚀 Technologies Used
Node.js + Express.js – REST API backend framework

MongoDB + Mongoose – NoSQL database and ODM

JWT – Secure authentication

Nodemailer + Mailtrap – Email notifications

Cloudinary – Image upload and storage

Mapbox / OpenStreetMap – Geolocation integration

Express Validator – Input validation

Render – Backend deployment

📁 Backend Folder Structure

backend-main-project/
├── config/               # DB, Cloudinary, Email, Geocoder configs
├── controllers/          # Route handler logic
├── models/               # Mongoose Schemas
├── routes/               # All route definitions
├── validators/           # Validation middlewares
├── middleware/           # Auth, roles, errors, rate limiter
├── utils/                # Helpers (email, geocoder, etc)
├── .env                  # Environment variables
├── app.js                # Main Express app
├── server.js             # Server entry point


🔐 Auth & Role System
Roles: user, agent, admin
JWT Token: Sent in headers to access protected routes.
| Role  | Permissions                                                                 |
| ----- | --------------------------------------------------------------------------- |
| User  | Browse/search properties, send messages, book appointments                  |
| Agent | Manage own properties, view own appointments, update profile                |
| Admin | Full access to users, agents, properties, appointments, dashboard analytics |

🌐 API Base URL

https://backend-main-project.onrender.com/api


🔌 How to Connect Frontend (React)
✅ Step 1: Add to .env

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


🧭 Main API Routes Summary

🔐 Auth Routes

| Method | Route            | Access  | Description               |
| ------ | ---------------- | ------- | ------------------------- |
| POST   | `/auth/register` | Public  | Register user/agent/admin |
| POST   | `/auth/login`    | Public  | Login & get JWT token     |
| GET    | `/auth/profile`  | Private | Get current user profile  |
| PUT    | `/auth/profile`  | Private | Update user profile       |
| PUT    | `/auth/password` | Private | Update password           |



🧑‍💼 Admin Routes

| Method | Route                   | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/admin/dashboard`      | View stats: users, agents, etc |
| GET    | `/admin/users`          | List all users                 |
| DELETE | `/admin/users/:id`      | Delete a user                  |
| GET    | `/admin/agents`         | List all agents                |
| DELETE | `/admin/agents/:id`     | Delete an agent                |
| GET    | `/admin/properties`     | View all properties            |
| DELETE | `/admin/properties/:id` | Delete a property              |



🏠 Properties

| Method | Route             | Access        | Description             |
| ------ | ----------------- | ------------- | ----------------------- |
| GET    | `/properties`     | Public        | List all properties     |
| GET    | `/properties/:id` | Public        | Get a specific property |
| POST   | `/properties`     | Agent / Admin | Create a new property   |
| PUT    | `/properties/:id` | Agent / Admin | Update owned property   |
| DELETE | `/properties/:id` | Agent / Admin | Delete owned property   |


📅 Appointments

| Method | Route                       | Access                          | Description                               |
| ------ | --------------------------- | ------------------------------- | ----------------------------------------- |
| POST   | `/appointments/:propertyId` | User only                       | Book an appointment for a property        |
| GET    | `/appointments`             | Admin only                      | Get all appointments                      |
| GET    | `/appointments/:id`         | Admin or Agent (property owner) | Get specific appointment by ID            |
| DELETE | `/appointments/:id`         | Admin or Agent (property owner) | Delete appointment                        |
| GET    | `/agent/appointments`       | Agent only                      | Get appointments for agent’s properties ✅ |

📩 Messages


| Method | Route           | Access |
| ------ | --------------- | ------ |
| POST   | `/messages`     | Public |
| GET    | `/messages`     | Admin  |
| DELETE | `/messages/:id` | Admin  |


✅ Frontend Auth Flow
User/Agent/Admin logs in → receives JWT

JWT stored in localStorage

Axios sends JWT via Authorization header

Frontend uses decoded role to control UI access



🚀 Deployment Recap

| Component | Platform                         |
| --------- | -------------------------------- |
| Backend   | [Render](https://render.com)     |
| Frontend  | Vite + React (Netlify or Vercel) |
| Database  | MongoDB Atlas                    |
| Email     | Mailtrap.io                      |
| Images    | Cloudinary                       |



🛠 Sample Agent Appointment Call

GET /api/agent/appointments
Authorization: Bearer <agent-token>

Response

{
  "success": true,
  "data": [
    {
      "_id": "appointmentId",
      "property": { "_id": "propertyId", "title": "Villa" },
      "user": { "_id": "userId", "name": "John" },
      "date": "2025-07-14T00:00:00.000Z",
      "time": "14:30",
      "message": "I would like to visit."
    }
  ]
}

