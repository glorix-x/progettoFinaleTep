//prendo gli elementi del html e le metto nelle variabili
//si fa perchè se si mette il .js prima dei contenuti necessari restituisce null
document.addEventListener("DOMContentLoaded", () => {//funzione richiamata quando caricato il DOM
    const panel = document.getElementById("tutorialPanel");
    const overlay = document.getElementById("tutorialOverlay");
    const content = document.getElementById("tutorialContent");
    const title = document.getElementById("tutorialTitle");
    const closeBtn = document.getElementById("closeBtn")

    // funzione che apre il tutorial
    document.querySelectorAll(".tutorial-trigger").forEach(btn => {
        btn.addEventListener("click", () => {

            //restituisce il tipo di btn
            const type = btn.dataset.tutorial;

            if (type === "water") {
                title.textContent = "Home Tutorial";
                content.innerHTML = 
                `<div class="tutorial-card">
                    <img class="card-img2" src="../img/Home.png">
                    <h4>1. Seleziona questa opzione dalla barra navigatrice.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img" src="../img/Home2.png">
                    <h4>2. Scorri usando le freccette ai lati.</h4>
                </div>`;
            }

            if (type === "healthy") {
                title.textContent = "healthy habits Tutorial";
                content.innerHTML = 
                `<div class="tutorial-card">
                    <img class="card-img" src="../img/healthy.png">
                    <h4>1. Seleziona questa opzione dal menu a tendina.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                <img class="card-img" src="../img/healthy2.png">
                <h4>2. Rispondi alle domande in modo sincero.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img" src="../img/healthy3.png">
                    <h4>3. Consulta il risultato e cerca di seguirlo per il tuo bene.</h4>
                </div>`;
            }

            
            if (type === "workout") {
                title.textContent = "Workout Tutorial";
                content.innerHTML = 
                `<div class="tutorial-card">
                    <img class="card-img" src="../img/wokcerchiato.png">
                    <h4>1. Seleziona questa opzione dal menu a tendina.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img2" src="../img/workoutshows.png">
                    <h4>2. Scegli l’opzione più adatta a te.</h4>
                </div>`;
            }
            
            if (type === "bmi") {
                title.textContent = "BMI Tutorial";
                content.innerHTML = 
                `<div class="tutorial-card">
                    <img class="card-img" src="../img/Bmi.png">
                    <h4>1. Seleziona questa opzione dal menu a tendina.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img" src="../img/Bmi2.png">
                    <h4>2. Inserisci l'altezza.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img" src="../img/Bmi3.png">
                    <h4>3. Inserisci il peso.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img2" src="../img/Bmi4.png">
                    <h4>4. Consulta il risultato e leggi le informazioni a riguardo.</h4>
                </div>
            `;

            }   
            if (type === "user") {
                title.textContent = "Utente Tutorial";
                content.innerHTML = 
                `<div class="tutorial-card">
                    <img class="card-img" src="../img/utente.png">
                    <h4>1. Per utenti nuovi che voglio registrarsi abbiamo il Sign In.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img3" src="../img/utente2.png">
                    <h4>2. Pagina dedicata all'inserimento dei dati personali per i nuovi utenti.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img" src="../img/utente3.png">
                    <h4>3.Per utenti già registrati abbiamo il Login.</h4>
                </div>
                <p class="line"></p>
                <div class="tutorial-card">
                    <img class="card-img3" src="../img/utente4.png">
                    <h4>4.  Pagina dedicata al reinserimento dei dati per accedere. </h4>
                </div>`;
            }
            //aggiunge la classe active a panel e overlay rendendolo visibile
            panel.classList.add("active");
            overlay.classList.add("active");
            //nasconde la barra laterale
            document.body.style.overflow = "hidden";
        });
    });

    // CLOSE BUTTON
    closeBtn.addEventListener("click", closeTutorial);


    // ESC KEY
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeTutorial();
    });

    //funzione che rimuove la classe attivo
    function closeTutorial() {
        panel.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});