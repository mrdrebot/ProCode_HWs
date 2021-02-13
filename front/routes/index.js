const express = require('express');
const router = express.Router();
const axios = require('axios');
const sizeOf = require('probe-image-size');

/* Response from server */
router.get('/', function(req, res, next) {
  //  Организовуем запрос для получения массива пород собак
  const dogUrlArr = axios.get('https://dog.ceo/api/breeds/list/')
      .then(breedArr => breedArr.data.message.map(breed => {                   //  обрабатываем каждый элемент полученого массива
        return axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)   //  получаем ссылку на картинку согласно породы
                .then(r => {
                  return sizeOf(r.data.message)                                //  получаем данные по свойствам картинок согласно адресса их расположения
                    .then(imgProperties => {
                      //  возвращаем собранные данные объектом в массив
                      return { breed: breed, url: r.data.message, height: imgProperties.height, width: imgProperties.width };
                    })
                    .catch(err => console.log('Img proreties error:', err));
                })
                .catch(err => console.log('Check img url error:', err));
      }))
      .catch(err => console.log('Get breeds list error:', err));
  
  //  ожидание выполнения всех асинхронных операций по получению данных о породе
  dogUrlArr
    .then(arr => Promise.all(arr)
                  .then(arr => {
                    const objToFront = {};                                    //  Создание объекта для передачи данных на "front"
                    objToFront.breedsArr = arr;
                    objToFront.title = 'HW 2021-02-11_Node_promise-Front';
                    res.render('index', objToFront);
                  })
                  .catch(err => console.log(err))
    )
    .catch(err => console.log('Send to front error:', err));
});

module.exports = router;
