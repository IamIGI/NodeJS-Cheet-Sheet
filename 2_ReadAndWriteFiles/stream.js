const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/new-lorem.txt');


// the same on and pipe, pipe is more efficient
rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
})

rs.pipe(ws);