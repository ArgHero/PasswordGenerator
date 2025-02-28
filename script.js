//https://colorhunt.co/palette/212125239d60a3de83f7f39a

const rangeInput = document.querySelector('.custom-range');
rangeInput.addEventListener('input', () => {
    const value = rangeInput.value;
    const percentage = (value / 20) * 100; 
    rangeInput.style.background = `linear-gradient(to right, #239D60 0%, #239D60 ${percentage}%, #222 ${percentage}%, #222 100%)`;
    document.getElementById("num-caracteres").textContent=value;
});

function generatePassword(){
    const length = rangeInput.value;
    const includeUppercase = document.getElementById("doUpper").checked;
    const includeLowercase = document.getElementById("doLower").checked;
    const includeNumbers = document.getElementById("doNumber").checked;
    const includeSymbols = document.getElementById("doSymbol").checked;

    const LOWERCASE = "abcdefghijklmnñopqrstuvwxyz";
    const UPERCASE = LOWERCASE.toUpperCase();
    const NUMBERS = "1234567890";
    const SYMBOL = '!"#$%&()*+,-./:;<=>?@[]^_`{|}~';

    let allowedChars = "";
    let password = "";

    if (includeUppercase) allowedChars += UPERCASE;
    if (includeLowercase) allowedChars += LOWERCASE;
    if (includeNumbers) allowedChars += NUMBERS;
    if (includeSymbols) allowedChars += SYMBOL;

    if (allowedChars === "") 
        return "Selecciona por lo menos un tipo de caracter";
    else{
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars[randomIndex];
        }
        return password;
    }
}

function updateStrength() {
    const length = rangeInput.value;
    const includeUppercase = document.getElementById("doUpper").checked;
    const includeLowercase = document.getElementById("doLower").checked;
    const includeNumbers = document.getElementById("doNumber").checked;
    const includeSymbols = document.getElementById("doSymbol").checked;

    let strength = 0;
    if (includeUppercase) strength++;
    if (includeLowercase) strength++;
    if (includeNumbers) strength++;
    if (includeSymbols) strength++;

    if (length >= 10) strength++;

    const ratingText = document.querySelector('.rating p');
    const progressBar = document.querySelector('.rating progress');

    if (strength <= 1) {
        ratingText.textContent = "LOW";
        progressBar.value = 1;
    } else if (strength == 2) {
        ratingText.textContent = "MEDIUM";
        progressBar.value = 2;
    } else if (strength == 3) {
        ratingText.textContent = "HIGH";
        progressBar.value = 3;
    } else if (strength >= 4) {
        ratingText.textContent = "MAX";
        progressBar.value = 4;
    }
}

function copiarTexto() {
    const textToCopy = document.getElementById("generated-pass").textContent;
    navigator.clipboard.writeText(textToCopy).then(function(){
        alert("Se copió la contraseña al portapapeles");
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}

function updatePassword() {
    document.getElementById("generated-pass").textContent = generatePassword();
};
document.getElementById("doUpper").addEventListener('change', updateStrength);
document.getElementById("doLower").addEventListener('change', updateStrength);
document.getElementById("doNumber").addEventListener('change', updateStrength);
document.getElementById("doSymbol").addEventListener('change', updateStrength);
rangeInput.addEventListener('input', updateStrength);





