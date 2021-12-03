module.exports = (sequelize, Sequelize) => {
  const Employees = sequelize.define("employees", {
    fname: {
      type: Sequelize.STRING, allowNull:false
    },
    surname: {
      type: Sequelize.STRING, allowNull:false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'name'
      }
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });

  return Employees;
}; 