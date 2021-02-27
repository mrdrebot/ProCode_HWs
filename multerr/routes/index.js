const express = require('express');
const router = express.Router();
const moment = require('moment');
const fs = require('fs');
const fsProm = require('fs/promises');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const data = moment().format('YYYY-MM-DD');
    fs.stat(`./public/images/${data}`, (err) => {
      if (err === null) {
        cb(null, `./public/images/${data}`);
      }
      else if (err.code === 'ENOENT') {
        fsProm.mkdir(`./public/images/${data}`)
        .then(cb(null, `./public/images/${data}`))
        .catch(err => console.log(err));
      }
      else {
        console.log('Something go wrong!\n', err);
      }
    });
  },
  filename: function (req, file, cb) {
    const fileNameObj = req.body;
    const fileExtension = file.originalname.slice(file.originalname.indexOf('.'));
    cb(null, `${fileNameObj.fileName}${fileExtension}`)
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Download your file' });
});

router.post('/', upload.single('file'), function(req, res, next) {
  res.send('File loaded and processed!');
});

module.exports = router;
