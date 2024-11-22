'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {

        static associate(models) {
            Stock.belongsTo(models.Product, { 
                foreignKey: 'product_id'
            });
            Stock.belongsTo(models.Shop, { 
                foreignKey: 'shop_id'
            });
        }
    }
    Stock.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        shop_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shelf_qty: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        order_qty: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'stocks',
        timestamps: false
    });
    return Stock;
};