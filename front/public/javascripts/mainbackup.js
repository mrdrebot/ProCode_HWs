const divElGrid = document.querySelector('.grid');
const divElArr = divElGrid.querySelectorAll('div');
const colomnsInGrid = 7;
const rowsInGrid = Math.ceil(divElArr.length / colomnsInGrid);
divElGrid.style.gridTemplateRows = `repeat(${rowsInGrid}, 15vh)`;

// console.log(rowsInGrid);
// console.log(divElArr.length);
// console.dir(divElGrid);

divElGrid.addEventListener('click', (e) => {
    let imgEl;
    
    if(e.target.tagName === 'DIV') {
        imgEl = divElGrid.querySelector(`.dog-image.${e.target.className}`);
    }
    else {
        imgEl = divElGrid.querySelector(`.${e.target.className.replace(/ /g, '.')}`);
    }
    
    imgEl.classList.toggle('show-image');
});