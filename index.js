/* eslint-disable indent */
/* eslint-disable no-tabs */
/*
Все операции с файлами производить с помощью билиотеки fs и асинхронных функций:
1) создаём 2 папки, в одну папку кладём картинку, например SVG-файл. Эту картинку перемещаем из одной папки в другую;
2) из прошлой домашки делаем request на dou.ua, добываем массив адресов картинок, сохраняем его в файл arr.txt;
3) запускаем сервер на встроенном https, выводим картинки из файла arr.txt.
*/

//  Подключенные модули
const fs = require('fs');
const request = require('request');

//	Задание №1
//  Начало кода
const firstFolderName = 'folderIncFile';
const secondFolderName = 'folderMoveFile';
const startPath = './dragon.jpg';
const oldPath = `./${firstFolderName}/dragon.jpg`;
const newPath = `./${secondFolderName}/dragon.jpg`;

//  Создание папки содержащей файл
fs.mkdir(`./${firstFolderName}`, (createFolderErr) => {
	if (createFolderErr) throw createFolderErr;
});

// Копирование файл в парку
fs.copyFile(startPath, oldPath, (err) => {
  if (err) {
    throw err;
  } else {
		console.log(`Successfully copied file "${startPath.slice(2)}"`);

    // Создание папки в которую будет перемещен файл
		fs.mkdir(`./${secondFolderName}`, (createFolderErr) => {
			if (createFolderErr)	{
				throw createFolderErr;
			}
		});

		// Перемещение файла
		fs.rename(oldPath, newPath, (errMove) => {
			if (errMove) throw err;
			console.log(`Successfully moved file "${startPath.slice(2)}"`);
		});
  }
});

//	Задание №2
const fileName = 'arr.txt';
//  Запуск модуля обращения к странице
request('https://dou.ua/', (error, response, body) => {
    if (error) {
        console.error('error:', error);
    } else {
        let pos = 0; //  Начальная позиция старта поска строки
        const imgTagArr = [];
        const strFindValBeg = '<img'; //  Начало искомого текста
				const strFindValEnd = '>'; //  Конец искомого текста

        //  Цикл перебора полученной строки с сайта
        while (true) {
            const starPos = body.indexOf(strFindValBeg, pos);
            const endPos = body.indexOf(strFindValEnd, starPos);
            const foundImgTag = body.slice(starPos, endPos);

            if (starPos === -1) break; //  Выход если в полученой строке, нет искомого начала текста

            imgTagArr.push(foundImgTag);

            pos = endPos; // Начальная позиция старта для следующего объекта
				}

				fs.open(fileName, 'w', (errCreateFile) => {
					if (errCreateFile) throw errCreateFile;
					console.log(`File ${fileName} created!`);
    		});

				// console.log(imgTagArr);

        //  Цикл получения имени файла, url файла и записи файла на диск
        imgTagArr.forEach((el) => {
            const pos2 = 0;
            const starPos = el.indexOf('src=', pos2);
						const endPos = el.indexOf(' ', starPos);

            el = el.slice(starPos, endPos).slice(5, -1); //  Удаление с начала и конца ""

						fs.appendFile(fileName, `${el}\n`, (errWriteInFile) => {
							if (errWriteInFile) throw errWriteInFile;
							console.log('Data has been added!');
			      });
				});
    }
});
