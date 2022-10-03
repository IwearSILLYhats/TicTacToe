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

    function boardUpdate (pointer, optional){
        let board = [...document.querySelectorAll('.square')];
        if(pointer === 'win'){
            game.fill('');
            console.log(optional);
            Array.from(String(optional), Number).forEach(item =>{
                board[item].style.color = 'green';
            })
        }
        else if(pointer === 'reset'){
            board.forEach(item => item.style.color = '');
            board.forEach(item => item.textContent = '');

        }
        else{
            let square = pointer.target.closest('.square');
            let selected = board.findIndex((element) => element === square);
            if(player1.name !== '' && player2.name !== ''){
                if (game[selected] === ''){
                    game[selected] = currentPlayer.icon;
                    game.forEach((element, index) => board[index].textContent = element);
                    checkWin(selected);
        
                }
                else{
                    instructions.textContent = currentPlayer.name + ', that square is taken, pick an empty one.';
                }
            }
            else{
                instructions.textContent = "You're getting ahead of yourself, enter both names before you start playing.";
            }
        }
    }

    function checkWin(selected){
        let winCons = [102, 345, 678, 306, 147, 258, 408, 246].filter(index => Array.from(String(index), Number).includes(selected));
        
        winCons = winCons.find(finder => {
           let winCon = Array.from(String(finder), Number);
           return (game[winCon[0]] === game[winCon[1]] && game[winCon[0]] === game[winCon[2]] && game[winCon[0]] !== "");
        });
        if(winCons){
            console.log(winCons);
            setPlayers('win', winCons);
        }
        else{switchPlayers()}


    }

    function setPlayers (button, optional){   
        if(button == 'win'){ 
            instructions.textContent = 'WOW, ' + currentPlayer.name + ' you win! Submit new names to start a new round.';
            player1.name = '';
            player2.name = '';
            currentPlayer = '';
            toggleUI();
            boardUpdate('win', optional);
        }
        else{
            if (button.target.id == 'submit'){
                if(p1Input.value !== '' && p2Input !== ''){
                    p1Input.classList.remove('error');
                    p2Input.classList.remove('error');
                    player1.name = p1Input.value;
                    player2.name = p2Input.value;
                    p1Input.value = '';
                    p2Input.value = '';
                    toggleUI()
                    boardUpdate('reset');
                    currentPlayer = player1;
                    instructions.textContent = currentPlayer.name + ', you make the first move.';
                }
                else{
                    p1Input.classList.add('error');
                    p2Input.classList.add('error');
                    instructions.textContent = "You'll need both names to proceed."
                }
    
                }
            if (button.target.id == 'flip'){
                    instructions.textContent = currentPlayer.name + ' flipped the table! Enter player names to start a new round.';
                    player1.name = '';
                    player2.name = '';
                    currentPlayer = '';
                    toggleUI()
                }
        }

    }
    function switchPlayers(){
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            instructions.textContent = currentPlayer.name + ', click an empty square.'
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
        document.querySelector('#gameBoard').addEventListener('click', e => boardUpdate(e));
    }
    events();
    return {game};
})()