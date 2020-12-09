const pool = require('../lib/utils/pool.js');

module.exports = class River {
id;
name;
location;
description;
url;

constructor(row) {
  this.id = row.id;
  this.name = row.name;
  this.location = row.location;
  this.description = row.description;
  this.url = row.url;
}

//CRUD

static async insert({ name, location, description, url }) {
  const { rows } = await pool.query(
    'INSERT INTO rivers (name, location, description, url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, location, description, url]
  );

  return new River(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM rivers');

  return rows.map(row => new River(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM rivers WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No river with id ${id}`);

  return new River(rows[0]);
}

static async update(id, { name, location, description, url }) {
  const { rows } = await pool.query(
    `UPDATE rivers
        SET name=$1,
        location=$2,
        description=$3,
        url=$4
    WHERE id=$5
    RETURNING *
    `,
    [name, location, description, url, id]
  );
  if(!rows[0]) throw new Error(`No river with id ${id}`);

  return new River(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM rivers WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No river with id ${id}`);

  return new River(rows[0]);
}

};
