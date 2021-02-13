//  Поиск нужніх єлементов в DOM
const divElGrid = document.querySelector('.grid');
const divElArr = divElGrid.querySelectorAll('div');

//  Создание grid-сетки
const colomnsInGrid = 7;
const rowsInGrid = Math.ceil(divElArr.length / colomnsInGrid);
divElGrid.style.gridTemplateRows = `repeat(${rowsInGrid}, 200px)`;

//  Установка обработчика событий на ячейки сетки
divElArr.forEach(divEl => {
    divEl.addEventListener('click', (e) => {
        if(e.target.tagName === 'DIV') {
            let imgEl = divElGrid.querySelector(`.dog-image.${e.target.className}`);
            imgEl.classList.add('show-image');
        }
        else {
            let breed = e.target.alt;
            axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
                .then(r => {
                    e.target.src = r.data.message;
                });
        }      
    });
});
