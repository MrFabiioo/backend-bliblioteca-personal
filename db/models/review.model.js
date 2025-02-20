const {Model,DataTypes,Sequelize} = require('sequelize');
const { BOOK_TABLE } = require('./books.model');
const REVIEW_TABLE ='reviews';

const ReviewSchema ={
id:{
    allowNull: false, // campo no puede ser nulo
    autoIncrement: true, //  este campo es auto incremental
    primaryKey: true, //  este campo es la llave primaria
    type: DataTypes.INTEGER, //  tipo de dato
},
title:{
    allowNull: false,
    type: DataTypes.STRING,
},
authorImage:{
  type:DataTypes.TEXT,
    allowNull:false,
},
bannerImage:{
  type:DataTypes.TEXT,
    allowNull:false,
},
imageOne:{
  type:DataTypes.TEXT,
    allowNull:false,
},
imageTwo:{
  type:DataTypes.TEXT,
    allowNull:false,
},
imageThree:{
  type:DataTypes.TEXT,
    allowNull:false,
},
aboutAuthor:{
    allowNull: false,
    type: DataTypes.TEXT,
},
introduction:{
  type: DataTypes.TEXT,
  allowNull: false,
},
review:{
    allowNull: false,
    type: DataTypes.TEXT,
},
conclusion:{
  type: DataTypes.TEXT,
  allowNull: false,
},
criticism:{
  type: DataTypes.TEXT,
  allowNull: false,
},
createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  bookId: {
    field: 'book_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: BOOK_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
  

};

class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Book, {
        as: 'book',
        foreignKey: 'bookId'
      });
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: REVIEW_TABLE,
        modelName: 'Review',
        timestamps: false,
      };
    }
  }
  

module.exports ={REVIEW_TABLE,ReviewSchema,Review}