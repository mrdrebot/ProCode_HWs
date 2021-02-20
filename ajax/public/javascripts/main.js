const form = document.querySelector(".countries");
const answEl = document.querySelector(".answ");

form.addEventListener("change", function(event) {
    const data = new FormData(form);
    axios.post('/', data)
      .then(r => answEl.innerHTML = r.data)
      .catch(e => answEl.innerHTML = `ERROR: ${e}`);
});
