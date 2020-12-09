const pool = require('../lib/utils/pool.js');

module.exports = class Tea {
id;
name;
brand;
description;
url;

constructor(row) {
  this.id = row.id;
  this.name = row.name;
  this.brand = row.brand;
  this.description = row.description;
  this.url = row.url;
}

//CRUD

static async insert({ name, brand, description, url }) {
  const { rows } = await pool.query(
    'INSERT INTO teas (name, brand, description, url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, brand, description, url]
  );

  return new Tea(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM teas');

  return rows.map(row => new Tea(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM teas WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No tea with id ${id}`);

  return new Tea(rows[0]);
}

static async update(id, { name, brand, description, url }) {
  const { rows } = await pool.query(
    `UPDATE teas
        SET name=$1,
        brand=$2,
        description=$3,
        url=$4
    WHERE id=$5
    RETURNING *
    `,
    [name, brand, description, url, id]
  );
  if(!rows[0]) throw new Error(`No tea with id ${id}`);

  return new Tea(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM teas WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No tea with id ${id}`);

  return new Tea(rows[0]);
}

};
