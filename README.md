🏠 Real Estate Backend API
A complete backend API for a real estate platform using Node.js, Express.js, MongoDB, and JWT Authentication.

🔗 Live Backend URL
arduino
Copy
Edit
https://real-estate-api-w14p.onrender.com
📁 Project Structure
arduino
Copy
Edit
server/
├── controllers/
├── routes/
├── models/
├── middleware/
├── utils/
├── config/
├── .env
└── app.js
🛠️ Installation & Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/real-estate-backend.git
cd real-estate-backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env File
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=3d
GEOCODER_PROVIDER=mapquest
GEOCODER_API_KEY=your_mapquest_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
4. Run the Server
bash
Copy
Edit
npm run dev
🚀 API Base URL
Local:
bash
Copy
Edit
http://localhost:5000/api
Production:
bash
Copy
Edit
https://real-estate-api-w14p.onrender.com/api
🔐 Auth Routes
Method	Route	Access	Description
POST	/auth/register	Public	Register user (agent/admin)
POST	/auth/login	Public	Login and get token
GET	/auth/profile	Private	Get current user profile

🧑‍💼 Agent Routes
Method	Route	Access	Description
GET	/agents	Agent/Admin	List all agents
GET	/agents/:id	Agent/Admin	Single agent with properties
POST	/agents	Admin	Create agent manually
PUT	/agents/:id	Admin	Update agent profile
DELETE	/agents/:id	Admin	Delete agent

🏡 Property Routes
Method	Route	Access	Description
GET	/properties	Public	List all properties
GET	/properties/:id	Public	Get property detail
POST	/properties	Agent	Add new property
PUT	/properties/:id	Agent	Update property
DELETE	/properties/:id	Agent	Delete property

📅 Appointment Routes
Method	Route	Access	Description
POST	/appointments	Agent/Admin	Book appointment
GET	/appointments	Admin	All appointments
GET	/appointments/:id	Admin	Appointment by ID
DELETE	/appointments/:id	Admin	Cancel appointment

💬 Message Routes
Method	Route	Access	Description
POST	/messages	Public	Send inquiry
GET	/messages	Admin	View all messages
DELETE	/messages/:id	Admin	Delete a message

🖥️ Connecting Frontend (React)
In your React app, set the .env:

env
Copy
Edit
VITE_API_URL=https://real-estate-api-w14p.onrender.com/api
Example Axios Config:
js
Copy
Edit
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
🔐 JWT Token Use in Postman
Go to Headers tab

Add:

http
Copy
Edit
Authorization: Bearer <your_token_here>
🧪 Testing Checklist
 Register/Login ✅

 Create & Manage Agents ✅

 Create & Update Properties ✅

 Book Appointments ✅

 Send & View Messages ✅

📌 Deployment Notes
MongoDB hosted on MongoDB Atlas

Backend hosted on Render

Frontend (React) should match the backend CORS policy via .env