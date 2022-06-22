const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

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
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //set 404 status
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
