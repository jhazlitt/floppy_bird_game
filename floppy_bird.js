var velocity = 1;
var birdAltitude = 10;
var totalRotatedDegrees = 0;
var score = 0;
var towerBottomTop;
var towerTopHeight;
var gamePlaying = false;

$(document).ready(welcomeScreen);

function welcomeScreen(){
	$(document).keydown(function(evt) {
		if (!gamePlaying && (evt.keyCode === 13)) {
			setupGame();
		}
	});

	$('#welcome_screen').click(setupGame);
}

function setupGame(){
	$('#welcome_screen').hide();
	$('#game').append('<div id="bird"></div>');
	$('#game').append('<div class="tower" id="towerBottom1"></div>');
	$('#game').append('<div class="tower" id="towerTop1"></div>');
	gamePlaying = true;
	playGame();
}

function playGame(){
	$(document).keydown(function(evt) {
		if ((evt.keyCode === 32) || (evt.keyCode === 38)) {
			if (birdAltitude - 100 >= 0) {
				$('#bird').stop();
				totalRotatedDegrees = 0;
				rotateBird(totalRotatedDegrees);
				$('#bird').animate({ top: "-=100" }, 50, "linear");
				velocity = 1;
			}
		}
	});

	generateTowers();

	moveLeft('#towerBottom1');
	moveLeft('#towerTop1');

	towerSpawner = setInterval(function(){
		generateTowers();
		moveLeft('#towerBottom1');
		moveLeft('#towerTop1');
		score += 1;
	}, 7100);

	collisionDetection = setInterval(function(){
		$('#ground').html("<h1>SCORE: " + score + "</h1>");
		birdAltitude = $('#bird').position().top;	

		if (birdAltitude >= 540) {
			$('#bird').stop();
			$('#bird').hide();
			gameOver();
		}
		else if (birdAltitude < -5) {
			totalRotatedDegrees = 0;
			rotateBird(totalRotatedDegrees);
			$('#bird').stop();
			$('#bird').css( "top" , "0px" );
		}
		var towerTopLeft = $('#towerTop1').position().left;
		if ((birdAltitude <= towerTopHeight) && (towerTopLeft <= 300) && ((towerTopLeft + 100) >= 300)){
			gameOver();
		}
		else if ((birdAltitude >= towerBottomTop) && (towerBottomLeft <= 300) && ((towerBottomLeft + 100) >= 300)){
			gameOver();
		}
	},1);
	
	birdInterval = setInterval(function(){
			if (totalRotatedDegrees < 90) {
				totalRotatedDegrees += 5;
			}
			rotateBird(totalRotatedDegrees);
			$('#bird').animate({ top: "+=" + velocity + "" }, 100, "linear");
			velocity = velocity + 5;
	},100);
}

function rotateBird(degrees){
	$('#bird').css('-moz-transform', 'rotate(' + degrees + 'deg)');
	$('#bird').css('-webkit-transform', 'rotate(' + degrees + 'deg)');
	$('#bird').css('-o-transform', 'rotate(' + degrees + 'deg)');
	$('#bird').css('-ms-transform', 'rotate(' + degrees + 'deg)');
}

function moveLeft(ID){
	$(ID).animate({ left: "-=100px", width: "+=100px" }, 1000, "linear");
	$(ID).animate({ left: "-=500px" }, 5000, "linear");
	$(ID).animate({ width: "-=100px" }, 1000, "linear");
}

function generateTowers(){
	var openingWidth = "";
	if (score <= 200){
		openingWidth = 200 + (200 - score);
	}
	else {
		openingWidth = 200;
	}
	totalTowerHeight = 540 - openingWidth;

	towerBottomHeight = Math.floor(Math.random() * totalTowerHeight) + 10;
	towerTopHeight = totalTowerHeight - towerBottomHeight + 20;
	
	towerBottomTop = 540 - towerBottomHeight;

	$('#towerBottom1').css({"top": "" + towerBottomTop + "px", "left": "600px", "height": "" + towerBottomHeight + "px", "width": "0px"});
	$('#towerTop1').css({"top": "0px", "left": "600px", "height": "" + towerTopHeight + "px", "width": "0px"});
}

function gameOver(){
	$('#bird').finish();
	$('#bird').hide();
	$('#towerTop1').finish();
	$('#towerBottom1').finish();
	clearInterval(towerSpawner);
	clearInterval(collisionDetection);
	clearInterval(birdInterval);
	$('#game').append('<div id="game_over_message"><b>GAME OVER</b></div>');
	$('#game_over_message').click(function(){
		location.reload();
	});
}
