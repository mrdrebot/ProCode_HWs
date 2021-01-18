/*
    Забрать с dou.ua картинки, которые внизу и сложить в папку images. Имена картинок оставить оригинальные.
*/

//  Подключение модулей
const request = require('request');
const fs = require('fs');

//  Запуск модуля обращения к странице
request('https://dou.ua/', (error, response, body) => {
    if (error) {
        console.error('error:', error);
    } else {
        let pos = 0;                                            //  Начальная позиция старта поска строки
        const imgTagArr = [];
        const imgNamesArr = [];
        const strFindValBeg = '<img class="img"';               //  Начало искомого текста
        const strFindValEnd = '>';                              //  Конец искомого текста
        
        //  Цикл перебора полученной строки с сайта
        while (true) {
            let starPos = body.indexOf(strFindValBeg, pos);
            let endPos = body.indexOf(strFindValEnd, starPos);
            let foundImgTag = body.slice(starPos, endPos);

            if (starPos === -1) break;                          //  Выход если в полученой строке, нет искомого начала текста
            
            imgTagArr.push(foundImgTag);                        
    
            pos = endPos;                                       // Начальная позиция старта для следующего объекта
        }

        //  Цикл получения имени файла, url файла и записи файла на диск
        imgTagArr.forEach((el, i) => {
            let pos2 = 0;
            let starPos = el.indexOf('src=', pos2);
            let endPos = el.indexOf(' ', starPos);
    
            el = el.slice(starPos, endPos).slice(5, -1);        //  Удаление с начала и конца ""
            imgNamesArr[i] = el.slice(el.lastIndexOf('/') + 1); //  Получение имени файла с расширением, "+1" - исключаем сам "/"
            
            request(`${el}`).pipe(fs.createWriteStream(`./images/${imgNamesArr[i]}`));
        });
    }
});
