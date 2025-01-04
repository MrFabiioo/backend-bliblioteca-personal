const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();
const description = Joi.string().min(10);

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image.required(),
    description: description.required()
  });

  module.exports ={createCategorySchema}