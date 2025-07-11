const express = require('express');
const router = express.Router();

const VERIFY_TOKEN = 'your_verify_token_here';

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

router.post('/', (req, res) => {
  console.log('📬 Webhook event received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ✅ This line is crucial
module.exports = router;
