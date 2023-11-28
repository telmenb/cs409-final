// Init Express App
const express = require('express');
const app = express();

// Get env. variables
const dotenv = require('dotenv');
dotenv.config();
const { PORT } = process.env;

// Enable CORS
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Set Routes
app.use('/api/cards', require('./routes/cards'));
app.use('/api/users', require('./routes/users'));

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
