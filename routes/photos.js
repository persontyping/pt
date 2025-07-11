var express = require('express');
var router = express.Router();

/* GET photos page with demo cards */
router.get('/', function(req, res, next) {
  const demoCards = [
    { title: 'Card 1', text: 'Demo text 1', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=284836&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Click me' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=d3d60a&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Learn more' },
    { title: 'Card 3', text: 'Demo text 3', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=a10c81&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Buy now' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=284836&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Click me' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=d3d60a&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Learn more' },
    { title: 'Card 3', text: 'Demo text 3', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=a10c81&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Buy now' },
    { title: 'Card 1', text: 'Demo text 1', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=284836&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Click me' },
    { title: 'Card 2', text: 'Demo text 2', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=d3d60a&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Learn more' },
    { title: 'Card 3', text: 'Demo text 3', imageUrl: 'https://imageslot.com/v1/1080x1080?bg=a10c81&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png', buttonUrl: '#', buttonText: 'Buy now' }
  ];

  res.render('photos', { title: 'Photos', demoCards });
});

module.exports = router;
