const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const poseRoutes = require('./routes/sessionRoutes');
const cors = require("cors");


const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', poseRoutes);

module.exports = app;
