// Поиск нужных элементов
const selectEl = document.querySelector("select");
const imgEl = document.querySelector("img");

//  Отслеживание выбора из выпадающего меню, обновление страницы и отображение картинки
selectEl.addEventListener("change", (e) => {
    location.replace(`http://127.0.0.1:3000/${e.target.value}`);
});

//  Старый вариант, уже не используется, но работает

// let xhr = new XMLHttpRequest();
// xhr.open('GET', `https://dog.ceo/api/breed/${e.target.value}/images/random`, false);
// // imgEl.src = `https://dog.ceo/api/breed/${e.target.value}/images/random`;
// xhr.send();
// if (xhr.status != 200) {
//     // обработать ошибку
//     console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
// } else {
// // вывести результат
// // console.dir( typeof(xhr.responseText) ); // responseText -- текст ответа.
// console.dir(xhr.responseText);
// let start = xhr.responseText.indexOf("http", 0);
// console.log(start);
// let end = xhr.responseText.indexOf("\",", 0);
// console.log(end);
// let str = xhr.responseText.slice(start, end);
// console.log(str);
// let src = str.replace("\/", '').replace("\/", '/');
// console.log(src);
// imgEl.src = src;
// }