const Joi           = require('joi');
const mongoose      = require('mongoose')

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  genre: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  image: {
    type: String
  },
  language: {
    type: [String]
  },
  release: {
    type: String, 
    required: true,
  }
}));

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    genre: Joi.string().min(2).max(50).required(),
    image: Joi.string().required(),
    language: Joi.array().items(Joi.string()),
    release: Joi.string().required()
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;