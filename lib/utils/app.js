const express = require('express');
const app = express();
const Movie = require('../../models/Movies');

//ENDPOINTS

app.use(express.json());

app.post('/movies', (req, res) => {
  Movie
    .insert(req.body)
    .then(movie => res.send(movie));
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


module.exports = app;

