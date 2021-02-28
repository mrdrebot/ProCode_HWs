const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const fsProm = require('fs/promises');
const moment = require('moment');
const path = require('path');

// Функция создания файла
async function createThenClose(path, name) { 
  let filehandle = null; 

  try { 
      // Using the filehandle method  
      filehandle = await fsProm.open(`${path}/${name}.csv`, 'w'); 
      filehandle.close(); 
  } catch (error) { 
      console.log("Create file error:", error); 
  } 
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Create your csv file' });
});

// Получение данных с формы, создание файла и отправка результата 
router.post('/', upload.none(), function(req, res, next) {
  const date = moment().format('YYYY-MM-DD');
  const filePath = `./public/csv/${date}`;
  const dataStr = Object.values(req.body).join(';') + '\n'; // преобразование данных с формы в строку
  
  // Проверка наличия папки для сохранения файлов
  fs.stat(filePath, (err) => {
    if (err === null) {
      fsProm.appendFile(`${filePath}/${date}.csv`, dataStr)
      .catch(err => console.log('Add data in the file: ', err));
    }
    else if (err.code === 'ENOENT') {
      fsProm.mkdir(filePath)
      .then(createThenClose(filePath, date))
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
router.get(`/:folder1/:folder2/:folder3/:file.csv`, function(req, res, next) {
  const filePath = `../${req.params.folder1}/${req.params.folder2}/${req.params.folder3}/${req.params.file}.csv`;
  res.sendFile(path.join(__dirname, filePath));
});

module.exports = router;
