require('dotenv').config();
const express = require('express');
const {auth, requiredScopes} = require('express-oauth2-jwt-bearer')
const CategoryService = require('./../services/category.service');


const router = express.Router();
const service = new CategoryService();

const jwtCheck = auth({
  audience:process.env.AUTH0_AUDIENCE,
  issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
})

const checkScopes = requiredScopes(['read:endpoints']);

router.use(jwtCheck,checkScopes);

router.all('/:id?',async(req,res,next)=>{
  try {
    const { id } = req.params;
    const body = req.body;

    switch (req.method) {
      case 'GET':
        const category = id ? await service.findOne(id) : await service.find();
        return res.json(category);
      
      case 'POST':
        const newCategory = await service.create(body);
        return res.status(201).json(newCategory);
      
      case 'PATCH':
        if (!id) throw new Error("ID is required for updating a Category");
        const updatedCategory = await service.update(id, body);
        return res.json(updatedCategory);
      
      case 'DELETE':
        if (!id) throw new Error("ID is required for deleting a Category");
        const deletedCategory = await service.delete(id);
        return res.json(deletedCategory);
      
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    next(error);
  }
});



module.exports = router;
