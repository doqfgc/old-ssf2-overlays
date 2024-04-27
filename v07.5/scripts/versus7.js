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
	$('.lg').animate({$$fade: 1}, 250).then(function() {
		$('.whiteleft').animate({$$fade: 1}, 250);
		$('.whiteright').animate({$$fade: 1}, 250).then(function() {
			$('.white').animate({$$fade: 1}, 1);
			$('.red').animate({$$fade: 1}, 1);
			$('.blue').animate({$$fade: 1}, 1).then(function() {
				$('#mm').set("innerHTML", mm);
				$('.white').animate({$left: '1522px'}, 1250, 0.1);
				$('.lg').animate({$left: '559px'}, 1250, 0.1);
				$('.red').animate({$left: '646px'}, 1250, 0.1);
				$('.whiteleft').animate({$left: '-642px'}, 1250, 0.1);
				$('.whiteright').animate({$left: '1954px'}, 1250, 0.1);
				$('.blue').animate({$left: '1088px'}, 1250, 0.1).then(function() {
					$('.infowhite').animate({$$fade: 1}, 1);
				});
			});
		});
	});
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
	
	if ($('#p1b').get("innerHTML") != p1b) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.player1b').animate({$$fade: 0}, outSpeed).then(function() {
				$('#p1b').set("innerHTML", p1b);
				$('.player1b').animate({$$fade: 1}, inSpeed);
				}).then(function() { updating = false; });
            });
	}
	
	if ($('#p2b').get("innerHTML") != p2b) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
            $('.player2b').animate({$$fade: 0}, outSpeed).then(function() {
                $('#p2b').set("innerHTML", p2b);
                $('.player2b').animate({$$fade: 1}, inSpeed);
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

	var c1m = "<img src=\"icons/"+c1+".png\">"
	var c2m = "<img src=\"icons/"+c2+".png\">"
	
	if ($('#c1').get("innerHTML") != c1m) {
		updating = true;
		$('.char1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#c1').set("innerHTML", "<img src=icons/" + c1 + ".png>");
			$('.char1').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
		});
	}
	
	if ($('#c2').get("innerHTML") != c2m) {
		updating = true;
		$('.char2').animate({$$fade: 0}, outSpeed).then(function() {
			$('#c2').set("innerHTML", "<img src=icons/" + c2 + ".png>");
			$('.char2').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
        });
	}
	
	var g3 = 1;
    
   	if (g3 = 1) { //sanity check
        if ($('#g1').get("innerHTML") != g1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
            $('.game1').animate({$$fade: 0}, outSpeed).then(function() {
                $('#g1').set("innerHTML", g1);
                g3 = 2;
                $('.game1').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (g3 = 2) { //sanity check
        if ($('#g1').get("innerHTML") != g2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
            $('.game1').animate({$$fade: 0}, outSpeed).then(function() {
                $('#g1').set("innerHTML", g2);
                g3 = 1;
                $('.game1').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
	
	if ($('#mm').get("innerHTML") != mm) {
		updating = true;
		$('#mm').set("innerHTML", mm);
		$('.infowhite').animate({$left: '553px'}, 650, 0.1);
		$('.whiteleft').animate({$left: '-1230px'}, 650, 0.1);
		$('.whiteright').animate({$left: '2520px'}, 650, 0.1);
		$('.lg').animate({$left: '-112px'}, 650, 0.1);
		$('.red').animate({$left: '15px'}, 650, 0.1);
		$('.redt').animate({$left: '220px'}, 650, 0.1);
		$('.blue').animate({$left: '288px'}, 650, 0.1);
		$('.bluet').animate({$left: '210px'}, 650, 0.1);
		$('.white').animate({$left: '2053px'}, 650, 0.1);
		$('.player1').animate({$top: '-36px'}, 650, 0.1);
		$('.player1b').animate({$top: '1px'}, 650, 0.1);
		$('.player2').animate({$top: '-36px'}, 650, 0.1);
		$('.player2b').animate({$top: '1px'}, 650, 0.1);
		$('.score1').animate({$right: '170px'}, 650, 0.1);
		$('.score2').animate({$right: '170px'}, 650, 0.1);
		$('.whitet').animate({$left: '-8px'}, 1, 0.1).then(function() {
			$('.dummy').animate({$$fade: 0.1}, 5000).then(function() {
				$('.whitet').animate({$left: '424px'}, 1, 0.1);
				$('.lg').animate({$left: '559px'}, 1250, 0.1);
				$('.red').animate({$left: '646px'}, 1250, 0.1);
				$('.redt').animate({$left: '389px'}, 1250, 0.1);
				$('.blue').animate({$left: '1088px'}, 1250, 0.1);
				$('.bluet').animate({$left: '379px'}, 1250, 0.1);
				$('.whiteleft').animate({$left: '-642px'}, 1250, 0.1);
				$('.whiteright').animate({$left: '1954px'}, 1250, 0.1);
				$('.infowhite').animate({$left: '1522px'}, 1250, 0.1);
				$('.player1').animate({$top: '1px'}, 1250, 0.1);
				$('.player1b').animate({$top: '38px'}, 1250, 0.1);
				$('.player2').animate({$top: '1px'}, 1250, 0.1);
				$('.player2b').animate({$top: '38px'}, 1250, 0.1);
				$('.score1').animate({$right: '0px'}, 1250, 0.1);
				$('.score2').animate({$right: '0px'}, 1250, 0.1);
				$('.white').animate({$left: '1522px'}, 1250, 0.1).then(function() {	updating = false; });
			});
		});
	}
}