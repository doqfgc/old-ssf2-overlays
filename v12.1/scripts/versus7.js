var newImage = new Image();
var fileUrls = ["output/versus2.xml", "output/wl.xml"];
var upSpeed = 6000;
var inSpeed = 500;
var outSpeed = 500;
var initialize = true;

var p1, p2, r1w, r2w, r1l, r2l, s1, s2, mm, gg, c1, c2, olds1, olds2;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

var sc1 = ['.score11','.score12','.score13'];
var sc2 = ['.score21','.score22','.score23'];

//set true on load to avoid preloading text
updating = true;

function getResponse() {
	p1 = getElement(responseXml, "player1A");
	p2 = getElement(responseXml, "player2A");
	s1 = getElement(responseXml, "score1");
	s2 = getElement(responseXml, "score2");
	mm = getElement(responseXml, "match");
//	gg = getElement(responseXml, "game");
	g1 = getElement(responseXml, "gameA");
	g2 = getElement(responseXml, "gameB");
	c1 = getElement(responseXml, "image1");
	c2 = getElement(responseXml, "image2");
}

function getResponse2() {
	r1w = getElement(responseXml2, "count1");
	r1l = getElement(responseXml2, "count2");
	r2w = getElement(responseXml2, "count3");
	r2l = getElement(responseXml2, "count4");
}

// onload code
$.wait(1000).then(function() {
	$('#c1').set('$top', '-55px');
	updating = false;
	checkUpdate();
	$.wait(200).then(function() {
		$('#c2').set('$top', '55px');
		$.wait(200).then(function() {
			$('#cr').set('$top', '-35px');
			$.wait(500).then(function() {
				$('.coverbox').set('$visibility', 'hidden');
			});
		});
	});
});

function flashScore(parr) {
	//$(parr).animate({$$fade: 1}, 250).then(function() {
	//	$(parr).animate({$$fade: 0}, 250).then(function() {
	//		$(parr).animate({$$fade: 1}, 250).then(function() {
	//			$(parr).animate({$$fade: 0}, 250).then(function() {
					$(parr).animate({$$fade: 1}, 500);
	//			});
	//		});
	//	});
	//});
}

function runUpdate() {
	//if (timeOld == timeNew) return;

	if ($('#p1').get("innerHTML") != p1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('#p1').set('$opacity', 0)
			$.wait(inSpeed).then(function() {
				$('#p1').set("innerHTML", p1);
				$('#p1').animate({$left: '80px'}, 1)
				$.wait(inSpeed).then(function() {
					$('#p1').set('$opacity', 1);
					$('#p1').set('$left', '30px');
					$.wait(inSpeed).then(function() { updating = false; });
				});
			});
		});
	}

	if ($('#p2').get("innerHTML") != p2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
            updating = true;
			$('#p2').set('$opacity', 0)
			$.wait(inSpeed).then(function() {
				$('#p2').set("innerHTML", p2);
				$('#p2').animate({$left: '80px'}, 1)
				$.wait(inSpeed).then(function() {
					$('#p2').set('$opacity', 1);
					$('#p2').set('$left', '30px');
					$.wait(inSpeed).then(function() { updating = false; });
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

	if ($('#r1').get("innerHTML") != (r1w + '-' + r1l)) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.p1r').animate({$$fade: 0}, outSpeed).then(function() {
				$('#r1').set("innerHTML", r1w + '-' + r1l);
				flashScore('.p1r');
				updating = false;
			});
		});
	}

	if ($('#r2').get("innerHTML") != (r2w + '-' + r2l)) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.p2r').animate({$$fade: 0}, outSpeed).then(function() {
				$('#r2').set("innerHTML", r2w + '-' + r2l);
				flashScore('.p2r');
				updating = false;
			});
		});
	}

	if ($('#g1').get("innerHTML") != g1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
		updating = true;
		$('.rtext').animate({$$fade: 0}, outSpeed).then(function() {
			$('#g1').set("innerHTML", g1);
			$('.rtext').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
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