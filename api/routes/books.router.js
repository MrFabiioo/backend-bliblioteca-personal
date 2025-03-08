require('dotenv').config();
const express = require('express');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const BooksService = require('./../services/book.service');

const router = express.Router();
const services = new BooksService();

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});
const checkScopes = requiredScopes(['read:endpoints']);

router.use(jwtCheck, checkScopes); // Aplica autenticación a todas las rutas

router.all('/:id?', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    switch (req.method) {
      case 'GET':
        const data = id ? await services.findOne(id) : await services.find();
        return res.json(data);
      
      case 'POST':
        const newBook = await services.create(body);
        return res.status(201).json(newBook);
      
      case 'PATCH':
        if (!id) throw new Error("ID is required for updating a book");
        const updatedBook = await services.update(id, body);
        return res.json(updatedBook);
      
      case 'DELETE':
        if (!id) throw new Error("ID is required for deleting a book");
        const deletedBook = await services.delete(id);
        return res.json(deletedBook);
      
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
