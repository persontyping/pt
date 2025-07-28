var express = require('express');
var router = express.Router();

/* GET photos page with demo cards */
router.get('/', function(req, res, next) {
  const demoCards = [
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: '', buttonUrl: '#', buttonText: 'Read More' }

  ];

  res.render('photos', { title: 'TL;DR', demoCards });
});

module.exports = router;
