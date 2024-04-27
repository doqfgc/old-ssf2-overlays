var newImage = new Image();
var fileUrl = "output/versus2.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 750;
var initialize = true;

var p1, p2, s1, s2, mm, gg, c1, c2;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

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

$('.dummy').animate({$$fade: 0}, 1).then(function() {
	$('.fgmain').animate({$left: '1080px'}, 750, 0);
});

function runUpdate() {
	//if (timeOld == timeNew) return;
	
	if ($('#p1').get("innerHTML") != p1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.player1').animate({$$fade: 0}, outSpeed).then(function() {
				$('#p1').set("innerHTML", p1);
				$('.player1').animate({$$fade: 1}, inSpeed);
				}).then(function() { updating = false; });
            });
	}
	
	if ($('#p2').get("innerHTML") != p2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
            $('.player2').animate({$$fade: 0}, outSpeed).then(function() {
                $('#p2').set("innerHTML", p2);
                $('.player2').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });
			});
	}
	
	if ($('#s1').get("innerHTML") != s1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
		updating = true;
		$('.score1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s1').set("innerHTML", s1);
			$('.score1').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
		});
	}
	
	if ($('#s2').get("innerHTML") != s2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
		updating = true;
		$('.score2').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s2').set("innerHTML", s2);
			$('.score2').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
		});
	}
	
	if ($('#g1').get("innerHTML") != g1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
		updating = true;
		$('.game1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#g1').set("innerHTML", g1);
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