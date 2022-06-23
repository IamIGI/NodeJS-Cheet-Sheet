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
app.use(express.static(path.join(__dirname, '/public')));

//^ - begin with ..., $ - must end with ...,  | - or, ()? - what is inside parentheses is optional
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    // res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default, set 301 status code
});

//Route handlers
app.get(
    '/hello(.html)?',
    (req, res, next) => {
        console.log('attempted to load Hello.html');
        next(); //call next function in the chain
    },
    (req, res) => {
        //this is last in the route
        res.send('Hello world');
    }
);

//---------------
const one = (req, res, next) => {
    console.log('one');
    next();
};
const two = (req, res, next) => {
    console.log('two');
    next();
};
const three = (req, res, next) => {
    console.log('three');
    res.send('Finished!');
};

app.get('/chain(.html)?', [one, two, three]);
//-----------------

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
