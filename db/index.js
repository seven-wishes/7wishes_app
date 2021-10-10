const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: '89.108.99.106',
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
