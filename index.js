const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db.js');
const routes = require('./routes/index.js');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.use((req, res) => {
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
})

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://beesproject-client.herokuapp.com', credentials: true }));
app.use(helmet());
app.use(morgan('combined'));
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('GET request to bees api')
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));