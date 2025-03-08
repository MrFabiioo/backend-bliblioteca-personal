const booksRouter = require('./books.router');
const categoryRouter = require('./category.router');
const reviewRouter = require('./review.router');

function routerApi(app) {
  app.use('/api/v1/books', booksRouter);
  app.use('/api/v1/category', categoryRouter);
  app.use('/api/v1/review', reviewRouter);
}

module.exports = routerApi;