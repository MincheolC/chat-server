// postgres CRUD
const { Pool } = require('pg');
const pool = new Pool({
    user: 'print@print-postgres',
    host: 'print-postgres.postgres.database.azure.com',
    database: 'print',
    password: 'junctionx!23',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

function create(data, callback) {
  const queryString = 'INSERT INTO terms (word, description) VALUES ($1, $2)';
  pool.query(queryString, data, callback);
}

function get(callback) {
  const queryString = 'SELECT * FROM terms';
  pool.query(queryString, callback);
}

function update(data,callback) {
  const queryString = 'UPDATE terms SET description = $1 WHERE id = $2 and word = $3';
  pool.query(queryString, data, callback);
}

module.exports = {
  create,
  get,
  update,
}