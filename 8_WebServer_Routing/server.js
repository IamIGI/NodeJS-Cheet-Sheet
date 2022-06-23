const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware logger
//log all traffic
app.use(logger);

//cors - Cross Origin Resource Sharing          //localhost declare for React Dev App
//put there your React Domain
const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5000', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        // true when domain is in the whiteList, remove !origin after development
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data
//in other words, form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//serve static files (img, css, txt files)
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employess', require('./routes/api/employees'));

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
