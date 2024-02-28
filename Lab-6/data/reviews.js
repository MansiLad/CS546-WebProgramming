const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const validation = require('../helpers');
const moviedata = require('./movies')

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating,
  date
) => {
  //ADD VALIDATION - read slack

  id = validation.checkId(movieId);

  if(!reviewTitle)  throw 'You must provide a Review Title'
  if (typeof reviewTitle !== 'string')    throw 'reviewTitle must be a string';
  if (reviewTitle.trim().length === 0)    throw 'reviewTitle cannot be an empty string or just spaces';
  reviewTitle = reviewTitle.trim()


  if(!reviewerName)  throw 'You must provide a Reviewer Name'
  if (typeof reviewerName !== 'string')    throw 'reviewerName must be a string';
  if (reviewerName.trim().length === 0)    throw 'reviewerName cannot be an empty string or just spaces';
  reviewerName = reviewerName.trim()

  if(!review)  throw 'You must provide a Review'
  if (typeof review !== 'string')    throw 'review must be a string';
  if (review.trim().length === 0)    throw 'review cannot be an empty string or just spaces';
  review = review.trim()

  rate = parseFloat(rating)
  if(rate<1 || rate>5)  throw "Not a valid rating"
  rate = Number(rate.toFixed(1))

  const movie = await movies()
  const data = await moviedata.getMovieById(movieId)
  if(data === null) throw "No movie of this id exist"
  if(data.reviewTitle==reviewTitle && data.reviewerName==reviewerName && data.review== review && data.rating==rating){
    throw "Same Review already exist"
  }
  if(data == null) throw "Movie with the given ID is not present"

  let presentdate = new Date()
  let day = presentdate.getDate();
  let month = presentdate.getMonth()+1;
  let year = presentdate.getFullYear();
  let fullDate = `${month}/${day}/${year}`;
  //console.log(fullDate);
  if(!date.match(fullDate)) throw 'you cant leave a review yesterday or before, and you cant leave a review in the future'


  let newReview = {
    _id: ObjectId(),
    reviewTitle: reviewTitle,
    reviewerName: reviewerName,
    review: review,
    rating: rate,
    date: fullDate,
  }

  const allnewRating = await movie.updateOne({_id: ObjectId(movieId)}, {$addToSet:{reviews: newReview}})
  const reviewofmovie = await movie.findOne({_id: ObjectId(movieId)})

  let demo
  let sum = 0

  if(reviewofmovie){
    //reviewList = reviewofmovie.reviews-
    for (let index = 0; index < reviewofmovie.reviews.length; index++) {
      demo = reviewofmovie.reviews[index].rating;
      sum = sum+demo
    }
    newLength = reviewofmovie.reviews.length
    newOverallRating = Number((sum/newLength).toFixed(1))
  }
  else{
    var newOverallRating = rating
  }

  const updatedmovie = await movie.updateOne(
    {_id: ObjectId(movieId)},
    {
      $set: {overallRating: newOverallRating},
    }
  );
  if(updatedmovie.modifiedCount === 0)   throw "Cant add Review"
  return JSON.parse(JSON.stringify(newReview))
};

const getAllReviews = async (movieId) => {
  id = validation.checkId(movieId);

  const movie = await movies();
  const allreviews = await movie.findOne({_id:ObjectId(movieId)})
  if(allreviews === null) throw "No reviews found"
  let reviewList = allreviews.reviews
  if(!reviewList || reviewList.length===0)  throw "Reviews not found"
  return JSON.parse(JSON.stringify(reviewList))
};

const getReview = async (reviewId) => {
  //const revieId = validation.checkId(reviewId);
  const movie = await movies();
  const review = await movie.findOne({'reviews._id': ObjectId(reviewId)})
  if(!review) throw "No reviews found with this id"
  for (let index = 0; index < review.reviews.length; index++) {
    if(review.reviews[index]._id == reviewId)
    {
      //console.log(reviewId)
      //temp = review.reviews[index];
      return JSON.parse(JSON.stringify(review.reviews[index]));
      //break
    }
    
    throw "Review not found"
    //return review.reviews
    //return JSON.parse(JSON.stringify(temp));
  }
};

const removeReview = async (reviewId) => {
  reviewId = validation.checkId(reviewId);

  const movie = await movies();
  const movieReview = await movie.findOne({"reviews._id": ObjectId(reviewId)})
  console.log(movieReview)
  if(!movieReview) throw "No movie reviews available"

  const removereview = await movie.updateOne(
    {_id: movieReview._id},
    {$pull: {reviews: {_id: ObjectId(reviewId)}}}
  )
//see what happens here - KT
  if(!removereview.modifiedCount === 0) throw "Could find movie with id"
  let newRating = 0
  if(movieReview.reviews.length>0 && movieReview!==null){
    let sum=0
    let cnt = 0
    for (let index = 0; index < movieReview.reviews.length; index++) {
      if(movieReview.reviews[index]._id !== reviewId){
        sum += movieReview.reviews[index].rating
        cnt++
      }
    }
    newRating = Number((sum/cnt).toFixed(1))
  } else {
    newRating = 0
  }
  const updatedReview = movie.updateOne(
    {_id: movieReview._id},
    {$set: {overallRating: newRating}}
  )

  if(updatedReview.modifiedCount == 0) throw "Cant remove Movie Review"

  return `${reviewId} has been deleted successfully!`;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
};
