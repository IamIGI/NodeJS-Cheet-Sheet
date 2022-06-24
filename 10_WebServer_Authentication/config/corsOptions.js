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

module.exports = corsOptions;
