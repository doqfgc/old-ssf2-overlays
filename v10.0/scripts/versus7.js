var newImage = new Image();
var fileUrl = "output/versus2.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 750;
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
	$('.magental').animate({$left: '-1706px'}, 1250, 0);
	$('.magentar').animate({$right: '-1706px'}, 1250, 0);
	$('.catchtext').set('$visibility', 'visible');
	$('.catchtext').set('$letter-spacing', '25px');
	$('.dummy').animate({$$fade: 0}, 10).then(function() {
		$('.catchtext').set('$visibility', 'hidden');
		$('.dummy').animate({$$fade: 0}, 10).then(function() {
			$('.catchtext').set('$visibility', 'visible');
			$('.dummy').animate({$$fade: 0}, 10).then(function() {
				$('.catchtext').set('$visibility', 'hidden');
				$('.dummy').animate({$$fade: 0}, 10).then(function() {
					$('.catchtext').set('$visibility', 'visible');
					$('.dummy').animate({$$fade: 0}, 10).then(function() {
						$('.catchtext').set('$visibility', 'hidden');
						$('.dummy').animate({$$fade: 0}, 10).then(function() {
							$('.catchtext').set('$visibility', 'visible');
							$('.dummy').animate({$$fade: 0}, 10).then(function() {
								$('.catchtext').set('$visibility', 'hidden');
								$('.dummy').animate({$$fade: 0}, 10).then(function() {
									$('.catchtext').set('$visibility', 'visible');
									$('.dummy').animate({$$fade: 0}, 10).then(function() {
										$('.catchtext').set('$visibility', 'hidden');
										$('.dummy').animate({$$fade: 0}, 10).then(function() {
											$('.catchtext').set('$visibility', 'visible');
											$('.dummy').animate({$$fade: 0}, 10).then(function() {
												$('.catchtext').set('$visibility', 'hidden');
												$('.dummy').animate({$$fade: 0}, 10).then(function() {
													$('.catchtext').set('$visibility', 'visible');
													$('.dummy').animate({$$fade: 0}, 10).then(function() {
														$('.catchtext').set('$visibility', 'hidden');
														$('.dummy').animate({$$fade: 0}, 10).then(function() {
															$('.playermain').animate({$$fade: 1}, inSpeed);
															$('#g2').animate({$$fade: 0}, 250).then(function() {
																$('.score11').animate({$$fade: 1}, inSpeed);
																$('.score21').animate({$$fade: 1}, inSpeed);
																$('#g2').animate({$$fade: 0}, 250).then(function() {
																	$('.score12').animate({$$fade: 1}, inSpeed);
																	$('.score22').animate({$$fade: 1}, inSpeed);
																	$('#g2').animate({$$fade: 0}, 250).then(function() {
																		$('.score13').animate({$$fade: 1}, inSpeed);
																		$('.score23').animate({$$fade: 1}, inSpeed);
																	});
																});
															});
															$('.dummy').animate({$$fade: 0}, 1000).then(function() {
																$('.mainlogo').animate({$$fade: 1}, inSpeed);
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

function flashScore(parr, cnum) {
	$(parr[cnum]).set("$filter", 'invert(1)');
	$('.dummy').animate({$$fade: 0}, 250).then(function() {
		$(parr[cnum]).set("$filter", 'invert(0)');
		$('.dummy').animate({$$fade: 0}, 250).then(function() {
			$(parr[cnum]).set("$filter", 'invert(1)');
			$('.dummy').animate({$$fade: 0}, 250).then(function() {
				$(parr[cnum]).set("$filter", 'invert(0)');
				$('.dummy').animate({$$fade: 0}, 250).then(function() {
					$(parr[cnum]).set("$filter", 'invert(1)');
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

	if (olds1 != s1) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			for (var k = 0; k < 3; k++) {
				$(sc1[k]).set("$filter", 'invert(0)');
			}
			$('.dummy').animate({$$fade: 0}, 250).then(function() {
				for (var k = 0; k < s1; k++) {
					flashScore(sc1, k);
				}
			});
			olds1 = s1;
			updating = false;
			//$('.score1').animate({$$fade: 0}, outSpeed).then(function() {
			//	$('#s1').set("innerHTML", s1);
			//	$('.score1').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
			//    });
		});
	}

	if (olds2 != s2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			for (var k = 0; k < 3; k++) {
				$(sc2[k]).set("$filter", 'invert(0)');
			}
			$('.dummy').animate({$$fade: 0}, 250).then(function() {
				for (var k = 0; k < s2; k++) {
					flashScore(sc2, k);
				}
			});
			olds2 = s2;
			updating = false;
			//$('.score2').animate({$$fade: 0}, outSpeed).then(function() {
			//	$('#s2').set("innerHTML", s2);
			//	$('.score2').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
			//   });
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