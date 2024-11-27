let winStreak = 0;
let maxWinStreak = 0;

const POSSIBLE_WEAPONS = ["rock", "paper", "scissors"]
const WEAPON_WIN_WHAT = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock",
}

function onButtonClick(id) {
    const [userWeaponChoice, _] = id.split("-button")
    const aiWeapon = choose(POSSIBLE_WEAPONS);
    let matchResult = "";
    if (userWeaponChoice == aiWeapon)
    {
        matchResult = "Draw"
        winStreak = 0;
    }
    else
    {
        if (WEAPON_WIN_WHAT[userWeaponChoice] == aiWeapon)
        {
            matchResult = "Win"
            winStreak++
            maxWinStreak = Math.max(winStreak, maxWinStreak)
        }
        else
        {
            matchResult = "Lose"
            winStreak = 0;
        }
    }
    updateText(matchResult, aiWeapon, winStreak, maxWinStreak)
}

function updateText(matchResult, opponentWeapon, winStreak, highestWinStreak) {
    document.getElementById("match-result-text").innerHTML = `You ${matchResult}`
    document.getElementById("opponent-text").innerHTML = `Opponent choose ${opponentWeapon}`;
    document.getElementById("streak-text").innerHTML = `Win streak ${winStreak}. Highest win streak: ${highestWinStreak}`;
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
  