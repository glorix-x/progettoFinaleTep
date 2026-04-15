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

let current_question = 0
const opzioni_per_riga = 3
let radioBtns = []
let score = 0

function nextQuestion() {
    if(current_question >= domande.length) {
        resocontoFinale()
        return
    }
    if(radioBtns != []) {
        for(let btn of radioBtns) {
            if(btn.checked) {
                score += parseInt(btn.value)
                break;
            }
        }
    }
    radioBtns = []
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

        let radioButton = document.createElement("input")
        radioButton.classList.add("radio_choice")
        radioButton.type = "radio"
        radioButton.name = "choice"
        radioButton.value = opzioni[current_question].indexOf(str)

        radioBtns.push(radioButton)
        
        div.appendChild(radioButton)
        
        row.appendChild(div)
        n++
        if(n % 3 == 0) {
            choices_box.appendChild(row)
            row = document.createElement("div")
            row.classList.add("choice_row")
        }
    }
    choices_box.appendChild(row)
    radioBtns[0].checked = true
    current_question++
}

function resocontoFinale() {
    document.getElementById("resoconto").innerText = "Il punteggio finale è di " + score
}

document.getElementById("next_btn").addEventListener("click", nextQuestion)

nextQuestion()