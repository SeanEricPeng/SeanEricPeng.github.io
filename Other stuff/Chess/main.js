var standard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var chessBoard = document.getElementById("chessBoard");
class piece{
	constructor(color){
		this.color = color;
		this.moves = 0;
	}
	checkSquare(row, column, scenario){
		return scenario[row][column];
	}
	checkInRange(){
		for(let i=0; i<arguments.length; i++){
			if((arguments[i] < 0) || (arguments[i] > 7)){
				return false;
			}
		}
		return true;
	}
	fix(coords, color, scenario){
		let betterCoords = [];
		for(let i=0; i<coords.length; i++){
			if(this.checkInRange(...coords[i]) && ((this.checkSquare(...coords[i], scenario) == null) || (this.checkSquare(...coords[i], scenario).color != color))){
				betterCoords.push([...coords[i]]);
			}
		}
		return(betterCoords);
	}
	validate(origcoord, coords, color, scenario){
		let valid = [];
		let temp = this.copyArray(scenario);
		for(let i=0; i<coords.length; i++){
			temp = this.copyArray(scenario);
			temp[coords[i][0]][coords[i][1]] = temp[origcoord[0]][origcoord[1]];
			temp[origcoord[0]][origcoord[1]] = null;
			if(temp[coords[i][0]][coords[i][1]].key[0] == "p"){
				if(origcoord[1] != coords[i][1]){
					if(this.checkSquare(coords[i][0], coords[i][1], scenario) == null){
						temp[origcoord[0]][coords[i][1]] = null;
					}
				}
			}
			if(!this.inCheck(color, temp)){
				valid.push(coords[i]);
			}
		}
		return valid;
	}
	includes(coords, bad){
		let betterCoords = [];
		for(let i=0; i<bad.length; i++){
			if(JSON.stringify(bad[i]) == JSON.stringify(coords)){
				return true;
			}
		}
		return false;
	}
	copyArray(old){
		let temp = [];
		for(let i=0; i<old.length; i++){
			temp.push([]);
			for(let j=0; j<old[i].length; j++){
				if(old[i][j] == null){
					temp[i][j] = null;
				}
				else{
					temp[i][j] = Object.assign(Object.create(Object.getPrototypeOf(old[i][j])), JSON.parse(JSON.stringify(old[i][j])));
				}
			}
		}
		return temp;
	}
	inCheck(colour, scenario=bob.boardArray){
		if(this.includes(bob.locateKing(colour, scenario), bob.getAllLocations(opposite(colour), scenario))){
			return true;
		}
		return false;
	}
}
class board{
	constructor(hasCastled, position=standard){
		this.hasCastled = hasCastled;
		this.position = position;
		this.boardArray = [];
	}
	reset(){
		this.position = standard;
		return(this.fenToGame());
	}
	isGameOver(color){
		for(let i=0; i<8; i++){
			for(let j=0; j<8; j++){
				if((this.boardArray[i][j] != null) && (this.boardArray[i][j].color == color)){
					if(this.boardArray[i][j].getMoves(i, j, false, this.boardArray).length != 0){
						return;
					}
				}
			}
		}
		alert("Game over! "+((color=="b") ? "You won!" : "You lost!"));
	}
	getAllBlackMoves(){
		let list = [];
		for(let i=0; i<8; i++){
			for(let j=0; j<8; j++){
				if((this.boardArray[i][j] != null) && (this.boardArray[i][j].color == "b")){
					if(this.boardArray[i][j].getMoves(i, j, false, this.boardArray).length != 0){
						list.push([[i, j], ...this.boardArray[i][j].getMoves(i, j, false, this.boardArray)]);
					}
				}
			}
		}
		return(list);
	}
	locateKing(colour, scenario=this.boardArray){
		for(let i=0; i<8; i++){
			for(let j=0; j<8; j++){
				if((scenario[i][j] != null) && (scenario[i][j].key == ("k"+colour))){
					return [i, j];
				}
			}
		}
	}
	fenToGame(){
		let row = 0;
		let column = 0;
		this.boardArray = [[]];
		for(let i=0; i<this.position.length; i++){
			if(standard[i]=="/"){
				this.boardArray.push([]);
				row++;
				column = 0;
			}
			else if(!isNaN(standard[i])){
				for(let j=0; j<Number(standard[i]); j++){
					this.boardArray[row][column+j] = null;
				}
				column += Number(standard[i]);
			}
			else{
				this.boardArray[row][column] = Object.assign(Object.create(Object.getPrototypeOf(key[standard[i]])), JSON.parse(JSON.stringify(key[standard[i]])));
				column++;
			}
		}
		return(this.boardArray);
	}
	move(from, to){
		let f = this.boardArray[from[0]][from[1]];
		let t = this.boardArray[to[0]][to[1]];
		if(f != null){
			if(f.getMoves(...from, false, bob.boardArray).some((v) => JSON.stringify(v) == JSON.stringify(to))){
				if(!(t!=null && (t.color==f.color))){
					if(f.key[0] == "p"){
						if(from[1] != to[1]){
							if(t==null){
								this.boardArray[from[0]][to[1]] = null;
								document.getElementById(String(from[0])+String(to[1])).innerHTML = "<img src='Pieces/empty.svg'>";
							}
						}
						if([0,7].includes(to[0])){
							f = new queen(f.color);
						}
					}
					else if(f.key[0] == "k"){
						if((from[1]-to[1])==2){
							this.boardArray[from[0]][3] = this.boardArray[from[0]][0];
							this.boardArray[from[0]][0] = null;
							document.getElementById(String(from[0])+"0").innerHTML = "<img src='Pieces/empty.svg'>";
							document.getElementById(String(from[0])+"3").innerHTML = "<img src='Pieces/r"+f.color+".svg'>";
						}
						else if((from[1]-to[1])==-2){
							this.boardArray[from[0]][5] = this.boardArray[from[0]][7];
							this.boardArray[from[0]][7] = null;
							document.getElementById(String(from[0])+"7").innerHTML = "<img src='Pieces/empty.svg'>";
							document.getElementById(String(from[0])+"5").innerHTML = "<img src='Pieces/r"+f.color+".svg'>";
						}
					}
					this.boardArray[to[0]][to[1]] = f;
					this.boardArray[from[0]][from[1]] = null;
					f.moves++;
					lastToMove = f;
					this.isGameOver("w");
					this.isGameOver("b");
				}
				else{
					throw("You can't capture your own piece!")
				}
			}
			else{
				throw("Invalid move!");
			}
		}
		else{
			throw("No piece there!");
		}
		document.getElementById(String(from[0])+String(from[1])).innerHTML = "<img src='Pieces/empty.svg'>";
		document.getElementById(String(to[0])+String(to[1])).innerHTML = "<img src='Pieces/"+f.key+".svg'>";
	}
	getAllLocations(color, scenario=this.boardArray){
		let result = [];
		for(let i=0; i<8; i++){
			for(let j=0; j<8; j++){
				if((scenario[i][j] != null) && (scenario[i][j].color == color)){
					result.push(...scenario[i][j].getMoves(i,j,true,scenario));
				}
			}
		}
		return result;
	}
	startBoard(){
		for(let i=0; i<8; i++){
			let tempi = document.createElement("tr");
			for(let j=0; j<8; j++){
				let tempj = document.createElement("td");
				tempj.id = String(i)+String(j);
				tempj.setAttribute("onclick", "squareClicked(this.id)");
				if((i+j)%2==0){
					tempj.classList.add("light");
				}
				else{
					tempj.classList.add("dark");
				}
				tempi.appendChild(tempj);
			}
			chessBoard.appendChild(tempi);
		}
	}
	updateBoard(){
		for(let i=0; i<8; i++){
			for (let j=0; j<8; j++){
				if(this.boardArray[i][j] == null){
					document.getElementById(String(i)+String(j)).innerHTML = "<img src='Pieces/empty.svg'>";
				}
				else{
					document.getElementById(String(i)+String(j)).innerHTML = "<img src='Pieces/"+this.boardArray[i][j].key+".svg'>";
				}
			}
		}
	}
}
class pawn extends piece{
	constructor(color){
		super(color);
		this.key = "p"+color;
	}
	getMoves(origr, origc, all=false, scenario){
		let result = [];
		if(this.moves==0){
			if(this.color == "w"){
				if(this.checkSquare(origr-1, origc, scenario) == null){
					result.push([origr-1, origc], [origr-2, origc]);
				}
			}
			else{
				if(this.checkSquare(origr+1, origc, scenario) == null){
					result.push([origr+1, origc], [origr+2, origc]);
				}
			}
		}
		else{
			if(this.color == "w"){
				result.push([origr-1, origc]);
			}
			else{
				result.push([origr+1, origc]);
			}
		}
		for(let i=0; i<result.length; i++){
			if(!this.checkInRange(...result[i])){
				result.splice(i, 1);
				i--;
			}
			else if(this.checkSquare(...result[i], scenario) != null){
				result.splice(i, 1);
				i--;
			}
		}
		let temp = ((this.color=="w") ? origr-1 : origr+1);
		let left = this.checkSquare(origr, origc-1, scenario);
		let right = this.checkSquare(origr, origc+1, scenario);
		let specRow = ((this.color=="w") ? 3 : 4);
		if((this.checkInRange(temp, origc-1) && (this.checkSquare(temp, origc-1, scenario) != null)) || ((origr==specRow) && (left != null) && (left.color != this.color) && (left.key[0] == "p") && (left.moves==1) && (lastToMove==left))){
			result.push([temp, origc-1]);
		}
		if(this.checkInRange(temp, origc-1) && (this.checkSquare(temp, origc+1, scenario) != null) || ((origr==specRow) && (right != null) && (right.color != this.color) && (right.key[0] == "p") && (right.moves==1) && (lastToMove==right))){
			result.push([temp, origc+1]);
		}
		result = this.fix(result, this.color, scenario);
		if(!all){
			result = this.validate([origr, origc], result, this.color, scenario);
		}
		return result;
	}
}
class knight extends piece{
	constructor(color){
		super(color);
		this.key = "n"+color;
	}
	getMoves(origr, origc, all=false, scenario){
		let result = [];
		result.push([origr+2, origc+1], [origr+2, origc-1], [origr-2, origc+1], [origr-2, origc-1], [origr+1, origc+2], [origr+1, origc-2], [origr-1, origc+2], [origr-1, origc-2]);
		result = this.fix(result, this.color, scenario);
		if(!all){
			result = this.validate([origr, origc], result, this.color, scenario);
		}
		return result;
	}
}
class bishop extends piece{
	constructor(color){
		super(color);
		this.key = "b"+color;
	}
	getMoves(origr, origc, all=false, scenario){
		let result = [];
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr+i, origc+i)){
				result.push([origr+i, origc+i]);
				if(this.checkSquare(origr+i, origc+i, scenario) != null){
					break;
				}
			}
		}
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr+i, origc-i)){
				result.push([origr+i, origc-i]);
				if(this.checkSquare(origr+i, origc-i, scenario) != null){
					break;
				}
			}
		}
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr-i, origc+i)){
				result.push([origr-i, origc+i]);
				if(this.checkSquare(origr-i, origc+i, scenario) != null){
					break;
				}
			}
		}
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr-i, origc-i)){
				result.push([origr-i, origc-i]);
				if(this.checkSquare(origr-i, origc-i, scenario) != null){
					break;
				}
			}
		}
		result = this.fix(result, this.color, scenario);
		if(!all){
			result = this.validate([origr, origc], result, this.color, scenario);
		}
		return result;
	}
}
class rook extends piece{
	constructor(color){
		super(color);
		this.key = "r"+color;
	}
	getMoves(origr, origc, all=false, scenario){
		let result = [];
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr+i, origc)){
				result.push([origr+i, origc]);
				if(this.checkSquare(origr+i, origc, scenario) != null){
					break;
				}
			}
		}
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr-i, origc)){
				result.push([origr-i, origc]);
				if(this.checkSquare(origr-i, origc, scenario) != null){
					break;
				}
			}
		}
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr, origc+i)){
				result.push([origr, origc+i]);
				if(this.checkSquare(origr, origc+i, scenario) != null){
					break;
				}
			}
		}
		for(let i=1; i<8; i++){
			if(this.checkInRange(origr, origc-i)){
				result.push([origr, origc-i]);
				if(this.checkSquare(origr, origc-i, scenario) != null){
					break;
				}
			}
		}
		result = this.fix(result, this.color, scenario);
		if(!all){
			result = this.validate([origr, origc], result, this.color, scenario);
		}
		return result;
	}
}
class queen extends piece{
	constructor(color){
		super(color);
		this.key = "q"+color;
	}
	getMoves(origr, origc, all=false, scenario){
		let result = [];
		result.push(...new bishop(this.color).getMoves(origr, origc, all, scenario), ...new rook(this.color).getMoves(origr, origc, all, scenario));
		result = this.fix(result, this.color, scenario);
		if(!all){
			result = this.validate([origr, origc], result, this.color, scenario);
		}
		return result;
	}
}
class king extends piece{
	constructor(color){
		super(color);
		this.key = "k"+color;
	}
	getMoves(origr, origc, all=false, scenario){
		let result = [];
		let rank = ((this.color=="w") ? 7 : 0);
		result.push([origr-1, origc-1], [origr-1, origc], [origr-1, origc+1], [origr, origc-1], [origr, origc+1], [origr+1, origc-1], [origr+1, origc], [origr+1, origc+1]);
		result = this.fix(result, this.color, scenario);
		if(!all && !this.inCheck(this.color)){
			if(this.moves == 0){
				if((this.checkSquare(rank, 0, scenario) != null) && this.checkSquare(rank, 0, scenario).moves == 0){
					let tempSet = new Set([this.checkSquare(rank, 1, scenario), this.checkSquare(rank, 2, scenario), this.checkSquare(rank, 3, scenario)]);
					if((tempSet.size == 1) && tempSet.has(null)){
						if(!this.includes([rank, 0], bob.getAllLocations(opposite(this.color))) && !this.includes([rank, 1], bob.getAllLocations(opposite(this.color))) && !this.includes([rank, 2], bob.getAllLocations(opposite(this.color))) && !this.includes([rank, 3], bob.getAllLocations(opposite(this.color)))){
							result.push([rank, 2]);
						}
					}
				}
				if((this.checkSquare(rank, 7, scenario) != null) && this.checkSquare(rank, 7, scenario).moves == 0){
					let tempSet = new Set([this.checkSquare(rank, 5, scenario), this.checkSquare(rank, 6, scenario)]);
					if((tempSet.size == 1) && tempSet.has(null)){
						if(!this.includes([rank, 7], bob.getAllLocations(opposite(this.color))) && !this.includes([rank, 6], bob.getAllLocations(opposite(this.color))) && !this.includes([rank, 5], bob.getAllLocations(opposite(this.color)))){
							result.push([rank, 6]);
						}
					}
				}
			}
		}
		if(all){
			return result;
		}
		let tempb = [];
		let temp = this.copyArray(bob.boardArray);
		for(let i=0; i<result.length; i++){
			temp = this.copyArray(bob.boardArray);
			temp[result[i][0]][result[i][1]] = temp[origr][origc];
			temp[origr][origc] = null;
			if(!this.includes(result[i], bob.getAllLocations(opposite(this.color), temp))){
				tempb.push(result[i]);
			}
		}
		return tempb;
	}
}
var pieces = [];
var key = {"P": new pawn('w'), "N": new knight('w'), "B": new bishop('w'), "R": new rook('w'), "Q": new queen('w'), "K": new king('w'), "p": new pawn('b'), "n": new knight('b'), "b": new bishop('b'), "r": new rook('b'), "q": new queen('b'), "k": new king('b')};
var bob = new board;
var currentPiece;
var colorToMove = "w";
var lastToMove;
bob.reset();
function table(){
	console.table(bob.boardArray);
}
bob.startBoard();
bob.updateBoard();
function squareClicked(id){
	if(document.getElementById(id).classList.contains("available")){
		bob.move([Number(currentPiece[0]), Number(currentPiece[1])], [Number(id[0]), Number(id[1])]);
		let els = document.querySelectorAll(".available");
		for(let i=0; i<els.length; i++){
			els[i].classList.remove("available");
		}
		colorToMove = ((colorToMove == "w") ? "b" : "w");
		setTimeout(playBlackMove, 1000);
		return;
	}
	let els = document.querySelectorAll(".available");
	for(let i=0; i<els.length; i++){
		els[i].classList.remove("available");
	}
	if((bob.boardArray[id[0]][id[1]] != null) && ((bob.boardArray[id[0]][id[1]].color == "w") && bob.boardArray[id[0]][id[1]].color == colorToMove)){
		currentPiece = id;
		let available = bob.boardArray[id[0]][id[1]].getMoves(Number(id[0]), Number(id[1]), false, bob.boardArray);
		for(let i=0; i<available.length; i++){
			document.getElementById(String(available[i][0])+String(available[i][1])).classList.add("available");
		}
	}
}
function opposite(colour){
	if(colour == "w"){
		return "b";
	}
	return "w";
}
function playBlackMove(){
	let info = bob.getAllBlackMoves();
	if(info.length != 0){
		let infob = info[Math.floor(Math.random()*(info.length))];
		let infoc = infob[Math.floor(Math.random()*(infob.length-1))+1];
		bob.move(infob[0], infoc);
		colorToMove = ((colorToMove == "w") ? "b" : "w");
	}
}
document.addEventListener("click", () => document.documentElement.requestFullscreen());