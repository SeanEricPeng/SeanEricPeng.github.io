/*
Copyright @2022 Sean Eric Peng
*/
console.log("owroobbrowwybgygobogwowrrwrbrgybwbgoybgryygorwgygrywby");
console.log("wbgyooybboggggwwyoorwgwbwgyryyybrrwbrwbwyrooggobrrorby");
console.log("yrwbobwybgwowgoboygroywgborwygybrwrgrwrbygybrowbgrgyoo");
console.log("rgwwoogwrborbggyrwwrbywgogowyoobbgbogrywyoyyrbwyyrrgbb");
var inputT = document.getElementById("input-text");
var target = "ooooooooogggggggggwwwwwwwwwbbbbbbbbbyyyyyyyyyrrrrrrrrr".split("");
inputT.value = "ooooooooogggggggggwwwwwwwwwbbbbbbbbbyyyyyyyyyrrrrrrrrr";
var scrCube = [];
var solution = [];
var inputType = 0;
var done = "";
var turnValues = ["", "2", "i"];
const theConsole = console.log;
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
var centers = [4, 13, 22, 31, 40, 49];
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
var faces = [U, L, F, R, B, D];
var otherFaces = ["U", "L", "F", "R", "B", "D"];
let order = ["F", "R", "B", "L"];
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
let parta = document.getElementById("parta");
let partb = document.getElementById("partb");
var vid = document.getElementById("vid");
var c = document.getElementById("c");
var cb = document.getElementById("cb");
var tada = document.getElementById("tada");
var bob;
var request = 0;
var gridel = document.getElementById("grid");
var ended = new Event("ended");
var orange = [255, 165, 0];
var green = [0, 255, 0];
var white = [255, 255, 255];
var blue = [0, 0, 255];
var yellow = [255, 255, 0];
var red = [255, 0, 0];
var turnNo = 0;
var colours = {"o": orange, "g": green, "w": white, "b": blue, "y": yellow, "r": red};
var coloursb = ["o", "g", "w", "b", "y", "r"];
var cFace = {"o": "U", "g": "L", "w": "F", "b": "R", "y": "B", "r": "D"};
var requestb = 0;
document.addEventListener("click", function(){
	document.documentElement.requestFullscreen();
});
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
function otherSide(side){
	let pairs = ["U", "L", "F", "B", "R", "D"];
	let otherPairs = [U, L, F, B, R, D];
	if(typeof side == "string"){
		return pairs[[...pairs].reverse().indexOf(side)];
	}
	else{
		return otherPairs[[...otherPairs].reverse().indexOf(side)];
	}
}
function solve(doAll = true){
	if(inputType == 0){
		scrCube = inputT.value.split("");
		if(checkValidity() == false){
			alert("There should be exactly 54 characters in the top.");
			return;
		}
		else if(getAmount().join("") != "999999"){
			alert("There should be 9 of each colour in total! Please try again.");
			return;
		}
		if(scrCube[4]+scrCube[13]+scrCube[22]+scrCube[31]+scrCube[40]+scrCube[49] != "ogwbyr"){
			fixColours();
		}
		if(scrCube.join("") == target.join("")){
			alert("Mix it up first.");
		}
		else if(!checkCornersExist()){
			alert("There should be exactly one of each corner on the cube.");
		}
		else if(!checkEdgesExist()){
			alert("There should be exactly one of each edge on the cube.");
		}
		else if(checkCornerTwisted()){
			alert("A corner is twisted.");
		}
		else if(checkEdgeTwisted()){
			alert("An edge is twisted.");
		}
		else if(checkEdgeParity()!=checkCornerParity()){
			alert("2 corners need swapping.");
		}
		else{
			vid.pause();
			cancelAnimationFrame(request);
			cancelAnimationFrame(requestb);
			turnNo = 0;
			console.log(scrCube);
			solution = [];
			doCross();
			console.log("m");
			doMiddle();
			console.log("t");
			console.log(scrCube.join(""));
			doTop();
			console.log("c");
			console.log(scrCube.join(""));
			corners2();
			solution = simplify(solution);
			if(doAll){
				done = solution.join(" ").replace(/i/g, "'").split(" ");
				console.log(done);
				parta.style.display = "none";
				partb.style.display = "grid";
				resize();
				tada.innerHTML = done[0];
				console.log("Now solved in "+solution.length+" moves");
				getAllColours();
				cb.style.display = "block";
				vid.src = "./Anims/"+solution[0]+".mp4";
				vid.load();
				vid.play();
				requestAnimationFrame(thenPause);
				document.getElementById("top").style.display = "none";
			}
			else{
				return solution.length;
			}
		}
	}
	else{
		error();
	}
}
function randomScramble(doAll = true){
	let tmpd = [...target];
	for(let i=0; i<20; i++){
		tmpd.doMove(tmpc(Math.floor(Math.random()*18)));
	}
	inputT.value = tmpd.join("");
	return solve(doAll);
}
function checkCornersExist(){
	for(let i of firstCorners){
		try{
			locatePiece(i);
		}
		catch(e){
			console.log(e);
			return false;
		}
	}
	return true;
}
function checkEdgesExist(){
	for(let i of firstEdges){
		try{
			locatePiece(i);
		}
		catch(e){
			return false;
		}
	}
	return true;
}
function checkEdgeParity(){
	let skip = [];
	let currentLoop = 0;
	let here;
	for(let i of firstEdges){
		if(skip.includes(i) || skip.includes(pair(i))){
			continue;
		}
		here = originalPos(i);
		skip.push(here);
		while(![i, pair(i)].includes(here)){
			here = originalPos(here);
			skip.push(here);
			currentLoop++;
		}
	}
	return (currentLoop%2)==0;
}
function checkCornerParity(){
	let skip = [];
	let currentLoop = 0;
	let here;
	for(let i of firstCorners){
		if(skip.includes(i) || skip.includes(second(i)) || skip.includes(third(i))){
			continue;
		}
		here = originalPos(i);
		skip.push(here);
		console.log(i);
		while(![i, second(i), third(i)].includes(here)){
			console.log(here);
			here = originalPos(here);
			skip.push(here);
			currentLoop++;
		}
	}
	return (currentLoop%2)==0;
}
function testSeveral(amount){
	console.log = function(){}
	let soFar = 0;
	let startTime = Date.now();
	let minimum;
	let maximum = 0;
	let over100 = 0;
	let temp;
	for(let i=0; i<amount; i++){
		temp = randomScramble(false);
		soFar += temp;
		if((i==0) || (temp<minimum)){
			minimum = temp;
		}
		if(temp>maximum){
			maximum = temp;
		}
		if(temp>100){
			over100++;
		}
	}
	let endTime = Date.now()
	console.log = theConsole;
	console.log({"Max": maximum, "Min": minimum, "Percent over 100 moves": over100/amount, "Average moves": soFar/amount, "Average time (ms)": (endTime-startTime)/amount, "Total time (ms)": endTime-startTime});
}
function error(){
	throw "hi";
	alert("Something went wrong...");
}
function checkPosition(piece){
	if([piece, second(piece), third(piece)].includes(locatePiece(piece))){
		return true;
	}
	else{
		return false;
	}
}
function checkValidity(){
	if(scrCube.length == 54){
		return true;
	}
	return false;
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
function originalPos(piece){
	return(findTruePiece(getColour(piece, scrCube)));
}
function getColour(piece, arr=scrCube){
	if(getType(piece) == "c"){
		return([arr[piece], arr[second(piece)], arr[third(piece)]]);
	}
	return([arr[piece], arr[pair(piece)]]);
}
function locatePiece(piece){
	return(findPiece(getColour(piece, target)));
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
	if(locatePiece(thing) == thing){
		return true;
	}
	else{
		return false;
	}
}
/*function removeFromTodo(what){
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
}*/
function checkCornerTwisted(){
	let twists = 0;
	for(let i of firstCorners){
		twists += rotationOffset(locatePiece(i), U);
	}
	twists %= 3;
	return twists!=0;
}
function checkEdgeTwisted(){
	let twists = 0;
	for(let i of firstEdges){
		if(firstEdges.includes(originalPos(i))){
			twists++;
		}
	}
	twists %= 2;
	return twists!=0;
}
function fixColours(){
	let colourFix = {[scrCube[4]]: "o", [scrCube[13]]: "g", [scrCube[22]]: "w", [scrCube[31]]: "b", [scrCube[40]]: "y", [scrCube[49]]: "r"};
	for(let i=0; i<scrCube.length; i++){
		scrCube[i] = colourFix[scrCube[i]];
	}
	console.log(scrCube.join(""));
}
function thenPause(){
	if(vid.currentTime>0.1){
		vid.pause();
		vid.currentTime = 0;
		requestAnimationFrame(function readyNow(){
			if(vid.readyState==4){
				draw(true);
				return;
			}
			else{
				requestAnimationFrame(readyNow);
			}
		})
	}
	else{
		requestb = requestAnimationFrame(thenPause);
	}
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
	startL = tmp.length;
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
	if(tmpa.length<startL){
		return(simplify(tmpa));
	}
	else{
		return tmpa;
	}
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
/*function solvec(){
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
}*/
function corners2(){
	console.log(allSolved());
	while(!allSolved()){
		setup = [];
		let targets = pickPieces().map(originalPos);
		originalCube = [...scrCube];
		baseFace = 0;
		doSetup(targets);
		console.log(...targets.map(locatePiece));
		for(let i of setup){
			solution.push(i);
		}
		swap(...targets, ready(...targets));
		for(let i of undo(setup)){
			scrCube.doMove(i);
			solution.push(i);
		};
	}
	function doSetup(tmpTargets){
		let base18 = "0123456789abcdefgh";
		originalC = [...scrCube];
		if(ready(...tmpTargets) != false){
			return ready(...tmpTargets);
		}
		for(let i=0; i<5832; i++){
			scrCube = [...originalCube];
			for(let j=0; j<i.toString(18).length; j++){
				scrCube.doMove(tmpc(base18.indexOf(i.toString(18)[j])));
			}
			if(ready(...tmpTargets)){
				for(let j=0; j<i.toString(18).length; j++){
					setup.push(tmpc(base18.indexOf(i.toString(18)[j])));
				}
				return(ready(...tmpTargets));
			}
		}
		error();
	}
	function pickPieces(){
		let tmp;
		let pieces = [];
		for(let i of firstCorners){
			if(!checkIfSolved(i)){
				tmp = i;
				if(!checkIfTwisted(i)){
					return step2();
					break;
				}
			}
		}
		return step2();
		function step2(){
			for(let i=0; i<3; i++){
				if(!checkIfSolved(tmp) && !pieces.includes(originalPos(tmp)) && !pieces.includes(second(originalPos(tmp))) && !pieces.includes(third(originalPos(tmp)))){
					pieces.push(originalPos(tmp));
					tmp = originalPos(tmp);
				}
				else{
					let sorted = false;
					tmp = undefined;
					for(let j of firstCorners){
						if(!pieces.includes(j) && !pieces.includes(second(j)) && !pieces.includes(third(j))){
							if(!checkIfSolved(j)){
								if(!checkIfTwisted(j)){
									pieces.push(j);
									tmp = j;
									sorted = true;
									break;
								}
								else{
									tmp = j;
								}
							}
							if(tmp == undefined){
								tmp = j;
							}
						}
					}
					if(!sorted){
						pieces.push(tmp);
					}
				}
			}
			return pieces;
		}
	}
	function checkIfTwisted(piece){
		if(checkPosition(piece) && checkIfSolved(piece)){
			return true;
		}
		return false;
	}
	function getOrientation(piece){
		if(firstCorners.includes(piece)){
			return 0;
		}
		else if(secondCorners.includes(piece)){
			return 1;
		}
		else{
			return 2;
		}
	}
	function allSolved(){
		for(let i of firstCorners){
			if(!checkIfSolved(i)){
				return false;
			}
		}
		return true;
	}
	function ready(origa, origb, origc){
		let newa = locatePiece(origa);
		let newb = locatePiece(origb);
		let newc = locatePiece(origc);
		let cycle = [newa, newb, newc];
		for(let i of otherFaces){
			let k = 0;
			for(let j of cycle){
				if(pieceIn(j, window[i])){
					k++;
				}
			}
			if(k==0 || k==1 || k==3){
				continue;	
			}
			else{
				for(let j=1; j<4; j++){
					for(let k=0; k<3; k++){
						if(pieceIn(cycle[k], window[i]) && !(pieceIn(cycle[(k+1)%3], window[i]) && pieceIn(cycle[(k+2)%3], window[i]))){
							if(cycle.includes(testMove(i+newerVal[j], cycle[k]))){
								if(!((rotationOffset(cycle[k], window[i]) == rotationOffset(cycle[(k+1)%3], window[i])) && (rotationOffset(cycle[k], window[i]) == rotationOffset(cycle[(k+2)%3], window[i])))){
									return i;
								}
							}
						}
					}
				}
			}
		}
		return false;
	}
	function swap(piecea, pieceb, piecec, baseF){
		let [positionA, positionB, positionC] = [piecea, pieceb, piecec].map(locatePiece);
		let startPos = [positionA, positionB, positionC];
		let currPos = [piecea, pieceb, piecec];
		let special;
		let important;
		let sideSetup = [];
		let mainSetup = [];
		let rotationNeeded;
		for(let i of startPos){
			if(!pieceIn(i, window[baseF])){
				special = i;
			}
		}
		for(let i=0; i<4; i++){
			if(typeof specificPos() == "number"){
				important = specificPos();
				break;
			}
			scrCube.doMove(baseF);
			sideSetup.push(baseF);
		}
		rotationNeeded = (rotationOffset(special, window[baseF]) - rotationOffset(important, window[baseF]) + 3) % 3;
		if(rotationNeeded == 2){
			let mainFace;
			let sideFace;
			switch(rotationOffset(special, window[baseF])){
				case 0:
					mainFace = cFace[target[important]];
					sideFace = cFace[target[third(important)]];
					break;
				case 1:
					mainFace = cFace[target[second(important)]];
					sideFace = cFace[target[important]];
					break;
				default:
					mainFace = cFace[target[third(important)]];
					sideFace = cFace[target[second(important)]];
			}
			if(pieceIn(special, window[mainFace]) && pieceIn(special, window[sideFace])){
				scrCube.doMove(mainFace);
				mainSetup.push(mainFace);
				scrCube.doMove(otherSide(baseF));
				mainSetup.push(otherSide(baseF));
				scrCube.doMove(mainFace+"i");
				mainSetup.push(mainFace+"i");
				finishOff();
				return;
			}
			if(pieceIn(special, window[sideFace]) && pieceIn(special, window[otherSide(mainFace)])){
				scrCube.doMove(otherSide(baseF));
				mainSetup.push(otherSide(baseF));
			}
			scrCube.doMove(sideFace+"i");
			mainSetup.push(sideFace+"i");
			if(pieceIn(special, window[mainFace])){
				scrCube.doMove(otherSide(baseF));
				mainSetup.push(otherSide(baseF));
			}
			else{
				scrCube.doMove(otherSide(baseF)+"2");
				mainSetup.push(otherSide(baseF)+"2");
			}
			scrCube.doMove(sideFace);
			mainSetup.push(sideFace);
			finishOff();
			return;
		}
		else{
			let mainFace;
			let sideFace;
			switch(rotationOffset(special, window[baseF])){
				case 0:
					mainFace = cFace[target[important]];
					sideFace = cFace[target[second(important)]];
					break;
				case 1:
					mainFace = cFace[target[second(important)]];
					sideFace = cFace[target[third(important)]];
					break;
				default:
					mainFace = cFace[target[third(important)]];
					sideFace = cFace[target[important]];
			}
			if(pieceIn(special, window[mainFace]) && pieceIn(special, window[sideFace])){
				scrCube.doMove(mainFace+"i");
				mainSetup.push(mainFace+"i");
				scrCube.doMove(otherSide(baseF)+"i");
				mainSetup.push(otherSide(baseF)+"i");
				scrCube.doMove(mainFace);
				mainSetup.push(mainFace);
				finishOff();
				return;
			}
			if(pieceIn(special, window[sideFace]) && pieceIn(special, window[otherSide(mainFace)])){
				scrCube.doMove(otherSide(baseF)+"i");
				mainSetup.push(otherSide(baseF)+"i");
			}
			scrCube.doMove(sideFace);
			mainSetup.push(sideFace);
			if(pieceIn(special, window[mainFace])){
				scrCube.doMove(otherSide(baseF)+"i");
				mainSetup.push(otherSide(baseF)+"i");
			}
			else{
				scrCube.doMove(otherSide(baseF)+"2");
				mainSetup.push(otherSide(baseF)+"2");
			}
			scrCube.doMove(sideFace+"i");
			mainSetup.push(sideFace+"i");
			finishOff();
			return;
		}
		function finishOff(){
			solution.push(...sideSetup);
			solution.push(...mainSetup);
			for(let i of undo(sideSetup)){
				solution.push(i);
				scrCube.doMove(i);
			}
			for(let i of undo(mainSetup)){
				solution.push(i);
				scrCube.doMove(i);
			}
		}
		function specificPos(){
			for(let i=0; i<currPos.length; i++){
				if(locatePiece(currPos[i]) == startPos[(i+1)%3]){
					return locatePiece(currPos[i]);
				}
			}
			return false;
		}
	}
	function swapB(piecea, pieceb, piecec){
		let firstPiece = [[piecea, second(piecea), third(piecea)], [pieceb, second(pieceb), third(pieceb)], [piecec, second(piecec), third(piecec)]];
		let newPiece = [];
		if(pieceb == piecec){
			error();
			return;
		}
		for(let i=0; i<3; i++){
			newPiece.push([]);
			for(let j=0; j<3; j++){
				newPiece[i].push(scrCube[firstPiece[i][j]]);
			}
		}
		for(let i=0; i<3; i++){
			for(let j=0; j<3; j++){
				scrCube[firstPiece[(i+1)%3][j]] = newPiece[i][j];
			}
		}
	}
}
function tmpc(thingya){
	return otherFaces[Math.floor(thingya/3)]+newerVal[thingya%3+1];
}
function rotationOffset(targetPiece, targetFace){
	let tmpPiece = targetPiece;
	let endResult = 0;
	while(!(targetFace.includes(tmpPiece) || otherSide(targetFace).includes(tmpPiece))){
		for(let i=0; i<24; i++){
			if(corners[Math.floor(i/3)][i%3] == tmpPiece){
				tmpPiece = corners[Math.floor(i/3)][(i+1)%3];
				break;
			}
		}
		endResult++;
	}
	return endResult;
}
/*function solvee(){
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
}*/
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
/************************************************************************Animations*******************************************************************/
ctx = c.getContext("2d", {willReadFrequently: true});
ctx.imageSmoothingEnabled = false;
vid.addEventListener("play", function(){
	if(turnNo<=solution.length-1){
		tada.innerHTML = done[turnNo];
		bar.style.width = (turnNo/solution.length)*100+"%";
		progress.innerText = Math.round((turnNo/solution.length)*100)+"%";
		request = requestAnimationFrame(draw);
	}
	else{
		tada.innerHTML = "&#128558;";
		requestb = thenPause();
	}
});
vid.addEventListener("ended", function(){
	cancelAnimationFrame(request);
	if(turnNo>=solution.length-1){
		if(turnNo>=solution.length){
			return;
		}
		else{
			bar.style.width = "100%";
			bar.style.borderRadius = "10px";
			progress.innerText = "DONE!";
			console.log("done");
			vid.src = "./Anims/"+solution[turnNo]+".mp4";
			vid.play();
			turnNo++;
			request = requestAnimationFrame(draw);
			requestb = requestAnimationFrame(thenPause);
		}
	}
	else{
		turnNo++;
		vid.src = "./Anims/"+solution[turnNo]+".mp4";
		vid.play();
	}
});
window.addEventListener("keydown", function(e){
	if("ogwbyr".includes(e.key)){
		currColour = e.key;
	}
})
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
	if(oppositeofplaying){
		cancelAnimationFrame(requestb);
		requestb = requestAnimationFrame(thenPause);
	}
}
function goForwards(){
	if(turnNo >= allStates.length-1){
		return;
	}
	vid.currentTime = 0;
	let oppositeofplaying = vid.paused;
	vid.dispatchEvent(ended);
	if(oppositeofplaying == true){
		cancelAnimationFrame(requestb);
		requestb = requestAnimationFrame(thenPause);
	}
}
function goToStart(){
	turnNo = -1;
	vid.currentTime = 0;
	vid.dispatchEvent(ended);
	cancelAnimationFrame(requestb);
	requestb = requestAnimationFrame(thenPause);
}
function goToEnd(){
	turnNo = solution.length-1;
	vid.currentTime = 0;
	vid.dispatchEvent(ended);
}
function draw(exception){
	if((!vid.paused && !vid.ended) || (exception===true)){
		if(vid.readyState == 4){
			ctx.drawImage(vid, 0, 0, 500, 500);
			bob = ctx.getImageData(0, 0, 500, 500);
			edit();
		}
		request = requestAnimationFrame(draw);
	}
	return;
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
	scrCube = inputT.value.split("");
	allStates.push([...scrCube]);
	let tmp = scrCube;
	for(let i=0; i<solution.length; i++){
		tmp.doMove(solution[i]);
		allStates.push([...tmp]);
	}
	return(allStates);
}
Array.prototype.doMove = function(move){
	let tmp = [];
	for(let i=0; i<this.length; i++){
		if("xyz".includes(move) || pieceIn(i, window[base(move).toUpperCase()])){
			if(val(move) == 3){
				tmp.push(this[window[base(move).toLowerCase()](i)]);
			}
			else if(val(move) == 2){
				tmp.push(this[window[base(move).toLowerCase()](window[base(move).toLowerCase()](i))]);
			}
			else if(val(move) == 1){
				tmp.push(this[window[base(move).toLowerCase()](window[base(move).toLowerCase()](window[base(move).toLowerCase()](i)))]);
			}
		}
		else{
			tmp.push(this[i]);
		}
	}
	this.splice(0, this.length, ...tmp);
}
function testMove(move, piece){
	if(pieceIn(piece, window[base(move)])){
		if(val(move) == 1){
			return(window[base(move).toLowerCase()](piece));
		}
		else if(val(move) == 2){
			return(window[base(move).toLowerCase()](window[base(move).toLowerCase()](piece)));
		}
		else if(val(move) == 3){
			return(window[base(move).toLowerCase()](window[base(move).toLowerCase()](window[base(move).toLowerCase()](piece))));
		}
	}
	else{
		return(piece);
	}
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
		document.getElementById(i.toString()).setAttribute("class", inputT.value[i]);
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
	if(innerWidth/innerHeight < 1.5){
		gridel.style.width = "100%";
		gridel.style.height = gridel.clientWidth*(3/4)+"px";
	}
	else{
		gridel.style.height = "100%";
		gridel.style.width = gridel.clientHeight*(4/3)+"px";
	}
	if((innerWidth/innerHeight < 0.9) && (innerWidth/innerHeight > 0.4)){
		stats.style.height = "100%";
		stats.style.fontSize = stats.offsetHeight/14+"px";
		stats.style.width = stats.offsetHeight/14*17+"px";
	}
	else{
		stats.style.width = "100%";
		stats.style.fontSize = stats.offsetWidth/17+"px";
		stats.style.height = stats.offsetWidth/17*13+"px";
	}
	tada.style.height = "100%";
	tada.style.fontSize = Math.min(tada.clientHeight, tada.clientWidth*0.8)+"px";
}
window.onresize = resize;
window.onload = resize;
/*****************************************************************************************************************************************************/
function doCross(){
	let unsolved = [];
	let stuffToDo = [46, 50, 52, 48];
	let alreadyDone = 0;
	for(let i=0; i<stuffToDo.length; i++){
		if(!checkIfSolved(stuffToDo[i])){
			unsolved.push(stuffToDo[i]);
		}
	}
	if(unsolved.length == 4){
		for(let i of unsolved){
			if(scrCube[i] == "r"){
				let j = originalPos(i);
				while(!checkIfSolved(locatePiece(j))){
					solution.push("D");
					scrCube.doMove("D");
				}
				unsolved.splice(unsolved.indexOf(j), 1);
				break;
			}
		}
	}
	for(let i=0; i<unsolved.length; i++){
		if(i==0 && unsolved.length == 4){
			let j = getFace(locatePiece(pair(unsolved[i])));
			if((j == "U") || (j == "D")){
				scrCube.doMove(getFace(locatePiece(unsolved[i])));
				solution.push(getFace(locatePiece(unsolved[i])));
				j = getFace(locatePiece(pair(unsolved[i])));
			}
			while(!stuffToDo.includes(locatePiece(unsolved[i]))){
				solution.push(j);
				scrCube.doMove(j);
			}
			while(!checkIfSolved(unsolved[i])){
				solution.push("D");
				scrCube.doMove("D");
			}
		}
		else{
			let undoMs = [];
			while(!window[order[stuffToDo.indexOf(unsolved[i])]].includes(locatePiece(pair(unsolved[i])))){
				let currPos = locatePiece(unsolved[i]);
				if(E.includes(currPos)){
					solution.push("e");
					scrCube.doMove("e");
					undoMs.push("ei");
				}
				else if(U.includes(currPos)){
					solution.push("U");
					scrCube.doMove("U");
				}
				else if(U.includes(pair(currPos))){
					if(checkIfSolved(window[getFace(currPos)][7])){
						undoMs.push(getFace(currPos)+"i");
					}
					solution.push(getFace(currPos));
					scrCube.doMove(getFace(currPos));
				}
				else if(D.includes(pair(currPos))){
					solution.push(getFace(currPos));
					scrCube.doMove(getFace(currPos));
				}
				else if(D.includes(currPos)){
					solution.push(getFace(pair(currPos)));
					scrCube.doMove(getFace(pair(currPos)));
				}
				else{
					console.log("nooooooooooooooooooooooo!");
				}
			}
			while(!checkIfSolved(unsolved[i])){
				solution.push(getFace(pair(unsolved[i])));
				scrCube.doMove(getFace(pair(unsolved[i])));
			}
			undoMs.reverse();
			for(let j of undoMs){
				solution.push(j);
				scrCube.doMove(j);
			}
			solution = simplify(solution);
			console.log(solution);
		}
	}
	for(let i of stuffToDo){
		if(!checkIfSolved(i)){
			error();
		}
	}
}
function doMiddle(){
	let unsolved = [];
	let stuffToDo = [12, 14, 21, 23, 30, 32, 39, 41];
	for(let i=0; i<stuffToDo.length; i++){
		if(!checkIfSolved(stuffToDo[i])){
			unsolved.push(stuffToDo[i]);
		}
	}
	while(unsolved.length > 2){
		for(let k of U){
			if((getType(k) == "e") && !getColour(k).includes("o")){
				let goal = originalPos(originalPos(pair(k)));
				let stuff = originalPos(pair(k));
				if(getFace(pair(k)) == getFace(stuff)){
					solution.push("U");
					scrCube.doMove("U");
				}
				let undoMs = [];
				while(!U.includes(pair(locatePiece(goal)))){
					solution.push(getFace(stuff));
					scrCube.doMove(getFace(stuff));
					undoMs.push(getFace(stuff) + "i");
				}
				while(getFace(stuff) != getFace(locatePiece(stuff))){
					solution.push("U");
					scrCube.doMove("U");
				}
				undoMs.reverse();
				for(let j of undoMs){
					solution.push(j);
					scrCube.doMove(j);
				}
				unsolved.splice(unsolved.indexOf(stuff), 1);
				unsolved.splice(unsolved.indexOf(pair(stuff)), 1);
			}
			if(unsolved.length <= 2){
				break;
			}
		}
		if(unsolved.length>2){
			let toUndo = [];
			let focusOn = originalPos(unsolved[0]);
			while(!pieceIn(locatePiece(focusOn), U)){
				solution.push(getFace(unsolved[0]));
				scrCube.doMove(getFace(unsolved[0]));
				toUndo.push(getFace(unsolved[0]));
			}
			solution.push("U");
			scrCube.doMove("U");
			for(let k of undo(toUndo)){
				solution.push(k);
				scrCube.doMove(k);
			}
		}
	}
}
function doTop(){
	let mOffset = 0;
	let tmp = [];
	let ml = [23, 21, 41, 39];
	let conversion = [1, 5, 7, 3];
	for(let i of ml){
		if(checkIfSolved(i)){
			mOffset++;
		}
		else{
			break;
		}
	}
	if(mOffset != 4){
		for(let i=0; i<mOffset; i++){
			solution.push("e");
			scrCube.doMove("e");
			tmp.push("e");
		}
	}
	else{
		mOffset = 0;
	}
	while(topOriented() == false){
		if(scrCube[23] == "o"){
			rotateUntil("U", 5, 1);
			scrCube.doMove("R");
			solution.push("R");
			rotateUntil("U", 5, 2);
			scrCube.doMove("Ri");
			solution.push("Ri");
		}
		else if(scrCube[30] == "o"){
			rotateUntil("U", 7, 1);
			scrCube.doMove("Fi");
			solution.push("Fi");
			rotateUntil("U", 7, 2);
			scrCube.doMove("F");
			solution.push("F");
		}
		else{
			scrCube.doMove("R");
			solution.push("R");
			rotateUntil("U", 5, 2);
			scrCube.doMove("Ri");
			solution.push("Ri");
		}
	}
	console.log(scrCube.join(""));
	if(!getColour(23).includes("o")){
		if(scrCube[1]+scrCube[5]+scrCube[7]+scrCube[3] == "oooo"){
			if(topPermutated() != 4){
				while(![1, 4].includes(topPermutated())){
					scrCube.doMove("U");
					solution.push("U");
				}
				if(topPermutated() == 4){
					finish();
					return;
				}
				else{
					let tmpb = false;
					let pivot;
					for(let i of conversion){
						if(checkIfSolved(i)){
							pivot = i;
							break;
						}
					}
					if(pivot == undefined){
						error();
						return;
					}
					if(originalPos(conversion[(conversion.indexOf(pivot)+1)%4]) == conversion[(conversion.indexOf(pivot)+2)%4]){
						tmpb = true;
					}
					while(locatePiece(pivot) != 7){
						scrCube.doMove("U");
						solution.push("U");
					}
					if(tmpb){
						for(let i of "LiUiLUiLiU2L".split(/(?=[A-Z])/)){
							scrCube.doMove(i);
							solution.push(i);
						}
					}
					else{
						for(let i of "RURiURU2Ri".split(/(?=[A-Z])/)){
							scrCube.doMove(i);
							solution.push(i);
						}
					}
				}
				finish();
				return;
			}
		}
		else{
			if(scrCube[28] == "o"){
				for(let i of "URUiRi".split(/(?=[A-Z])/)){
					scrCube.doMove(i);
					solution.push(i);
				}
			}
			else{
				scrCube.doMove("R");
				solution.push("R");
				while(scrCube[28] != "o"){
					scrCube.doMove("U");
					solution.push("U");
				}
				scrCube.doMove("Ri");
				solution.push("Ri");
			}
		}
	}
	if(scrCube[23] == "o"){
		rotateUntil("U", 0, 3);
		console.log(topPermutated());
		if(topPermutated() == 4){
			return;
		}
		else if(topPermutated() == 3){
			while(scrCube[7] == "o"){
				scrCube.doMove("U");
				solution.push("U");
			}
			for(let i of "RURiURURi".split(/(?=[A-Z])/)){
				scrCube.doMove(i);
				solution.push(i);
			}
			while(scrCube[19] != "w"){
				scrCube.doMove("U");
				solution.push("U");
			}
		}
		else if(topPermutated() == 0){
			console.log(scrCube.join(""));
			let offset = 1;
			let targetOffset;
			let tmpa = 0;
			let targets = [];
			let currentPos = 23;
			console.log(mOffset);
			while(targets.length<4){
				if(mOffset == 0){
					currentPos = originalPos(currentPos);
				}
				else{
					currentPos = testMove("U"+newerVal[4-mOffset], originalPos(currentPos));
				}
				targets.push(conversion.indexOf(currentPos));
			}
			console.log(targets);
			for(let i=0; i<3; i++){
				targetOffset = targets[i];
				while(offset != targetOffset){
					scrCube.doMove("U");
					solution.push("U");
					offset--;
					if(offset == -1){
						offset = 3;
					}
				}
				scrCube.doMove("R");
				solution.push("R");
				targetOffset = targets[++i];
				while(offset != targetOffset){
					scrCube.doMove("U");
					solution.push("U");
					offset--;
					if(offset == -1){
						offset = 3;
					}
				}
				scrCube.doMove("Ri");
				solution.push("Ri");
			}
		}
		else{
			rotateUntil("U", 5, 4);
			scrCube.doMove("R");
			solution.push("R");
			rotateUntil("U", 5, 5);
			scrCube.doMove("Ri");
			solution.push("Ri");
		}
	}
	else if(scrCube[30] == "o"){
		rotateUntil("U", 1, 3);
		console.log(topPermutated());
		if(topPermutated() == 4){
			return;
		}
		else if(topPermutated() == 3){
			while(scrCube[5] == "o"){
				scrCube.doMove("U");
				solution.push("U");
			}
			for(let i of "FiUiFUiFiUiF".split(/(?=[A-Z])/)){
				scrCube.doMove(i);
				solution.push(i);
			}
			while(scrCube[19] != "w"){
				scrCube.doMove("U");
				solution.push("U");
			}
		}
		else if(topPermutated() == 0){
			let offset = 2;
			let targetOffset;
			let tmpa = 0;
			let targets = [];
			let currentPos = 30;
			while(targets.length<4){
				if(mOffset == 0){
					currentPos = originalPos(currentPos);
				}
				else{
					currentPos = testMove("U"+newerVal[4-mOffset], originalPos(currentPos));
				}
				targets.push(conversion.indexOf(currentPos));
			}
			for(let i=0; i<3; i++){
				targetOffset = targets[i];
				while(offset != targetOffset){
					scrCube.doMove("U");
					solution.push("U");
					offset--;
					if(offset == -1){
						offset = 3;
					}
				}
				scrCube.doMove("Fi");
				solution.push("Fi");
				targetOffset = targets[++i];
				while(offset != targetOffset){
					scrCube.doMove("U");
					solution.push("U");
					offset--;
					if(offset == -1){
						offset = 3;
					}
				}
				scrCube.doMove("F");
				solution.push("F");
			}
		}
		else{
			rotateUntil("U", 7, 4);
			scrCube.doMove("Fi");
			solution.push("Fi");
			rotateUntil("U", 7, 5);
			scrCube.doMove("F");
			solution.push("F");
		}
	}
	finish();
	function finish(){
		while(mOffset < 4){
			solution.push("e");
			scrCube.doMove("e");
			mOffset ++;
		}
		while(scrCube[19] != "w"){
			scrCube.doMove("U");
			solution.push("U");
		}
	}
	function topOriented(){
		let incorrect = 0;
		for(let i of U){
			if((getType(i) == "e") && (scrCube[i] != "o")){
				incorrect ++;
				if(incorrect>1){
					return false;
				}
			}
		}
		if(incorrect>1){
			return false;
		}
		else{
			return true;
		}
	}
	function topPermutated(){
		let correct = 0;
		for(let i of [10, 19, 28, 37]){
			if((scrCube[i] == scrCube[i+3]) && (scrCube[pair(i)] == "o")){
				correct++;
			}
		}
		return(correct);
	}
	function rotateUntil(face, piece, condition=1){
		if(condition == 1){
			while(getColour(piece).includes("o")){
				scrCube.doMove(face);
				solution.push(face);
			}
		}
		else if(condition == 2){
			while(scrCube[pair(piece)] != "o"){
				scrCube.doMove(face);
				solution.push(face);
			}
		}
		else if(condition == 3){
			let osdif = 0;
			while(![2, 4].includes(topPermutated())){
				scrCube.doMove(face);
				solution.push(face);
				osdif++;
				console.log(osdif);
				if(osdif>=4){
					break;
				}
			}
			if(osdif == 4){
				osdif = 0;
				while(topPermutated() != 3){
					scrCube.doMove(face);
					solution.push(face);
					osdif++;
					if((osdif>=4) && (topPermutated()==0)){
						break;
					}
				}
			}
		}
		else if(condition == 4){
			let firstPos = originalPos(originalPos((piece==5) ? 23 : 30));
			while(locatePiece(firstPos) != conversion[(conversion.indexOf(piece)+mOffset)%4]){
				scrCube.doMove(face);
				solution.push(face);
			}
		}
		else if(condition == 5){
			let firstPos = originalPos(piece);
			while(scrCube[piece] == "o"){
				scrCube.doMove(face);
				solution.push(face);
			}
		}
	}
}
function getFace(piece){
	for(let i=0; i<6; i++){
		if(faces[i].includes(piece)){
			return(otherFaces[i]);
		}
	}
}
