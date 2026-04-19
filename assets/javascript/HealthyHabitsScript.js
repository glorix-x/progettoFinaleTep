const questionario = [
    {
        emoji: "😴",
        domanda: "Quante ore dormi in media per notte?",
        opzioni: ["Meno di 5 ore", "5-6 ore", "6-7 ore", "7-8 ore", "Più di 8 ore"],
        punteggi: [1, 3, 5, 7, 9],
        categoria: "Sonno",
        suggerimento: "Prova ad andare a dormire prima la sera",
        risultato: 0
    },
    {
        emoji: "🏃",
        domanda: "Quante volte fai attività fisica a settimana?",
        opzioni: ["Mai", "1-2 volte", "3-4 volte", "5 o più volte"],
        punteggi: [1, 2, 3, 4],
        categoria: "Attività fisica",
        suggerimento: "Prova a fare attività fisica più spesso",
        risultato: 0
    },
    {
        emoji: "🥕",
        domanda: "Quante porzioni di frutta e verdura consumi al giorno?",
        opzioni: ["Nessuna", "1-2 porzioni", "3-4 porzioni", "5 o più porzioni"],
        punteggi: [1, 2, 3, 4],
        categoria: "Alimentazione",
        suggerimento: "Prova a mangiare più frutta e verdura",
        risultato: 0
    },
    {
        emoji: "🍔",
        domanda: "Quante volte mangi cibo “ultra-processato” (fast food, snack, ecc.) alla settimana?",
        opzioni: ["Mai", "1-2 volte", "3-5 volte", "Quasi ogni giorno"],
        punteggi: [4, 3, 2, 1],
        categoria: "Alimentazione",
        suggerimento: "Prova a mangiare meno cibo spazzatura",
        risultato: 0
    },
    {
        emoji: "💧",
        domanda: "Quanta acqua bevi al giorno?",
        opzioni: ["Meno di 1 litro", "1-1.5 litri", "1.5-2 litri", "Più di 2 litri"],
        punteggi: [1, 3, 5, 7],
        categoria: "Idratazione",
        suggerimento: "Prova a bere più acqua",
        risultato: 0
    },
    {
        emoji: "😖",
        domanda: "Quanto ti senti stressato/a nella vita quotidiana?",
        opzioni: ["Per niente", "Poco", "In modo moderato", "Molto", "Moltissimo"],
        punteggi: [9, 7, 5, 3, 1],
        categoria: "Stress",
        suggerimento: "Prova a prenderti qualche pausa per rilassarti",
        risultato: 0
    },
    {
        emoji: "🚬",
        domanda: "Fumi?",
        opzioni: ["Mai", "Raramente", "1-2 volte a settimana", "Più volte a settimana"],
        punteggi: [4, 3, 2, 1],
        categoria: "Abitudini dannose",
        suggerimento: "Prova a ridurre gradualmente quante volte fumi",
        risultato: 0
    },
    {
        emoji: "🍷",
        domanda: "Consumi alcol?",
        opzioni: ["Mai", "Raramente", "1-2 volte a settimana", "Più volte a settimana"],
        punteggi: [4, 3, 2, 1],
        categoria: "Abitudini dannose",
        suggerimento: "Prova a ridurre gradualmente quante volte bevi",
        risultato: 0
    },
    {
        emoji: "🪑",
        domanda: "Quante ore passi seduto/a al giorno?",
        opzioni: ["Meno di 4 ore", "4-6 ore", "6-8 ore", "Più di 8 ore"],
        punteggi: [4, 3, 2, 1],
        categoria: "Attività fisica",
        suggerimento: "Prova a muoverti di più",
        risultato: 0
    },
    {
        emoji: "📱",
        domanda: "Quante ore al giorno passi su smartphone/PC fuori dal lavoro/studio?",
        opzioni: ["Meno di 1 ora", "1-2 ore", "3-4 ore", "Più di 4 ore"],
        punteggi: [7, 5, 3, 1],
        categoria: "Uso dispositivi",
        suggerimento: "Prova a trovare passatempi diversi dai monitor",
        risultato: 0
    }
]

let punteggio_per_categoria = {}
let punteggio_max_per_categoria = {}

for(let domanda of questionario) {
    punteggio_max_per_categoria[domanda.categoria] = 0
}

for(let domanda of questionario) {
    punteggio_max_per_categoria[domanda.categoria] += Math.max(...domanda.punteggi)
}

let punteggio_max = 0

