const express = require('express');
const app = express();
const Rating = require('../../models/Rating');

//ENDPOINTS

app.use(express.json());

app.post('/ratings', (req, res, next) => {
    Rating
    .insert(req.body)
    .then(movie => res.send(movie))
    .catch(next);
});

app.get('/ratings', (req, res) => {
    Rating
    .find()
    .then(movie => res.send(movie));
});

app.get('/ratings/:id', (req, res) => {
  Movie
    .findById(req.params.id)
    .then(movie => res.send(movie));
  
});

app.put('/ratings/:id', (req, res) => {
  Movie
    .update(req.params.id, req.body)
    .then(movie => res.send(movie));
    
});

app.delete('/ratings/:id', (req, res) => {
  Movie
    .delete(req.params.id)
    .then(movie => res.send(movie));
   
});


module.exports = app;

