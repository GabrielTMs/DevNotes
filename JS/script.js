const btnCriarNota = document.querySelector("#criarNotaBtn");
const inputCriar = document.querySelector("#icriarNota");
const notasCampo = document.querySelector("#campoNotas");

// esse recarregandoNotaVIsual serve para recarregar as notas com pin:true

const recarregandoNotaVIsual = () => {

    limpandoNotPinned();

    carregandoNotas().forEach((notas) => {
        const carregador = criarNotasElementos(notas.id, notas.conteudo, notas.pin);

        notasCampo.appendChild(carregador);
    })
}

const limpandoNotPinned = () => {
    notasCampo.replaceChildren([]);
}

const adicionarNota = () => {

    //esse const itens é criado depois quando for fazer o storage

    const itens = carregandoNotas();

    const configNota = {
        id: generator(),
        conteudo: inputCriar.value,
        pin: false,
    };

    const criadorNotas = criarNotasElementos(configNota.id, configNota.conteudo, configNota.pin);

    notasCampo.appendChild(criadorNotas)

    itens.push(configNota);

    salvandoNotaStorage(itens);

    inputCriar.value = "";
    
    inputCriar.focus();
}

// generator serve para carregar o id de um elemento criado randomicamente

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
    divPinCampo.classList.add("pinCampo")

    const pinIcons = document.createElement("i");
    pinIcons.classList.add(...["fa-solid", "fa-thumbtack", "iconPin"]);

    const pinSlashedIcons = document.createElement("i");
    pinSlashedIcons.classList.add(...["fa-solid", "fa-thumbtack-slash", "iconPin", "esconder"]);

    const btnExcluir = document.createElement("i");
    btnExcluir.classList.add(...["fa-solid", "fa-xmark", "iconesNotes"]);

    const btnCopiar = document.createElement("i");
    btnCopiar.classList.add(...["fa-solid", "fa-copy", "iconesNotes"]);

    divCampConteudo.appendChild(divConteudo);

    divConteudo.appendChild(areaText);
    
    divConteudo.appendChild(btnExcluir);
    
    divConteudo.appendChild(btnCopiar);

    divCampConteudo.appendChild(divPinCampo);

    divPinCampo.appendChild(pinIcons);
    
    divPinCampo.appendChild(pinSlashedIcons);

    // Evento para o icone pinIcons

    /* No tutorial seria divCampConteudo.querySelector(".fa-thumbtack").addEventListener("click", () => {
        
        pinFunction(id);
    });
    
    Porém aqui, como eu criei uma div e coloquei o icone de fixar/pin dentro dessa div, ao colocar um evento nessa div, como só tem um elemento ao clicar neste elemento acaba funcionando por ser simples.

    No entanto se quiser é melhor fazer como no exemplo de cima, ou usar o exemplo do projeto tarefa de afazeres com o closest

    */

    if(pin) {
        divCampConteudo.classList.add("Pinned");
        pinIcons.classList.add("esconder");
        pinSlashedIcons.classList.remove("esconder");

    }

    divPinCampo.addEventListener("click", () => {
        
        pinFunction(id);
    });

    divConteudo.addEventListener("click", (e) => {


        if (e.target.closest(".fa-xmark")) {
            excluindoNotaFunction(id, divCampConteudo);
        }
        
        if (e.target.closest(".fa-copy")) {
            duplicandoNota(id);
        }
    });

    return divCampConteudo;

}

function excluindoNotaFunction(id, divCampConteudo) {
    const pegandoParaExcluir = carregandoNotas().filter((nota) => nota.id !== id );

    salvandoNotaStorage(pegandoParaExcluir);

    notasCampo.removeChild(divCampConteudo);

}

function duplicandoNota(id) {
    const itens = carregandoNotas();

    const filtrandoNotas = itens.filter((nota) => nota.id === id)[0];

    const gerandoCopiaNota = {
        id: generator(),
        conteudo: filtrandoNotas.conteudo,
        pin: false,
    };

    const criandoCopia = criarNotasElementos(gerandoCopiaNota.id, gerandoCopiaNota.conteudo, gerandoCopiaNota.pin);

    notasCampo.appendChild(criandoCopia)

    itens.push(gerandoCopiaNota);

    salvandoNotaStorage(itens);
    
}

const pinFunction = (id) => {
    const pegandoElementSalvos = carregandoNotas();
    
    const pegandoElement = pegandoElementSalvos.filter((nota) => nota.id === id)[0];

    pegandoElement.pin = !pegandoElement.pin;

    salvandoNotaStorage(pegandoElementSalvos);

    console.log(pegandoElementSalvos);

    recarregandoNotaVIsual();
};

const carregandoNotas = () => {
    const jsonNotasCarrega = JSON.parse(localStorage.getItem("notasCriadas") || "[]");

    // O "[]" com o || significa que ele vai ou me retornar uma array com algum item ou ele vai me retornar uma array vazia

    const ordemPinnedNota = jsonNotasCarrega.sort((a, b) => (a.pin > b.pin ? -1 : 1));

    return ordemPinnedNota;

    // nesse return antes de ter as funções de reorganizar por pin, pode utilizar a primeira váriavel jsonNotasCarrega.
}

const salvandoNotaStorage = (notaStorage) => {
    localStorage.setItem("notasCriadas", JSON.stringify(notaStorage));
}


btnCriarNota.addEventListener("click", () => {

    adicionarNota();
});

recarregandoNotaVIsual();