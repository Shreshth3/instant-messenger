const express = require('express');

const router = express();

router.get('/', (req, res) => {
  console.log('create an account');
});

module.exports = router;
