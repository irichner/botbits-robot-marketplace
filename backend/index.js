// Change Log: Initial creation for backend server. Added Express app, CORS for frontend, routes, DB connection. Listens on 5000. Update: Emphasized .env loading for MONGODB_URI; no code changes.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const robotRoutes = require('./routes/robots');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust for prod
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/robots', robotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));