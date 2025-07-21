var express = require('express');
var router = express.Router();

/* GET photos page with demo cards */
router.get('/', function(req, res, next) {
  const demoCards = [
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Click me' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: '', buttonUrl: '#', buttonText: 'Learn more' },
    { title: 'Card 3', text: 'Demo text 3', imageUrl: '', buttonUrl: '#', buttonText: 'Buy now' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Buy now' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Click me' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: '', buttonUrl: '#', buttonText: 'Learn more' },
    { title: 'Card 3', text: 'Demo text 3', imageUrl: '', buttonUrl: '#', buttonText: 'Buy now' }
  ];

  res.render('photos', { title: 'Photos', demoCards });
});

module.exports = router;
