// Функции
const checkPatern = (field, patern) => {
  if(field.value.match(patern) === null) {
    field.classList.add("error");
    return 0;
  }
  else {
    field.classList.remove("error");
    return 1;
  }
}

// Переменные
const form = document.querySelector("form");
const fieldsArr = [];
const answEl = document.querySelector(".answ");
const authorNameEl = document.querySelector("#authorName");
const dateEl = document.querySelector("#date");
const articleEl = document.querySelector("#article");

// Наполнение массива полями вводимых данных, которые необходимо проверить
for(i = 0; i < form.length; i++) {
  if(form[i].tagName !== "BUTTON") {
    fieldsArr.push(form[i]);
  }
}

// Создание обработчика события отправки на сервер данных
form.addEventListener("submit", function(event) {
  event.preventDefault();                               // отключение действия по умолчанию у кнопки
  // Шаблоны проверки
  const namePatern = /^[a-zа-я-\.]+\s[a-zа-я-\.]+$/gi;  
  const datePatern = /^\d{2}-\d{2}-\d{4}$/;
  const articlePatern = /^[a-z0-9\s\.,]+$/gi;
  let checkField = 0;                                   // Флаг прерывания отправки данных на сервер

  // Цикл обработки всех полей введенных данных
  fieldsArr.forEach(el => {
      switch (el.name) {
        case "authorName":
          if (checkPatern(authorNameEl, namePatern) === 0) checkField++;
          break;
        case "date":
          if (checkPatern(dateEl, datePatern) === 0) checkField++;
          break;
        case "article":
          if (checkPatern(articleEl, articlePatern) === 0) checkField++;
      }
    });
  
  // Если значение флага больше нуля, прерывается отправка данных на сервер
  if(checkField > 0) return;

  const data = new FormData(form);
  axios.post('/', data)
    .then(r => {
      answEl.innerHTML = r.data;
      authorNameEl.value = '';
      dateEl.value = '';
      articleEl.value = '';
    })
    .catch(e => answEl.innerHTML = `Server respons (POST) error:\n ${e}`);
});
