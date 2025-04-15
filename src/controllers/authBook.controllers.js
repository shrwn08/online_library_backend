const multer  = require('multer')
const upload = multer({ dest: '../public/data/uploads/' })
const fs = require('fs');
const cloudinary = require('../utils/cloudinary')
const bookModel = require("../models/book.model");
const { log } = require('console');

const addBook = async (req, res) => {
    const {title, author, category, description,  avatar} = req.body;
    try {
        //if avatar hasn't uploaded
        if(!req.file) return res.status(400).json({message : "Avatar is required."});

        //if avatar is uploaded then upload it on the cloudinary.

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder : 'books'
        });

        //deleting avatar from the local machine
        fs.unlinkSync(req.file.path);

        const newBook = new bookModel({
            title,
            author,
            category,
            description,
            avatar : result.secure_url,
        })

        //saving the book in the database
        await newBook.save();

        res.status(201).json({message : "Book successfully added",
          book : newBook  
        })
    } catch (error) {
        res.status(500).json({message : "Server Error",
            error
        })
    }
    res.status(201).json({message : "post the Book"})
};

const getAllBooks = async (req, res)=>{
    const {category} = req.query;

    

    try {
            if(!category){

        const books =  await bookModel.find();
        
        return res.status(200).json({message : "fetched all books", books})
            }
                
            const newCategory = category[0].toUpperCase() + category.slice(1,category.length)
            console.log(newCategory)
            const books = await bookModel.find({category: newCategory});

            if(!books){
                return res.status(404).json({message : "books not found"})
            }

            res.status(200).json({message : "book", books})
    } catch (error) {
        res.status(500).json({message : 'Server error', error})
    }
}

        //getting using the params of the book card
const getDetailsBook = async (req, res) => {
    const {id} =req.params;
    

    try {
        const book = await bookModel.findById(id);

        if(!book){
            return res.status(404).json({message : "Book not found"});
        }
        
        res.status(200).json({message  : "Book found", book});
    } catch (error) {
        res.status(500).json({message : "Server Error", error})
    }


    const getBookCategoty = () =>{

    }
}



// update the rating




module.exports = {addBook, getAllBooks, getDetailsBook}