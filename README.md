# Freedom by chaining-up - NodeJS

Final project for the course BCDV1007 - Full Stack Development II from [Blockchain Development](https://www.georgebrown.ca/programs/blockchain-development-program-t175/) program from [George Brown College](https://www.georgebrown.ca).

This project is an extension of a previous static web site version. You can check this previous version [here](https://github.com/LorranSutter/Freedom-by-chaining-up).

---

Dynamic web site presented as final assignment using HTML5, CSS3, JS, Express and MongoDB. Based on the final project presented on the course BCDV1001 - Introduction to Blockchain. It consists of a platform which allows gamers connect their game accounts in order to sell, buy and trade game assets.

<div align="center">

![Preview](https://res.cloudinary.com/lorransutter/image/upload/v1589314584/Freedom_by_chaining_up_Node.gif)

</div>

## :runner: How to run

Open your terminal in the folder you want to clone the project

```sh
# Clone this repo
git clone https://github.com/LorranSutter/Freedom-by-chaining-up-Node.git

# Go to the project
cd Freedom-by-chaining-up-Node

# Install dependencies
npm install

# Run the project
npm run start

# Or run using nodemon
npm run devstart
```

If you want to use your own mongodb account, replace the following variable with your own mongo URL:

```sh
# Go to config/db.js
MONGOURI = <your-url>
```

Then you may populate your database using the following command:

```sh
node populatedb.js
```
## :book: Resources
- [Final Assignment - BCDV1001](https://drive.google.com/file/d/1CQZWTo7N4vliZXRFV4m0hd2VNEdJs6BG/view?usp=sharing)

## :computer: Technologies
- [HTML5](https://www.w3schools.com/html/html5_intro.asp) - markup language used for structuring and presenting content
- [CSS](https://www.w3schools.com/css/) - style sheet language used for describing the presentation of a document
- [JavaScript](https://www.w3schools.com/js/) - high-level, often just-in-time compiled, and multi-paradigm programming language
- [JQuery](https://jquery.com/) - JS library designed to simplify HTML DOM interacto
- [Node.js](https://nodejs.org/en/) - executes JS scripts in server side
- [Express.js](http://expressjs.com/) - web application framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - object data modeling (ODM) library for MongoDB and Node.js
- [Moment.js](https://momentjs.com/) - parsing, validating, manipulating and displaying dates and times
- [Pug](https://pugjs.org/) - template engine for Node.js and for the browser
