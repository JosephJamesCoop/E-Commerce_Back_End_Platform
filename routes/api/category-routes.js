const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name',
    ],
    order: [['category_name', 'DESC']],
  // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
   // find all categories
   Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name',
    ],
  // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
