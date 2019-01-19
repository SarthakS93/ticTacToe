
// utility max method
function max(a, b) {
	return a > b ? a : b;
}

// utility min method
function min(a, b) {
	return a < b ? a : b;
}

let player = 'x', opponent = 'o'; 

// check for any moves left
function isAnyMoveLeft(board) 
{ 
	for (let i = 0; i < 3; i++) 
		for (let j = 0; j < 3; j++) 
			if (board[i][j] === '_') 
				return true; 
	return false; 
} 

// evaluate for winner
function evaluate(b) { 
	// Checking for Rows for X or O victory. 
	for (let row = 0; row < 3; row++) { 
		if (b[row][0] === b[row][1] && b[row][1] ===b[row][2]) { 
			if (b[row][0] === player) 
				return +10; 
			else if (b[row][0] === opponent) 
				return -10; 
		} 
	} 

	// Checking for Columns for X or O victory. 
	for (let col = 0; col < 3; col++) { 
		if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) { 
			if (b[0][col] === player) 
				return +10; 

			else if (b[0][col] === opponent) 
				return -10; 
		} 
	} 

	// Checking for Diagonals for X or O victory. 
	if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) { 
		if (b[0][0] === player) 
			return +10; 
		else if (b[0][0] === opponent) 
			return -10; 
	} 

	if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) { 
		if (b[0][2] === player) 
			return +10; 
		else if (b[0][2] === opponent) 
			return -10; 
	} 

	// Else if none of them have won then return 0 
	return 0; 
} 

// main logic
function minimax(board, depth, isMax) { 
	let score = evaluate(board); 

	// If Maximizer has won the game return his/her 
	// evaluated score 
	if (score === 10 || score === -10) 
		return score; 

	// check if no moves left
	if (!isAnyMoveLeft(board)) 
		return 0; 

	// If this maximizer's move 
	if (isMax) 
	{ 
		let best = -1000; 

		// Traverse all cells 
		for (let i = 0; i < 3; i++) 
		{ 
			for (let j = 0; j < 3; j++) 
			{ 
				// process if value is empty 
				if (board[i][j] === '_') 
				{ 
					// Make the move 
					board[i][j] = player; 

					// make recursive call and get max for maximizer
					best = max(best, minimax(board, depth + 1, !isMax) ); 

					// Undo the move 
					board[i][j] = '_'; 
				} 
			} 
		} 
		return best; 
	} 

	// If this minimizer's move 
	else
	{ 
		let best = 1000; 

		// Traverse all cells 
		for (let i = 0; i < 3; i++) 
		{ 
			for (let j = 0; j < 3; j++) 
			{ 
				// process if value is empty 
				if (board[i][j] === '_') 
				{ 
					// Make the move 
					board[i][j] = opponent; 

					// make recursive call and get min for minimizer
					best = min(best, minimax(board, depth + 1, !isMax)); 

					// Undo the move 
					board[i][j] = '_'; 
				} 
			} 
		} 
		return best; 
	} 
} 

// return the best possible move for the computer 
function findBestMove(board) { 
	let bestVal = -1000; 
	let bestMove = {row: -1, col: -1}; 

	for (let i = 0; i < 3; i++) { 
		for (let j = 0; j < 3; j++) { 
			// process if value is empty 
			if (board[i][j] === '_') { 
				board[i][j] = player; 

				const moveVal = minimax(board, 0, false); 

				board[i][j] = '_'; 

				if (moveVal > bestVal) { 
					bestMove.row = i; 
					bestMove.col = j; 
					bestVal = moveVal; 
				} 
			} 
		} 
	} 

	return bestMove; 
} 

function getCurrentBoardState() {
	let board = [];
	for (let i = 0; i < 3; i++) {
		let row = [];
		for (let j = 0; j < 3; j++) {
			let gridValue = grid[i][j], colValue = '_';
			if (gridValue === 1) {
				colValue = 'x';
			}
			else if (gridValue === 2) {
				colValue = 'o';
			}

			row.push(colValue);
		}
		board.push(row);
	}
	return board;
}

function checkForWinner() {
	let board = getCurrentBoardState();
	// console.log(board);
	let eval = evaluate(board);
	if (eval === 10) {
		alert("Computer has won");
		setIsGameOver("AI");
		return true;
	}
	else if (eval === -10) {
		alert("User has won");
		setIsGameOver("User");
		return true;
	}
	return false;
}

function processNextMove() {
	// console.log("Inside main function");
	console.log(grid);
	let board = getCurrentBoardState();
	// console.log(board);
	if (checkForWinner()) {
		return {row: -1, col: -1};
	}
	const bestMove = findBestMove(board); 

	return bestMove; 
} 
