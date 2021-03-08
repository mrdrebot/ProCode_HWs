const express = require('express');
const router = express.Router();
const fs = require('fs');
const fsProm = require('fs/promises');
const moment = require('moment');
const multer = require('multer');
const upload = multer();
const zlib = require("zlib");
const JSZip = require("jszip");
const path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('review', { title: 'Files filter' });
});

router.post('/', upload.none(), async function(req, res, next) {
    const fromDate = moment(req.body.fromDate);                     //  дата начала отбора
    const toDate = moment(req.body.toDate);                         //  дата конца отбора
    const folderPath = './uploads/';
    const filesInFolderArr = await fsProm.readdir(folderPath);    //  получение имен файлов в папке

    //  получение данных о файлах в папке
    const dataFromFiles = filesInFolderArr.map((fileName) => {
        return fsProm.stat(`./uploads/${fileName}`)
                .then((fileStat) => { return { name: fileName, date: fileStat.birthtime, size: fileStat.size } });
    });

    const filesDataArr = await Promise.all(dataFromFiles);          //  ожидание завершения всех асинхронных операций получеия данных о файлах
    //  фильтрация данных отправляемых на фрон, согласно указанных границы в форме
    const dataToFront = filesDataArr.filter((fileData) => {
        if(fileData.date >= fromDate && fileData.date <=  toDate) return fileData;
    });

    //  создание строки для отправки данных на фронт
    const strToFront = dataToFront.reduce((str, file) => {
        return str = `${str}<li>${file.name} | ${file.size} bite | ${moment(file.date).format('YYYY-MM-DD')}</li>`;
    }, '');

    res.send(`${strToFront}`);
});

module.exports = router;
