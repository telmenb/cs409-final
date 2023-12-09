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

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Set Routes
app.use('/api/cards', require('./routes/cards'));
app.use('/api/users', require('./routes/users'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/countries', require('./routes/countries'));

// Listen
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening at http://${server.address().address}:${server.address().port}`);
});
