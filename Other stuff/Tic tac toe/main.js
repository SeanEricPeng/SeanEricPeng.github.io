const table = document.getElementById("table");
const line = document.getElementById("line");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const mode = document.getElementById("mode");
const starter = document.getElementById("starter");
const startSvg = [...document.getElementById("startSvg1").children].concat(...document.getElementById("startSvg2").children);
const scoreSvg = [...document.getElementById("scoreSvg1").children].concat(...document.getElementById("scoreSvg2").children);
const thing = document.getElementById("thing");
var controller = new AbortController();
function box(){
	if(innerHeight>=innerWidth){
		thing.style.width = window.innerWidth+5+"px";
		thing.style.height = window.innerHeight+5+"px";
		thing.style.display="block";
		document.body.style.overflow="hidden";
	}
	else{
		try{
			document.body.style.overflow="auto";
			thing.style.display="none";
		}
		catch(e){
			
		}
	}
}
addEventListener("resize", box);
box();
class Board{
	constructor(position){
		this.position = position;
		this.rows = 3;
		this.columns = 3;
		this.turn = 1;
		this.setTurn = 1;
		this.mode = "computer";
		this.resetting = false;
		this.score = [0, 0];
		this.setMode = "computer";
		this.playing = false;
	}
	draw(){
		table.innerHTML = "";
		for(let i=0; i<this.rows; i++){
			let r = document.createElement("tr");
			for(let j=0; j<this.columns; j++){
				let c = document.createElement("td");
				c.innerHTML = ((this.position[i*3+j]==1) ? "X" : this.position[i*3+j]==-1 ? "O" : " ");
				c.setAttribute("onclick", "bob.doMove("+(i*3+j)+")");
				r.appendChild(c);
			}
			table.appendChild(r);
		}
	}
	getValidMoves(){
		let res = [];
		for(let i=0; i<this.position.length; i++){
			if(this.position[i]==0){
				res.push(i);
			}
		}
		return res;
	}
	modeSwitch(what){
		if(what.checked){
			this.setMode = "human";
		}
		else{
			this.setMode = "computer";
		}
		svgChange(this.setMode);
		if(this.position.join("")=="000000000"){
			this.mode = this.setMode;
			this.score = [0, 0];
			this.updateScore();
		}
	}
	turnSwitch(what){
		if(what.checked){
			this.setTurn = -1;
		}
		else{
			this.setTurn = 1;
		}
		if(this.position.join("")=="000000000"){
			this.turn = this.setTurn;
			if(this.mode=="computer"){
				if(this.turn==-1){
					controller = new AbortController();
					table.addEventListener("click", ()=>{
						this.doMove(Math.floor(Math.random()*9), this.turn, false, false);
					}, {once: true, signal: controller.signal});
				}
				else{
					controller.abort();
				}
			}
		}
	}
	startGame(){
		this.playing = true;
		mode.classList.add("gray");
		starter.classList.add("gray");
	}
	endGame(){
		this.playing = false;
		mode.classList.remove("gray");
		starter.classList.remove("gray");
	}
	doMove(pos, piece=this.turn, simulated=false, human=true){
		if(this.getValidMoves().includes(pos) && !this.resetting){
			if((human && this.turn==1) || simulated || !human || this.mode=="human"){
				this.turn = -this.turn;
				this.position[pos] = piece;
				if(!simulated){
					if(!this.playing){
						this.startGame();
					}
					this.draw();
					if((this.checkWinner()[0]!==false) || this.checkDraw()){
						if(this.checkWinner()[0]==1){
							this.score[0]++;
						}
						if(this.checkWinner()[0]==-1){
							this.score[1]++;
						}
						this.updateScore();
						this.resetting = true;
						this.animate();
						setTimeout(()=>{
							document.addEventListener("click", ()=>{
								this.reset();
								this.draw();
						}, {once: true})}, 500);
					}
					else if((this.mode=="computer") && human){
						console.log("thinking...");
						setTimeout(()=>{
							let temp = minimax(this, this.turn, 0);
							console.log(temp);
							this.doMove(temp, this.turn, false, false);
						},500);
					}
				}
			}
		}
	}
	updateScore(){
		score1.innerText = this.score[0];
		score2.innerText = this.score[1];
	}
	animate(){
		if(this.checkDraw()){
			return;
		}
		let s1 = this.checkWinner()[1];
		let s2 = this.checkWinner()[2];
		let m1 = this.midpoint(s1);
		let m2 = this.midpoint(s2);
		let par = line.parentElement;
		par.style.left = m2.x+"px";
		par.style.top = m2.y-5+"px";
		line.style.transform = "translateX(-50%) rotate("+Math.atan((m1.y-m2.y)/(m1.x-m2.x))+"rad)";
		line.style.transitionDuration = "0s";
		line.style.width = "0px";
		line.style.display = "block";
		setTimeout(()=>{
			line.style.transitionDuration = "1s";
			line.style.width = 2*Math.sqrt((m1.x-m2.x)**2 + (m1.y-m2.y)**2)+"px";
		}, 1000);
	}
	midpoint(square){
		let rect = table.childNodes[Math.floor(square/3)].childNodes[square%3].getBoundingClientRect();
		return({x: rect.x+scrollX+rect.width/2, y: rect.y+scrollY+rect.height/2});
	}
	cellsEqual(...cells){
		cells = cells.map((el)=>{return this.position[el]});
		return (new Set(cells)).size==1;
	}
	reset(){
		this.endGame();
		this.position = Array(9).fill(0);
		this.turn = this.setTurn;
		this.mode = this.setMode;
		if(this.mode == "computer" && this.turn==-1){
			table.addEventListener("click", ()=>{
				this.doMove(Math.floor(Math.random()*9), this.turn, false, false);
			}, {once: true, signal: controller.signal});
		}
		else{
			controller.abort();
		}
		this.resetting = false;
		line.style.display = "none";
	}
	checkDraw(){
		for(let i of this.position){
			if(i==0){
				return false;
			}
		}
		if(this.checkWinner()[0]!=0){
			return false;
		}
		return true;
	}
	copyMove(m, p){
		let temp = new Board([...this.position]);
		temp.doMove(m, p, true);
		return temp;
	}
	checkWinner(){
		for(let i=0; i<3; i++){
			if(this.position[i]!=0){
				if(this.cellsEqual(i, i+3, i+6)){
					return [this.position[i], i, i+3];
				}
			}
			if(this.position[i*3]!=0){
				if(this.cellsEqual(i*3, i*3+1, i*3+2)){
					return [this.position[i*3], i*3, i*3+1];
				}
			}
		}
		if(this.position[0]!=0){
			if(this.cellsEqual(0, 4, 8)){
				return [this.position[0], 0, 4];
			}
		}
		if(this.position[2]!=0){
			if(this.cellsEqual(2, 4, 6)){
				return [this.position[2], 2, 4];
			}
		}
		return [false, false];
	}
	count0s(){
		return this.position.filter(el => el==0).length;
	}
}
function score(game, depth){
	if(game.checkWinner()[0]==1){
		return 10-depth;
	}
	else if(game.checkWinner()[0]==-1){
		return depth-10;
	}
	return 0;
}
function minimax(board, player, depth, path=[]){
	if((board.checkWinner()[0]!==false) || board.checkDraw()){
		return([score(board, depth), path]);
	}
	depth += 1;
	let scores = [];
	let valid = board.getValidMoves();
	valid.forEach((el)=>{
		lol = [...path];
		lol.push(el);
		scores.push(minimax(board.copyMove(el, player), -player, depth, lol));
	});
	let temp = scores.map((el)=>el[0]);
	if(player==1){
		if(depth == 1){
			return(scores[temp.indexOf(Math.max(...temp))][1][0]);
		}
		else{
			return(scores[temp.indexOf(Math.max(...temp))]);
		}
	}
	if(player==-1){
		if(depth == 1){
			return(scores[temp.indexOf(Math.min(...temp))][1][0]);
		}
		else{
			return(scores[temp.indexOf(Math.min(...temp))]);
		}
	}
}
function svgChange(what){
	if(what=="human"){
		startSvg[0].style.display = "none";
		startSvg[1].style.display = "inline-block";
		startSvg[2].style.display = "none";
		startSvg[3].style.display = "inline-block";
		
		scoreSvg[0].style.display = "none";
		scoreSvg[1].style.display = "inline-block";
		scoreSvg[2].style.display = "none";
		scoreSvg[3].style.display = "inline-block";
	}
	else{
		startSvg[0].style.display = "inline-block";
		startSvg[1].style.display = "none";
		startSvg[2].style.display = "inline-block";
		startSvg[3].style.display = "none";
		
		scoreSvg[0].style.display = "inline-block";
		scoreSvg[1].style.display = "none";
		scoreSvg[2].style.display = "inline-block";
		scoreSvg[3].style.display = "none";
	}
}
bob = new Board(Array(9).fill(0));
bob.draw();
