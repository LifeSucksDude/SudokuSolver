var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};
function isvalid(board, i, j, num,n){
    //row check and column check.
    for(let x=0; x<n; x++){
        if(board[i][x]==num || board[x][j]==num){
            return false;
        }     
    }
    //submatrix check.
    let rn=Math.sqrt(n);
    let si=i-i%rn;
    let sj=j-j%rn;
    for(let x=si; x<si+rn; x++){
        for(let y=sj; y<sj+rn; y++){
            if(board[x][y]==num){  
                return false;
            }
        }
    }
    return true;
}
function SudokuSolver(board, i, j, n){
    //writing the base case.
    if(i==n){
       FillBoard(board)
        return true;
        
    }
    //if we are not inside the board.
    if(j==n){
       return SudokuSolver(board,i+1,0,n);
    }
    //if cell is already filled 
    //move ahead.
    if(board[i][j]!=0){
        return  SudokuSolver(board,i,j+1,n);
    }
	//we will try to fill the cell with an appropriate number.
    for(let num=1; num<=n; num++){
        //check if the num can be filled.
        if(isvalid(board,i,j,num,n)){
              //enter the element value then
              board[i][j]=num;
              //call the function recursively for next cell
              let subAns=SudokuSolver(board,i,j+1,n);
              if(subAns){
                return true; //if can be filled.

              }
              
                //backtracking 
                //undo the changes.
                board[i][j]=0;
              
        }      
    }
	
     return false;
}
