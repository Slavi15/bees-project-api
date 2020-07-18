const express = require('express');
require('dotenv').config();
require('./config/db.js');
const routes = require('./routes/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));