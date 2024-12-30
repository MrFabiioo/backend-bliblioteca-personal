'use strict';
const {BOOK_TABLE,BookSchema} = require('./../models/books.model');
const {CATEGORY_TABLE,CategorySchema} =  require('./../models/category.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(BOOK_TABLE,BookSchema);
    
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(BOOK_TABLE);
    
  }
};
