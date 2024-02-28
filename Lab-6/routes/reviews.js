//require express and express router as shown in lecture code
const express = require('express')
const router = express.Router()
const data= require('../data')
const reviewData = data.reviews
const movieData = data.movies
const validation = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    if(!req.params.movieId){
      return res.status(400).json({error: 'Provide a movie ID to search for review'})
    }
    try {
      req.params.movieId = validation.checkId(req.params.movieId)
    } catch(e) {
      return res.status(400).json({error: e})
    }
    try{
      const reviews = await reviewData.getAllReviews(req.params.movieId)
      if(!reviews) return res.status(404).json({error:'None'})
      res.status(200).json(reviews)
    }catch(e){
      res.status(404).json({error: 'No reviews found'})
    }

  })
  .post(async (req, res) => {
    //code here for POST
    let reviewinfo = req.body;

    if(!reviewinfo){
      res.status(400).json({error: "Provide data to insert movie"})
      throw "Data not provided to create movie"
    }

    if(!req.params.movieId){
      return res.status(400).json({error: 'Provide a movie ID to search for review'})
    }
    if(!reviewinfo.reviewTitle){
      res.status(400).json({error: "Provide review title"})
      throw "review title not provided"
    }
    if(typeof reviewinfo.reviewTitle != 'string'){
      res.status(400).json({error: "provide review title as string"})
      throw "review title should be a string"
    }
    if(reviewinfo.reviewTitle.trim().length === 0){
      res.status(400).json({error: "Provide review title"})
      throw 'Title cannot be an empty string or just spaces';
    }    
    reviewinfo.reviewTitle = reviewinfo.reviewTitle.trim()


    if(!reviewinfo.reviewerName){
      res.status(400).json({error: "Provide reviewer name"})
      throw "reviewer not provided"
    }
    if(!reviewinfo.reviewerName){
      res.status(400).json({error: "Provide reviewer name"})
      throw "reviewer name not provided"
    }
    if(typeof reviewinfo.reviewerName != 'string'){
      res.status(400).json({error: "provide reviewer name as string"})
      throw "reviewer name should be a string"
    }
    if(reviewinfo.reviewerName.trim().length === 0){
      res.status(400).json({error: "Provide reviewer name"})
      throw 'Title cannot be an empty string or just spaces';
    }    
    reviewinfo.reviewerName = reviewinfo.reviewerName.trim()


    if(!reviewinfo.review){
      res.status(400).json({error: "Provide review"})
      throw "review not provided"
    }
    if(!reviewinfo.review){
      res.status(400).json({error: "Provide review"})
      throw "review not provided"
    }
    if(typeof reviewinfo.review != 'string'){
      res.status(400).json({error: "provide review as string"})
      throw "review should be a string"
    }
    if(reviewinfo.review.trim().length === 0){
      res.status(400).json({error: "Provide review"})
      throw 'Title cannot be an empty string or just spaces';
    }    
    reviewinfo.review = reviewinfo.review.trim()


    if(!reviewinfo.rating){
      res.status(400).json({error: "Provide rating"})
      throw "rating not provided"
    }
    rate = parseFloat(reviewinfo.rating)
    if(rate<1 || rate>5)  throw "Not a valid rating"
    reviewinfo.rate = Number(rate.toFixed(1))

    if(!reviewinfo.date){
      res.status(400).json({error: "Provide date"})
      throw "date not provided"
    }

    try {
      const newReview = await reviewData.createMovie(
        req.params.movieId,
        reviewData.reviewTitle,
        reviewData.reviewerName,
        reviewData.rating,
        reviewData.date,
        reviewData.review
      );
      res.status(200).json(newReview);
    }catch(e){
      res.status(400).json({error: e})
    }
/* 
    try {
      req.params.movieId = validation.checkId(req.params.movieId)
    } catch(e) {
      return res.status(400).json({error: e})
    }
    let movieid = await movieData.getMovieById(req.params.movieId)
    if(!movieid){
      return res.status(404).json({error:'Not found'})
    } */
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    if(!req.params.reviewId){
      return res.status(400).json({error: 'Provide a review ID to search for review'})
    }
    try {
      req.params.reviewId = validation.checkId(req.params.reviewId)
    } catch(e) {
      return res.status(400).json({error: e})
    }
    try{
      const review = await reviewData.getReview(req.params.reviewId);
      res.status(200).json(review)
    }catch(e){
      res.status(404).json({error:'No review found for the following id'})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    if(!req.params.reviewId){
      return res.status(400).json({error: 'Provide a movie ID to search for review'})
    }

    try {
      req.params.reviewId = validation.checkId(req.params.reviewId)
    } catch(e) {
      return res.status(400).json({error: e})
    }
    delreview = await reviewData.getReview(req.params.reviewId)
    try{
      await reviewData.removeReview(req.params.reviewId);
      res.status(200).json({ reviewId: delreview._id , deleted: true });
    }catch (e) {
      res.status(404).json({ error: 'Not deleted' });
      return;
    }

  });

  module.exports = router;
