var newImage = new Image();
var fileUrl = "output/versus2.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 750;

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
		$('.bg').animate({$left: '-3840px'}, 1).then(function() {
			$('#mm').set("innerHTML", mm);
            $('.bg').animate({$left: '-2095px'}, 1500).then(function() {
                $('.bgwl').animate({$$fade: 1}, 250, 0).then(function() {
                    $('.bgr').animate({$$fade: 1}, 250).then(function() {
                        $('.bgb').animate({$$fade: 1}, 250).then(function() {
                            $('.bgwr').animate({$$fade: 1}, 250).then(function() {
                                $('.dummy').animate({$$fade: 1}, 1000).then(function() {
                                    $('.lg').animate({$$fade: 1}, 1000).then(function() {updating = false; });
                                });
                            });
                        });
                    });
                });
            });
		});
	}
	
	if ($('#p1').get("innerHTML") != p1) {
        $('.dummy').animate({$$fade: 0}, 500).then(function() {
		updating = true;
		$('.players .player1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#p1').set("innerHTML", p1)
			$('.players .player1').animate({$$fade: 1}, inSpeed);
			}).then(function() { updating = false; });
		});
	}
	
	if ($('#p2').get("innerHTML") != p2) {
        $('.dummy').animate({$$fade: 0}, 500).then(function() {
            updating = true;
            $('.players .player2').animate({$$fade: 0}, outSpeed).then(function() {
                $('#p2').set("innerHTML", p2)
                $('.players .player2').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });
		});
	}
	
	if ($('#s1').get("innerHTML") != s1) {
        $('.dummy').animate({$$fade: 0}, 500).then(function() {
		updating = true;
		$('.scores .score1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s1').set("innerHTML", s1);
			$('.scores .score1').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
		});
	}
	
	if ($('#s2').get("innerHTML") != s2) {
        $('.dummy').animate({$$fade: 0}, 500).then(function() {
		updating = true;
		$('.scores .score2').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s2').set("innerHTML", s2);
			$('.scores .score2').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
		});
	}

	var c1m = "<img src=\"icons/"+c1+".png\">"
	var c2m = "<img src=\"icons/"+c2+".png\">"
	
	if ($('#c1').get("innerHTML") != c1m) {
        $('.dummy').animate({$$fade: 0}, 500).then(function() {
		updating = true;
		$('.char1').animate({$$fade: 0}, outSpeed).then(function() {
			$('#c1').set("innerHTML", "<img src=icons/" + c1 + ".png>");
			$('.char1').animate({$$fade: 0.2}, inSpeed).then(function() { updating = false; });
            });
		});
	}
	
	if ($('#c2').get("innerHTML") != c2m) {
        $('.dummy').animate({$$fade: 0}, 500).then(function() {
		updating = true;
		$('.char2').animate({$$fade: 0}, outSpeed).then(function() {
			$('#c2').set("innerHTML", "<img src=icons/" + c2 + ".png>");
			$('.char2').animate({$$fade: 0.2}, inSpeed).then(function() { updating = false; });
            });
		});
	}
	/*
	var g3 = 1;
    
   	if (g3 = 1) { //sanity check
        if ($('#g1').get("innerHTML") != g1) {
        $('.dummy').animate({$$fade: 0}, 1500).then(function() {
            updating = true;
            $('.game1').animate({$$fade: 0}, outSpeed).then(function() {
                $('#g1').set("innerHTML", g1);
                g3 = 2;
                $('.game1').animate({$left: '1585px'}, 2)
                .then(function() {
                    $('.game1').animate({$$fade: 1, $left: '1560px'}, inSpeed);
                }).then(function() { updating = false; });
            });
            });
        }
    }
    
   	if (g3 = 2) { //sanity check
        if ($('#g1').get("innerHTML") != g2) {
        $('.dummy').animate({$$fade: 0}, 1500).then(function() {
            updating = true;
            $('.game1').animate({$$fade: 0}, outSpeed).then(function() {
                $('#g1').set("innerHTML", g2);
                g3 = 1;
                $('.game1').animate({$left: '1585px'}, 2)
                .then(function() {
                    $('.game1').animate({$$fade: 1, $left: '1560px'}, inSpeed);
                }).then(function() { updating = false; });
            });
            });
        }
    }
    */
    
    if ($('#g1').get("innerHTML") != g1) {
    $('.dummy').animate({$$fade: 0}, 500).then(function() {
        updating = true;
        $('.game1').animate({$$fade: 0}, outSpeed).then(function() {
            $('#g1').set("innerHTML", g1);
                $('.game1').animate({$$fade: 1}, inSpeed);
                $('.bgcr').animate({$$fade: 1}, inSpeed);
            }).then(function() { updating = false; });
        });
    }
}