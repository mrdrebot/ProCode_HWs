const express = require('express');
const router = express.Router();
const axios =  require('axios');
// const sizeOf = require('image-size');
// sizeOf('images/funny-cats.png', function (err, dimensions) {
//   console.log(dimensions.width, dimensions.height);
// });


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
        // sizeOf(newObj.url, function (err, dimensions) {
        //   console.log(dimensions.width, dimensions.height);
        // });
        const findBreedStart = 'https://images.dog.ceo/breeds/'.length;
        const findBreedEnd = newObj.url.indexOf("/", findBreedStart);
        let findBreed = newObj.url.slice(findBreedStart, findBreedEnd);
        newObj.breed = findBreed;
        return newObj;
      })
      .catch(err => console.log(err))
    );
  }

  Promise.all(dogUrlArr)
    .then(arr => {
      const objToFront = {};
      objToFront.breedsArr = arr;
      objToFront.title = 'HW 2021-02-11_Node_promise-Front';
      console.log(objToFront);
      res.render('index', objToFront);
    })
    .catch(err => console.log(err));
});

module.exports = router;
