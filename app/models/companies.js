module.exports = (sequelize, Sequelize) => {
  const Companies = sequelize.define("companies", {
    name: {
      type: Sequelize.STRING, allowNull:false, primaryKey: true,
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING
    }
  });

  return Companies;
};