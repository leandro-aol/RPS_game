const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');

const scoreBoard = { player: 0, computer: 0 };

// Play game
function play(event) {
    restart.style.display = 'inline-block';

    const playerChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    showWinner(winner, computerChoice);
}

// Get computer's choice
function getComputerChoice() {
    const rand = Math.random();

    if (rand < 0.34) {
        return 'rock';
    } else if (rand < 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Get game winner
function getWinner(player, computer) {
    if (player === computer ) {
        return 'draw';
    } else if (player === 'rock') {
        if (computer === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (player === 'paper') {
        if (computer === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (player === 'scissors') {
        if (computer === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

// Show winner
function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        // Increment player score
        scoreBoard.player++;

        // Show modal result
        result.innerHTML = `
            <h1 class="text-win">You Win</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else if (winner === 'computer') {
        // Increment player score
        scoreBoard.computer++;

        // Show modal result
        result.innerHTML = `
            <h1 class="text-lose">You Lose</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    } else {
        // Show modal result
        result.innerHTML = `
            <h1>It's a Draw</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
        `;
    }

    // Show score
    score.innerHTML = `
        <p>Player: ${ scoreBoard.player }</p>
        <p>Computer: ${ scoreBoard.computer }</p>
    `;

    modal.style.display = 'block';
}

// Restart game
function restartGame() {
    scoreBoard.player = 0;
    scoreBoard.computer = 0;
    score.innerHTML = `
        <p>Player: 0</p>
        <p>Computer: 0</p>
    `;

    restart.style.display = 'none';
}

// Clear modal
function clearModal(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);