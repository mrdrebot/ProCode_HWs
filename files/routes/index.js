const express = require('express');
const router = express.Router();
const fs = require('fs');
const fsProm = require('fs/promises');
const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("file:\n", file);
    const filePath = `./uploads/`;
    fs.stat(filePath, (err) => {
      if (err === null) {
        cb(null, filePath);
      }
      else if (err.code === 'ENOENT') {
        fsProm.mkdir(filePath)
        .then(cb(null, filePath))
        .catch(err => console.log(err));
      }
      else {
        console.log('Something go wrong!\n', err);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Download your file' });
});

router.post('/', upload.array('files'), async function(req, res, next) {
  const timeDateWriteFile = moment().format('YYYY-MM-DD hh:mm:ss');

  req.files.map((file) => {
    fsProm.appendFile(`${file.destination}/main.log`, `${timeDateWriteFile}/${file.filename}/${file.size}\n`)
    .catch(error => console.log('Error wrire file:\n', error));
  });

  fsProm.appendFile(`./uploads/main.log`, '\n')
  .catch(error => console.log('Error add free row:\n', error));

  res.send('Files loaded and processed!');
});

module.exports = router;
