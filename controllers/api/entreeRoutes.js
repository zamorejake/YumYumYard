const router = require('express').Router();
const { Entree } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newEntree = await Entree.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEntree);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const entreeData = await Entree.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      in_stock: req.body.in_stock,
      allergy: req.body.allergy  
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!entreeData) {
      res.status(404).json({ message: 'No entree found with this id!' });
      return;
    }

    res.status(200).json(entreeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const entreeData = await Entree.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id, don't need this for now as currently only 1 admin
      },
    });

    if (!entreeData) {
      res.status(404).json({ message: 'No Entree found with this id!' });
      return;
    }

    res.status(200).json(entreeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
