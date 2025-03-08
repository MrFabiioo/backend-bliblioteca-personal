'use strict';
const {BOOK_TABLE,BookSchema} = require('../models/books.model');
const {CATEGORY_TABLE,CategorySchema} =  require('../models/category.model');
const {REVIEW_TABLE,ReviewSchema}=require('../models/review.model')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(BOOK_TABLE,BookSchema);
    await queryInterface.createTable(REVIEW_TABLE,ReviewSchema);
    
  },

  async down (queryInterface) {
    await queryInterface.dropTable(BOOK_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(REVIEW_TABLE);
    
    
  }
};
