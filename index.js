let ticTacToe = (function(){
    let game = new Array(9).fill('');    
    let player1 = {
            name: '',
            icon: 'x'
    };
    let player2 = {
        name: '',
        icon: 'o'
    };
    let currentPlayer = player1;
    let instructions = document.querySelector('#instructions');
    let submit = document.querySelector('#submit');
    let flip = document.querySelector('#flip');
    let p1Input = document.querySelector('#player1Input');
    let p2Input = document.querySelector('#player2Input');
    let p1Name = document.querySelector('#p1Name');
    let p2Name = document.querySelector('#p2Name');

    function setPlayers (button){   
        if (button.target.id == 'submit'){
            player1.name = p1Input.value;
            player2.name = p2Input.value;
            p1Input.value = '';
            p2Input.value = '';
            toggleUI()
            instructions.textContent = currentPlayer.name + ', you make the first move.';
            }
        if (button.target.id == 'flip'){
            instructions.textContent = currentPlayer.name + ' flipped the table! Enter player names to start a new round.';
            player1.name = '';
            player2.name = '';
            toggleUI()
            
            }
            currentPlayer = player1;
    }
    function switchPlayers(pointer){
        let square = pointer.target.closest('.square');
        if(square.textContent === ''){
            square.textContent = currentPlayer.icon;
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            instructions.textContent = currentPlayer.name + ', click an empty square.'
            }
        else{
            instructions.textContent = currentPlayer.name + ', that square is taken, pick an empty one.';
        }
    }
    function toggleUI (){
        p1Name.textContent = player1.name;
        p2Name.textContent = player2.name;
        submit.style.display = (submit.style.display === 'none') ? '' : 'none';
        flip.style.display = (flip.style.display === 'none') ? '' : 'none';
        p1Input.style.display = (p1Input.style.display === 'none') ? '' : 'none';
        p2Input.style.display = (p2Input.style.display === 'none') ? '' : 'none';
    }

    function events (){
        document.querySelector('#controlPanel').addEventListener('click', e => setPlayers(e));
        document.querySelector('#gameBoard').addEventListener('click', e => switchPlayers(e));
    }

    events();
})()