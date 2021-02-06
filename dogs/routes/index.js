var express = require('express');
var axios = require('axios');
var router = express.Router();

let url = 'https://dog.ceo/api/breeds/list/all';


// Задание 3
// Создание страницы при отсутствии данных в строке адреса браузера
router.get('/', function(req, res, next) {
  //  Формирование запроса на адрес по умолчанию  
  axios.get(url)
      .then(r1 => r1.data.message)  //  получения объкта со всеми породами
      .then(r2 => {                 //  создание объекта передаваемого в index.ejs
        let renderObj = {};
        renderObj.title = 'Dog breeds';
        renderObj.breed = '';       //  Если выбора породы небыло, не отображать тэг <img>
        renderObj.breeds = r2;
        res.render('index', renderObj);
      })
      .catch(err => console.log(err));
});

// Создание страницы при наличии данных в строке адреса браузера (выбрана порода)
router.get('/:breed', function(req, res, next) {
  axios.get(url)
    .then(r1 => r1.data.message)
    .then(r2 => {                   // Формирование запроса на фото выбраной породы
      axios.get(`https://dog.ceo/api/breed/${req.params.breed}/images/random`)
      .then(r21 => {                //  создание объекта передаваемого в index.ejs
        let renderObj = {};
        renderObj.title = 'Dog breeds';
        renderObj.breed = req.params.breed;
        renderObj.breeds = r2;
        renderObj.url = r21.data.message;
        res.render('index', renderObj);
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// Задание 2

// router.get('/', function(req, res, next) {
//   axios.get(url)
//     .then(r1 => r1.data.message)
//     .then(r2 => {
//       let renderObj = {};
//       renderObj.title = 'Dog breeds';
//       renderObj.breeds = r2;
//       res.render('index', renderObj);
//     })
//     .catch(err => console.log(err));
// });

// Задание 1

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   const promise2000 = () => {
//     let back = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve();
//       }, 2000);
//     });

//     return back;
//   }

//   promise2000()
//   .than(res.render('index', { title1: 'Express' }))
//   .catch(err => console.log(err));
// });

module.exports = router;
