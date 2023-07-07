const router = require('express').Router();
const { Entree, Admin, Beverage } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all menu items
    const entreeData = await Entree.findAll({});
    const beverageData = await Beverage.findAll({});
    // Serialize data so the template can read it
    const entrees = entreeData.map((entree) => entree.get({ plain: true }));
    const beverages = beverageData.map((bev) => bev.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      entrees, beverages,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/entree/:id', async (req, res) => {
  try {
    const entreeData = await Entree.findByPk(req.params.id, {
    });

    const entree = entreeData.get({ plain: true });
    const itemType = 'entree'

    res.render('menu-item', {
      ...entree,
      itemType,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/entree/:id/edit', withAuth, async (req, res) => {
  try {
    const entreeData = await Entree.findByPk(req.params.id, {
    });

    const post = entreeData.get({ plain: true });
        
    res.render('edit-entree', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/beverage/:id', async (req, res) => {
  try {
    const beverageData = await Beverage.findByPk(req.params.id, {
    });

    const beverage = beverageData.get({ plain: true });
    const itemType = 'beverage'

    res.render('menu-item', {
      ...beverage,
      itemType,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/beverage/:id/edit', withAuth, async (req, res) => {
  try {
    const beverageData = await Beverage.findByPk(req.params.id, {
    });

    const post = beverageData.get({ plain: true });
        
    res.render('edit-beverage', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/admin', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const adminData = await Admin.findByPk(req.session.admin_id, {
      attributes: { exclude: ['password'] },
    });
    const admin = adminData.get({ plain: true });

    res.render('admin', {
      ...admin,
      logged_in: true
    });
  } catch (err) {
    //res.status(500).json(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/admin');
    return;
  }

  res.render('login');
});

module.exports = router;