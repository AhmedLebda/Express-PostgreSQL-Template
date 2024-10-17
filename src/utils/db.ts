import { Sequelize } from "sequelize";
import config from "./config";
import { Umzug, SequelizeStorage } from "umzug";

const { DATABASE_URI } = config as { DATABASE_URI: string };

export const sequelize = new Sequelize(DATABASE_URI, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const migrationConfig = {
    migrations: {
        glob: "migrations/*.ts",
    },
    storage: new SequelizeStorage({
        sequelize,
        tableName: "migrations",
    }),
    context: sequelize.getQueryInterface(),
    logger: console,
};

const runMigrations = async () => {
    try {
        const migrator = new Umzug(migrationConfig);
        const migrations = await migrator.up();
        console.log("Migrations up to date", {
            files: migrations.map((mig) => mig.name),
        });
    } catch (err) {
        console.log("Failed to run migrations", err);
        process.exit(1);
    }
};

export const rollbackMigration = async () => {
    try {
        await sequelize.authenticate();
        const migrator = new Umzug(migrationConfig);
        await migrator.down();
    } catch (err) {
        console.log("Failed to rollback migrations", err);
        process.exit(1);
    }
};

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database");
        await runMigrations();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
    return null;
};
