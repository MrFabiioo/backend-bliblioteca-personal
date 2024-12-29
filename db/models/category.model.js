const { Model, DataTypes } = require('sequelize');
const CATEGORY_TABLE = 'categories'; // nombre de la tabla
const {Sequelize} = require('sequelize');
const CategorySchema = {
  // El esquema define la estructura de la BD.
  id: {
    allowNull: false, // campo no puede ser nulo
    autoIncrement: true, //  este campo es auto incremental
    primaryKey: true, //  este campo es la llave primaria
    type: DataTypes.INTEGER, //  tipo de dato
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};
// la clase con el modelo, modelo con las formas con las que se van a relacionar con las demas tablas.
class Category extends Model {
  static associate(models) {
    this.hasMany(models.Books, {
      as: 'books',
      foreignKey: 'categoryId'
    });
  }

  //configuracion
  static config(sequelize) {
    return {
      sequelize, // coneccion con la base de datos
      tableName: CATEGORY_TABLE, // nombre de la tabla
      modelName: 'Category', // nombre del modelo
      timestamps: false, // creacion de campos por defecto
    };
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
