require('dotenv').config();
const express = require('express');
const {auth, requiredScopes} = require('express-oauth2-jwt-bearer')
const ReviewService = require('./../services/review.service');

const router = express.Router();
const services = new ReviewService();

const jwtCheck = auth({
    audience:process.env.AUTH0_AUDIENCE,
    issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
  })
  
  const checkScopes = requiredScopes(['read:endpoints']);

router.use(jwtCheck, checkScopes); 

router.all('/:id?', async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
  
      switch (req.method) {
        case 'GET':
          const review = id ? await services.findOne(id) : await services.find();
          return res.json(review);
        
        case 'POST':
          const newReview = await services.create(body);
          return res.status(201).json(newReview );
        
        case 'PATCH':
          if (!id) throw new Error("ID is required for updating a book");
          const updatedReview  = await services.update(id, body);
          return res.json(updatedReview );
        
        case 'DELETE':
          if (!id) throw new Error("ID is required for deleting a book");
          const deletedReview  = await services.delete(id);
          return res.json(deletedReview );
        
        default:
          res.status(405).json({ message: "Method Not Allowed" });
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;