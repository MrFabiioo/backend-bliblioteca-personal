
require('dotenv').config();
const express = require('express');
//const { requiresAuth } = require('express-openid-connect');
const {auth, requiredScopes} = require('express-oauth2-jwt-bearer')
const BooksService = require('./../services/book.service');
const router = express.Router();
const services = new BooksService();
//--- get books

// const audience = process.env.AUTH0_AUDIENCE;
// console.log('aqui esta la audience: '+audience)

const jwtCheck = auth({
  audience:process.env.AUTH0_AUDIENCE,
  issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
})

const checkScopes = requiredScopes(['read:endpoints']);

router.get('/',jwtCheck,checkScopes,async (req,res)=>{
  const books = await services.find();
  res.json(books);
});

//-- get books for Id
router.get('/:id',jwtCheck,checkScopes,async(req,res,next)=>{
  try {
    const {id}= req.params;
    const book = await services.findOne(id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

//-- create books

router.post('/',jwtCheck,checkScopes,async(req,res,next)=>{
  try {
    const body = req.body;
    const newBook = await services.create(body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

//---- update book with Id

router.patch('/:id',jwtCheck,checkScopes, async(req, res,next)=>{
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

router.delete('/:id', jwtCheck,checkScopes,async(req,res,next)=>{
  try {
    const {id}= req.params;
    const book = await services.delete(id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
