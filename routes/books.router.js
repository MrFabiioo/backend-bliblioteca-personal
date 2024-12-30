const express = require('express');

const BooksService = require('./../services/book.service');
const router = express.Router();
const services = new BooksService();
//--- get books

router.get('/',async (req,res)=>{
  const books = await services.find();
  res.json(books);
});

//-- get books for Id
router.get('/:id', async(req,res,next)=>{
  try {
    const {id}= req.params;
    const book = await services.findOne(id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

//-- create books

router.post('/',async(req,res,next)=>{
  try {
    const body = req.body;
    const newBook = await services.create(body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

//---- update book with Id

router.patch('/:id', async(req, res,next)=>{
  try {
    const {id}= req.params;
    const body = req.body;
    const book = await services.update(id,body);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

//--- delete book

router.delete('/:id', async(req,res,next)=>{
  try {
    const {id}= req.params;
    const book = await services.delete(id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
