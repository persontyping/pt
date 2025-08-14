// app.js
require('./db');
require('dotenv').config();

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');

const indexRouter     = require('./routes/index');
const usersRouter     = require('./routes/users');
const blogRouter      = require('./routes/blog');
const portfolioRouter = require('./routes/portfolio');
const photosRouter    = require('./routes/photos');
const resourcesRouter = require('./routes/resources');
const contactRouter   = require('./routes/contact');
const webhookRouter   = require('./routes/webhook');

const app = express();

// ----- VIEW ENGINE -----
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ----- CORE MIDDLEWARE -----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ----- STATIC ASSETS -----
// 1) Serve your /public folder at the site root
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  maxAge: '1h',
}));

/**
 * 2) Serve media files referenced in the DB.
 *    Your DB stores paths like: "media/posts/202507/abc.jpg"
 *
 *    MEDIA_ROOT should be the *parent* directory that contains the "media" folder.
 *    Example:
 *      MEDIA_ROOT=/var/data/zinsta
 *      -> files live at /var/data/zinsta/media/posts/...
 */
const MEDIA_ROOT = path.resolve(process.env.MEDIA_ROOT || path.join(__dirname, 'zinsta'));
console.log(`[static] Serving /media/* from ${path.join(MEDIA_ROOT, 'media')}`);

// Serve DB links like "media/posts/..." at /media/*
app.use('/media', express.static(path.join(MEDIA_ROOT, 'media'), {
  immutable: true,
  maxAge: '30d',
  dotfiles: 'ignore',
  index: false,
}));

// Back-compat for any "zinsta/media/..." links
app.use('/zinsta/media', express.static(path.join(MEDIA_ROOT, 'media'), {
  immutable: true,
  maxAge: '30d',
  dotfiles: 'ignore',
  index: false,
}));

// Optional: quick sanity check URL
app.get('/__debug/static-check', (req, res) => {
  res.json({
    publicDir: path.join(__dirname, 'public'),
    mediaRootParent: MEDIA_ROOT,
    expectsFileAtDisk: path.join(MEDIA_ROOT, 'media/posts/202507/EXAMPLE.jpg'),
    expectsUrl: '/media/posts/202507/EXAMPLE.jpg'
  });
});

// Extra request logging (kept from your version)
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// ----- ROUTES -----
app.use('/blog', blogRouter);
app.use('/portfolio', portfolioRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);
app.use('/resources', resourcesRouter);
app.use('/contact', contactRouter);
app.use('/webhook', webhookRouter);

// ----- 404 / ERROR -----
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
