'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        static associate(models) {
            Product.hasMany(models.Stock, { 
                foreignKey: 'product_id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
        }
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        plu: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'products',
        timestamps: false
    });
    return Product;
};
