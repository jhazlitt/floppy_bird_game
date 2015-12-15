var velocity = 1;
var birdAltitude = 0;

$(document).ready(moveBird);

function moveBird(){
	$(document).keydown(function(evt) {
		if (evt.keyCode === 32) {
			if (birdAltitude - 100 >= 0) {
				$('#bird').animate({ top: "-=100" }, 50, "linear");
				velocity = 1;
			}
		}
	});

	setInterval(function(){
		birdAltitude = $('#bird').position().top;	
		$('#bird').text(birdAltitude);
	},1);
	
	setInterval(function(){
		if ((birdAltitude < 570) && ((birdAltitude + (velocity + 5)) < 570)) {
			$('#bird').animate({ top: "+=" + velocity + "" }, 100, "linear");
			velocity = velocity + 5;
		}
	},100);
}
