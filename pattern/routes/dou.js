var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const strDouHtml = await axios.get('https://dou.ua');
  const linksPattern = /http[\s\w\-:\.\/:;\?\&=]+.[jpgpng]{3}/g;
  const linksArr = strDouHtml.data.match(linksPattern);
  console.log(linksArr);
  res.send(strDouHtml.data);
});

module.exports = router;
