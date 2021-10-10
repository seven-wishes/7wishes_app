const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const config = require('config')
const keys = require('./keys')
const db = require('./db')

const appRouter = require('./routes/app');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const accountRouter = require('./routes/account');
const uploadRouter = require('./routes/upload');
const dialogsRouter = require('./routes/dialogs');
const plansRouter = require('./routes/plans');
const paymentRouter = require('./routes/payment');
const articlesRouter = require('./routes/articles');

const app = express();

const allowedOrigins = ['http://7wishes.club', 'http://7-wishes.ru', 'http://localhost:3000', 'http://192.168.1.75:3000'];
const corsOptions = {
    origin: function(origin, callback){
        if(!origin)
            return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static('frontend/public/uploads/'))

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool: db
    }),
    secret: keys.COOKIE_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);
app.use('/api/app', appRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/dialogs', dialogsRouter);
app.use('/api/plans', plansRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/articles', articlesRouter);

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })
} else if(process.env.NODE_ENV === 'development') {
    console.log('dev mode', process.env.NODE_ENV)
}

module.exports = app;
