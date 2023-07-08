const router = require('express').Router();
const { Beverage } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBeverage = await Beverage.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBeverage);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const beverageData = await Beverage.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      in_stock: req.body.in_stock,
      has_alcohol: req.body.has_alcohol  
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!beverageData) {
      res.status(404).json({ message: 'No beverage found with this id!' });
      return;
    }

    res.status(200).json(beverageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const beverageData = await Beverage.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id, don't need this for now as currently only 1 admin
      },
    });

    if (!beverageData) {
      res.status(404).json({ message: 'No Beverage found with this id!' });
      return;
    }

    res.status(200).json(beverageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
