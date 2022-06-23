const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'igi_starter.txt'), 'utf8');
        console.log(data);
        // await fsPromises.unlink(path.join(__dirname, 'files', 'igi_starter.txt'), );    //delete file

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n New line of code');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'NewName_promiseWrite.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'NewName_promiseWrite.txt'), 'utf8');
        console.log(newData);
    } catch(err) {
        console.error(err);
        
    }
}

fileOps();

    //utf8 for toString format
// fs.readFile(path.join(__dirname, 'files', 'igi_starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })



//Write, Append, Rename files
// fs.writeFile(path.join(__dirname, 'files', 'reply_with_magic.txt'), 'Magic here' ,(err) => {
//     if (err) throw err;
//     console.log('Write Complete');

//     fs.appendFile(path.join(__dirname, 'files', 'reply_with_magic.txt'), ' \n\nAdd more magic' ,(err) => {
//         if (err) throw err;
//         console.log('Append complete');


//         fs.rename(path.join(__dirname, 'files', 'reply_with_magic.txt'), path.join(__dirname, 'files', 'NEW_reply_with_magic.txt'),(err) => {
//             if (err) throw err;
//             console.log('Rename Complete');
//         })

//     })
// })





//exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was na uncaught error:  ${err}`);
    process.exit(1);
})