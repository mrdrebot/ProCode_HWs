let express = require('express');
let axios = require('axios');
let router = express.Router();
const multer = require('multer');
let upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cats', choice: 'Choose a continent!' });
});

// Ожидаем post-запрос 
router.post('/', upload.none(), async (req, res) => {
  // Создаем массив стран из выбраного региона
  const obj = await axios.get(`https://restcountries.eu/rest/v2/region/${req.body.region}`);
  // Создаем массив пород котов
  let catsArr = await axios.get(`https://api.thecatapi.com/v1/breeds`);

  // Убираем из массива котов без данных и картинок
  catsArr = catsArr.data.filter(cat => cat.image !== undefined)
    .filter(cat => cat.image.url !== undefined)
    .map(cat => { return { name: cat.name, countryCode: cat.country_code, imageUrl: cat.image.url } });
  
  // Ищем котов для каждой страны
  let counriesArr = obj.data.map(country => {
    return { countryName: country.name, flagUrl: country.flag, cats: catsArr.filter(cat => country.alpha2Code === cat.countryCode) };
  });

  // Фильтруем полученнный массив, убираем странны в которых нет котов
  counriesArr = counriesArr.filter(cat => cat.cats.length);
  
  // Создаем обьект для возврата на фронт
  const html = counriesArr.reduce((preVal, curVal) => {
    // Формируем котов из страны
    let divIns = curVal.cats.reduce((preCat, curCat) => {
      return preCat + `<div>${curCat.name}<img src="${curCat.imageUrl}"></div>`;
    }, '');

    // Создаем innerHTML для div-а получающего ответ с бэка
    return preVal + `<div>${curVal.countryName}
                      <img src="${curVal.flagUrl}">
                      <div>${divIns}</div>
                    </div>`;
  }, '');

  res.send(html);
});

module.exports = router;
