'use strict';

const {REVIEW_TABLE}= require('../models/review.model')
const {DataTypes} = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(REVIEW_TABLE,'introducction',{
      type: DataTypes.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn(REVIEW_TABLE,'conclusion',{
      type: DataTypes.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn(REVIEW_TABLE,'criticism',{
      type: DataTypes.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn('reviews', 'aboutAuthor', {
      type: DataTypes.TEXT,
      allowNull: false,
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(REVIEW_TABLE,'introducction');
    await queryInterface.removeColumn(REVIEW_TABLE,'conclusion');
    await queryInterface.removeColumn(REVIEW_TABLE,'criticism');
    await queryInterface.changeColumn('reviews', 'aboutAuthor', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  }
};
