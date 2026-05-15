
let height_input = document.getElementById("input_altezza")
let weight_input = document.getElementById("input_peso")

height_input.addEventListener("input", calcoloBMI)
weight_input.addEventListener("input", calcoloBMI)

const min_BMI = 15
const max_BMI = 40

const regex = /^[0-9]+(\.[0-9]+)?$/

const ampiezza_tachimetro = max_BMI - min_BMI
const rotazione_iniziale = -90 //Immagine originariamente in verticale

const colori = ["#009FB5", "#00B5A8", "#00B518", "#66B500", "#FFCF01", "#B59000", "#B56922", "#F66013", "#B22C00", "#B20200"]

let BMI_precedente = -1 //BMI non settato
let BMI = 15

function calcoloBMI() {
    if(!regex.test(height_input.value) || !regex.test(weight_input.value)) { //controlla gli input con la regex
        document.getElementById("lancetta_tachimetro").style.transform = `translate(-60%, -47%) rotate(${rotazione_iniziale}deg)` //lancetta messa a -90° all'inizio
        document.getElementById("BMI_value").innerText = "--" //reset
        document.getElementById("BMI_message").innerText = ""
        document.getElementById("BMI_value").style.color = "black"
        BMI = 15
        return
    }

    BMI_precedente = BMI //Salvo il bmi prec

    BMI = parseFloat(weight_input.value) / Math.pow(parseFloat(height_input.value), 2) //Peso/altezza^2

    BMI = Math.max(min_BMI, BMI) // se minore di 15 metto uguale a 15
    BMI = Math.min(max_BMI, BMI) // se maggiore di 40 metto 40 :)
    let messaggio = ""
    
    //Verfico il range per visualizzarlo nel messaggio
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
    document.getElementById("BMI_message").style.color = colori[parseInt((BMI - min_BMI) / 2.5)] //Metto il colore del testo del messaggio in base al risultato
    requestAnimationFrame((timestamp) => animazioneValoreBMI(null, document.getElementById("BMI_value"), 1500, BMI_precedente, BMI, timestamp)) //Passi una funzione che viene eseguita in parallela con tutto il resto
    document.getElementById("lancetta_tachimetro").style.transform = `translate(-60%, -47%) rotate(${(BMI - min_BMI) / ampiezza_tachimetro * 180 + rotazione_iniziale}deg)`

}

function animazioneValoreBMI(inizio, tagNum, durata, valorePrecedente, nuovoValore, timestamp) {   //Funzione che serve per animare la lancetta
    //Alla prima iterazione della funzione salvo il millisecondo in cui inizia l'animazione
    if(inizio == null) {
        inizio = timestamp
    }

    //Calcolo quanto tempo è passato dall'inizio dell'animazione
    let tempo_passato = timestamp - inizio
    //Calcolo quanto è il progresso dell'animazione su 1
    let progresso = tempo_passato / durata

    //Calcolo il valore intermedio di BMI da visualizzare in base al progresso
    let num = valorePrecedente + (nuovoValore - valorePrecedente) * progresso
    num = num.toFixed(1) //Imposto le cifre dopo la virgola a una

    //Imposto il valore nel tag e gli metto il colore corrispondente
    tagNum.innerText = num
    tagNum.style.color = colori[parseInt((num - min_BMI) / 2.5)]

    //Ripeto l'operazione fino a che non ho raggiunto la durata impostata per l'animazione -> progresso = 1
    if(progresso < 1) {
        requestAnimationFrame((timestamp) => animazioneValoreBMI(inizio, tagNum, durata, valorePrecedente, nuovoValore, timestamp))
    }
}

//Scorro tutti gli elementi di "information_box"
for(let el of document.getElementById("information_box").childNodes) {
    //Se non sono DIV continuo
    if(el.nodeName != "DIV") {
        continue
    }
    //Scorro tutti i nodi del div trovato per trovare il P contenente le informazioni
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

    //Mi salvo la sua altezza in base al testo che contiene
    let height = information.scrollHeight
    
    //Imposto che quando il mouse ci va sopra la sua latezza viene impostata
    el.addEventListener("mouseenter", () => {
        information.style.height = height + "px"
        information.style.padding = "20px"
    })

    //Imposto che quando il mouse va via torna come all'inizio
    el.addEventListener("mouseleave", () => {
        information.style.height = "0px"
        information.style.padding = "0 20px 0 20px"
    })

    information.style.height = "0px"
    information.style.padding = "0 20px 0 20px"
}