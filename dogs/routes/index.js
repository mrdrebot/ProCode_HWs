const express = require('express');
const request =  require('request');
const router = express.Router();

/* Refresh page */
router.get('/', function(req, res, next) {
   
  request('https://dog.ceo/api/breeds/image/random', (err, resp, body) => {
    const pictDogUrl = JSON.parse(body);
    pictDogUrl.title = 'Choose your dog!';
    pictDogUrl.phrase = 'See and choose';
    res.render('index', pictDogUrl);
  });
});

module.exports = router;
