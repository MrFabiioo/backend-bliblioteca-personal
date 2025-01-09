const express = require('express');

const ReviewService = require('./../services/review.service');

const router = express.Router();

const services = new ReviewService();

router.get('/', async(req,res)=>{
    const reviews = await services.find();
    res.json(reviews);
});

router.get('/:id', async(req,res,next)=>{
    try {
        const {id}= req.params;
        const review = await services.findOne(id);
        res.json(review);
    } catch (error) {
        next(error);
    }
});

router.post('/',async(req,res,next)=>{
    try {
        const body = req.body;
        const newReview = await services.create(body);
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id',async(req,res,next)=>{
    try {
        const {id} = req.params;
        const body = req.body;
        const review = await services.update(id,body);
        res.json(review);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req,res,next) => {
    try {
        const {id}=req.params;
        await services.delete(id);
        res.status(201).json({id})
    } catch (error) {
        next(error);
    }
})

module.exports = router;