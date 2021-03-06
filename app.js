/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


let scores = [ 0, 0];
let roundScore = 0;
let activePlayer = 0;
let gamePlaying = true;
let diceDOM = document.querySelector('.dice');
init();

document.querySelector('.btn-roll').addEventListener('click',function(){

if(gamePlaying){
    //To get a random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //Display the result
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;
    
    //Update the score if rolled number is not a 1
    if(dice!== 1)
    {
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }
    else{
        nextPlayer();
    }
}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
if(gamePlaying){
    //Add current score to global score
    scores[activePlayer] += roundScore;
       

    //Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    //Check if player won the game
    if(scores[activePlayer]>=100)
    {
    document.querySelector(`#name-${activePlayer}`).textContent='WINNER!';
    document.querySelector('.dice').style.display='none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    gamePlaying=false;
    }
    else{
    nextPlayer();
    }
}
    
});

const nextPlayer = ()=>{
    activePlayer === 0? activePlayer=1 : activePlayer=0; 
        roundScore=0;
        document.getElementById('current-0').textContent=0;
        document.getElementById('current-1').textContent=0;

        document.querySelector('.player-0-panel').classList.toggle('active'); 
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display='none';
}

function init(){
scores=[0,0];
roundScore=0;
activePlayer=0;
diceDOM.style.display = 'none';
document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';
document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';
document.querySelector('.player-0-panel').classList.remove('active')
document.querySelector('.player-1-panel').classList.remove('active')
document.querySelector('.player-0-panel').classList.remove('winner')
document.querySelector('.player-1-panel').classList.remove('winner')
document.querySelector('.player-0-panel').classList.add('active')
}


document.querySelector('.btn-new').addEventListener('click',function(){
init();
});

let modal =document.querySelector('#simple-modal');
let modalBtn = document.querySelector('.btn-rules');

modalBtn.addEventListener('click',openModal);

function openModal(){
 modal.style.display='block';   
}

window.addEventListener('click',outside);

function outside(e){
    if(e.target === modal)
{
    modal.style.display='none';
}
}
