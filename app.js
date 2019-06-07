const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const app = express();
const members = require('./routes/members');
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/microtrain')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect...'));
    
app.set('view engine', 'pug');

app.use(express.json());
app.use(helmet());
app.use('/api/members', members);
app.use('/', home);

const port = process.env.PORT || 3019;
app.listen(port, () => console.log(`Listening on port ${port}...`));