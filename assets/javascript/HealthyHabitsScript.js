const imgs = [
    "😴",
    "🏃",
    "🥕",
    "🍔",
    "💧",
    "😖",
    "🚬",
    "🪑",
    "📱",
]

const opzioni = [
    ["Meno di 5 ore", "5 - 6 ore", "6 - 7 ore", "7 - 8 ore", "Più di 8 ore"],
    ["Mai", "1 - 2 volte", "3 - 4 volte", "5 o più volte"],
    ["Nessuna", "1 - 2 porzioni", "3 - 4 porzioni", "5 o più porzioni"],
    ["Mai", "1 - 2 volte", "3 - 5 volte", "Quasi ogni giorno"],
    ["Meno di un litro", "1 - 1.5 litri", "1.5 - 2 litri", "Più di 2 litri"],
    ["Per niente", "Poco", "Moderatamente", "Molto", "Estremamente"],
    ["Mai", "Occasionalmente", "1 - 2 volte a settimana", "Più volte a settimana"],
    ["Meno di 4 ore", "4 - 6 ore", "6 - 8 ore", "Più di 8 ore"],
    ["Meno di 1 ora", "1 - 2 ore", "3 - 4 ore", "Più di 4 ore"],
]

const punteggi = [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [3, 2, 1, 0],
    [0, 1, 2, 3],
    [4, 3, 2, 1, 0],
    [3, 2, 1, 0],
    [3, 2, 1, 0],
    [3, 2, 1, 0],
]

const domande = [
    "Quante ore dormi in media per notte?",
    "Quante volte fai attività fisica a settimana?",
    "Quante porzioni di frutta e verdura consumi al giorno?",
    "Quante volte mangi cibo “ultra-processato” (fast food, snack, ecc.) alla settimana?",
    "Quanta acqua bevi al giorno?",
    "Quanto ti senti stressato/a nella vita quotidiana?",
    "Fumi o consumi alcol?",
    "Quante ore passi seduto/a al giorno?",
    "Quante ore al giorno passi su smartphone/PC fuori dal lavoro/studio?",
]

let punteggio_max = 0

for(let op of punteggi) {
    let max = 0
    for(let p of op) {
        if(p > max) {
            max = p
        }
    }
    punteggio_max += max
}

let current_question = 0
const opzioni_per_riga = 3
let choices = []
let score = 0
let previous_score = 0

let inizio = null
let durata = 500

let next_btn = document.getElementById("next_btn")

function barAnimation(timestamp) {
    if(inizio == null) {
        inizio = timestamp
    }
    
    let tempo_passato = timestamp - inizio
    let progresso = tempo_passato / durata

    document.getElementById("barra_salute").style.width = (previous_score + (score - previous_score) * progresso) / punteggio_max * 100 + "%"
    document.getElementById("barra_salute").style.background = `rgb(${255 - (previous_score + (score - previous_score) * progresso) / punteggio_max * 255}, ${(previous_score + (score - previous_score) * progresso) / punteggio_max * 255}, 0)`

    if(progresso < 1) {
        requestAnimationFrame(barAnimation)
    }
}

function choose(btn_to_check) {
    for(let btn of choices) {
        if(btn.checked) {
            btn.checked = false
            btn.button.classList.remove("chosen")
        }
    }
    btn_to_check.checked = true
    btn_to_check.button.classList.add("chosen")
}

function nextQuestion() {
    previous_score = score

    if(current_question != 0) {
        for(let btn of choices) {
            if(btn.checked) {
                score += parseInt(btn.value)
                break;
            }
        }
    }

    inizio = null
    requestAnimationFrame(barAnimation)
    
    if(current_question >= domande.length) {
        resocontoFinale()
    } else {
        choices = []
        document.getElementById("domanda").innerText = domande[current_question]
        document.getElementById("emoji").innerText = imgs[current_question]
        let n = 0
        let row = document.createElement("div")
        row.classList.add("choice_row")
        let choices_box = document.getElementById("choices_box")

        choices_box.innerHTML = ""

        for(let str of opzioni[current_question]) {
            let div = document.createElement("div")
            div.classList.add("choice")

            div.appendChild(document.createTextNode(str))

            let index = opzioni[current_question].indexOf(str)

            let btn = {
                button: div,
                value: punteggi[current_question][index],
                checked: false,
            }

            div.addEventListener("click", () => choose(btn))

            choices.push(btn)
            
            row.appendChild(div)
            n++
            if(n % 3 == 0) {
                choices_box.appendChild(row)
                row = document.createElement("div")
                row.classList.add("choice_row")
            }
        }
        choices_box.appendChild(row)
        choose(choices[0])
        current_question++
    }
}

function reset() {
    document.getElementById("resoconto").innerText = ""
    current_question = 0
    score = 0
    next_btn.innerText = "Prossimo"
    next_btn.removeEventListener("click", reset)
    next_btn.addEventListener("click", nextQuestion)
    nextQuestion()
}

function resocontoFinale() {
    document.getElementById("resoconto").innerText = "Il punteggio finale è di " + score
    next_btn.addEventListener("click", reset)
    next_btn.innerText = "Ricomincia"
}

next_btn.addEventListener("click", reset)

reset()