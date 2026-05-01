const isLoginPage = document.getElementById("loginForm") !== null;
const isSignInPage = document.getElementById("LoginForm") !== null;


let form = document.getElementById(isLoginPage ? "loginForm" : "LoginForm");
let nickname = document.getElementById("nickname");
let password = document.getElementById("password");


let mail = document.getElementById("mail");
let verificaPassword = document.getElementById("verificaPassword");
let dataNascita = document.getElementById("dataPartenza"); // ID dal tuo HTML


let errNickname = document.getElementById("errNickname");
let errPassword = document.getElementById("errPassword");
let errMail = document.getElementById("errMail");
let errVerifica = document.getElementById("errVerifica");
let errDataNascita = document.getElementById("errDataPartenza");


// REGEX
let regexNickname = /^.{3,}$/;
let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regexData = /^\d{4}-\d{2}-\d{2}$/;

//errore
function mostraErrore(input, span, messaggio) {
    if (span) {
        span.textContent = messaggio;
        span.style.color = "#dc2626";
        span.style.fontSize = "0.85rem";
        span.style.display = "block";
        span.style.marginTop = "4px";
    }
    if (input) input.classList.add("errore");
}

function rimuoviErrore(input, span) {
    if (span) span.textContent = "";
    if (input) input.classList.remove("errore");
}

//login
if (nickname) {
    nickname.addEventListener("blur", function() {
        if (!regexNickname.test(nickname.value)) 
            mostraErrore(nickname, errNickname, "Minimo 3 caratteri");
        else 
            rimuoviErrore(nickname, errNickname);
    });
}

if (password) {
    password.addEventListener("blur", function() {
        if (!regexPassword.test(password.value)) 
            mostraErrore(password, errPassword, "Min 8 caratteri con lettere e numeri");
        else 
            rimuoviErrore(password, errPassword);
    });
}

//sign in
if (isSignInPage) {
    
    if (mail) {
        mail.addEventListener("blur", function() {
            if (!regexMail.test(mail.value)) 
                mostraErrore(mail, errMail, "Inserisci una mail valida");
            else 
                rimuoviErrore(mail, errMail);
        });
    }

    if (verificaPassword) {
        verificaPassword.addEventListener("blur", function() {
            if (verificaPassword.value !== password.value || verificaPassword.value === "") 
                mostraErrore(verificaPassword, errVerifica, "Le password non coincidono");
            else 
                rimuoviErrore(verificaPassword, errVerifica);
        });
    }

    if (dataNascita) {
        dataNascita.addEventListener("blur", function() {
            if (!regexData.test(dataNascita.value)) {
                mostraErrore(dataNascita, errDataNascita, "Formato corretto: AAAA-MM-GG");
                return;
            }
            //data futura
            let dataInserita = new Date(dataNascita.value);
            let oggi = new Date();
            
            if (dataInserita > oggi) {
                mostraErrore(dataNascita, errDataNascita, "La data non può essere futura");
                return;
            }
            //min 13 anni
            let eta = oggi.getFullYear() - dataInserita.getFullYear();
            let meseDiff = oggi.getMonth() - dataInserita.getMonth();
            if (meseDiff < 0 || (meseDiff === 0 && oggi.getDate() < dataInserita.getDate())) {
                eta--;
            }
            
            if (eta < 13) {
                mostraErrore(dataNascita, errDataNascita, "Devi avere almeno 13 anni");
                return;
            }
            
            rimuoviErrore(dataNascita, errDataNascita);
        });
    }
}

//controllo validità
document.querySelectorAll(".registrati").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();  
        
        let valido = true;
        
        if (!regexNickname.test(nickname.value)) {
            mostraErrore(nickname, errNickname, "Minimo 3 caratteri");
            valido = false;
        }
        
        if (!regexPassword.test(password.value)) {
            mostraErrore(password, errPassword, "Min 8 caratteri con lettere e numeri");
            valido = false;
        }
        
        if (isSignInPage) {
            if (!regexMail.test(mail.value)) {
                mostraErrore(mail, errMail, "Inserisci una mail valida");
                valido = false;
            }
            
            if (verificaPassword.value !== password.value || verificaPassword.value === "") {
                mostraErrore(verificaPassword, errVerifica, "Le password non coincidono");
                valido = false;
            }
            
            if (!regexData.test(dataNascita.value)) {
                mostraErrore(dataNascita, errDataNascita, "Formato corretto: AAAA-MM-GG");
                valido = false;
            } else {
                let dataInserita = new Date(dataNascita.value);
                let oggi = new Date();
                if (dataInserita > oggi) {
                    mostraErrore(dataNascita, errDataNascita, "La data non può essere futura");
                    valido = false;
                }
            }
        }
        
        if (valido) {
            window.location.href = this.href;
        }
    });
});

//ellimina il mesg. di errore una volta ricliccato
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focus", function() {
        let span = document.getElementById("err" + this.id.charAt(0).toUpperCase() + this.id.slice(1));
        if (this.id === "dataPartenza") span = document.getElementById("errDataPartenza");
        rimuoviErrore(this, span);
    });
});