const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Route is working');
});

module.exports = router;
