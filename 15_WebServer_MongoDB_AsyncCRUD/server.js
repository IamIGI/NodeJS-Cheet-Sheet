const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

//test zone

//Connect to MongoDB
connectDB();

//custom middleware logger
//log all traffic
app.use(logger);

//Handle options credentials check -  BEFORE CORS!!!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross origin Resource Sharing
app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());

//built-in middleware to handle urlencoded data
//in other words, form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//serve static files (img, css, txt files)
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//AUTH JWT everything beneath
app.use(verifyJWT); //app.use works like a waterfall, everything beneath will use verifyJWT
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));

//* - anything
app.all('*', (req, res) => {
    res.status(404); //set 404 status
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404: not found' });
    } else {
        res.type('txt').send('404: not found');
    }
});

//handling error, put it on the END of the file
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB'); // don't working .... on any server I tested, maybe outdated, but founded in docs...
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
