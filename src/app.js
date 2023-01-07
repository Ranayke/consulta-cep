var submitButton = document.querySelector("#app form button");
var zipCodeField = document.querySelector("#app form input");
var content = document.querySelector("#app main");

submitButton.addEventListener("click", run);

function run(event) {
  event.preventDefault();

  var zipCode = zipCodeField.value;

  zipCode = zipCode.replace(" ", "");
  zipCode = zipCode.replace(".", "");
  zipCode = zipCode.replace("-", "");
  zipCode = zipCode.trim();

  axios
    .get("https://viacep.com.br/ws/" + zipCode + "/json/")
    .then(function (response) {
      if (response.data.erro) {
        throw new error("CEP inválido");
      }
      content.innerHTML = "";
      createLine(response.data.logradouro);
      createLine(response.data.localidade + "/" + response.data.uf);
      createLine(response.data.bairro);
    })
    .catch(function (error) {
      content.innerHTML = "";
      createLine("Ops, algo deu errado!");
      createLine("Tente novamente");
    });
}

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);
  line.appendChild(text);
  content.appendChild(line);
}

submitButton.addEventListener("click", function () {
  searchMap =
    "https://maps.google.com/maps?q=" +
    zipCodeField.value +
    "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    var mapURL = document.querySelector("#gmap_canvas")
    mapURL.setAttribute('src', searchMap)
});
