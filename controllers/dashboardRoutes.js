const router = require('express').Router();
const { Entree, Admin, Beverage } = require('../models');

//Get all items to render to dashboard
router.get('/', async (req, res) => {
    try {
      // Get all menu items
      const entreeData = await Entree.findAll({});
      const beverageData = await Beverage.findAll({});
      // Serialize data so the template can read it
      const entrees = entreeData.map((entree) => entree.get({ plain: true }));
      const beverages = beverageData.map((bev) => bev.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        entrees, beverages,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



// GET all items to render to dashboard/menu
router.get('/menu', async (req, res) => {
    try {
      // Get all menu items
      const entreeData = await Entree.findAll({});
      const beverageData = await Beverage.findAll({});
      // Serialize data so the template can read it
      const entrees = entreeData.map((entree) => entree.get({ plain: true }));
      const beverages = beverageData.map((bev) => bev.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('dashboard-menu', { 
        entrees, beverages,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
