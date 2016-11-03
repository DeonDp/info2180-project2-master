window.onload =function() {

	var button =document.getElementById('shufflebutton');
	var puzzle =document.getElementById('puzzlearea');
	var tiles =puzzle.getElementsByTagName('div');
	var emptypos =['300300'];

	init(tiles);

	button.onclick =function shuffle() {
		
		var spotChoice, rmvnassgn;
		var puzzleposs =['0px,0px','100px,0px','200px,0px','300px,0px','0px,100px','100px,100px',
		'200px,100px','300px,100px','0px,200px','100px,200px','200px,200px',
		'300px,200px','0px,300px','100px,300px','200px,300px'];

		for (var i =0; i <15; i++) {

			spotChoice =Math.floor(Math.random() * puzzleposs.length);
			rmvnassgn =puzzleposs.splice(spotChoice,1).toString();
			tiles[i].style.left =rmvnassgn.split(',',2)[0];
			tiles[i].style.top =rmvnassgn.split(',',2)[1];
			tiles[i].onclick =function() {makeMove(emptypos,this);};
		}
	};
};

function init(tiles) {

	var topPosition =0;
	var leftPosition =0;
	var count =0;
	var ctrl =4;

	for (var i =0; i <4 ; i++) {
		
		while (count <ctrl) {
			if (i +count ===15) {
				break;
			}
			else {
            tiles[i +count].className ='puzzlepiece';
            tiles[i +count].style.left =leftPosition +'px';
            tiles[i +count].style.top =topPosition +'px';
            tiles[i +count].style.backgroundPosition =  '-'+leftPosition+ 'px '+'-'+topPosition+'px';
           	leftPosition +=100;
			count ++;
			}
        }
        count -=1;
        ctrl +=3;
        topPosition +=100;
		leftPosition =0;	
    }
}

function makeMove(tiles,tile) {
	
	var pos =tile.getAttribute('style');
	var posStyle =pos.substring(0,pos.indexOf('background'));

	var left =posStyle.split(';',2)[0].split(':',2)[1];
	var top =posStyle.split(';',2)[1].split(':',2)[1];

	var leftVal =left.substring(1,left.indexOf('px'));
	var topVal =top.substring(1,top.indexOf('px'));

	var adjLeftLeft =leftVal -100;
	var adjLeftRight =parseInt(leftVal) +100;
	var adjTopUp = topVal -100;
	var adjTopDown =parseInt(topVal) +100;

	var validclick =false
	while(!validclick) {

		if (adjLeftLeft >=0) {

			var testpos =[adjLeftLeft+topVal];
			var thispos =[leftVal+topVal];

			if (tiles[0] === testpos[0]) {
				tiles.splice(0,1,thispos[0]);
				tile.setAttribute('style','left:'+adjLeftLeft+'px; top:'+top+'; '+pos.substring(pos.indexOf('background')));
			
				validclick =true;
				
				break;
			}
		}

		if (adjLeftRight <=300) {

			var testpos =[adjLeftRight+topVal];
			var thispos =[leftVal+topVal];

			if (tiles[0] === testpos[0]){
				tiles.splice(0,1,thispos[0]);
				tile.setAttribute('style','left:'+adjLeftRight+'px; top:'+top+'; '+pos.substring(pos.indexOf('background')));
				
				validclick =true;
				
				break;
			}
		}

		if (adjTopUp >=0) {

			var testpos =[leftVal+adjTopUp];
			var thispos =[leftVal+topVal];
			
			if (tiles[0] === testpos[0]) {
				tiles.splice(0,1,thispos[0]);
				tile.setAttribute('style','left:'+left+'; top:'+adjTopUp+'px; '+pos.substring(pos.indexOf('background')));
				
				validclick =true;
				
				break;
			}
		}	

		if (adjTopDown <=300) {

			var testpos =[leftVal+adjTopDown];//[adjTopDown+'px',left];
			var thispos =[leftVal+topVal];
			
			if (tiles[0] === testpos[0]) {
				tiles.splice(0,1,thispos[0]);
				tile.setAttribute('style','left:'+left+'; top:'+adjTopDown+'px; '+pos.substring(pos.indexOf('background')));
				
				validclick =true;
				
				break;
			}
		}
		break;	
	}			
}