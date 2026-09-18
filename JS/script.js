const btnCriarNota = document.querySelector("#criarNotaBtn");
const inputCriar = document.querySelector("#icriarNota");
const notasCampo = document.querySelector("#campoNotas");

const adicionarNota = () => {
    const configNota = {
        id: generator(),
        conteudo: inputCriar.value,
        pin: false,
    };

    const criadorNotas = criarNotasElementos(configNota.id, configNota.conteudo);

    notasCampo.appendChild(criadorNotas)
}

const generator = () => {
    return Math.floor(Math.random() * 5000);
}

const criarNotasElementos = (id, conteudo, pin) => {
    const divCampConteudo = document.createElement("div");
    divCampConteudo.classList.add("nota");

    const divConteudo = document.createElement("div");
    divConteudo.classList.add("conteudoCampo");

    const areaText = document.createElement("textarea");
    areaText.classList.add("notaText");
    areaText.value = conteudo;
    areaText.placeholder = "Escreva aqui...";
    
    const divPinCampo = document.createElement("div");
    divPinCampo.classList.add("iconPin")

    divCampConteudo.appendChild(divConteudo);

    divConteudo.appendChild(areaText);

    return divCampConteudo;


}


btnCriarNota.addEventListener("click", () => {

    adicionarNota();
});