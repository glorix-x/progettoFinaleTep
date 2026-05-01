let form = document.getElementById("SignInForm");

let nickname = document.getElementById("nickname");
let mail = document.getElementById("mail");
let password = document.getElementById("password");
let verificaPassword = document.getElementById("verificaPassword");
let dataPartenza = document.getElementById("dataPartenza");

let errNickname = document.getElementById("errNickname");
let errMail = document.getElementById("errMail");
let errPassword = document.getElementById("errPassword");
let errVerifica = document.getElementById("errVerifica");
let errDataPartenza = document.getElementById("errDataPartenza");

let regexNickname = /^.{3,}$/;
let regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let regexData = /^\d{4}-\d{2}-\d{2}$/;

function mostraErrore(input, span, messaggio){
    span.textContent = messaggio;
    input.classList.add("errore");
}

function rimuoviErrore(input, span){
    span.textContent = "";
    input.classList.remove("errore");
}

let link = document.getElementsByClassName("registrati")[0];

link.addEventListener("click", function(e){
    let valido = true;

    if(nickname.value.length < 3){
        mostraErrore(nickname, errNickname, "Minimo 3 caratteri");
        valido = false;
    } else {
        rimuoviErrore(nickname, errNickname);
    }

    if(!mail.value.includes("@")){
        mostraErrore(mail, errMail, "Email non valida");
        valido = false;
    } else {
        rimuoviErrore(mail, errMail);
    }

    if(password.value.length < 8){
        mostraErrore(password, errPassword, "Min 8 caratteri");
        valido = false;
    } else {
        rimuoviErrore(password, errPassword);
    }

    if(verificaPassword.value !== password.value || verificaPassword.value === ""){
        mostraErrore(verificaPassword, errVerifica, "Le password non coincidono");
        valido = false;
    } else {
        rimuoviErrore(verificaPassword, errVerifica);
    }

    if(dataPartenza.value === ""){
        mostraErrore(dataPartenza, errDataPartenza, "Inserisci una data");
        valido = false;
    } else {
        rimuoviErrore(dataPartenza, errDataPartenza);
    }

    if(!valido){
        e.preventDefault();
    }
});