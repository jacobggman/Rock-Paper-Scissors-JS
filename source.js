let playerStats = {
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

window.onload = function() {
    let loadedPlyaerStats = localStorage.getItem("player-stats");
    if (loadedPlyaerStats)
    {
        playerStats = JSON.parse(loadedPlyaerStats);
    }
    updateDisplayStats();
};

function playGame(userChoice) {
    // Validate input
    if (!POSSIBLE_WEAPONS.includes(userChoice)) {
        console.error("Invalid weapon choice");
        return;
    }

    const aiChoice = choose(POSSIBLE_WEAPONS);
    const result = determineGameResult(userChoice, aiChoice);
    updatePlayerStats(result);
    updateDisplayGame(result, aiChoice);
    localStorage.setItem("player-stats", JSON.stringify(playerStats));
}

function determineGameResult(userChoice, aiChoice) {
    if (userChoice === aiChoice) return "draw";
    return WEAPON_WIN_CONDITIONS[userChoice] === aiChoice ? "win" : "lose";
}

function updatePlayerStats(result) {
    switch(result) {
        case "win":
            playerStats.winStreak++;
            playerStats.wins++;
            playerStats.maxWinStreak = Math.max(playerStats.winStreak, playerStats.maxWinStreak);
            break;
        case "lose":
            playerStats.winStreak = 0;
            playerStats.losses++;
            break;
        case "draw":
            playerStats.winStreak = 0;
            playerStats.draws++;
            break;
    }
}

function updateDisplayGame(result, aiChoice) {
    document.getElementById("match-result-text").textContent = `You ${result.toUpperCase()}!`;
    document.getElementById("opponent-text").textContent = `Opponent chose ${aiChoice}`;
    updateDisplayStats()
}

function updateDisplayStats() {
    document.getElementById("streak-text").textContent = 
        `Win streak: ${playerStats.winStreak} | Highest win streak: ${playerStats.maxWinStreak}`;
    document.getElementById("score-text").textContent = 
        `Wins: ${playerStats.wins} | Losses: ${playerStats.losses} | Draws: ${playerStats.draws}`;
}

function choose(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}
