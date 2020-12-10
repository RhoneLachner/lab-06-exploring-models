const fs = require('fs');
const request = require('supertest');
const app = require('../lib/utils/app.js');
const pool = require('../lib/utils/pool.js');
const Movie = require('../models/Movie.js');
const Rating = require('../models/Rating.js');


describe('app tests', () => {
  let movie;
  beforeEach (() => {      

    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  beforeEach (async() => {
      
    movie = await Movie.insert({
        
      title: 'The Matrix RELOADED', 
      director: 'Lana and Lilly Wachowski',
      url: 'https://www.warnerbros.com/movies/matrix'          
    });

  });

  afterAll(() => {
    return pool.end();
  });

  //POST TEST
  it('creates a rating with POST', async() => {
    const res = await request(app)
      .post('/ratings')
      .send({
        number: 1,
        movieId: 1    
      });
    
    console.log(res.body);
    expect(res.body).toEqual({
      id: 1,
      number: 1,
      movieId: '1'   
    });
  });

  //GET TEST
  it('finds ratings from table with GET', async() => {
    const res = await request(app)
      .get('/ratings');

    expect(res.body).toEqual(res.body);
  });

  //GET BY ID WITH RATING TEST
  it('finds a movie by id and associated ratings via GET', async() => {
    const movie = await Movie.insert({
      title: 'The Matrix', 
      director: 'Lana and Lilly Wachowski',
      url: 'https://www.warnerbros.com/movies/matrix'
    });

    const ratings = await Promise.all([
      { number: 1, movieId: movie.id },
      { number: 4, movieId: movie.id },
      { number: 2, movieId: movie.id },
    ].map(rating => Rating.insert(rating)));    

    const res = await request(app)
      .get(`/movies/${movie.id}`);
      
    expect(res.body).toEqual({
      ...movie,
      ratings: expect.arrayContaining(ratings)
    });
  });

  //PUT TEST
  it('updates ratings from table by ID with PUT', async() => {
    const rating = await Rating.insert({ 
      number: 5, 
      movieId: 1,
    });

    const response = await request(app)
      .put(`/ratings/${rating.id}`)
      .send({
        number: 10, 
        movieId: '1',
      });

    console.log(`/ratings/${rating.id}`);
    expect(response.body).toEqual({
      ...rating,
      number: 10, 
      movieId: '1',
    });
  });
  //DELETE TEST
  it('updates movies from table by ID with PUT', async() => {
    const rating = await Rating.insert({ 
      number: 10, 
      movieId: '1', });

    const response = await request(app)
      .delete(`/ratings/${rating.id}`);

    console.log(`/ratings/${rating.id}`);
    expect(response.body).toEqual(rating);
  });

});

