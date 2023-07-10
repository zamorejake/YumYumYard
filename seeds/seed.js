const sequelize = require('../config/connection');
const { Admin, Beverage, Entree } = require('../models');

const AdminData = require('./adminData.json');
const beverageData = require('./beverageData.json');
const entreeData = require('./entreeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  for (const admin of AdminData) {
    await Admin.create(admin);
    };
  

  for (const beverage of beverageData) {
    await Beverage.create({
      ...beverage,
    });
  }

  for (const entree of entreeData) {
    await Entree.create({
      ...entree,
    });
  }

  process.exit(0);
};

seedDatabase();
