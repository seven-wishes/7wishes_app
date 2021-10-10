const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: '5.63.153.226',
    database: 'sevenwishesdb',
    password: '131313',
    port: 5432,
})

console.log('connect')

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
