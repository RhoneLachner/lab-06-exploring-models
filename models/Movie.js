const pool = require('../lib/utils/pool.js');

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

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM movies WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No book with id ${id}`);

  return new Movie(rows[0]);
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
  if(!rows[0]) throw new Error(`No book with id ${id}`);

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
