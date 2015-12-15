var velocity = 1;
var birdAltitude = 10;
var totalRotatedDegrees = 0;

$(document).ready(moveBird);

function moveBird(){
	$(document).keydown(function(evt) {
		if (evt.keyCode === 32) {
			if (birdAltitude - 100 >= 0) {
				totalRotatedDegrees = 0;
				rotateBird(totalRotatedDegrees);
				$('#bird').animate({ top: "-=100" }, 50, "linear");
				velocity = 1;
			}
		}
	});

	setInterval(function(){
		birdAltitude = $('#bird').position().top;	

		if (birdAltitude >= 570) {
			$('#bird').stop();
			$('#bird').hide();
		}
		else if (birdAltitude < -5) {
			totalRotatedDegrees = 0;
			rotateBird(totalRotatedDegrees);
			$('#bird').stop();
			$('#bird').css( "top" , "0px" );
		}
	},1);
	
	setInterval(function(){
//		if ((birdAltitude < 570) && ((birdAltitude + (velocity + 5)) < 570)) {
			if (totalRotatedDegrees < 90) {
				totalRotatedDegrees += 5;
			}
			rotateBird(totalRotatedDegrees);
			$('#bird').animate({ top: "+=" + velocity + "" }, 100, "linear");
			velocity = velocity + 5;
//		}
	},100);
}

function rotateBird(degrees){
	$('#bird').css('-moz-transform', 'rotate(' + degrees + 'deg)');
	$('#bird').css('-webkit-transform', 'rotate(' + degrees + 'deg)');
	$('#bird').css('-o-transform', 'rotate(' + degrees + 'deg)');
	$('#bird').css('-ms-transform', 'rotate(' + degrees + 'deg)');
}
