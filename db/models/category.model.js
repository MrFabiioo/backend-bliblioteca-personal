const { Model, DataTypes,Sequelize } = require('sequelize');
const CATEGORY_TABLE = 'categories'; // nombre de la tabla



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
    this.hasMany(models.Book, {
      as: 'books',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}


module.exports = { CATEGORY_TABLE, CategorySchema, Category };
