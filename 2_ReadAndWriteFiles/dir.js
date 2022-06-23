const fs = require('fs');

//check if dir exists
if (!fs.existsSync('./new')){
    fs.mkdir('./new', (err) => {
        if (err) {
            throw err;
        }
        console.log('Directory created');
    })
} else {
    console.log('Dir exists');
}

//delete directory
if (fs.existsSync('./new')){
    fs.rmdir('./new', (err) => {
        if (err) {
            throw err;
        }
        console.log('Directory removed');
    })
}
