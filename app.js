const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { register, login } = require('./controllers/auth');
const auth = require('./middleware/auth');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/authdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signup', register);
app.post('/signin', login);

// authorization
app.use(auth);

app.use('/posts', require('./routes/posts')); // a new route was added

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log('Link to the server:');
  console.log(BASE_PATH);
});
