// Game state
let attempts = 0;
const history = [];
let difficulty = 'easy';
let num_length = 4;
let realNumber = generateNumber();

function generateNumber() {
    if (difficulty === 'easy') {
        num_length = 4;
    }
    else if (difficulty === 'medium') {
        num_length = 5;
    }
    else if (difficulty === 'hard') {
        num_length = 6;
    }
    const digits = [];
    while (digits.length < num_length) {
        const digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    // document.getElementById('real-number').textContent = digits.join('');
    document.getElementById('hint').textContent = `Enter ${num_length} unique digits:`;
    document.getElementById('guess-input').maxLength = num_length;
    setTable();
    return digits;
}


function setTable() {
    let text = `
        <th>Attempt</th>
        <th>Guess (${num_length} digits)</th>
        <th style="color: green;">A</th>
        <th style="color: red;">B</th>
    `;
    tableHeader = document.getElementById('table-row');
    tableHeader.innerHTML = text;
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
    document.getElementById('guess_history').innerHTML = ''; // Clear table
    document.getElementById('message').textContent = '';
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-input').disabled = false;
    const button = document.getElementById('button');
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
    if (guess.length !== num_length || new Set(guess).size !== num_length || guess.some(isNaN)) {
        game_message.textContent = `Invalid input! Enter ${num_length} unique digits.`;
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
    var newRow = game_history.insertRow(0);
    newRow.innerHTML = row;

    // Check win condition
    if (a === num_length) {
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

document.getElementById('difficult-level').addEventListener('change', function (e) {
    difficulty = e.target.value;
    resetGame();
});