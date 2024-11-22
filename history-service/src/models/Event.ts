import { Model, DataTypes, Sequelize } from 'sequelize';

export interface EventAttributes {
    id: number;
    product_id: number;
    shop_id?: number;
    action: string;
    qty?: number;
    created_at: Date;
}

export class Event extends Model<EventAttributes> implements EventAttributes {
    public id!: number;
    public product_id!: number;
    public shop_id?: number;
    public action!: string;
    public qty?: number;
    public created_at!: Date;
}

export default function (sequelize: Sequelize): typeof Event {
    Event.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            shop_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            action: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: 'events',
            timestamps: false,
        }
    );

    return Event;
}