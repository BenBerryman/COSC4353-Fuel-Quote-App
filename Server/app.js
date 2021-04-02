const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');

const app = express();
//for body parser..
app.use(express.urlencoded({ extended: false }));

//serve static files.
app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//session
app.use(session({
    secret: 'fuel_data',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));
//routers.
app.use('/', pageRouter);

//errors: Page Not Found 404
app.use((req, res, next) => {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
//handling errors.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});
//setting up the server
app.listen(5000, () => {
    console.log('Server running at port 5000..');
});
module.exports = app;