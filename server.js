// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

app.use('/blogs', blogRoutes);
app.use(authRoutes);

const PORT = process.env.PORT;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');

        app.get('/', (req, res) => {
            res.send('Server is running');
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });