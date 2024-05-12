const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Tuo cors-moduuli
const app = express();
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const taskRoutes = require('./routes/taskRoutes'); // Ota taskRoutes käyttöön

app.use(cors()); // Käytä cors-middlewarea sallimaan CORS-pyynnöt
app.use(express.json());
app.use('/api/tasks', taskRoutes); // Liitä taskRoutes reitit sovellukseen

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for successful connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define your routes and other server logic here
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
