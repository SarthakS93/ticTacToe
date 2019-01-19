/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

// import { alertDialog } from "./ticTacToeLogic";

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let isGameOver = false, winner = "", numberOfMovesPlayed = 0;

// this function will initialize a grid of 3x3 with 0 values
function initializeGrid() {
    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        const tempArray = [];
        for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

// get the row content for column id that's given
function getRowBoxes(rowIdx) {
    let rowDiv = '';
    
    for(let colIdx = 0; colIdx < GRID_LENGTH ; colIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = rowIdx + colIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[rowIdx][colIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDiv = rowDiv + '<div rowIdx="'+ rowIdx +'" colIdx="' + colIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDiv;
}

// get the whole grid html
function getGridContent() {
    let gridContent = '';
    for(let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let rowDiv = getRowBoxes(rowIdx);
        rowDiv = '<div class="rowStyle">' + rowDiv + '</div>';
        gridContent += rowDiv;
    }
    return gridContent;
}

// render the grid
function renderMainGrid() {
    const parent = document.getElementById("grid");
    const gridContent = getGridContent();
    parent.innerHTML = '<div class="columnsStyle">' + gridContent + '</div>';
}

// when user clicks on box
function onBoxClick() {
    // console.log("Inside onBoxClick");
    let rowIdx = this.getAttribute("rowIdx");
    let colIdx = this.getAttribute("colIdx");

    // console.log("row: " + rowIdx + " - col: " + colIdx);
    if (grid[rowIdx][colIdx] === 0 && !isGameOver) {
        // console.log("processing user's move");
        let newValue = 2;
        grid[rowIdx][colIdx] = newValue;
        numberOfMovesPlayed++;

        if (numberOfMovesPlayed === 9 && winner === "") {
            alert("Game Tied");
            setIsGameOver("Tie");
        }

        if (!checkForWinner()) {
            // AI move
            getComputersMove();
            numberOfMovesPlayed++;
            checkForWinner();
        }

        renderMainGrid();
        addClickHandlers();
        
    }
    else if (isGameOver){
        alert(winner === "Tie" ? "Game Tied" : winner + " has already won");
    }
}

function getComputersMove() {
    let bestMove = processNextMove();
    if (bestMove.row !== -1 && bestMove.col !== -1) {
        // console.log("Making AI move");
        grid[bestMove.row][bestMove.col] = 1;
    }
}

function setIsGameOver(winnerName) {
    isGameOver = true;
    winner = winnerName;
}

// add click handler to each box
function addClickHandlers() {
    let boxes = document.getElementsByClassName("box");
    for (let idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
