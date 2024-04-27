var newImage = new Image();
var fileUrl = "output/doubles.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 500;
var initialize = true;

var p1, p2, p3, p4, s1, s2, mm, g1, olds1, olds2;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

var sc1 = ['.score11','.score12','.score13'];
var sc2 = ['.score21','.score22','.score23'];

function getResponse() {
	p1 = getElement(responseXml, "player1A");
	p2 = getElement(responseXml, "player2A");
	p3 = getElement(responseXml, "player3A");
	p4 = getElement(responseXml, "player4A");
	s1 = getElement(responseXml, "score1");
	s2 = getElement(responseXml, "score3");
	mm = getElement(responseXml, "match");
//	gg = getElement(responseXml, "game");
	g1 = getElement(responseXml, "gameA");
//  g2 = getElement(responseXml, "gameB");
}

// onload code
$.wait(1500).then(function() {
	$('.scorebox').set('$transform', 'rotate3d(1,0,0,0deg)');
	$('.namebox').set('$transform', 'rotate3d(1,0,0,0deg)');
	$('.flash').animate({$$fade: 1}, 300).then(function() {
		$('.flash').animate({$$fade: 0}, 700);
		$('.scoremain').animate({$$fade: 1}, 700);
		$('.pname').animate({$$fade: 1}, 700);
		$('.pname2').animate({$$fade: 1}, 700);
	});
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

function wigglePieces() {
	$('.p1n').set('$left', '599px');
	$('.p2n').set('$right', '599px');
	$('.namebox').set('$top', '26px');
	$('.scorebox').set('$top', '23px');
	$.wait(5000).then(function() {
		$('.p1n').set('$left', '609px');
		$('.p2n').set('$right', '609px');
		$('.namebox').set('$top', '31px');
		$('.scorebox').set('$top', '18px');
		$.wait(5000);
	});
}

owo = setInterval(wigglePieces, 10000);


function runUpdate() {
	//if (timeOld == timeNew) return;

	if ($('#p1').get("innerHTML") != p1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('#p1').animate({$$fade: 0}, outSpeed).then(function() {
				$('#p1').set("innerHTML", p1);
				$('.player1').animate({$right: '-730px', $bottom: '340px'}, 1).then(function() {
					$('#p1').animate({$$fade: 1}, inSpeed).then(function() {
						$('.player1').animate({$right: '-7px', $bottom: '212px'}, inSpeed);
					});
				});
			});
			$('#p2').animate({$$fade: 0}, outSpeed).then(function() {
				$('#p2').set("innerHTML", p2);
				$.wait(250).then(function(){ 
					$('.player3').animate({$right: '-730px', $bottom: '301px'}, 1).then(function() {
						$('#p2').animate({$$fade: 1}, inSpeed).then(function() {
							$('.player3').animate({$right: '-7px', $bottom: '173px'}, inSpeed);
						}).then(function() { updating = false; });
					});
				});
			});
		});
	}

	if ($('#p3').get("innerHTML") != p3) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
            $('#p3').animate({$$fade: 0}, outSpeed).then(function() {
                $('#p3').set("innerHTML", p3);
				$('.player2').animate({$right: '1272px', $bottom: '-133px'}, 1).then(function() {
					$('#p3').animate({$$fade: 1}, inSpeed).then(function() {
						$('.player2').animate({$right: '230px', $bottom: '57px'}, inSpeed);
					});
				});
			});
            $('#p4').animate({$$fade: 0}, outSpeed).then(function() {
                $('#p4').set("innerHTML", p4);
				$.wait(250).then(function(){ 
					$('.player4').animate({$right: '1272px', $bottom: '-171px'}, 1).then(function() {
						$('#p4').animate({$$fade: 1}, inSpeed).then(function() {
							$('.player4').animate({$right: '230px', $bottom: '19px'}, inSpeed);
						}).then(function() { updating = false; });
					});
				});
			});
		});
	}

	if ($('#s1').get("innerHTML") != s1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.p1s').animate({$$fade: 0}, outSpeed).then(function() {
				$('#s1').set("innerHTML", s1);
				flashScore('.p1s');
				updating = false;
			});
		});
	}

	if ($('#s2').get("innerHTML") != s2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.p2s').animate({$$fade: 0}, outSpeed).then(function() {
				$('#s2').set("innerHTML", s2);
				flashScore('.p2s');
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