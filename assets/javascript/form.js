// ===============================
// SELEZIONE ELEMENTI DOM
// ===============================
let form = document.getElementById("viaggiForm");
let risultato = document.getElementById("risultato");

let nickname = document.getElementById("nickname");
let password = document.getElementById("password");
let verificaPassword = document.getElementById("verificaPassword");
let dataPartenza = document.getElementById("dataPartenza");
let dataRitorno = document.getElementById("dataRitorno");
let destinazione = document.getElementById("destinazione");
let tipologia = document.getElementById("tipologia");
let numeroPartecipanti = document.getElementById("numeroPartecipanti");

let errNickname = document.getElementById("errNickname");
let errPassword = document.getElementById("errPassword");
let errVerifica = document.getElementById("errVerifica");
let errDataPartenza = document.getElementById("errDataPartenza");
let errDataRitorno = document.getElementById("errDataRitorno");
let errDestinazione = document.getElementById("errDestinazione");
let errTipologia = document.getElementById("errTipologia");
let errNumeroPartecipanti = document.getElementById("errNumeroPartecipanti");

// ===============================
// REGEX
// ===============================
let regexNickname = /^.{3,}$/;
let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let regexData = /^\d{4}-\d{2}-\d{2}$/;
let regexDestinazione = /^.{3,}$/;
let regexPartecipanti = /^[1-9]\d*$/;

// ===============================
// FUNZIONI ERRORE
// ===============================
function mostraErrore(input, span, messaggio){
    span.textContent = messaggio;
    input.classList.add("errore");
}

function rimuoviErrore(input, span){
    span.textContent = "";
    input.classList.remove("errore");
}

// ===============================
// VALIDAZIONE BLUR
// ===============================
nickname.addEventListener("blur", function(){
    if(!regexNickname.test(nickname.value)) mostraErrore(nickname, errNickname, "Minimo 3 caratteri");
    else rimuoviErrore(nickname, errNickname);
});

password.addEventListener("blur", function(){
    if(!regexPassword.test(password.value)) mostraErrore(password, errPassword, "Min 8 caratteri con lettere e numeri");
    else rimuoviErrore(password, errPassword);
});

verificaPassword.addEventListener("blur", function(){
    if(verificaPassword.value !== password.value || verificaPassword.value === "") mostraErrore(verificaPassword, errVerifica, "Le password non coincidono");
    else rimuoviErrore(verificaPassword, errVerifica);
});

dataPartenza.addEventListener("blur", function(){
    if(!regexData.test(dataPartenza.value)) mostraErrore(dataPartenza, errDataPartenza, "Formato corretto: AAAA-MM-GG");
    else rimuoviErrore(dataPartenza, errDataPartenza);
});

dataRitorno.addEventListener("blur", function(){
    if(!regexData.test(dataRitorno.value)){
        mostraErrore(dataRitorno, errDataRitorno, "Formato corretto: AAAA-MM-GG");
        return;
    }

    let partenza = new Date(dataPartenza.value);
    let ritorno = new Date(dataRitorno.value);

    if(ritorno <= partenza) {
        mostraErrore(dataRitorno, errDataRitorno, "La data di ritorno deve essere successiva");
        return;
    }

    let durata = (ritorno - partenza)/(1000*60*60*24);
    if(durata > 30) mostraErrore(dataRitorno, errDataRitorno, "Il viaggio non può superare 30 giorni");
    else rimuoviErrore(dataRitorno, errDataRitorno);
});

destinazione.addEventListener("blur", function(){
    if(!regexDestinazione.test(destinazione.value)) mostraErrore(destinazione, errDestinazione, "Minimo 3 caratteri");
    else rimuoviErrore(destinazione, errDestinazione);
});

tipologia.addEventListener("blur", function(){
    if(tipologia.value === "") mostraErrore(tipologia, errTipologia, "Seleziona una tipologia valida");
    else rimuoviErrore(tipologia, errTipologia);
});

numeroPartecipanti.addEventListener("blur", function(){
    if(!regexPartecipanti.test(numeroPartecipanti.value)) mostraErrore(numeroPartecipanti, errNumeroPartecipanti, "Inserisci un numero intero positivo");
    else rimuoviErrore(numeroPartecipanti, errNumeroPartecipanti);
});

// ===============================
// SUBMIT
// ===============================
form.addEventListener("submit", function(e){
    e.preventDefault();
    risultato.innerHTML = "";

    // controlla errori visivi
    if(document.querySelectorAll(".errore").length > 0) return;

    // controlla password
    if(verificaPassword.value !== password.value || verificaPassword.value === ""){
        mostraErrore(verificaPassword, errVerifica, "Le password non coincidono");
        return;
    }

    // date
    let partenza = new Date(dataPartenza.value);
    let ritorno = new Date(dataRitorno.value);
    if(ritorno <= partenza){
        mostraErrore(dataRitorno, errDataRitorno, "La data di ritorno deve essere successiva");
        return;
    }
    let durata = (ritorno - partenza)/(1000*60*60*24);
    if(durata > 30){
        mostraErrore(dataRitorno, errDataRitorno, "Il viaggio non può superare 30 giorni");
        return;
    }

    // ===============================
    // RIEPILOGO
    // ===============================
    let titolo = document.createElement("h2");
    titolo.textContent = "Riepilogo del viaggio:";
    risultato.appendChild(titolo);

    let campi = [
        {label: "Nickname", value: nickname.value},
        {label: "Data di partenza", value: dataPartenza.value},
        {label: "Data di ritorno", value: dataRitorno.value},
        {label: "Destinazione", value: destinazione.value},
        {label: "Tipologia di viaggio", value: tipologia.value},
        {label: "Numero di partecipanti", value: numeroPartecipanti.value},
        {label: "Durata del viaggio", value: durata + " giorni"}
    ];

    for(let i=0; i<campi.length; i++){
        let p = document.createElement("p");
        p.textContent = campi[i].label + ": " + campi[i].value;
        risultato.appendChild(p);
    }

    let messaggio = document.createElement("p");
    messaggio.textContent = "Un'organizzazione efficace è la chiave per un viaggio perfetto!";
    risultato.appendChild(messaggio);
});

// ===============================
// RESET
// ===============================
form.addEventListener("reset", function(){
    risultato.innerHTML = "";
    let spanErrori = document.querySelectorAll("span");
    spanErrori.forEach(function(s){ s.textContent = ""; });
    let inputs = document.querySelectorAll("input, select");
    inputs.forEach(function(inp){ inp.classList.remove("errore"); });
});