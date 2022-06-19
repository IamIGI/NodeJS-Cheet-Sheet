//npm run dev (look to package.json ) to run nodemon index
const {format} = require('date-fns');
const {v4: uuid} = require('uuid')

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());
