// Init Express App
const express = require('express');
const app = express();

// Setup DB connection
const DB_CONN_STRING = 'mongodb+srv://tbayar2:PcblQjj9m2HgKWF1@409-cluster.ib7f6ue.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(DB_CONN_STRING);

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
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
