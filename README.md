run server using "npm run dev", change used package in package.json -> scripts.dev

MVC -> means "Modern View Controller" pattern

# How the user auth works:

FOLDER: '10_WebServer_Authentication'

1. IN server.js you defined in '//routes' section (line 29) a route to register file
2. In register file you import route to use post method for register functionality
   Post method logic you define in registerController.js file
3. registerController.js file have async function 'handleNewUser' which check for register data,
   check duplicates, and then hashed password by using bcrypt library.
   We use there 2 times await to make sure that user won't be saved before hashing finish.

## Useful links:

# Cheatsheet is based on yt tutorial by Dave Grey

https://www.youtube.com/watch?v=f2EqECiTBL8

# Express.js -> Check Guide:

https://expressjs.com

# Node.js -> documentation:

https://nodejs.org/docs/latest-v17.x/api/fs.html

# Node.js -> file system:

https://nodejs.org/docs/latest-v17.x/api/fs.html#filehandlereadfileoptions

# uuid -> return random generated id:

https://www.npmjs.com/package/uuid

# npm packages:

https://www.npmjs.com
