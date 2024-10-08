const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class BooksService {
  constructor(){
    this.books = [];
  }

  async create(data){
    const newBook = await models.Book.create(data);
    return newBook;
  }

  async find (){
    const books = await models.Book.findAll();
    return books;
  }

  async findOne(id){
    const book = this.products.find(item => item.id === id);
    if (!book) {
      console.log('product not found');
    }
    if (book.isBlock) {
      console.log('product is block');
    }
    return book;
  }

  async update(id, changes){
    const index = this.books.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const book = this.products[index];
    this.boooks[index] = {
      ...book,
      ...changes
    };
    return this.books[index];
  }

  async delete(id){
    const index = this.books.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.books.splice(index, 1);
    return { id };
  }
}


module.export =  BooksService;
