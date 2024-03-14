const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specials = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
const lettersLowerCase = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const lettersUpperCase = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordLength = document.querySelector('input[type=range]');

const allcheckboxes = document.querySelectorAll('input[type=checkbox]');

const generatePassword = (length) => {
    document.getElementById('charLengthSpan').textContent = passwordLength.value;
    const includeDigits = document.getElementById('includeDigits').checked;
    const specialChar = document.getElementById('specialChar').checked;
    const letterMix = document.getElementById('letterMix').checked;

    generatedPasswordInput.value = '';

    let possiblePasswordChars = [];
    if (includeDigits) {digits.forEach(digit => possiblePasswordChars.push(digit));}
    if (specialChar) {specials.forEach(special => possiblePasswordChars.push(special));}
    if (letterMix) {
        lettersLowerCase.forEach(letter => possiblePasswordChars.push(letter));
        lettersUpperCase.forEach(letter => possiblePasswordChars.push(letter));
    }else{
        lettersLowerCase.forEach(letter => possiblePasswordChars.push(letter));
    }

    for (let i = 0; i <=length; i++) {
        generatedPasswordInput.value += possiblePasswordChars[Math.floor(Math.random() * possiblePasswordChars.length)];
    }
}

generatePassword(passwordLength.value);

passwordLength.addEventListener('change',e => {
    let value = e.target.value;
    generatePassword(value);
});

allcheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        generatePassword(passwordLength.value);
    })
});

const copyPasswordBtn = document.getElementById('copyPassword');
const confirmation = document.getElementById('confirmation');
copyPasswordBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedPasswordInput.value);
    confirmation.classList.add('active');
    setTimeout(() => {
        confirmation.classList.remove('active');
    }, 2000);
}
);
