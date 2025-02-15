const boom = require('@hapi/boom');
const {models}=require('../libs/sequelize');

class ReviewService{
    constructor(){

    }

    async create(data){
        const newReview = await models.Review.create(data);
        return newReview;
    }

    async find(){
        const reviews = await models.Review.findAll({
            include:['book']
        });
        return reviews;
    }

    async findOne(id){
        const review = await models.Review.findByPk(id,{
            include:['book']
        });
        if (!review) {
            throw boom.notFound('Category not found')
        };
        return review;
    }

    async update(id,changes){
        const review = await this.findOne(id);
        const response = await review.update(changes);
        return response;
    }

    async delete(id){
        const review = await this.findOne(id);
        await review.destroy();
        return {id, review};
    }
}

module.exports = ReviewService;