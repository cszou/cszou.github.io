// Game state
let realNumber = generateNumber();
let attempts = 0;
const history = [];

function generateNumber() {
    const digits = [];
    while (digits.length < 4) {
        const digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits;
}

function checkNumber(guess, real) {
    let a = 0, b = 0;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === real[i]) {
            a++;
        } else if (real.includes(guess[i])) {
            b++;
        }
    }
    return { a, b };
}

function resetGame() {
    realNumber = generateNumber();
    attempts = 0;
    history.length = 0; // Clear history
    document.getElementById('history').innerHTML = ''; // Clear table
    document.getElementById('message').textContent = '';
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-input').disabled = false;
    const button = document.querySelector('button[type="submit"]');
    button.textContent = 'Submit';
}

document.getElementById('game-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const input = document.getElementById('guess-input');
    const button = document.getElementById('button');
    const game_message = document.getElementById('message');
    const game_history = document.getElementById('guess_history');

    if (button.textContent === 'Restart') {
        resetGame();
        return;
    }            
    
    const guess = input.value.split('').map(Number);

    // Validate input
    if (guess.length !== 4 || new Set(guess).size !== 4 || guess.some(isNaN)) {
        game_message.textContent = `Invalid input! Enter 4 unique digits.`;
        input.value = '';
        return;
    }

    // Check guess
    attempts++;
    const { a, b } = checkNumber(guess, realNumber);

    // Update history
    history.push({ attempt: attempts, guess: input.value, a, b });
    const row = `<tr>
        <td>${attempts}</td>
        <td>${input.value}</td>
        <td>${a}</td>
        <td>${b}</td>
    </tr>`;
    game_history.innerHTML += row;

    // Check win condition
    if (a === 4) {
        game_message.innerHTML = `You win! You guessed it in ${attempts} attempts.`;
        input.disabled = true;
        button.textContent = 'Restart';
        return;
    } else {
        game_message.innerHTML = `${a}<span style="color: green;">A</span>${b}<span style="color: red;">B</span>. Keep trying!`;
    }

    input.value = '';
    input.focus();
});