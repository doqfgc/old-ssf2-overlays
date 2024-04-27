var newImage = new Image();
var fileUrl = "output/versus2.xml";
var upSpeed = 7500;
var inSpeed = 1000;
var outSpeed = 500;

var p1, p2, s1, s2, mm, gg, c1, c2;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

function getResponse() {
	p1 = getElement(responseXml, "player1");
	p2 = getElement(responseXml, "player2");
	s1 = getElement(responseXml, "score1");
	s2 = getElement(responseXml, "score2");
	mm = getElement(responseXml, "match");
//	gg = getElement(responseXml, "game");
	g1 = getElement(responseXml, "gameA");
	g2 = getElement(responseXml, "gameB");
	c1 = getElement(responseXml, "image1");
	c2 = getElement(responseXml, "image2");
}

function runUpdate() {
	//if (timeOld == timeNew) return;
	
	if ($('#mm').get("innerHTML") != mm) {
		updating = true;
		$('.top').animate({$top: '80px'}, outSpeed).then(function() {
			$('#mm').set("innerHTML", mm);
			$('.top').animate({$top: '0'}, inSpeed).then(function() { updating = false; });
		});
	}
	
	if ($('#p1').get("innerHTML") != p1) {
		updating = true;
		$('.players .player1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#p1').set("innerHTML", p1);
			$('.players .player1').animate({$left: '350px'}, 2)
			.then(function() {
				$('.players .player1').animate({$$fade: 1, $left: '325px'}, inSpeed);
			}).then(function() { updating = false; });
		});
	}
	
	if ($('#p2').get("innerHTML") != p2) {
		updating = true;
		$('.players .player2').animate({$$fade: 0}, outSpeed).then(function() {
			$('#p2').set("innerHTML", p2);
			$('.players .player2').animate({$left: '1550px'}, 2)
			.then(function() {
				$('.players .player2').animate({$$fade: 1, $left: '1525px'}, inSpeed);
			}).then(function() { updating = false; });
		});
	}
	
	if ($('#s1').get("innerHTML") != s1) {
		updating = true;
		$('.scores .score1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s1').set("innerHTML", s1);
			$('.scores .score1').animate({$top: '80px'}, 2)
			.then(function() {
				$('.scores .score1').animate({$$fade: 1}, 2);
			}).then(function() {
				$('.scores .score1').animate({$top: '20px'}, inSpeed)
			}).then(function() { updating = false; });
		});
	}
	
	if ($('#s2').get("innerHTML") != s2) {
		updating = true;
		$('.scores .score2').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s2').set("innerHTML", s2);
			$('.scores .score2').animate({$top: '80px'}, 2)
			.then(function() {
				$('.scores .score2').animate({$$fade: 1}, 2);
			}).then(function() {
				$('.scores .score2').animate({$top: '20px'}, inSpeed)
			}).then(function() { updating = false; });
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
            updating = true;
            $('.game1').animate({$$fade: 0, $left: '2550px'}, outSpeed).then(function() {
                $('#g1').set("innerHTML", g1);
                g3 = 2;
                $('.game1').animate({$left: '2600px'}, 2)
                .then(function() {
                    $('.game1').animate({$$fade: 1, $left: '2575px'}, outSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (g3 = 2) { //sanity check
        if ($('#g1').get("innerHTML") != g2) {
            updating = true;
            $('.game1').animate({$$fade: 0, $left: '2550px'}, outSpeed).then(function() {
                $('#g1').set("innerHTML", g2);
                g3 = 1;
                $('.game1').animate({$left: '2600px'}, 2)
                .then(function() {
                    $('.game1').animate({$$fade: 1, $left: '2575px'}, outSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
}