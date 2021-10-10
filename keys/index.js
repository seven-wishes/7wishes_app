let baseURL = 'http://7-wishes.ru'

if(process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)
    baseURL = 'http://7-wishes.ru'
} else if(process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
    baseURL = 'http://192.168.1.190:3000'
}

module.exports = {
    COOKIE_SECRET_KEY: '7wzncQPJwpiWgfdPg2',
    COOKIE_MAX_AGE: 7200000,
    EMAIL_FROM: 'info@7wishes.club',
}