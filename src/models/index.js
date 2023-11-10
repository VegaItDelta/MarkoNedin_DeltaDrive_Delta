import Sequelize from "sequelize";

const {
  DB_HOST = "localhost",
  DB_NAME = "delta_drive_database",
  DB_USER_NAME = "postgres",
  DB_PWD = "postgres",
} = process.env;

const database = new Sequelize(DB_NAME, DB_USER_NAME, DB_PWD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

export default database;
