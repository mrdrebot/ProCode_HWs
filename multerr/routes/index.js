const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const fsProm = require('fs/promises');
const moment = require('moment');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Create your csv file' });
});

// Получение данных с формы, создание файла и отправка результата 
router.post('/', upload.none(), function(req, res) {
  const date = moment().format('YYYY-MM-DD');
  const filePath = `./csv/${date}`;
  const dataStr = Object.values(req.body).join(';') + '\n'; // преобразование данных с формы в строку
  
  // Проверка наличия папки для сохранения файлов
  fs.stat(filePath, (err) => {
    if (!err) {
      fsProm.appendFile(`${filePath}/${date}.csv`, dataStr)
      .catch(err => console.log('Add data in the file: ', err));
    }
    else if (err.code === 'ENOENT') {
      fsProm.mkdir(filePath)
      .then(fsProm.appendFile(`${filePath}/${date}.csv`, dataStr))
      .catch(err => console.log('Create folder error and add data in the file', err));
    }
    else {
      console.log('Check path to create folder error:\n', err);
    }
  });
  
  res.send(`Data downloaded and saved in a file csv!<br><a href="${filePath}/${date}.csv" download>Download file</a>`);
});

// Отправка пути для скачивния файла
router.get(`/:folder1/:folder2/:file.csv`, function(req, res) {
  const filePath = `../${req.params.folder1}/${req.params.folder2}/${req.params.file}.csv`;
  res.sendFile(path.join(__dirname, filePath));
});

module.exports = router;
