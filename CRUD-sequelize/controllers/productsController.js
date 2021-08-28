const { Products } = require('../models');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  const products = await Products.findAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);

  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;

  const newProduct = await Products.create({ name, description });

  res.status(200).json(newProduct);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Products.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'Produto excluido com sucesso' });
});

router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  await Products.update(
    { name, description },
    {
      where: {
        id,
      },
    },
  );

  res.status(200).json({ message: 'Produto atualizado com sucesso' });
});

module.exports = router;
