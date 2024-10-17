import { QueryInterface, DataTypes } from "sequelize";
interface Context {
    context: QueryInterface;
}
export const up = async ({ context: queryInterface }: Context) => {
    await queryInterface.createTable("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        role: {
            type: DataTypes.ENUM("employee", "manager", "admin"),
            defaultValue: "employee",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
};

export const down = async ({ context: queryInterface }: Context) => {
    await queryInterface.dropTable("users");
};
