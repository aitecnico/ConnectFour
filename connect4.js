/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


//  **** WIDTH is 7 WIDE SQUARES ****
// **** HIEGHT is 6 DEEP SQUARES ****

const WIDTH = 7;
const HEIGHT = 6;

// **** Const creates resetBoard and documents rest ****

const resetBoard = document.getElementById('reset');









// **** The CURRENT PLAYER is equal to 1 or 2 ****
// **** BOARD is equal to an ARRAY of rows ****


let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let player = document.getElementById('player');











// **** This Function LOOPS something ****
// **** y is equal to 0 ****
// **** y is runs if greater then HEIGHT (this condition checks if loop should continue running ****
// **** y++ is adding 1 to LOOP ****

// Come back to...


/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }
}











// **** Function name is makeHtmlBoard ****
// **** Const creates a board variable and selects id="board" ****  


// /** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    const board = document.getElementById('board');



    // **** Const creates a top variable with a (tr) element ****
    // **** Sets id and column-top as attribute ****
    // **** Creates a CLICK event then HANDLECLICK function to run ****


    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClick);



    // **** LOOPING ****
    // **** x is equal to 0 ****
    // **** x runs if less then WIDTH (this condition checks if loop should continue running **** 
    // **** x++ is adding 1 to LOOP ****

    // **** Making a headcell variable ****
    // **** Creates a td element ****
    // **** Sets id and x attribute ****
    // **** top adds headcell on the page ****

    // **** board is put on top variable ****


    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
    }

    board.append(top);



    // **** LOOPING ****
    // **** y is equal to 0 ****
    // **** y runs if less then HIEGHT (this condition checks if loop should continue running **** 
    // **** y++ is adding 1 to LOOP ****
    // **** Const creates a row variable with a (tr) element ****

    // **** LOOP ****
    // **** x is equal to 0 ****
    // **** x runs if less then WIDTH (this condition checks if loop should continue running **** 
    // **** x++ is adding 1 to LOOP ****
    // **** Const creates cell variable with (td) element ****
    // **** Sets id and ${y}-${x} attribute ****
    // **** row adds cell on the page ****

    // **** board is put on row variable ****



    // make main part of board
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement('tr');

        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
        }

        board.append(row);
    }
}














// **** When you click on top row it drops chip into column ****
// **** Function name is findSpotForCol with (x) variable ****
// **** LOOPS ****
// **** y is equal to HEIGHT - 1 ****
// **** y runs if it is greater then or equal to 0 (this condition checks if loop should continue running ****
// **** y-- subtracts 1 to LOOP ****

// /** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}





// **** Function name is placeInTable with y, x variable ****
// **** Const creates a piece variable with id=div element ****
// **** id="div" piece adds a piece variable classlist ****
// **** id="div" piece adds a p${currPlayer} variable ****
// **** id="div" piece adds style to top equal -50 * (y + 2) ****

// **** Const creates spot variable with ${y}-${x} ****
// **** spot is put in piece variable ****


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}
















// **** Function name is endGame with msg variable ****
// **** Alerts box message on page when Game is over ****


/** endGame: announce game end */

function endGame(msg) {
    alert(msg);
}





// **** Function creates handleClick with evt variable ****

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {




    // **** Const creates x is equal +evt.target.id; ****

    // get x from ID of clicked cell
    const x = +evt.target.id;
    currPlayer;

    // **** If Player is 1 then Displays Players 2's turn ****
    // **** If not Player 1 then Displays Player 1's turn ****

    if (currPlayer === 1) {
        player.textContent = `Player ${2}'s turn`;
        player.style.color = 'rgb(65, 62, 55)';
        // player.style.color = 'rgb(242, 213, 97)';
    } else {
        player.textContent = `Player ${1}'s turn`;
        player.style.color = 'rgb(65, 62, 55)';
    }


    // **** Const create y is equal to findSpotForCol with x variable ****
    // **** if none y ignore click ****

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }



    // **** board places [y][x] equal to current player ****
    // **** Places in table (y, x) ****

    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);





    // **** Checks for win *****
    // **** Displays endGame function with Player ${currPlayer} won!


    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }




    // **** Check for tie ****
    // **** If on the board.every ****
    // **** row is equal or greater to every row ****
    // **** cell equal or greater to cell ****
    // **** Display Tie! ****


    // check for tie
    if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
    }



    // **** Swithes currPlayer is equal to currPlayer === 1 ? 2: 1 ****

    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
}














// **** Function creates checkWin to check cell by cell ****


// /** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {







        // **** returns every cell when  ****
        // **** ([y,x]) are equal or greater then ****
        // **** y greater or equal 0 double apersand sign ****
        // **** y is less then HIEGHT double ampersand ****
        // **** x greater or equal to 0 double ampersand ****
        // **** x is less then WIDTH double ampersand ****
        // **** board[y][x] === currPlayer **** 

        // **** LOOPS ****
        // **** y is equal to 0 ****
        // **** y runs if less then HEIGHT (this condition checks if loop should continue running ****
        // **** x++ is adding 1 to LOOP ****


        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {








            // **** Const creates horizontal is equal to ****
            // **** [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]] ****
            // **** Const creates vertical is equal to ****
            // **** [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]] ****
            // **** Const creates diagnol right is equal to ****
            // **** [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]] ****
            // **** Const creates diagnol left is equal to ****
            // **** [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]] ****


            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];







            // **** If winner horizontal value || winner with vertical value || winner with diagnol right value || winner with diagnol left value ****
            // **** Displays true ****

            // **** Display makeboard ****
            // **** Display makeHTMLBoard ****


            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();


// ****restBoard addEventListener creates a click function to reload board ****

resetBoard.addEventListener('click', function reset() {
    window.location.reload();
})

