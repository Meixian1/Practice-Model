const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //


// find   - finds everything
// .find()
// listMany by find                                                                good!
app.get("/books", async (req, res) => {
    let arrayOfBooks = await Book.find();
    res.send(arrayOfBooks);
});
 
// findById
// filter by id                                                                    good!           
app.get("/books/id/:idOfBooks", async (req, res) => {             
    let id = req.params.idOfBooks;
    let arrayOfBooks = await Book.findById(id);
    console.log(arrayOfBooks)
    res.send('filtered id!');
});

// insertMany or create many by post                                              good! 
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await Book.insertMany([books]);
    res.send(dbResponse);
})
  
// create a single book                                                           good!
app.post('/books/single', async (req, res) => {
    let books = req.body.books; 
    let dbResponse = await Book.create(books);
    res.send(dbResponse);
})

//delete by id                                                                     good! 
app.delete("/books/id/:idOfBooks", async (req, res) => {               
    // .findByIdAndDelete() 
    let id = req.params.idOfBooks;
    let arrayOfBooks = await Book.findByIdAndDelete(id);
    console.log(arrayOfBooks);
    res.send('deleted books!')
});

//Update by id                                                                      good!
app.put('/books/id/:idOfBooks', async (req, res) => {
    let id = req.params.idOfBooks;
    let arrayOfBooks = await Book.findByIdAndUpdate(id,  req.body, { new: true } );
    console.log(arrayOfBooks);
    res.send("updated books!")
});

// findOne

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


