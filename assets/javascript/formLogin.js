let form = document.getElementById("logInForm")

let nickname = document.getElementById("nickname");
let password = document.getElementById("password");

let errNickname = document.getElementById("errNickname");
let errPassword = document.getElementById("errPassword");


let regexNickname = /^.{3,}$/;
let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


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

    if(password.value.length < 8){
        mostraErrore(password, errPassword, "Min 8 caratteri");
        valido = false;
    } else {
        rimuoviErrore(password, errPassword);
    }

    if(!valido){
        e.preventDefault();
    }
});

