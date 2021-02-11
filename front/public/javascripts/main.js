const divElGrid = document.querySelector('.grid');
const divElArr = divElGrid.querySelectorAll('div');

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