const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const strDouHtml = await axios.get('https://dou.ua');
  const linksPattern = /http[\s\w\-:\.\/:;\?\&=]+.[jpgpng]{3}/g;
  const linksArr = strDouHtml.data.match(linksPattern);
  res.render('index', { title: 'Links to images from site dou.ua', links: linksArr});
});

module.exports = router;
