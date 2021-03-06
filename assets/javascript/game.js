$(document).ready(function(){

	/* ********** GAME SETUP ********** */

	// keep track of wins/losses
	var wins = 0;
	var losses = 0;
	var roundOver = false;

	// score var
	var score;

	// random # to match
	var randomMatch;

	// audio file
	var audio = new Audio('assets/javascript/bgmusic.mp3');
	
	audio.addEventListener('ended', function(){
		// loop after finished
		this.currentTime = 0;
		this.play();
	}, false);

	audio.play();

	// array to store images
	var crystalGems = [];


	// crystal gems put in an image array
	var gems = [ 
				"assets/images/rosequartz.png",
				"assets/images/sapphire.png",
				"assets/images/amethyst.png",
				"assets/images/peridot.png"
				];

	// steven images put in an array
	var stevens = ["assets/images/stevenwait.png",
					"assets/images/stevenwin.png",
					"assets/images/stevenlose.png"
				]

	for (var i = 0; i < gems.length; i++) {

		crystalGems += "<div class='col-md-3 gems'><img class='gemImg'" +
					"id='" + i + "' src='" + gems[i] + "'/></div>";
	}

	$('#crystalGems').html(crystalGems);

	function setGame() {
	// function to initialize the game/each round

		// reset score
		score = 0;

		// display starting image
		$('div#imgPrint').html("<img id='steven waitIMG' src='" + stevens[0] + "'/>");

		// update score on each click
		$('h2#scorePrint').html("SCORE: " + score);

		roundOver = false;

		// grab the random # b/t 19 & 120 that players must match
		randomMatch = Math.floor((Math.random() * 102) + 19);

		// display random #
		$('h2#randomPrint').html("MATCH: " + randomMatch);

		// array to store random crystal values
		window.randomGems = [];

		// loop through the gems to assign random values
		for (var j = 0; j < gems.length; j++){

			// grab the random number
			var gemVal = Math.floor((Math.random() * 12) + 1);

			if(randomGems.indexOf(gemVal) == -1) {
				// push it into randomGems array
				randomGems.push(gemVal);
			}

			else {
				j = j - 1;
			}


		}

		console.log(randomGems);

		return randomMatch, score;
	}

	setGame();

	/* ********** GAME PLAY ********** */	

	// update score on click

	$('.gemImg').on('click', function(){

		// grab the index number via clicked img
		var index = $(this).attr('id');

		// grab the appropriate value using the index
		var clickedGem = randomGems[index];

		console.log(clickedGem);

		// tally up score
		score = parseInt(score + clickedGem);

		console.log(score);

		// update score on each click
		$('h2#scorePrint').html("SCORE: " + score);


		// check score vs randomMatch
		if (score === randomMatch) {
			// set conditions for winning 

			// update win count 
			wins++;

			$('#winsPrint').html("WINS: " + wins);

			$('div#imgPrint').html("<img id='steven winIMG' src='" + stevens[1] + "'/>");

			roundOver = true;

		}

		else if (score > randomMatch) {
			// set conditions for losing

			// update loss count 
			losses++;

			$('#lossesPrint').html("LOSSES: " + losses);

			$('div#imgPrint').html("<img id='steven loseIMG' src='" + stevens[2] + "'/>");

			roundOver = true;

		}

		if (roundOver == true) {

			// reset game
			setTimeout(setGame, 1500);

		}

	});




});