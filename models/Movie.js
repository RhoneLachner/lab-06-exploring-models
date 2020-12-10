const pool = require('../lib/utils/pool.js');
const Rating = require('./Rating.js');

module.exports = class Movie {
id;
title;
director;
url;

constructor(row) {
  this.id = row.id;
  this.title = row.title;
  this.director = row.director;
  this.url = row.url;
}

//CRUD

static async insert({ title, director, url }) {
  const { rows } = await pool.query(
    'INSERT INTO movies (title, director, url) VALUES ($1, $2, $3) RETURNING *',
    [title, director, url]
  );

  return new Movie(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM movies');

  return rows.map(row => new Movie(row)); 
}

//ADDING RATING JOIN HERE
static async findById(id) {
  const { rows } = await pool.query(
    `
      SELECT 
        movies.*,
        array_to_json(array_agg(ratings.*)) AS ratings
      FROM
        movies
      JOIN ratings
      ON movies.id = ratings.movie_id
      WHERE movies.id=$1
      GROUP BY movies.id     
     `,

    [id]
  );
  if(!rows[0]) throw new Error(`No movie with id ${id}`);

  return { 
    ...new Movie(rows[0]),
    ratings: rows[0].ratings.map(rating => new Rating(rating))
  };
  
}

static async update(id, { title, director, url }) {
  const { rows } = await pool.query(
    `UPDATE movies
        SET title=$1,
        director=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [title, director, url, id]
  );
  if(!rows[0]) throw new Error(`No movie with id ${id}`);

  return new Movie(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM movies WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No book with id ${id}`);

  return new Movie(rows[0]);
}

};
