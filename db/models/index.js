const {Book,BookSchema} = require('./books.model');
const {Category,CategorySchema} = require('./category.model');

function setupModels(sequelize){
  Book.init(BookSchema,Book.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));

  Book.associate(sequelize.models);
  Category.associate(sequelize.models);
}

module.exports = setupModels;
