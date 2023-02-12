const express = require('express');
// const router = express.Router();
const app = express();
// const feedRoutes = require('./feed');
const authRoutes = require('./authRoute');



// app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);


