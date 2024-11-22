'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shop extends Model {

        static associate(models) {
            Shop.hasMany(models.Stock, { 
                foreignKey: 'shop_id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
        }
    }
    Shop.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        sequelize,
        tableName: 'shops',
        timestamps: true
    });
    return Shop;
};