const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
require('./config/db.js');
const routes = require('./routes/index.js');

const app = express();
app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/api', routes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));