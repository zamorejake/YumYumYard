const router = require('express').Router();
const { Admin } = require('../../models');

router.post('/', async (req, res) => {
  
  try {
    const adminData = await Admin.create(req.body);

    req.session.save(() => {
      req.session.admin_id = adminData.id;
      req.session.logged_in = true;

      res.status(200).json(adminData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {

  try {
    const adminData = await Admin.findOne({ where: { email: req.body.email } });
    if (!adminData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = adminData.checkPassword(req.body.password);
  
    if (!validPassword) {
      console.log("fail 2")
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.admin_id = adminData.id;
      req.session.logged_in = true;
      
      res.status(200).json("Logged in!");
    });
    //res.redirect('/admin');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
