const express = require('express');
const router = express.Router();
const axios = require('axios');
const sizeOf = require('probe-image-size');

/* Response from server */
router.get('/', function(req, res, next) {
  const arrSize = 30;
  const dogUrlArr = [];

  for (i = 0; i < arrSize; i++) {
    dogUrlArr.push(
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(r => {
        const newObj = {};
        newObj.url = r.data.message;
        const findBreedStart = 'https://images.dog.ceo/breeds/'.length;
        const findBreedEnd = newObj.url.indexOf("/", findBreedStart);
        let findBreed = newObj.url.slice(findBreedStart, findBreedEnd);
        newObj.breed = findBreed;

        return newObj;
      })
      // .then(r => {
      //   // r.width = sizeof(r.url)
      //   // r.width = sizeOf(r.url, (err, result) => {
      //   //   // r.width = result.width;
      //   //   // r.height = result.height;
      //   //   return result.width;
      //   // });
      //   sizeOf(r.url)
      //   .then(result => {
      //     // console.log(result);
      //     r.width = result.width;
      //     console.log(r.width);
      //     r.height = result.height;
      //     // return result.width;
      //     // return r;
      //   })
      //   .catch(err => console.log(err));

      //   return r;
      // })
      .catch(err => console.log(err))
    );
  }

  console.log(dogUrlArr);

  Promise.all(dogUrlArr)
    .then(arr => {
      const objToFront = {};
      objToFront.breedsArr = arr;
      objToFront.title = 'HW 2021-02-11_Node_promise-Front';
      // console.log(objToFront);
      res.render('index', objToFront);
    })
    .catch(err => console.log(err));
});

module.exports = router;
