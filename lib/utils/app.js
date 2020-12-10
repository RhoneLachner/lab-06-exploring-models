const express = require('express');
const app = express();
const Movie = require('../../models/Movie');
const Rating = require('../../models/Rating');

//ENDPOINTS

app.use(express.json());

app.post('/movies', (req, res, next) => {
  Movie
    .insert(req.body)
    .then(movie => res.send(movie))
    .catch(next);
});

app.get('/movies', (req, res) => {
  Movie
    .find()
    .then(movie => res.send(movie));
});

app.get('/movies/:id', (req, res) => {
  Movie
    .findById(req.params.id)
    .then(movie => res.send(movie));
  
});

app.put('/movies/:id', (req, res) => {
  Movie
    .update(req.params.id, req.body)
    .then(movie => res.send(movie));
    
});

app.delete('/movies/:id', (req, res) => {
  Movie
    .delete(req.params.id)
    .then(movie => res.send(movie));
   
});
app.post('/ratings', (req, res, next) => {
  Rating
    .insert(req.body)
    .then(rating => res.send(rating))
    .catch(next);
  
});
  
app.get('/ratings', (req, res, next) => {
  Rating
    .find()
    .then(rating => res.send(rating))
    .catch(next);
});
  
app.get('/ratings/:id', (req, res, next) => {
  Rating
    .findById(req.params.id)
    .then(rating => res.send(rating))
    .catch(next);  
});
  
app.put('/ratings/:id', (req, res, next) => {
  Rating
    .update(req.params.id, req.body)
    .then(rating => res.send(rating))
    .catch(next);    
});
  
app.delete('/ratings/:id', (req, res, next) => {
  Rating
    .delete(req.params.id)
    .then(rating => res.send(rating))
    .catch(next);   
});
  


module.exports = app;

