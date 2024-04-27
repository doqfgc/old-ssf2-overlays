var newImage = new Image();
var fileUrl = "output/versus2.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 500;
var initialize = true;

var p1, p2, s1, s2, mm, gg, c1, c2, olds1, olds2;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

var sc1 = ['.score11','.score12','.score13'];
var sc2 = ['.score21','.score22','.score23'];

function getResponse() {
	p1 = getElement(responseXml, "player1A");
	p2 = getElement(responseXml, "player2A");
	p1b = getElement(responseXml, "player1B");
	p2b = getElement(responseXml, "player2B");
	s1 = getElement(responseXml, "score1");
	s2 = getElement(responseXml, "score2");
	mm = getElement(responseXml, "match");
//	gg = getElement(responseXml, "game");
	g1 = getElement(responseXml, "gameA");
	g2 = getElement(responseXml, "gameB");
	c1 = getElement(responseXml, "image1");
	c2 = getElement(responseXml, "image2");
}

// onload code
$('.dummy').animate({$$fade: 0}, 1).then(function() {
	$('.scoreb10').animate({$bottom: 0}, 750);
	$('.scoreb11').animate({$bottom: 0}, 750);
	$('.scoreb12').animate({$bottom: 0}, 750);
	$('.scoreb13').animate({$bottom: 0}, 750);
	$('.scoreb14').animate({$bottom: 0}, 750);
	$('.scorep11').animate({$bottom: 0}, 750);
	$('.scorep12').animate({$bottom: 0}, 750);
	$('.scorep13').animate({$bottom: 0}, 750);
	$('.scoreb20').animate({$bottom: 0}, 750);
	$('.scoreb21').animate({$bottom: 0}, 750);
	$('.scoreb22').animate({$bottom: 0}, 750);
	$('.scoreb23').animate({$bottom: 0}, 750);
	$('.scoreb24').animate({$bottom: 0}, 750);
	$('.scorep21').animate({$bottom: 0}, 750);
	$('.scorep22').animate({$bottom: 0}, 750);
	$('.scorep23').animate({$bottom: 0}, 750);
	$('.dummy').animate({$bottom: 0}, 2000).then(function() {
		$('.mainlogo').animate({$$fade: 1}, 1000);
	})
});

function flashScore(parr) {
	$(parr).animate({$$fade: 1}, 250).then(function() {
		$(parr).animate({$$fade: 0}, 250).then(function() {
			$(parr).animate({$$fade: 1}, 250).then(function() {
				$(parr).animate({$$fade: 0}, 250).then(function() {
					$(parr).animate({$$fade: 1}, 250);
				});
			});
		});
	});
}

function runUpdate() {
	//if (timeOld == timeNew) return;

	if ($('#p1').get("innerHTML") != p1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.player1').animate({$$fade: 0}, outSpeed).then(function() {
				$('#p1').set("innerHTML", p1);
				$('.player1').animate({$right: '-730px', $bottom: '325px'}, 1).then(function() {
					$('.player1').animate({$$fade: 1}, 1).then(function() {
						$('.player1').animate({$right: '-7px', $bottom: '197px'}, inSpeed);
					}).then(function() { updating = false; });
				});
			});
		});
	}

	if ($('#p2').get("innerHTML") != p2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
            $('.player2').animate({$$fade: 0}, outSpeed).then(function() {
                $('#p2').set("innerHTML", p2);
				$('.player2').animate({$right: '1272px', $bottom: '-148px'}, 1).then(function() {
					$('.player2').animate({$$fade: 1}, 1).then(function() {
						$('.player2').animate({$right: '230px', $bottom: '42px'}, inSpeed);
					}).then(function() { updating = false; });
				});
			});
		});
	}

	if ($('#s1').get("innerHTML") != s1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.score1').animate({$$fade: 0}, outSpeed).then(function() {
				$('#s1').set("innerHTML", s1);
				flashScore('.score1');
				updating = false;
			});
		});
	}

	if ($('#s2').get("innerHTML") != s2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.score2').animate({$$fade: 0}, outSpeed).then(function() {
				$('#s2').set("innerHTML", s2);
				flashScore('.score2');
				updating = false;
			});
		});
	}

	if ($('#g1').get("innerHTML") != g1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
		updating = true;
		$('.game1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#g1').set("innerHTML", g1);
			$('.setb1').animate({$right: '0px'}, inSpeed);
			$('.setb2').animate({$right: '0px'}, inSpeed);
			$('.game1').animate({$left: '125px'}, 2000);
			$('.game1').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
		});
	}

	if ($('#mm').get("innerHTML") != mm) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
		updating = true;
		$('.match1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#mm').set("innerHTML", mm);
			$('.match1').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
		});
	}
}