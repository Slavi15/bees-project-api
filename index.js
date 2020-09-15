const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
require('./config/db.js');
const routes = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware.js');

const app = express();
app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('GET request to bees api')
});
app.get('http://localhost:3000/*', checkUser);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));