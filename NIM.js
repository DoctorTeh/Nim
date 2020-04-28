//****************************************************// 
// The below code implements the "prompt" function,
// which prompts the user for input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question) => {
    let readlinePromise = new Promise((resolve) => {
        readline.question(`${question}\n`, answer => {
            resolve(answer)
            readline.pause();
        });
    })
    return readlinePromise;
}
//****************************************************//



let nim = async () => {
    let mode = await prompt(`Enter 1 for multiplayer and 2 to play against a computer`);
    let pebbles = 16;
    let turn = 1;
    let gameOver = false;
    let activePlayer = player1Name;

    function displayPebbles() {
        console.log('*'.repeat(pebbles));
    }

    let inputMove = async () => {
        return await prompt(`${activePlayer} Choose how many pebbles to remove, 1-3`);
    }

    function checkInputType(input) {     
        if  (input <= 3 && input >= 1 && Number.isInteger(input)) { {
            return true;
          }
        } else return false;
    }

    function checkInputRemaining(input) {
        return input <= pebbles;
    }

    function checkVictory() {
        if (pebbles === 0) {
            return true;
        }
        else return false;
    }

    function computerMove() {
        if (pebbles <= 3) {
            return pebbles
        }
        else return currentInput
    }

    if (mode === 1) {
        let player1Name = await prompt('Player 1, enter your name');
        let player2Name = await prompt('Player 2, enter your name');
        console.log(`Welcome, ${player1Name} and ${player2Name}, to the game of NIM!`);
        while (gameOver === false) {
            let properInput = false;
            while (properInput === false) {
                displayPebbles();
                let currentInput = await inputMove();
                currentInput = Number(currentInput);
                if (checkInputType(currentInput) === true) {
                    if (checkInputRemaining(currentInput) === true) {
                        pebbles -= currentInput;
                        properInput = true;
                    }
                    else console.log(`Your input is greater than the number of pebbles left! Try again`);
                }
                else console.log(`Your input is not 1-3`);
            }
            if (checkVictory() === true) {
                displayPebbles()
                console.log(`${activePlayer} is the winner!`);
                gameOver = true;
            }
            if (turn === 1) {
                turn = 2;
                activePlayer = player2Name;
            }
            else if (turn === 2) {
                turn = 1;
                activePlayer= player1Name;
            }
        }
    }

    if (mode === 2) {
        let player1Name = await prompt('Player 1, enter your name');
        console.log(`${player1Name} prepare to meet your match!`);
        while (gameOver === false) {
            if (turn === 1) {
                let properInput = false;
                while (properInput === false) {
                    displayPebbles();
                    let currentInput = await inputMove();
                    currentInput = Number(currentInput);
                    if (checkInputType(currentInput) === true) {
                        if (checkInputRemaining(currentInput) === true) {
                            pebbles -= currentInput;
                            properInput = true;
                        }
                        else console.log(`Your input is greater than the number of pebbles left! Try again`);
                    }
                    else console.log(`Your input is not 1-3`);
                }
            }
            else if (turn === 2 ) {
                console.log(`Hm.......`);
                console.log(`I'll choose ${computerMove()}`);
                pebbles -= computerMove();
            }
            if (checkVictory() === true) {
                displayPebbles()
                if (turn === 2) {
                    console.log(`The computer wins again!`)
                }
                else if (turn === 1) {
                    console.log(`${player1Name} is the winner! How did that happen?!`);
                }
                gameOver = true;
            }
            if (turn === 1) {
                turn = 2;
            }
            else if (turn === 2) {
                turn = 1;
        }
    }
    }
}
    // Finish implementing the game of Nim!
    // The game starts with 16 pebbles on the board
    // Two players take turns removing pebbles from the board
    // A player can only take 1, 2, or 3 pebbles on their turn
    // The player who takes the last pebble wins!
    // 
    // FYI: You can convert strings to numbers like this: Number(insertSomeStringHere)
    // BONUS: There's a way for player 2 to always win - can you code an "AI" that beats player 1 every time?


  

nim()

