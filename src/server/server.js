const express = require('express');
const morgan = require('morgan');
const cors   = require('cors');
const helmet = require('helmet');
const app = express();

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

// Server endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' });
});


// Auth routes
app.post('/register', (req, res) => {
  res.json({ message: 'register' });
});

app.post('/login', (req, res) => {
  res.json({ message: 'login' });
});


const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
