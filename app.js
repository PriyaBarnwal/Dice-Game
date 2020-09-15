/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, current, inAction

function _init(){
    scores = [0,0]
    activePlayer = 0
    current = 0
    inAction = true

    document.getElementById('score-0').textContent = 0  
    document.getElementById('score-1').textContent = 0  
    document.getElementById('current-0').textContent = 0  
    document.getElementById('current-1').textContent = 0    

    document.querySelector(".dice").style.display = 'none'
    document.querySelector(".winner-loser-title").style.display = 'none'
}

_init()

function _generateRandomScore() {
    return Math.round(Math.random()*5)+1
}

function _rollDice() {
    if (inAction) {
        var score = _generateRandomScore(),
        diceDOM = document.querySelector(".dice")

        diceDOM.style.display = 'block'
        diceDOM.src = "dice-"+score+".png"

        if(score === 1) {
            current = 0        
            document.querySelector("#current-"+activePlayer).textContent = current

            activePlayer = (activePlayer+1) % 2
            diceDOM.style.display = 'none'
            document.querySelector(".player-0-panel").classList.toggle("active")
            document.querySelector(".player-1-panel").classList.toggle("active")
        }
        else {
            current+=score
            document.querySelector("#current-"+activePlayer).textContent = current
        }
    }
}

function _hold() {
    if (inAction) {
        scores[activePlayer] +=current

        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer]

        if(scores[activePlayer] >= 50) {
            inAction = false
            document.querySelector(".winner-loser-title").textContent = 'PLAYER '+(activePlayer+1)+ ' WINS!!'
            document.querySelector(".winner-loser-title").style.display = 'block'
            document.querySelector(".dice").style.display = 'none'
        }
        else {
            current = 0        
            document.querySelector("#current-"+activePlayer).textContent = current

            activePlayer = (activePlayer+1) % 2
            document.querySelector(".dice").style.display = 'none'
            document.querySelector(".player-0-panel").classList.toggle("active")
            document.querySelector(".player-1-panel").classList.toggle("active")
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click', _rollDice)
document.querySelector('.btn-hold').addEventListener('click', _hold)
document.querySelector('.btn-new').addEventListener('click', _init)