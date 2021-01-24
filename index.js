/*
  При заходе на страницу 127.0.0.1 должна отобразиться таблица (Бренд ,Модель, Год выпуска, Цена) с автомобилями, спарсенными с сайта auto.ria.ua.
*/

//  Подключение модулей
const request = require('request');
const http = require('http');

const carArr = [];

//  Функция создания массива строк
const findStr = (dataStr, str1, str2, position) => {
  const tempArr = [];

  while (true) {
    const starPos = dataStr.indexOf(str1, position);
    const endPos = dataStr.indexOf(str2, starPos);
    const foundData = dataStr.slice(starPos, endPos);

    if (starPos === -1) break; //  Выход если в полученой строке, нет искомого начала текста

    tempArr.push(foundData);

    position = endPos; // Начальная позиция старта для следующего объекта
  }

  return tempArr;
};

//  Функция получения значения из строки
const getVal = (tempArr, str1, str2, val) => {
  tempArr.filter((el) => el.indexOf(str1, 0) > -1).forEach((el, i) => {
    const starPos = el.indexOf(str1, 0);
    const endPos = el.indexOf(str2, starPos);

    if (typeof carArr[i] !== 'object') {
      if (typeof str2 !== 'string') {
        carArr.push({
          [val]: el.slice(starPos).slice(str1.length),
        });
      } else {
        carArr.push({
          [val]: el.slice(starPos, endPos).slice(str1.length),
        });
      }
    } else {
      const temp = carArr[i];
      if (typeof str2 !== 'string') {
        temp[val] = el.slice(starPos).slice(str1.length);
      } else {
        temp[val] = el.slice(starPos, endPos).slice(str1.length);
      }
    }
  });
};

//  Запуск модуля обращения к странице
request('https://auto.ria.com/uk/search/?indexName=auto,order_auto,newauto_search&body.id[4]=2&year[0].gte=2012&year[0].lte=2012&categories.main.id=1&brand.id[0]=6&price.currency=1&gearbox.id[1]=2&gearbox.id[2]=3&fuel.id[1]=2&drive.id[0]=1&abroad.not=0&custom.not=1&page=0&size=50', (error, response, body) => {
  if (error) {
    console.error('error:', error);
  } else {
    //  Создание массива объектов продаваемых авто
    let dataStrArr = [];
    const strFindValBeg = '<div class="hide"'; //  Начало искомого текста
    const strFindValEnd = '>'; //  Конец искомого текста

    const strFindValBeg2 = 'main-price'; //  Начало искомого текста
    const strFindValEnd2 = '>'; //  Конец искомого текста

    dataStrArr = findStr(body, strFindValBeg, strFindValEnd, 0);

    getVal(dataStrArr, 'mark-name="', '" ', 'name');
    getVal(dataStrArr, 'model-name="', '" ', 'model');
    getVal(dataStrArr, 'data-year="', '" ', 'year');

    dataStrArr = findStr(body, strFindValBeg2, strFindValEnd2, 0);

    getVal(dataStrArr, 'main-price="', '"\n', 'price');

    //  Создаем таблицу
    let table = '';

    //  Получение значений для шапки таблицы
    const objVal = Object.getOwnPropertyNames(carArr[0]);
    // console.log(objVal);

    //  Создание шапки талицы
    let tempStr = '';

    objVal.forEach((el) => {
      tempStr += `<th>${el}</th>`;
    });

    const tableFirstRow = `<tr>${tempStr}</tr>`;

    //  Создание тела таблицы
    let tableBody = '';

    carArr.forEach((el) => {
      tableBody += `<tr><td>${el.name}</td><td>${el.model}</td><td>${el.year}</td><td>${el.price}</td></tr>`;
    });

    //  Создание полноценной таблицы
    table = `<table border="1">${tableFirstRow}${tableBody}</table>`;

    //  Создаем http-server
    const server = http.createServer((req, res) => {
      res.write(table);
      res.end();
    });

    //  Прошлушивание обращений на порт 3000
    server.listen(3000, () => {
      console.log('server port opened: ', server.address().port);
    });
  }
});
