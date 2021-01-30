var express = require('express');
var router = express.Router();

/* GET blog listing */
router.get('/', function(req, res, next) {
  res.render('blog', { title: 'Blog' });
});

router.get('/addArticle', function(req, res, next) {
    res.send('added article in blog!');
});

router.get('/editArticle', function(req, res, next) {
    res.send('You can edit article in blog!');
});

module.exports = router;