let height_input = document.getElementById("input_altezza")
let weight_input = document.getElementById("input_peso")

height_input.addEventListener("input", calcoloBMI)
weight_input.addEventListener("input", calcoloBMI)

const min_BMI = 15
const max_BMI = 40

const ampiezza_tachimetro = max_BMI - min_BMI
const rotazione_iniziale = -90

function calcoloBMI() {
    if(isNaN(parseFloat(height_input.value)) || isNaN(parseFloat(weight_input.value))) {
        return
    }

    let BMI = parseFloat(weight_input.value) / Math.pow(parseFloat(height_input.value), 2)

    BMI = Math.max(min_BMI, BMI)
    BMI = Math.min(max_BMI, BMI)

    console.log(BMI)

    document.getElementById("lancetta_tachimetro").style.transform = `translate(-10%, 18%) rotate(${(BMI - min_BMI) / ampiezza_tachimetro * 180 + rotazione_iniziale}deg)`
}