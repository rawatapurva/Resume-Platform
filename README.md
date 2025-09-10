# 📄 Resume Platform

A **full-stack Resume Builder application** that allows users to **create, edit, view, and manage resumes** seamlessly.  
Built with **React (Vite)** on the frontend, **Node.js + Express** on the backend, and **MongoDB Atlas** for database storage.  
Deployed using **Vercel** (frontend) and **Render** (backend).

---

## 🚀 Live Demo
- **Frontend (Vercel):** [Resume Platform](https://resume-platform-tau.vercel.app)
- **Backend (Render):** [API Endpoint](https://resume-platform-x2fo.onrender.com)

---

## ✨ Features
- **User Authentication**  
  - Secure login & signup using JWT authentication.
- **Resume Builder**  
  - Create resumes with a professional layout.
  - Save and edit multiple resumes.
- **View & Download Resumes**  
  - Generate and preview resumes online.
- **Responsive UI**  
  - Fully mobile-friendly design using **Tailwind CSS**.
- **Profile Management**  
  - View user details and manage account.
- **Protected Routes**  
  - Only authenticated users can access resume builder and dashboard.

---

## 🛠 Tech Stack

### **Frontend**
- [React](https://react.dev/) (Vite)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) for API requests
- React Router DOM

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- Multer (for file uploads)

### **Deployment**
- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/)

---

## 📂 Project Structure
Resume-Project/
│
├── backend/ # Backend Node.js + Express
│ ├── routes/ # API routes
│ ├── models/ # Mongoose models
│ ├── controllers/ # Controller logic
│ ├── config/ # DB connection config
│ ├── uploads/ # Uploaded files
│ └── index.js # Entry point
│
├── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── pages/ # Login, Signup, Dashboard, Builder, etc.
│ │ ├── components/ # Reusable components
│ │ └── App.jsx # Main App file
│ │
│ └── vite.config.js
│
└── README.md # Project documentation

yaml
Copy code

---

## ⚙️ Environment Variables

### **Backend (`.env`)**
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://resume-platform-tau.vercel.app

markdown
Copy code

### **Frontend (`.env`)**
VITE_API_URL=https://resume-platform-x2fo.onrender.com

yaml
Copy code

---

## 🖥️ Run Locally

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/Resume-Platform.git
cd Resume-Platform
2. Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
3. Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev

🚀 Deployment
Frontend deployed on Vercel

Backend deployed on Render
