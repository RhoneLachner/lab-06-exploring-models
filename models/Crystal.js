const pool = require('../lib/utils/pool.js');

module.exports = class Crystal {
id;
name;
description;
url;

constructor(row) {
  this.id = row.id;
  this.name = row.name;
  this.description = row.description;
  this.url = row.url;
}

//CRUD

static async insert({ name, description, url }) {
  const { rows } = await pool.query(
    'INSERT INTO crystals (name, description, url) VALUES ($1, $2, $3) RETURNING *',
    [name, description, url]
  );

  return new Crystal(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM crystals');

  return rows.map(row => new Crystal(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM crystals WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No crystal with id ${id}`);

  return new Crystal(rows[0]);
}

static async update(id, { name, description, url }) {
  const { rows } = await pool.query(
    `UPDATE crystals
        SET name=$1,
        description=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [name, description, url, id]
  );
  if(!rows[0]) throw new Error(`No crystal with id ${id}`);

  return new Crystal(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM crystals WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No crystal with id ${id}`);

  return new Crystal(rows[0]);
}

};
