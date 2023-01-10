var submitBlur = document.querySelector("#inputBlur");
var submitCepDiscoverButton = document.querySelector(
  "#submitCepDiscoverButton"
);
var zipCodeField = document.querySelector("#app form input");
var p = document.querySelector("main p")
var ufCodeField = document.querySelector("#ufCode");
var localidadeCodeField = document.querySelector("#localidadeCode");
var logradouroCodeField = document.querySelector("#logradouroCode");
var content = document.querySelector("#cepDiscover main");
var rua = document.querySelector("#rua");
var bairro = document.querySelector("#bairro");
var cidade = document.querySelector("#cidade");
var estado = document.querySelector("#estado");


submitBlur.addEventListener("blur", run);
submitCepDiscoverButton.addEventListener("click", search);

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
      rua.value = response.data.logradouro;
      bairro.value = response.data.bairro;
      cidade.value = response.data.localidade;
      estado.value = response.data.uf;
    })
    .catch(function (error) {
      content.innerHTML = "";
      createLine("Ops, algo deu errado!");
      createLine("Tente novamente");
    });
}

// Update embed map to certain street location
submitBlur.addEventListener("blur", function () {
  searchMap =
    "https://maps.google.com/maps?q=" +
    zipCodeField.value +
    "&t=&z=15&ie=UTF8&iwloc=&output=embed";
  var mapURL = document.querySelector("#gmap_canvas");
  mapURL.setAttribute("src", searchMap);
});

function search(e) {
  e.preventDefault();

  var uf = ufCodeField.value;
  var localidade = localidadeCodeField.value;
  var logradouro = logradouroCodeField.value;

  // Getting API informations about CEP search
  axios
    .get(
      "https://viacep.com.br/ws/" +
        uf +
        "/" +
        localidade +
        "/" +
        logradouro +
        "/json/"
    )
    .then(function (response) {
      if (response.data.erro) {
        throw new error("Informações inválidas");
      }
      p.innerText = response.data[0].cep
    })
    .catch(function (error) {
      p.innerText = "Verifique os dados e tente novamente"
    });
}
