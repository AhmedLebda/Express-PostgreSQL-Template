import { Role, UserAttributes, UserCreationAttributes } from "../types/types";
import { sequelize } from "../utils/db";
import { Model, DataTypes } from "sequelize";

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public username!: string;
    public password!: string;
    public active!: boolean;
    public role!: Role;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: "Username can only contain alphanumeric characters",
                },
                notEmpty: {
                    msg: "Username cannot be empty",
                },
                len: {
                    args: [3, 20],
                    msg: "Username must be between 3 and 20 characters long",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLongEnough: {
                    args: 6,
                    msg: "Password must be at least 6 characters long",
                },
                notEmpty: {
                    msg: "Password cannot be empty",
                },
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            validate: {
                isBoolean: true,
            },
        },
        role: {
            type: DataTypes.ENUM("employee", "manager", "admin"),
            defaultValue: "employee",
            validate: {
                isIn: {
                    args: [["employee", "manager", "admin"]],
                    msg: "Invalid role",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "user",
        timestamps: true,
        underscored: true,
        defaultScope: {
            attributes: { exclude: ["password"] },
            where: {
                active: true,
            },
        },
        scopes: {
            inactive: { where: { active: false } },
            withPassword: { attributes: { include: ["password"] } },
        },
    }
);

export default User;
