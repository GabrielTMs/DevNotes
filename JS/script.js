const btnCriarNota = document.querySelector("#criarNotaBtn");
const inputCriar = document.querySelector("#icriarNota");
const notasCampo = document.querySelector("#campoNotas");

const recarregandoNota = () => {
    carregandoNotas().forEach((notas) => {
        const carregador = criarNotasElementos(notas.id, notas.conteudo, notas.pin);

        notasCampo.appendChild(carregador);
    })
}

const adicionarNota = () => {

    const itens = carregandoNotas();

    const configNota = {
        id: generator(),
        conteudo: inputCriar.value,
        pin: false,
    };

    const criadorNotas = criarNotasElementos(configNota.id, configNota.conteudo);

    notasCampo.appendChild(criadorNotas)

    itens.push(configNota);

    salvandoNotaStorage(itens);

    inputCriar.value = "";
    
    inputCriar.focus();
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

const carregandoNotas = (notaStorage) => {
    const jsonNotasCarrega = JSON.parse(localStorage.getItem("notasCriadas") || "[]");

    // O "[]" com o || significa que ele vai ou me retornar uma array com algum item ou ele vai me retornar uma array vazia

    return jsonNotasCarrega;
}

const salvandoNotaStorage = (notaStorage) => {
    localStorage.setItem("notasCriadas", JSON.stringify(notaStorage));
}


btnCriarNota.addEventListener("click", () => {

    adicionarNota();
});

recarregandoNota();