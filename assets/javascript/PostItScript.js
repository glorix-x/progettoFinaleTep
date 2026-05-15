const tips = [
  "Bevi un bicchiere d'acqua appena sveglio. 💧",
  "Fai 10 minuti di stretching ogni mattina. 🧘",
  "La postura! Raddrizza la schiena proprio ora. ✨",
  "Mangia una mela o una manciata di noci. 🍎",
  "Fai una pausa dagli schermi ogni 20 minuti. 👀"
];

let index = 0;

const testoConsiglio = document.getElementById('testoConsiglio');
const btnPrec = document.getElementById('btnPrec');
const btnSucc = document.getElementById('btnSucc');

const updateTesto = () => {
  testoConsiglio.style.opacity = 0;
  
  setTimeout(() => { // è una funzione che serve a ritardare ciò che c'è nella funzione, precisamente di 150 millisecondi, che quindi viene eseguito dopo 150 ms
    testoConsiglio.innerText = tips[index];
    testoConsiglio.style.opacity = 1;
  }, 150);
};

btnSucc.addEventListener('click', () => {
  index = (index + 1) % tips.length; //calcola il consiglio successivo e ritorna al primo se sono finiti
  updateTesto();
});

btnPrec.addEventListener('click', () => {
  index = (index - 1 + tips.length) % tips.length; // calcola il consiglio precedente e ritorna all'ultimo se sono finiti
  updateTesto();
});

document.addEventListener('DOMContentLoaded', updateTesto); //per fare in modo che il post-it non sia mai vuoto, al load della pagina carico il primo commento