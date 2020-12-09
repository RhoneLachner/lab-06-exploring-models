const pool = require('../lib/utils/pool.js');

module.exports = class Song {
id;
title;
artist;
url;

constructor(row) {
  this.id = row.id;
  this.title = row.title;
  this.artist = row.artist;
  this.url = row.url;
}

//CRUD

static async insert({ title, artist, url }) {
  const { rows } = await pool.query(
    'INSERT INTO songs (title, artist, url) VALUES ($1, $2, $3) RETURNING *',
    [title, artist, url]
  );

  return new Song(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM songs');

  return rows.map(row => new Song(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM songs WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No song with id ${id}`);

  return new Song(rows[0]);
}

static async update(id, { title, artist, url }) {
  const { rows } = await pool.query(
    `UPDATE songs
        SET title=$1,
        artist=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [title, artist, url, id]
  );
  if(!rows[0]) throw new Error(`No song with id ${id}`);

  return new Song(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM songs WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No song with id ${id}`);

  return new Song(rows[0]);
}

};
