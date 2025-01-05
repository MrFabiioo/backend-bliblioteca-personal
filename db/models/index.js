const {Book,BookSchema} = require('./books.model');
const {Category,CategorySchema} = require('./category.model');
const {Review,ReviewSchema} =require('./review.model');

function setupModels(sequelize){
  Book.init(BookSchema,Book.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Review.init(ReviewSchema,Review.config(sequelize));

  Book.associate(sequelize.models);
  Category.associate(sequelize.models);
  Review.associate(sequelize.models);

}

module.exports = setupModels;
