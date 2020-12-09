const fs = require('fs');
const request = require('supertest');
const app = require('../lib/utils/app.js');
const pool = require('../lib/utils/pool.js');
const Movie = require('../models/Movie.js');
const Rating = require('../models/Rating.js');


describe('app tests', () => {
    
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });
  //POST TEST
  it('creates a movie with POST', async() => {
    const res = await request(app)
      .post('/movies')
      .send({
        title: 'The Matrix', 
        director: 'Lana and Lilly Wachowski',
        url: 'https://www.warnerbros.com/movies/matrix'       
      });
    
    console.log(res.body);
    expect(res.body).toEqual({
      id: expect.anything(),
      title: 'The Matrix', 
      director: 'Lana and Lilly Wachowski',
      url: 'https://www.warnerbros.com/movies/matrix'
    });
  });
  //GET TEST
  it('finds movies from table with GET', async() => {
    const res = await request(app)
      .get('/movies');

    expect(res.body).toEqual(res.body);
  });
  //GET BY ID TEST
  it('finds movies from table by ID with GET', async() => {
    const movie = await Movie.insert({ 
      title: 'The Matrix', 
      director: 'Lana and Lilly Wachowski',
      url: 'https://www.warnerbros.com/movies/matrix' });

    const response = await request(app)
      .get(`/movies/${movie.id}`);

    // console.log(`/movies/${movie.id}`);
    expect(response.body).toEqual(movie);
  });
  //PUT TEST
  it('updates movies from table by ID with PUT', async() => {
    const movie = await Movie.insert({ 
      title: 'The Matrix', 
      director: 'Lana and Lilly Wachowski',
      url: 'https://www.warnerbros.com/movies/matrix' });

    const response = await request(app)
      .put(`/movies/${movie.id}`)
      .send({
        title: 'Matrix RELOADED', 
        director: 'Lana and Lilly Wachowski',
        url: 'https://www.warnerbros.com/movies/matrix'
      });

    console.log(`/movies/${movie.id}`);
    expect(response.body).toEqual({
      ...movie,
      title: 'Matrix RELOADED', 
      director: 'Lana and Lilly Wachowski'
    });
  });
  //DELETE TEST
  it('updates movies from table by ID with PUT', async() => {
    const movie = await Movie.insert({ 
      title: 'The Matrix', 
      director: 'Lana and Lilly Wachowski',
      url: 'https://www.warnerbros.com/movies/matrix' });

    const response = await request(app)
      .delete(`/movies/${movie.id}`);

    console.log(`/movies/${movie.id}`);
    expect(response.body).toEqual(movie);
  });

});
