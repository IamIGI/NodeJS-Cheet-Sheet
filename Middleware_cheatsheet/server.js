const express = require('express');
const app = express();
const PORT = 3500;

app.use(logger) // every app function will call for logger before execute themselves.

app.get('/', (req,res) => {
    console.log('Home Page');
    res.send('Home Page')
})

app.get('/user', auth, (req,res) => {   // call for auth before execute '/user' route
    console.log('Users Page');
    console.log(`User is admin: ${req.admin}`);
    res.send('User Page')
})

function logger (req, res, next) {
    next(); //execute logger after functions execute
    console.log('log');
}

function auth(req,res,next) {
    console.log('Auth in process');
    if (req.query.admin !== 'true') {
        console.log('Denied');
        return res.send('No auth')   
    }
    console.log('Approved');
    req.admin = true;    //you can pass variables form middleware to app functions by using req
    next() // next don't work as a return, to finish function with next() use return after next
          //execute auth before functions execute
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));