let express = require('express');
let axios = require('axios');
let fs = require('fs').promises;
let router = express.Router();

// Функция генерирования номера породы
const breedNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Адресс получения всех пород кошек
let catUrl = 'https://api.thecatapi.com/v1/breeds';

//  Ожидание запроса от пользователя
router.get('/', function(req, res, next) {
axios.get(catUrl)                                           //  Запрос пород кошек
  .then(r => {
    let arrNum = breedNum(0, Object.keys(r.data).length);   //  Выбор породы кошки
    axios.get(`https://api.thecatapi.com/v1/images/${r.data[arrNum].reference_image_id}`)   //  получение объекта по породе
    .then(r12 => {
     fs.writeFile('catUrl.txt', r12.data.url);              //  Запись адреса в файл
    })
    .then(() => fs.readFile('catUrl.txt')                   //  Чтение данных из файла
    .then(r => {
      let renerValObj = {};                                 //  Зосдание объекта для отправки в index.ejs
      renerValObj.title = 'Cat image';
      renerValObj.url = r;
      res.render('index', renerValObj)
    })
    .catch(err => console.log(err)));
  })
  .catch(err => console.log(err));
});

module.exports = router;
