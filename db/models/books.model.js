const { Model, DataTypes, Sequelize } = require('sequelize');
const {CATEGORY_TABLE} = require('./category.model');

const BOOK_TABLE = "books";

const BookSchema={
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
  image:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  author:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}
class Book extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  //configuracion
  static config(sequelize) {
    return {
      sequelize, // conexion con la base de datos
      tableName: BOOK_TABLE, // nombre de la tabla
      modelName: 'Books', // nombre del modelo
      timestamps: false, // creacion de campos por defecto
    };
  }
}

module.exports = { BOOK_TABLE, BookSchema, Book };
