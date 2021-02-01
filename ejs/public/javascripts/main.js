//  Поиск календаря и блоков его составляющих
const gridEl = document.querySelector('.grid');
const divsEl = gridEl.querySelectorAll('div');

//   Перебор массива блоков календаря и пресвоения им классов для отображения фона
divsEl.forEach((el, index) => {
    if(index < 7) {
        el.classList.add("calendar-head");
    }
    else if((index - 4) % 7 === 1 || (index + 1) % 7 === 0) {
        el.classList.add("day-off");
    }
});