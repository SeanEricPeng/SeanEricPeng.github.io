/*
Copyright @2022 Sean Eric Peng
*/
console.log("owroobbrowwybgygobogwowrrwrbrgybwbgoybgryygorwgygrywby");
console.log("wbgyooybboggggwwyoorwgwbwgyryyybrrwbrwbwyrooggobrrorby");
console.log("yrwbobwybgwowgoboygroywgborwygybrwrgrwrbygybrowbgrgyoo");
inputT = document.getElementById("input-text");
inputG = document.getElementById("input-grid");
allInputs = document.getElementById("inputs");
target = "ooooooooogggggggggwwwwwwwwwbbbbbbbbbyyyyyyyyyrrrrrrrrr".split("");
inputT.value = "ooooooooogggggggggwwwwwwwwwbbbbbbbbbyyyyyyyyyrrrrrrrrr";
scrCube = [];
cube = [];
solutione = [];
solutionc = [];
solution = [];
inputType = 0;
edgesTodo = [1, 7, 3, 46, 50, 52, 48, 21, 23, 39, 41];
cornersTodo = [2, 8, 6, 45, 47, 53, 51];
done = "";
turnValues = ["", "2", "i"];
var allStates;
var currColour = "o";
var parityAlg = ["yi", "L", "U2", "Li", "U2", "L", "Fi", "Li", "Ui", "L", "U", "L", "F", "L2", "U", "y"];
var pta = ["R", "U", "Ri", "Ui"];
var ptb = ["Ri", "F", "R2", "Ui", "Ri", "Ui"];
var ptc = ["R", "U", "Ri", "Fi"];
var Tperm = [...pta, ...ptb, ...ptc];
var Jperm = [...ptc, ...pta, ...ptb];
var fancyPerm = [...ptb, ...ptc, ...pta];
var oJperm = ["Li", "Ui", "L", "F", "Li", "Ui", "L", "U", "L", "Fi", "L2", "U", "L", "U"];
var edges = [
	[1, 37],
	[5, 28],
	[7, 19],
	[3, 10],
	[46, 25],
	[50, 34],
	[52, 43],
	[48, 16],
	[21, 14],
	[23, 30],
	[39, 32],
	[41, 12]
];
var firstEdges = [1, 5, 7, 3, 46, 50, 52, 48, 21, 23, 39, 41];
var corners = [
	[0, 9, 38],
	[2, 36, 29],
	[8, 27, 20],
	[6, 18, 11],
	[45, 17, 24],
	[47, 26, 33],
	[53, 35, 42],
	[51, 44, 15]
];
centers = [4, 13, 22, 31, 40, 49];
var firstCorners = [0, 2, 8, 6, 45, 47, 53, 51];
var secondCorners = [9, 36, 27, 18, 17, 26, 35, 44];
var thirdCorners = [38, 29, 20, 11, 24, 33, 42, 15];
var posNow;
var U = allbtwn(0, 8);
var L = allbtwn(9, 17);
var F = allbtwn(18, 26);
var R = allbtwn(27, 35);
var B = allbtwn(36, 44);
var D = allbtwn(45, 53);
var bar = document.getElementById("bar");
var progress = document.getElementById("progressval");
var M = [1, 4, 7, 19, 22, 25, 46, 49, 52, 37, 40, 43];
var E = [12, 13, 14, 21, 22, 23, 30, 31, 32, 39, 40, 41];
var UDi = [6, 3, 0, 7, 4, 1, 8, 5, 2, ...F, ...R, ...B, ...L, 47, 50, 53, 46, 49, 52, 45, 48, 51];
var RLi = [...F, 11, 14, 17, 10, 13, 16, 9, 12, 15, 45, 46, 47, 48, 49, 50, 51, 52, 53, 33, 30, 27, 34, 31, 28, 35, 32, 29, 8, 7, 6, 5, 4, 3, 2, 1, 0, 44, 43, 42, 41, 40, 39, 38, 37, 36];
var FBi = [15, 12, 9, 16, 13, 10, 17, 14, 11, 51, 48, 45, 52, 49, 46, 53, 50, 47, 24, 21, 18, 25, 22, 19, 26, 23, 20, 6, 3, 0, 7, 4, 1, 8, 5, 2, 38, 41, 44, 37, 40, 43, 36, 39, 42, 33, 30, 27, 34, 31, 28, 35, 32, 29];
var Y = {
	"U": "U",
	"L": "F",
	"F": "R",
	"R": "B",
	"B": "L",
	"D": "D"
};
var vid = document.getElementById("vid");
var c = document.getElementById("c");
var cb = document.getElementById("cb");
var bob;
var request;
var gridel = document.getElementById("grid");
ended = new Event("ended");
orange = [255, 165, 0];
green = [0, 255, 0];
white = [255, 255, 255];
blue = [0, 0, 255];
yellow = [255, 255, 0];
red = [255, 0, 0];
turnNo = 0;
colours = {"o": orange, "g": green, "w": white, "b": blue, "y": yellow, "r": red};
coloursb = ["o", "g", "w", "b", "y", "r"];
function allbtwn(numa, numb){
	let wqr = [];
	for(let i=numa; i<=numb; i++){
		wqr.push(i);
	}
	return([...wqr]);
}
function getType(num){
	for(i=0; i<12; i++){
		if(edges[i].includes(num)){
			return("e");
		}
	}
	return("c");
}
function solve(){
	if(inputType == 0){
		scrCube = inputT.value.split("");
		if(checkValidity() == false){
			alert("There should be exactly 54 characters in the top.")
		}
		else if(getAmount().join("") != "999999"){
			alert("There should be 9 of each colour in total! Please try again.");
		}
		else if(scrCube.join("") == "ooooooooogggggggggwwwwwwwwwbbbbbbbbbyyyyyyyyyrrrrrrrrr"){
			alert("Mix it up first.");
		}
		else{
			scrCube[4] = "o";
			scrCube[13] = "g";
			scrCube[22] = "w";
			scrCube[31] = "b";
			scrCube[40] = "y";
			scrCube[49] = "r";
			console.log(scrCube);
			document.getElementById("yay").style.display = "none";
			solutione = [];
			solutionc = [];
			edgesTodo = [1, 7, 3, 46, 50, 52, 48, 21, 23, 39, 41];
			cornersTodo = [2, 8, 6, 45, 47, 53, 51];
			solution = [];
			getSolutione();
			getSolutionc();
			solvec();
			if(solutione.length%2 == 1){
				solution.push(...parityAlg);
			}
			solvee();
			console.log("Previously was "+solution.length+" moves");
			solution = removeRot();
			solution = simplify(solution);
			done = solution.join(" ").replace(/i/g, "'");
			console.log(done);
			document.getElementById("tada").innerText = done;
			document.getElementById("yay").style.display = "block";
			console.log("Now solved in "+solution.length+" moves");
			getAllColours();
			allInputs.style.display = "none";
			cb.style.display = "block";
			vid.src = "./Anims/"+solution[0]+".mp4";
			vid.play();
			draw(turnNo);
			document.getElementById("progress").style.display = "block";
			document.getElementById("otherStuff").style.display = "block";
		}
	}
	else{
		console.log("idk");
	}
}
function error(){
	alert("Something went wrong...");
}
function checkValidity(){
	if(scrCube.length == 54){
		return(true);
	}
	else{
		return(false);
	};
}
function findPiece(piece, arr = scrCube){
	if(piece.length == 2){
		let cola = piece[0];
		let colb = piece[1];
		for(let i=0; i<12; i++){
			if(arr[edges[i][0]] == cola){
				if(arr[edges[i][1]] == colb){
					return(edges[i][0]);
				};
			}
			else if(arr[edges[i][1]] == cola){
				if(arr[edges[i][0]] == colb){
					return(edges[i][1]);
				};
			};
		};
	}
	else if(piece.length == 3){
		let cola = piece[0];
		let colb = piece[1];
		let colc = piece[2];
		for(let i=0; i<8; i++){
			if(arr[corners[i][0]] == cola){
				if(arr[corners[i][1]] == colb){
					if(arr[corners[i][2]] == colc){
						return(corners[i][0]);
					};
				};
			}
			else if(arr[corners[i][1]] == cola){
				if(arr[corners[i][2]] == colb){
					if(arr[corners[i][0]] == colc){
						return(corners[i][1]);
					};
				};
			}
			else if(arr[corners[i][2]] == cola){
				if(arr[corners[i][0]] == colb){
					if(arr[corners[i][1]] == colc){
						return(corners[i][2]);
					};
				};
			};
		};
	};
	error();
}
function findTruePiece(piece){
	return(findPiece(piece, target));
}
function getColour(piece, arr=scrCube){
	if(getType(piece) == "c"){
		return([scrCube[piece], scrCube[second(piece)], scrCube[third(piece)]]);
	}
	return([scrCube[piece], scrCube[pair(piece)]]);
}
function pair(other){
	if(firstEdges.includes(other)){
		return(edges[firstEdges.indexOf(other)][1]);
	}
	else{
		for(let i=0; i<12; i++){
			if(edges[i][1] == other){
				return(edges[i][0]);
			};
		};
	};
}
function second(otherb){
	if(firstCorners.includes(otherb)){
		return(secondCorners[firstCorners.indexOf(otherb)]);
	}
	else if(secondCorners.includes(otherb)){
		return(thirdCorners[secondCorners.indexOf(otherb)]);
	}
	else if(thirdCorners.includes(otherb)){
		return(firstCorners[thirdCorners.indexOf(otherb)]);
	}
}
function third(otherb){
	if(firstCorners.includes(otherb)){
		return(thirdCorners[firstCorners.indexOf(otherb)]);
	}
	else if(secondCorners.includes(otherb)){
		return(firstCorners[secondCorners.indexOf(otherb)]);
	}
	else if(thirdCorners.includes(otherb)){
		return(secondCorners[thirdCorners.indexOf(otherb)]);
	}
}
function checkIfSolved(thing){
	if(getType(thing) == "e"){
		if((scrCube[thing] == target[thing]) && (scrCube[pair[thing]] == target[pair[thing]])){
			return(true);
		}
	}
	else{
		if((scrCube[thing] == target[thing]) && (scrCube[second[thing]] == target[second[thing]]) && (scrCube[third[thing]] == target[third[thing]])){
			return(true);
		}
	}
	return(false);
}
function removeFromTodo(what){
	if(edgesTodo.includes(what)){
		edgesTodo.splice(edgesTodo.indexOf(what), 1);
	}
	else if(edgesTodo.includes(pair(what))){
		edgesTodo.splice(edgesTodo.indexOf(pair(what)), 1);
	};
}
function removeFromTodoc(whatc){
	if(cornersTodo.includes(whatc)){
		cornersTodo.splice(cornersTodo.indexOf(whatc), 1);
	}
	else if(cornersTodo.includes(second(whatc))){
		cornersTodo.splice(cornersTodo.indexOf(second(whatc)), 1);
	}
	else if(cornersTodo.includes(third(whatc))){
		cornersTodo.splice(cornersTodo.indexOf(third(whatc)), 1);
	};
}
function getSolutione(){
	let doneFirst = false;
	while(edgesTodo.length != 0){
		if(checkIfSolved(edgesTodo[0])){
			edgesTodo.shift();
		}
		else{
			let startPiece;
			let currentPiece;
			if(doneFirst == true){
				currentPiece = edgesTodo[0];
				startPiece = edgesTodo[0];
				removeFromTodo(currentPiece);
				solutione.push(currentPiece);
			}
			else{
				currentPiece = 5;
				startPiece = 5;
			}
			let stillGoing = true;
			while(stillGoing == true){
				currentPiece = findTruePiece(getColour(currentPiece));
				if((currentPiece == startPiece) || (currentPiece == pair(startPiece))){
					stillGoing = false;
					removeFromTodo(currentPiece);
					if(doneFirst == true){
						solutione.push(currentPiece);
					}
				}
				else{
					solutione.push(currentPiece);
					removeFromTodo(currentPiece);
				}
			}
		}
		doneFirst = true;
	}
	console.log(solutione);
}
function getSolutionc(){
	let doneFirst = false;
	while(cornersTodo.length != 0){
		if(checkIfSolved(cornersTodo[0])){
			cornersTodo.shift();
		}
		else{
			let startPiece;
			let currentPiece;
			if(doneFirst == true){
				currentPiece = cornersTodo[0];
				startPiece = cornersTodo[0];
				removeFromTodoc(currentPiece);
				solutionc.push(currentPiece);
			}
			else{
				currentPiece = 0;
				startPiece = 0;
			}
			let stillGoing = true;
			while(stillGoing == true){
				currentPiece = findTruePiece(getColour(currentPiece));
				if((currentPiece == startPiece) || (currentPiece == second(startPiece)) || (currentPiece == third(startPiece))){
					stillGoing = false;
					removeFromTodoc(currentPiece);
					if(doneFirst == true){
						solutionc.push(currentPiece);
					}
				}
				else{
					solutionc.push(currentPiece);
					removeFromTodoc(currentPiece);
				}
			}
		}
		doneFirst = true;
	}
	console.log(solutionc);
}
/*****************************************************************************************************************************************************/
function turn(turntd){
	solution.push(turntd);
	posNow = window[turntd.toLowerCase()](posNow);
}
function pieceIn(thinga, thingb){
	if(getType(thinga) == "e"){
		if(thingb.includes(thinga) || thingb.includes(pair(thinga))){
			return true;
		}
		else{
			return false;
		}
	}
	else{
		if(thingb.includes(thinga) || thingb.includes(second(thinga)) || thingb.includes(third(thinga))){
			return true;
		}
		else{
			return false;
		}
	}
}
function u(ptt){
	if(pieceIn(ptt, U)){
		return(UDi.indexOf(ptt));
	}
}
function f(ptt){
	if(pieceIn(ptt, F)){
		return(FBi.indexOf(ptt));
	}
}
function r(ptt){
	if(pieceIn(ptt, R)){
		return(RLi.indexOf(ptt));
	}
}
function l(ptt){
	if(pieceIn(ptt, L)){
		return(RLi[ptt]);
	}
}
function b(ptt){
	if(pieceIn(ptt, B)){
		return(FBi[ptt]);
	}
}
function d(ptt){
	if(pieceIn(ptt, D)){
		return(UDi[ptt]);
	}
}
function m(ptt){
	if(pieceIn(ptt, M)){
		return(RLi[ptt]);
	}
}
function e(ptt){
	if(pieceIn(ptt, E)){
		return(UDi[ptt]);
	}
}
function y(ptt){
	return(UDi.indexOf(ptt));
}
function base(what){
	return(what[0]);
}
var newerVal = ["remove", "", "2", "i"];
function val(what){
	if(what.includes("i")){
		return(3);
	}
	else if(what.includes(2)){
		return(2);
	}
	else{
		return(1);
	}
}
function simplify(start){
	let tmp = start;
	let tmpa = [];
	let stuffToAdd;
	for(i=0; i<tmp.length; i++){
		currAdd = 0;
		let currBase = base(tmp[i]);
		stuffToAdd = 0;
		let j;
		for(j=i; (j<tmp.length) && (currBase == base(tmp[j])); j++){
			stuffToAdd += val(tmp[j]);
		}
		i=j-1;
		if(newerVal[stuffToAdd%4] != "remove"){
			tmpa.push(currBase+newerVal[stuffToAdd%4]);
		}
	}
	return tmpa;
}
function undo(what){
	let newwhat = [];
	for(let i=0; i<what.length; i++){
		if(what[i].includes("2")){
			newwhat.push(what[i]);
		}
		else if(what[i].includes("i")){
			newwhat.push(what[i].slice(0, -1));
		}
		else{
			newwhat.push(what[i]+"i");
		}
	}
	return(newwhat.reverse());
}
function solvec(){
	let currSol = [];
	for(let i=0; i<solutionc.length; i++){
		posNow = solutionc[i];
		currSol = [];
		while([33, 8, 6, 2, 0, 9, 38].includes(posNow) == false){
			if([26, 35, 27, 29, 36, 53, 20, 26, 47].includes(posNow)){
				turn("R");
				currSol.push("R");
			}
			else if([45, 18, 11, 17].includes(posNow)){
				turn("F");
				currSol.push("F");
			}
			else if([24, 15, 51, 44, 42].includes(posNow)){
				turn("D");
				currSol.push("D");
			}
			else{
				console.log(posNow);
				error();
			}
		}
		if(posNow == 33){
			solution.push(...fancyPerm);
		}
		else if(posNow == 2){
			solution.push(...["yi", ...oJperm, ..."y"]);
		}
		else if(posNow == 6){
			solution.push(...["y2", ...Jperm, "y2"]);
		}
		else if(posNow == 8){
			solution.push(...["F", ...fancyPerm, "Fi"]);
		}
		else{
			console.log("thing: "+posNow);
		}
		solution.push(...undo(currSol));
	}
}
function solvee(){
	let currSol = [];
	for(let i=0; i<solutione.length; i++){
		posNow = solutione[i];
		currSol = [];
		while([3, 5, 28, 1, 7].includes(posNow) == false){
			if([21, 48, 41, 10].includes(posNow)){
				turn("L");
				currSol.push("L");
			}
			else if([19, 25, 46, 52, 37, 43].includes(posNow)){
				turn("m");
				currSol.push("m");
			}
			else if([16, 50, 34].includes(posNow)){
				turn("D");
				currSol.push("D");
			}
			else if([30, 23, 14, 12, 39, 32].includes(posNow)){
				turn("e");
				currSol.push("e");
			}
			else{
				console.log(posNow);
				error();
			}
		}
		if(posNow == 3){
			solution.push(...Tperm);
		}
		else if(posNow == 7){
			solution.push(...Jperm);
		}
		else if(posNow == 1){
			solution.push(...["y2", ...oJperm, "y2"]);
		}
		
		else if(posNow == 5 || posNow == 28){
			console.log("thing: "+posNow);
			console.log(solutione[i]+currSol);
		}
		solution.push(...undo(currSol));
	}
}
/*****************************************************************************************************************************************************/
function getValue(what){
	if(what.length == 1){
		return("");
	}
	else if(what.slice(-1) == "2"){
		return("2");
	}
	else if(what.slice(-1) == "i"){
		return("i");
	}
	else{
		error();
	}
}
function removeRot(){
	let tmp = [];
	let currRot = undefined;
	let currVal;
	for(let i=0; i<solution.length; i++){
		if(["x", "y", "z"].includes(base(solution[i]))){
			if(currRot == undefined){
				currRot = solution[i];
			}
			else{
				currRot = undefined;
			}
		}
		else{
			if(currRot == undefined){
				tmp.push(solution[i]);
			}
			else if(currRot == "y"){
				tmp.push(Y[base(solution[i])]+getValue(solution[i]));
			}
			else if(currRot == "y2"){
				tmp.push(Y[Y[base(solution[i])]]+getValue(solution[i]));
			}
			else if(currRot == "yi"){
				tmp.push(Y[Y[Y[base(solution[i])]]]+getValue(solution[i]));
			}
		}
	}
	return(tmp);
}
/************************************************************************Animations*******************************************************************/
ctx = c.getContext("2d", {willReadFrequently: true});
ctx.imageSmoothingEnabled = false;
vid.addEventListener("play", function(){
	bar.style.width = (turnNo/solution.length)*100+"%";
	progress.innerText = Math.round((turnNo/solution.length)*100)+"%";
});
vid.addEventListener("ended", function(){
	if(turnNo>=solution.length-1){
		bar.style.width = "100%";
		bar.style.borderRadius = "10px";
		progress.innerText = "DONE!";
		console.log("done");
	}
	else{
		cancelAnimationFrame(request);
		vid.src = "./Anims/"+solution[turnNo+1]+".mp4";
		turnNo++;
		vid.onloadeddata = function(){
			vid.play();
			vid.addEventListener("play", function(){setTimeout(draw, 20)}, {once: true});
		}
	}
});
function pause(){
	if(vid.paused || vid.ended){
		vid.play();
	}
	else{
		vid.pause();
	}
}
function goBack(){
	turnNo-=2;
	if(turnNo<-1){
		turnNo = -1;
	}
	vid.currentTime = 0;
	let oppositeofplaying = vid.paused;
	vid.dispatchEvent(ended);
	if(oppositeofplaying == true){
		vid.addEventListener("play", function(){
			vid.pause();
		}, {once: true});
	}
}
function goForwards(){
	vid.currentTime = 0;
	let oppositeofplaying = vid.paused;
	vid.dispatchEvent(ended);
	if(oppositeofplaying == true){
		vid.addEventListener("play", function(){
			vid.pause();
		}, {once: true});
	}
}
function goToStart(){
	turnNo = -1;
	vid.currentTime = 0;
	let oppositeofplaying = vid.paused;
	vid.dispatchEvent(ended);
	if(oppositeofplaying == true){
		vid.addEventListener("play", function(){
			vid.pause();
		}, {once: true});
	}
}
function goToEnd(){
	turnNo = solution.length-2;
	vid.currentTime = 0;
	vid.dispatchEvent(ended);
}
function draw(){
	ctx.drawImage(vid, 0, 0, 500, 500);
	bob = ctx.getImageData(0, 0, 500, 500);
	edit();
	request = requestAnimationFrame(draw);
}
function updateSpeed(hi){
	vid.defaultPlaybackRate = hi.value;
	vid.playbackRate = hi.value;
}
function changeColour(what, colour){
	bob.data[what] = colour[0];
	bob.data[what+1] = colour[1];
	bob.data[what+2] = colour[2];
}
function getAllColours(){
	allStates = [];
	allStates.push([...scrCube]);
	let tmp = scrCube;
	for(let i=0; i<solution.length; i++){
		tmp = doMove(tmp, solution[i]);
		allStates.push(tmp);
	}
	return(allStates);
}
function doMove(what, move){
	let tmp = [];
	for(let i=0; i<what.length; i++){
		if(pieceIn(i, window[base(move).toUpperCase()])){
			if(val(move) == 3){
				tmp.push(what[window[base(move).toLowerCase()](i)]);
			}
			else if(val(move) == 2){
				tmp.push(what[window[base(move).toLowerCase()](window[base(move).toLowerCase()](i))]);
			}
			else if(val(move) == 1){
				tmp.push(what[window[base(move).toLowerCase()](window[base(move).toLowerCase()](window[base(move).toLowerCase()](i)))]);
			}
		}
		else{
			tmp.push(what[i]);
		}
	}
	return([...tmp]);
}
function edit(){
	for(let i=0; i<bob.data.length; i+=4){
		if(bob.data[i]%4 == 3){
			bob.data[i] = bob.data[i]+1;
		};
		if(bob.data[i] == 255){
			bob.data[i+3] = 0;
		}
		else{
			let thisColour = Math.round(bob.data[i]/4)-1;
			if(thisColour%1 != 0){
				console.log(thisColour);
			}
			else if(thisColour >= 0){
				changeColour(i, colours[allStates[turnNo][thisColour]]);
			}
		}
	}
	cb.getContext("2d").putImageData(bob, 0, 0);
}
/*****************************************************************Input*******************************************************************************/
var orangeGrid = document.getElementById("orange");
var greenGrid = document.getElementById("green");
var whiteGrid = document.getElementById("white");
var blueGrid = document.getElementById("blue");
var yellowGrid = document.getElementById("yellow");
var redGrid = document.getElementById("red");
var stats = document.getElementById("stats");
var grids = [orangeGrid, greenGrid, whiteGrid, blueGrid, yellowGrid, redGrid];
var lettersToColours = {"o": "orange", "g": "green", "w": "white", "b": "blue", "y": "yellow", "r": "red"};
for(let i=0; i<6; i++){
	let firstThingy = document.createElement("table");
	firstThingy.style.borderSpacing = "seperate";
	firstThingy.style.height = "100%";
	firstThingy.style.width = "100%";
	firstThingy.style.backgroundColor = "black";
	grids[i].appendChild(firstThingy);
	for(let j=0; j<3; j++){
		let thingy = document.createElement("tr");
		firstThingy.appendChild(thingy);
		for(let k=0; k<3; k++){
			let otherThingy = document.createElement("td");
			otherThingy.style.border = "2px solid black";
			otherThingy.setAttribute("class", target[i*9 + j*3 + k]);
			otherThingy.id = i*9 + j*3 + k;
			otherThingy.setAttribute("onclick", "updateColour(this)");
			if(centers.includes(i*9 + j*3 + k)){
				otherThingy.removeAttribute("onclick");
			}
			thingy.appendChild(otherThingy);
		}
	}
}
function updateColour(hi){
	hi.setAttribute("class", currColour);
	updateText();
	result = getAmount();
	for(let i=0; i<6; i++){
		document.getElementById("n"+coloursb[i]).innerText = result[i];
		if(result[i] == 9){
			document.getElementById("n"+coloursb[i]).style.color = "lime";
		}
		else{
			document.getElementById("n"+coloursb[i]).style.color = "red";
		}
	}
}
function getAmount(){
	let result = [0, 0, 0, 0, 0, 0];
	for(let i=0; i<54; i++){
		result[coloursb.indexOf(document.getElementById(i).getAttribute("class"))]++;
	}
	return(result);
}
function setColour(hi){
	currColour = hi.getAttribute("class");
}
function updateText(){
	let sdfsd = "";
	for(let i=0; i<54; i++){
		if("ogwbyr".split("").includes(document.getElementById(i.toString()).getAttribute("class"))){
			sdfsd = sdfsd + document.getElementById(i.toString()).getAttribute("class");
		}
		else{
			sdfsd = sdfsd + " ";
		}
	};
	inputT.value = sdfsd;
}
function updateGrid(){
	for(let i=0; i<54; i++){
		if(!("ogwbyr".split("").includes(inputT.value[i])) && inputT.value[i] != undefined){
			let qwerty = inputT.value.split("");
			qwerty[i] = " ";
			inputT.value = qwerty.join("");
		}
		if(!centers.includes(i)){
			document.getElementById(i.toString()).setAttribute("class", inputT.value[i]);
		}
		else{
			inputT.value[i] = coloursb[centers.indexOf(i)];
		}
	};
	result = getAmount();
	for(let i=0; i<6; i++){
		document.getElementById("n"+coloursb[i]).innerText = result[i];
		if(result[i] == 9){
			document.getElementById("n"+coloursb[i]).style.color = "lime";
		}
		else{
			document.getElementById("n"+coloursb[i]).style.color = "red";
		}
	}
}
inputT.addEventListener("input", updateGrid);
var palette = document.getElementById("palette");
var palette2 = document.getElementById("palette2");
function resize(){
	if((window.innerWidth/4*3)/(window.innerHeight-200) > 2){
		gridel.style.height = "100%";
		gridel.style.width = ((window.innerHeight-200)*4/3)-8+"px";
		palette.style.display = "table";
		palette2.style.display = "none";
		stats.style.fontSize = "1.5vw";
		stats.style.width = "auto";
		stats.style.display = "block";
		palette.style.width = inputG.clientWidth - (gridel.clientWidth + stats.clientWidth + 5) + "px";
		palette.style.height = "100%";
		console.log("a");
	}
	else if(((window.innerHeight-200)/3)/((window.innerWidth-16)/4) > 0.6){
		if(((window.innerHeight-200)/3)/((window.innerWidth-16)/4) > 2 && (((window.innerHeight-200)/3)/((window.innerWidth-16)/4)>1.9)){
			gridel.style.width = "100%";
			gridel.style.height = gridel.clientWidth * 0.75 + "px";
			palette.style.display = "none";
			palette2.style.display = "table";
			stats.style.display = "block";
			stats.style.fontSize = "3vw";
			stats.style.height = "auto";
			stats.style.width = "100vw";
			palette2.style.width = "100vw";
			palette2.style.height = inputG.clientHeight - (gridel.clientHeight + stats.clientHeight + 5) + "px";
			console.log("b");
		}
		else if(((window.innerHeight-200)/3)/((window.innerWidth-16)/4) > 1){
			console.log("c");
			gridel.style.width = "100%";
			gridel.style.height = gridel.clientWidth * 0.75 + "px";
			palette.style.display = "table";
			palette2.style.display = "none";
			stats.style.display = "block";
			stats.style.fontSize = "4vw";
			stats.style.height = "auto";
			stats.style.width = "auto";
			palette.style.width = gridel.clientWidth - (stats.clientWidth+5) + "px";
			palette.style.height = stats.clientHeight + "px";
		}
		else{
			gridel.style.height = "100%";
			gridel.style.width = gridel.clientHeight * 4/3 + "px";
			if(gridel.style.height * 4/3 > window.innerWidth){
				console.log("hi");
			}
			palette.style.display = "table";
			palette2.style.display = "none";
			palette.style.width = inputG.clientWidth - (gridel.clientWidth+5) + "px";
			stats.style.fontSize = "2.5vw";
			stats.style.height = "auto";
			palette.style.height = "100%";
			stats.style.display = "none";
			console.log("d");
		};
	}
	else{
		gridel.style.height = "100%";
		gridel.style.width = gridel.clientHeight * 4/3+"px";
		palette.style.display = "none";
		stats.style.fontSize = "2.5vw";
		stats.style.height = "auto";
		stats.style.display = "block";
		stats.style.width = "auto";
		palette2.style.height = inputG.clientHeight - stats.clientHeight + "px";
		palette2.style.display = "table";
		palette2.style.width = stats.clientWidth + "px";
		console.log("e");
	}
}
window.onresize = resize;
window.onload = resize;
