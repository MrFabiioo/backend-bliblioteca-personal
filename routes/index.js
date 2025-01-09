const express = require('express');
const booksRouter = require('./books.router')
const categoryRouter = require('./category.router');
const reviewRouter = require('./review.router');


function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/books',booksRouter);
  router.use('/category',categoryRouter);
  router.use('/review',reviewRouter);
}

module.exports  =  routerApi;
