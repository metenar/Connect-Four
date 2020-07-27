/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y=0;y<HEIGHT;y++){
    board[y]=[];
    for (let x=0;x<WIDTH;x++){
      board[y][x]=null;
    }
  }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard=document.getElementById("board");
  // TODO: add comment for this code
  // This part create HTML table row for Table top and add Event listener for clicks.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // This part create HTML board using tr and td and set their attributes using y and x

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y=HEIGHT-1;y>=0;y--){
    if(!board[y][x]>0){
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const fillTd=document.getElementById(`${y}-${x}`);
  const fullDiv=document.createElement('div');
  fullDiv.classList.add('piece', `player${currPlayer}`);
  fillTd.append(fullDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(()=>{
    alert(msg);
  },1200);
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x]=currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    setTimeout(function(){
    },1000);
    return endGame(`Congrats!! Player ${currPlayer} won!`);
  }
const btn=document.getElementById('button');
btn.addEventListener('click', function(){
  location.reload();
})  
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  
  if (checkForTie()) {
    return endGame('Sorry Nobody Wins This Time!');
  }



  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer=currPlayer===1 ? 2 : 1;

}
// This function checks all the board element is full or not. if full call end game 
function checkForTie(){
  const allRow=[];
for (let y = 0; y < HEIGHT; y++) {
  let rows=board[y].every(function(x){
    return x>0 ;      
  });
  allRow.push(rows);
}  
const checked=allRow.every(function(x){
  return x===true;
});
return checked;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
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

  // TODO: read and understand this code. Add comments to help you.
  // consts are for the winning situations. horizantal,vertical, right diagonal
  //and left diagonal. if any one is true than curPlayer wins the game and call End Game
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
