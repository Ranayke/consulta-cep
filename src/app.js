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

  // Getting API informations about street search
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

// Creating lines to print informations about the API response to user
function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);
  line.appendChild(text);
  content.appendChild(line);
}

// Update embed map to certain street location
submitButton.addEventListener("click", function () {
  searchMap =
    "https://maps.google.com/maps?q=" +
    zipCodeField.value +
    "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    var mapURL = document.querySelector("#gmap_canvas")
    mapURL.setAttribute('src', searchMap)
});

/* // Getting API informations about CEP search
axios
.get("viacep.com.br/ws/" + ufCode + "/" + localidadeCode + "/" + logradouroCode + "/")
.then(function(response) {
  if (response.data.erro) {
    throw new error("Informações inválidas");
  }
  //content.innerHTML = "";
  createLine(response.data.cep);
}) */
