const {Movie, validate} = require('../models/movie');
const asyncMiddleware = require('../middleware/async')
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, asyncMiddleware(async (req, res) => {
  var pagenumber = req.query.pagenumber;

  const movies = await Movie
    .find()
    .skip(((pagenumber - 1) * 2))
    .limit(2)
    .sort('name');
  res.send(movies)
}));

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    language: req.body.language,
    release: req.body.release
  });
  await movie.save();

  res.send(movie)
});

router.put('/:id', auth, (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = new Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    language: req.body.language,
    release: req.body.release
  }, {new: true});

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie)
});

router.get('/:id', auth, async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;