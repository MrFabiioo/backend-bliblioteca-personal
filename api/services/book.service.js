const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BooksService {
  constructor(){
    //this.books = [];
  }

  async create(data){
    const newBook = await models.Book.create(data);
    return newBook;
  }

  async find (){
    const books = await models.Book.findAll({
      include:['category','review']
    });
    return books;
  }

  async findOne(id){
    const book = await models.Book.findByPk(id,{
      include:['category','review']
    });
    if (!book) {
      throw boom.notFound('Book not found');
    }
    return book;
  }

  async update(id, changes){
    const book = await this.findOne(id);
    const response = await book.update(changes);
    return response;
  }

  async delete(id){
    const book = await this.findOne(id);
    await book.destroy();
    return id;
  }
}


module.exports =  BooksService;
