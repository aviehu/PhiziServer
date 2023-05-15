const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const poseRoutes = require('./routes/poseRoutes')
const cors = require("cors");


const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use('/api/poses', poseRoutes)
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

module.exports = app;
