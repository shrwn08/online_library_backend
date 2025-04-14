const express = require("express");
const {addBook, getAllBooks, getDetailsBook} = require('../controllers/authBook.controllers')
const upload = require('../middleware/authBook.middleware')

const routes = express.Router();


//route to upload book
routes.post("/upload-book",upload.single('avatar') ,addBook)

//route to get all book
routes.get("/books", getAllBooks);

//route to get full details

routes.get("/book/:id", getDetailsBook)






module.exports = routes;
