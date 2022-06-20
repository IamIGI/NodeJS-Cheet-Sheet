const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//iinit object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log',(msg) => logEvents(msg));

//log - event with name "log", and add comment 'Log event emitted'
myEmitter.emit('log', 'Log event emitted');
