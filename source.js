let gameState = {
    winStreak: 0,
    maxWinStreak: 0,
    wins: 0,
    losses: 0,
    draws: 0
};

const POSSIBLE_WEAPONS = ["rock", "paper", "scissors"];
const WEAPON_WIN_CONDITIONS = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock"
};

function playGame(userChoice) {
    // Validate input
    if (!POSSIBLE_WEAPONS.includes(userChoice)) {
        console.error("Invalid weapon choice");
        return;
    }

    const aiChoice = choose(POSSIBLE_WEAPONS);
    const result = determineGameResult(userChoice, aiChoice);
    updateGameState(result);
    updateDisplay(result, aiChoice);
}

function determineGameResult(userChoice, aiChoice) {
    if (userChoice === aiChoice) return "draw";
    return WEAPON_WIN_CONDITIONS[userChoice] === aiChoice ? "win" : "lose";
}

function updateGameState(result) {
    switch(result) {
        case "win":
            gameState.winStreak++;
            gameState.wins++;
            gameState.maxWinStreak = Math.max(gameState.winStreak, gameState.maxWinStreak);
            break;
        case "lose":
            gameState.winStreak = 0;
            gameState.losses++;
            break;
        case "draw":
            gameState.winStreak = 0;
            gameState.draws++;
            break;
    }
}

function updateDisplay(result, aiChoice) {
    document.getElementById("match-result-text").textContent = `You ${result.toUpperCase()}!`;
    document.getElementById("opponent-text").textContent = `Opponent chose ${aiChoice}`;
    document.getElementById("streak-text").textContent = 
        `Win streak: ${gameState.winStreak} | Highest win streak: ${gameState.maxWinStreak}`;
    document.getElementById("score-text").textContent = 
        `Wins: ${gameState.wins} | Losses: ${gameState.losses} | Draws: ${gameState.draws}`;
}

function choose(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}
