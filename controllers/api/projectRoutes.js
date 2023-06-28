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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const EntreeData = await Entree.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!EntreeData) {
      res.status(404).json({ message: 'No Entree found with this id!' });
      return;
    }

    res.status(200).json(EntreeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
