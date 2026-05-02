let height_input = document.getElementById("input_altezza")
let weight_input = document.getElementById("input_peso")

height_input.addEventListener("input", calcoloBMI)
weight_input.addEventListener("input", calcoloBMI)

const min_BMI = 15
const max_BMI = 40

const regex = /^[0-9]+(\.[0-9]+)?$/

const ampiezza_tachimetro = max_BMI - min_BMI
const rotazione_iniziale = -90

const colori = ["#009FB5", "#00B5A8", "#00B518", "#66B500", "#FFCF01", "#B59000", "#B56922", "#F66013", "#B22C00", "#B20200"]

let BMI_precedente = -1
let BMI = 15

function calcoloBMI() {
    if(!regex.test(height_input.value) || !regex.test(weight_input.value)) {
        document.getElementById("lancetta_tachimetro").style.transform = `translate(-60%, -47%) rotate(${rotazione_iniziale}deg)`
        document.getElementById("BMI_value").innerText = "--"
        document.getElementById("BMI_message").innerText = ""
        document.getElementById("BMI_value").style.color = "black"
        BMI = 15
        return
    }

    BMI_precedente = BMI

    BMI = parseFloat(weight_input.value) / Math.pow(parseFloat(height_input.value), 2)

    BMI = Math.max(min_BMI, BMI)
    BMI = Math.min(max_BMI, BMI)
    let messaggio = ""
    
    if (BMI < 18.5) {
        messaggio = "Sottopeso"
    } else if (BMI < 25) {
        messaggio = "Peso normale"
    } else if (BMI < 30) {
        messaggio = "Sovrappeso"
    } else if (BMI > 30){
        messaggio = "Obesità"
    }
    document.getElementById("BMI_message").innerText = messaggio
    document.getElementById("BMI_message").style.color = colori[parseInt((BMI - min_BMI) / 2.5)]
    requestAnimationFrame((timestamp) => animazioneValoreBMI(null, document.getElementById("BMI_value"), 1500, BMI_precedente, BMI, timestamp))
    document.getElementById("lancetta_tachimetro").style.transform = `translate(-60%, -47%) rotate(${(BMI - min_BMI) / ampiezza_tachimetro * 180 + rotazione_iniziale}deg)`

}

function animazioneValoreBMI(inizio, tagNum, durata, valorePrecedente, nuovoValore, timestamp) {
    if(inizio == null) {
        inizio = timestamp
    }

    let tempo_passato = timestamp - inizio
    let progresso = tempo_passato / durata

    let num = valorePrecedente + (nuovoValore - valorePrecedente) * progresso
    num = num.toFixed(1)

    tagNum.innerText = num
    tagNum.style.color = colori[parseInt((num - min_BMI) / 2.5)]

    if(progresso < 1) {
        requestAnimationFrame((timestamp) => animazioneValoreBMI(inizio, tagNum, durata, valorePrecedente, nuovoValore, timestamp))
    }
}

for(let el of document.getElementById("information_box").childNodes) {
    if(el.nodeName != "DIV") {
        continue
    }
    let information = null
    for(let p of el.childNodes) {
        if(p.nodeName != "P") {
            continue
        }
        if(p.classList.contains("information")) {
            information = p
            break
        }
    }

    let height = information.scrollHeight
    
    el.addEventListener("mouseenter", () => {
        information.style.height = height + "px"
        information.style.padding = "20px"
    })

    el.addEventListener("mouseleave", () => {
        information.style.height = "0px"
        information.style.padding = "0 20px 0 20px"
    })

    information.style.height = "0px"
    information.style.padding = "0 20px 0 20px"
}