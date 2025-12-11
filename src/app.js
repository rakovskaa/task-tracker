const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://alena-task-tracker.netlify.app', 
    'http://localhost:3001'
  ]
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Task Tracker API'); //api route to root/homepage

});

app.use('/tasks', taskRoutes);

module.exports = app;