for(let domanda of questionario) {
    let max = 0
    for(let p of domanda.punteggi) {
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

let next_btn = document.getElementById("next_btn")
next_btn.addEventListener("click", nextQuestion)

let restart_btn = document.createElement("button")

function barAnimation(barra, score, previous_score, punteggio_max, durata, timestamp) {
    if(inizio == null) {
        inizio = timestamp
    }
    
    let tempo_passato = timestamp - inizio
    let progresso = tempo_passato / durata

    let intermediate_score = previous_score + (score - previous_score) * progresso

    barra.style.width = intermediate_score / punteggio_max * 100 + "%"
    barra.style.background = `rgb(${255 - intermediate_score / punteggio_max * 255}, ${intermediate_score / punteggio_max * 255}, 0)`

    if(progresso < 1) {
        requestAnimationFrame((timestamp) => barAnimation(barra, score, previous_score, punteggio_max, durata, timestamp))
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
                punteggio_per_categoria[questionario[current_question - 1].categoria] += parseInt(btn.value)
                questionario[current_question - 1].risultato = parseInt(btn.value)
                break;
            }
        }
    }

    inizio = null
    requestAnimationFrame((timestamp) => barAnimation(document.getElementById("barra_salute"), score, previous_score, punteggio_max, 500, timestamp))

    if(current_question >= questionario.length) {
        resocontoFinale()
    } else {
        choices = []
        document.getElementById("domanda").innerText = questionario[current_question].domanda
        document.getElementById("emoji").innerText = questionario[current_question].emoji
        let n = 0
        let row = document.createElement("div")
        row.classList.add("choice_row")
        let choices_box = document.getElementById("choices_box")

        choices_box.innerHTML = ""

        for(let str of questionario[current_question].opzioni) {
            let div = document.createElement("div")
            div.classList.add("choice")

            div.appendChild(document.createTextNode(str))

            let index = questionario[current_question].opzioni.indexOf(str)

            let btn = {
                button: div,
                value: questionario[current_question].punteggi[index],
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
    document.getElementById("resoconto").innerHTML = ""
    document.getElementById("survey").classList.remove("hidden")
    current_question = 0
    score = 0
    for(let domanda of questionario) {
        punteggio_per_categoria[domanda.categoria] = 0
        domanda.risultato = 0
    }
    nextQuestion()
}

function resocontoFinale() {
    document.getElementById("survey").classList.add("hidden")
    let box_resoconto = document.getElementById("resoconto")
    for(let categoria in punteggio_per_categoria) {
        let div = document.createElement("div")
        div.classList.add("box_risultato")
        div.appendChild(document.createTextNode(categoria + ": "))

        let box_barra = document.createElement("div")
        box_barra.classList.add("box_barra_risultato")
        
        let barra = document.createElement("div")
        barra.classList.add("barra_risultato")
        
        box_barra.appendChild(barra)
        div.appendChild(box_barra)
        box_resoconto.appendChild(div)

        requestAnimationFrame((timestamp) => barAnimation(barra, punteggio_per_categoria[categoria], 0, punteggio_max_per_categoria[categoria], 1000, timestamp))
    }

    let box_suggerimenti = document.createElement("div")
    let text_punteggio = document.createElement("p")
    text_punteggio.id = "text_punteggio"
    text_punteggio.innerHTML = "Punteggio:\n" + `<span id="punteggio">${parseInt(score / punteggio_max * 100)}</span>` + "/100"

    box_suggerimenti.appendChild(text_punteggio)

    let s = ""
    for(let domanda of questionario) {
        if(domanda.risultato < Math.max(...domanda.punteggi) / 2) {
            s += `<li>${domanda.suggerimento}</li>`
        }
    }

    let text_suggerimenti = document.createElement("ul")
    text_suggerimenti.id = "text_suggerimenti"
    if(s != "") {
        text_suggerimenti.innerHTML = s
    } else {
        text_suggerimenti.innerText = "Non c'è niente da migliorare"
    }

    box_suggerimenti.appendChild(text_suggerimenti)

    box_resoconto.appendChild(box_suggerimenti)
    
    restart_btn = document.createElement("button")
    restart_btn.innerText = "Ricomincia"
    restart_btn.classList.add("main_btn")

    restart_btn.addEventListener("click", reset)

    box_resoconto.appendChild(restart_btn)

    let span = document.getElementById("punteggio")

    console.log(score / punteggio_max)
    console.log(punteggio_max / 3)

    if(score < punteggio_max / 3) {
        span.classList.add("basso")
    } else if(score < punteggio_max / 3 * 2) {
        span.classList.add("medio")
    } else {
        span.classList.add("ottimo")
    }
}

reset()