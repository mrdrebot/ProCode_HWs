const express = require('express');
const request =  require('request');
const fs =  require('fs');
const router = express.Router();

/* Refresh page */
router.get('/', function(req, res, next) {
   
  request('https://dog.ceo/api/breeds/image/random', (err, resp, body) => {
    const pictDogUrl = JSON.parse(body);
    // console.log(pictDogUrl.message);
    pictDogUrl.title = 'Choose your dog!';
    pictDogUrl.phrase = 'See and choose';
    res.render('index', pictDogUrl);
  });
});

const arrSize = 30;
const dogUrlArr = [];

// 30 обращений
  for (i = 0; i < arrSize; i++) {
    request('https://dog.ceo/api/breeds/image/random', (err, resp, body) => {
      const pictDogUrl = JSON.parse(body);
      // console.log(pictDogUrl);
      console.log('i =', i);
      dogUrlArr.push(pictDogUrl.message);
      
      // if(dogUrlArr.length === arrSize) {
      //   console.log(dogUrlArr);
      // }
      // if(i + 1 === arrSize) {
      //   console.log(dogUrlArr);
      // }
    });

  }

  // console.log(dogUrlArr);

// // Запись файла
// fs.writeFile('arrTmp.txt', '', (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
// });

// fs.readFile('arrTmp.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// dogUrlArr.forEach((el, i) => {
//   console.log(i);
//   // request('https://dog.ceo/api/breeds/image/random').pipe(dogUrlArr.push());
//   request('https://dog.ceo/api/breeds/image/random', (err, resp, body) => {
//     const pictDogUrl = JSON.parse(body);
//     // dogUrlArr.push(pictDogUrl.message);
//     console.log(pictDogUrl.message);
  
//     // return pictDogUrl.message;
//     // res.send(pictDogUrl);
//   });
// });




// console.log(typeof(a));
// console.log(a);
// console.log('dogUrlArr = ', dogUrlArr);

module.exports = router;
