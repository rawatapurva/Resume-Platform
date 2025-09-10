require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const path = require('path');

const app = express();

// ✅ Configure CORS properly for both local and production
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean), 
    credentials: true,
  })
);

app.use(express.json());

// ✅ Serve uploads folder for images or files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);

// ✅ Health check route (optional but good for Render)
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

const PORT = process.env.PORT || 5000;

// ✅ Connect to DB and start server
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
