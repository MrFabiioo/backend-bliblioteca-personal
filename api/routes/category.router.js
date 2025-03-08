const express = require('express');
const {auth, requiredScopes} = require('express-oauth2-jwt-bearer')

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema  } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

const jwtCheck = auth({
  audience:process.env.AUTH0_AUDIENCE,
  issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
})

const checkScopes = requiredScopes(['read:endpoints']);

router.get('/',jwtCheck,checkScopes, async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',jwtCheck,checkScopes,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',jwtCheck,checkScopes,
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',jwtCheck,checkScopes,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',jwtCheck,checkScopes,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
