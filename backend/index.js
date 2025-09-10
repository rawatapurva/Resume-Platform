require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());


// static upload folder for avatars
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);


const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/resume_platform')
.then(() => {
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch((err) => console.error(err));