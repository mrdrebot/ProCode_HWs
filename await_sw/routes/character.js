var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/:name', async function(req, res, next) {
  const characterVal = await axios.get(`https://swapi.dev/api/people/${req.params.name}`);  //  получаем информацию (объект) про персонажа
  const filmObjArr = characterVal.data.films.map(filmEl => axios.get(filmEl));              //  получаем информацию (объект) про фильмы, по ссылке
  const characterFilmsName = await Promise.all(filmObjArr);                                 //  ждем выполнения всех запросов axios
  const filmsNameArr = characterFilmsName.map(el => {                                       //  создаем объект для передачи на front
    return { title: el.data.title, url: el.data.url, speciesUrlArr: el.data.species};
  });

  const speciesArrArr = filmsNameArr.map(el => el.speciesUrlArr);                           //  создание массива массивов url на виды
  
  for (i = 0; i < speciesArrArr.length; i++) {                                              //  перебор массива массива url на виды
    const speciesObjArr = speciesArrArr[i].map(el => axios.get(el));                        //  создание запроса по каждой ссылке вида
    const speciesArr = await Promise.all(speciesObjArr);                                    //  ждем выполнения всех запросов axios
    filmsNameArr[i].species = speciesArr.map(el => el.data.name).join(', ');                //  дополняем обїект данніми для отправки на front
  }

  res.render('character', { title: characterVal.data.name, films: filmsNameArr});           //  передача данных на front
});

module.exports = router;
