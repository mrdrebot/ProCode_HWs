const form = document.querySelector(".review");
const answEl = document.querySelector(".answ");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const data = new FormData(form);
    console.log(data);
    axios.post('/review', data)
      .then(r => answEl.innerHTML = r.data)
      .catch(e => answEl.innerHTML = `ERROR: ${e}`);
});
