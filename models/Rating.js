const pool = require('../lib/utils/pool.js');

module.exports = class Rating {
id;
number;
movieId;

constructor(row) {
  this.id = Number(row.id);
  this.number = row.number;
  this.movieId = String(row.movie_id);
}

//CRUD

static async insert({ number, movieId }) {
  const { rows } = await pool.query(
    'INSERT INTO ratings (number, movie_id) VALUES ($1, $2) RETURNING *',
    [number, movieId]
  );

  return new Rating(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM ratings');

  return rows.map(row => new Rating(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM ratings WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No book with id ${id}`);

  return new Rating(rows[0]);
}

static async update(id, { number, movieId }) {
  const { rows } = await pool.query(
    `UPDATE ratings
        SET number=$1,
        movie_id=$2        
    WHERE id=$3
    RETURNING *
    `,
    [number, movieId, id]
  );
  if(!rows[0]) throw new Error(`No rating with id ${id}`);

  return new Rating(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM ratings WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No rating with id ${id}`);

  return new Rating(rows[0]);
}

};
