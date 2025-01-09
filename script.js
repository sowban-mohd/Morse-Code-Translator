// Morse code dictionary
const MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...',
    'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-',
    'L': '.-..', 'M': '--', 'N': '-.',
    'O': '---', 'P': '.--.', 'Q': '--.-',
    'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--',
    'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.',
    '0': '-----', ',': '--..--', '.': '.-.-.-',
    '?': '..--..', '/': '-..-.', '-': '-....-',
    '(': '-.--.', ')': '-.--.-'
};

// Function to convert text based on selected conversion type
function convert() {
    const conversionType = document.getElementById('conversionType').value;
    const inputText = document.getElementById('inputText').value.trim();
    let outputText = '';

    if (conversionType === 'textToMorse') {
        outputText = encrypt(inputText);
    } else if (conversionType === 'morseToText') {
        outputText = decrypt(inputText);
    }

    document.getElementById('outputText').value = outputText;
}

// Function to encrypt text to morse code
function encrypt(message) {
    return message.toUpperCase().split('').map(char => {
        if (char === ' ') {
            return ' ';
        }
        return MORSE_CODE_DICT[char] || '';
    }).join(' ');
}

// Function to decrypt morse code to text
function decrypt(message) {
    return message.split('   ').map(word =>
        word.split(' ').map(char =>
            Object.keys(MORSE_CODE_DICT).find(key => MORSE_CODE_DICT[key] === char)
        ).join('')
    ).join(' ');
}

// Function to update text areas based on selected conversion type
function updatePlaceholders() {
    const conversionType = document.getElementById('conversionType').value;
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    if (conversionType === 'textToMorse') {
        inputText.placeholder = 'Type the text message...';
        outputText.placeholder = 'Result...';
    } else if (conversionType === 'morseToText') {
        inputText.placeholder = 'Type the morse code...';
        outputText.placeholder = 'Result...';
    }

    inputText.value = '';
    outputText.value = '';
}

// Function to copy output text to clipboard
function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    outputText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(outputText.value).then(() => {
        alert('Copied to clipboard!');
    }, () => {
        alert('Failed to copy to clipboard.');
    });
}

function handleInput(event) {
    if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
        convert();
    }
}

document.getElementById('inputText').addEventListener('input', handleInput);

// Toggle dark mode
function changeTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
}

// Exit site
function exitSite() {
    window.close();
}

// Toggle hamburger menu
document.getElementById('hamburgerMenu').addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('open');
});
