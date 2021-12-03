const dbConfig = require("./../config/dbconfig");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("./../models/employees.js")(sequelize, Sequelize);
db.companies = require("./../models/companies.js")(sequelize, Sequelize);
 db.companies.hasMany(db.employees, {
  foreignKey: 'company'
});
module.exports = db;