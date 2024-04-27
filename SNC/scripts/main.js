/* 
                                                                                            ,,                    
`7MMF'  `7MMF'                                        .g8""8q.                            `7MM                    
  MM      MM                                        .dP'    `YM.                            MM                    
  MM      MM `7M'   `MF'`7MMpdMAo.  .gP"Ya `7Mb,od8 dM'      `MM `7M'   `MF'.gP"Ya `7Mb,od8 MM   ,6"Yb.`7M'   `MF'
  MMmmmmmmMM   VA   ,V    MM   `Wb ,M'   Yb  MM' "' MM        MM   VA   ,V ,M'   Yb  MM' "' MM  8)   MM  VA   ,V  
  MM      MM    VA ,V     MM    M8 8M""""""  MM     MM.      ,MP    VA ,V  8M""""""  MM     MM   ,pm9MM   VA ,V   
  MM      MM     VVV      MM   ,AP YM.    ,  MM     `Mb.    ,dP'     VVV   YM.    ,  MM     MM  8M   MM    VVV    
.JMML.  .JMML.   ,V       MMbmmd'   `Mbmmd'.JMML.     `"bmmd"'        W     `Mbmmd'.JMML. .JMML.`Moo9^Yo.  ,V     
                ,V        MM                                                                              ,V      
             OOb"       .JMML.                                                                         OOb"       

	HyperOverlay ver.0.2.0
	made without blood or sweat, but a lot of tears by doq

	main.js - the core code that powers all other components

	HyperOverlay is licensed under the terms of the MIT License; see the COPYING file for license details.
*/
var MINI = require('minified'); 
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;

var inSpeed = 500;
var outSpeed = 500;
var numSpeed = 300;
var cr1, cr2, cr1f, cr2f,
	cr1p1, cr1p2, cr1p3, cr1p4, cr1p5,
	cr2p1, cr2p2, cr2p3, cr2p4, cr2p5,
	p1, p2, 
	s1d1, s1d2, s2d1, s2d2, 
	r1w, r2w, r1l, r2l, mm, gg, olds1, olds2;
var updating = false;
// force the checkbox to unchecked for reasons
var overlaystatus = false;
$('#overlaystatus').set('checked', false);

var recordon = true;
$('#recordon').set('checked', true);

// these are useful if you use score bars instead of score numbers
// var sc1 = ['.score11','.score12','.score13'];
// var sc2 = ['.score21','.score22','.score23'];

function statusdisp(err) {
	var g = [];
	g[0] = 'OK';
	g[11] = 'E 11: overlay is in the middle of updating';
	g[12] = 'E 12: can\'t send on a disabled overlay';
	g[21] = 'E 21: parse issue running genCrewScore()';

	$('#hol-status').set('innerHTML', g[err]);
}

var HyperOverlay = {
	send: function(side, direction) {
		// first, check if we're still updating and reject Send until then
		if (updating) {
			statusdisp(11); return 11;
		}
		// next, check if we're not enabled and reject Send until it's enabled
		if (!overlaystatus) {
			statusdisp(12); return 12;
		}
		// then, check for what we're doing and then do it
		switch (side) {
			case 'send':
				// Send: take the current content of all inputs and send them directly to the overlay
				// useful for making changes to player names and set details
				// then update all items and run
				p1 = $('#ip1').get("value");
				p2 = $('#ip2').get("value");
				s1d1 = HyperOverlay.genCrewScore('#is1', 1);
				s1d2 = HyperOverlay.genCrewScore('#is1', 2);
				s2d1 = HyperOverlay.genCrewScore('#is2', 1);
				s2d2 = HyperOverlay.genCrewScore('#is2', 2);
				cr1 = $('#icr1').get("value");
				cr2 = $('#icr2').get("value");
				cr1f = $('#icr1f').get("value");
				cr2f = $('#icr2f').get("value");
				cr1p1 = $('#icr1p1').get("value");
				cr1p2 = $('#icr1p2').get("value");
				cr1p3 = $('#icr1p3').get("value");
				cr1p4 = $('#icr1p4').get("value");
				cr1p5 = $('#icr1p5').get("value");
				cr2p1 = $('#icr2p1').get("value");
				cr2p2 = $('#icr2p2').get("value");
				cr2p3 = $('#icr2p3').get("value");
				cr2p4 = $('#icr2p4').get("value");
				cr2p5 = $('#icr2p5').get("value");
				r1w = $('#ir1w').get("value");
				r2w = $('#ir2w').get("value");
				r1l = $('#ir1l').get("value");
				r2l = $('#ir2l').get("value");
				mm = $('#imm').get("value");
				gg = $('#igg').get("value");
				runUpdate();
				break;
		
			case 'left':
				var s1 = (10 * s1d2) + s1d1;
				if (direction == 'up') {
					$('#is1').set("value", ++s1);
					HyperOverlay.send('send');
				} else if (direction == 'down') {
					$('#is1').set("value", --s1);
					HyperOverlay.send('send');
				}
				break;
	
			case 'right':
				var s2 = (10 * s2d2) + s2d1;
				if (direction == 'up') {
					$('#is2').set("value", ++s2);
					HyperOverlay.send('send');
				} else if (direction == 'down') {
					$('#is2').set("value", --s2);
					HyperOverlay.send('send');
				}
				break;
			
			default:
				break;
		}
		statusdisp(0); return 0;
	},
	toggleOverlay: function () {
		// toggleOverlay: turns the overlay on and off. turning in on will also fire a Send.
		// the overlaystatus variable will be in sync with the #overlaystatus checkbox so this works
		if ( overlaystatus ) {
			$('.coverbox').set('$visibility', 'visible');
			$.wait(100).then(function() {
				$('#cr').set('$top', '0px');
				$.wait(200).then(function() {
					$('#c2').set('$top', '0px');
					$.wait(200).then(function() {
						$('#c1').set('$top', '0px');
					});
				});
			});
			$('#p1').set('$opacity', 0);
			$('#p2').set('$opacity', 0);
			$('.p1s').animate({$$fade: 0}, outSpeed);
			$('.p2s').animate({$$fade: 0}, outSpeed);
			$('.p1r').animate({$$fade: 0}, outSpeed);
			$('.p2r').animate({$$fade: 0}, outSpeed);
			$('.rtext').animate({$$fade: 0}, outSpeed).then(function() {
				$('#p1').set("innerHTML", '');
				$('#p2').set("innerHTML", '');
				$('#s1').set("innerHTML", '');
				$('#s2').set("innerHTML", '');
				$('#r1').set("innerHTML", '');
				$('#r2').set("innerHTML", '');
				$('#gg').set("innerHTML", '');
			});
			overlaystatus = false;
			statusdisp(0); return 0;
		} else {
			var cr1c = $('#icr1c').get("value");
			var cr2c = $('#icr2c').get("value");
			$('.p1bgcolor').set("$background-color", cr1c);
			$('.p2bgcolor').set("$background-color", cr2c);

			cr1f = $('#icr1f').get("value");
			cr2f = $('#icr2f').get("value");
			$('#cr1f').set("innerHTML", cr1f);
			$('#cr2f').set("innerHTML", cr2f);
			$('#cr1f').set('$opacity', 1);
			$('#cr2f').set('$opacity', 1);
			$('#cr1f').set('$letter-spacing', '5px');
			$('#cr2f').set('$letter-spacing', '5px');
			$('#c1').set('$left', '-500px');
			$('#c2').set('$left', '530px');
			$.wait(500).then(function() {
				$('.p1n').set('$top', '50px');
				$('.p2n').set('$top', '85px');
				$('.p1n').set('$left', '585px');
				$('.p2n').set('$right', '585px');
				$.wait(500).then(function() {
					$('.p1n').set('$left', '475px');
					$('.p2n').set('$right', '475px');
					HyperOverlay.send('send');
					$('#cr1f').set('$opacity', 0);
					$('#cr2f').set('$opacity', 0);
					$.wait(500).then(function() {
						$('#crl').set('$left', '-55%');
						$('#crr').set('$left', '105%');
						$.wait(2000).then(function() {
							$('.coverbox').set('$visibility', 'hidden');
							$('#cr1f').set('$letter-spacing', '0px');
							$('#cr2f').set('$letter-spacing', '0px');
						});
					});
				});
			});
			overlaystatus = true;
			statusdisp(0); return 0;
		}
	},
	crewFinal: function() {
		// crewFinal: sets final score on crew overlay
		$('#p1').set('$opacity', 0);
		$('#p2').set('$opacity', 0);
		$('#cr1p1').set('$opacity', 0);
		$('#cr1p2').set('$opacity', 0);
		$('#cr1p3').set('$opacity', 0);
		$('#cr1p4').set('$opacity', 0);
		$('#cr1p5').set('$opacity', 0);
		$('#cr2p1').set('$opacity', 0);
		$('#cr2p2').set('$opacity', 0);
		$('#cr2p3').set('$opacity', 0);
		$('#cr2p4').set('$opacity', 0);
		$('#cr2p5').set('$opacity', 0);
		$.wait(500).then(function() {
			$('#cr1f').set('$opacity', 1);
			$('#cr2f').set('$opacity', 1);
			$.wait(500).then(function() {
				$('#cr1f').set('$right', '45px');
				$('#cr2f').set('$left', '70px');
				$('#recordon').set('checked', true);
				HyperOverlay.togglerecord();
			});
		});
	},
	togglerecord: function () {
		recordon = $('#recordon').get('checked');
		if (recordon) {
			$('.p1r').animate({$$fade: 1}, 500);
			$('.p2r').animate({$$fade: 1}, 500);
		} else {
			$('.p1r').animate({$$fade: 0}, 500);
			$('.p2r').animate({$$fade: 0}, 500);
		}
		statusdisp(0); return 0;
	},
	switchp: function() {
		// first, check if we're still updating and reject Switch until then
		if (updating) {
			statusdisp(11); return 11;
		}
		// switchp (can't call it switch): switches player, score, record and then re-sends.
		// takes immediate effect, except if the overlay isn't on
		var pt, st, crt, rtw, rtl;
		if (overlaystatus) {
			pt = p1;
			st = s1;
			crt = cr1;
			rtw = r1w;
			rtl = r1l;
			p1 = p2;
			s1 = s2;
			cr1 = cr2;
			r1w = r2w;
			r1l = r2l;
			p2 = pt;
			s2 = st;
			cr2 = crt;
			r2w = rtw;
			r2l = rtl;
			$('#ip1').set("value", p1);
			$('#ip2').set("value", p2);
			$('#is1').set("value", s1);
			$('#is2').set("value", s2);
			$('#icr1').set("value", cr1);
			$('#icr2').set("value", cr2);
			$('#ir1w').set("value", r1w);
			$('#ir2w').set("value", r2w);
			$('#ir1l').set("value", r1l);
			$('#ir2l').set("value", r2l);
			HyperOverlay.send('send');
		} else {
			pt = $('#ip1').get("value");
			st = $('#is1').get("value");
			crt = $('#icr1').get("value");
			rtw = $('#ir1w').get("value");
			rtl = $('#ir1l').get("value");
			$('#ip1').set("value", $('#ip2').get("value"));
			$('#is1').set("value", $('#is2').get("value"));
			$('#icr1').set("value", $('#icr2').get("value"));
			$('#ir1w').set("value", $('#ir2w').get("value"));
			$('#ir1l').set("value", $('#ir2l').get("value"));
			$('#ip2').set("value", pt);
			$('#is2').set("value", st);
			$('#icr2').set("value", crt);
			$('#ir2w').set("value", rtw);
			$('#ir2l').set("value", rtl);
		}
		statusdisp(0); return 0;
	},
	genCrewScore: function(sid, place) {
		// genCrewScore: splits the number of a crew score into units and tens digits for animation
		// also provides the animator with whether or not the animation should adjust for a single digit number
		var sco = $(sid).get("value");
		switch (place) {
			case 1:
				// to get scd1 (units place), we simply mod 10 sco
				var scd1 = sco % 10;
				return scd1;
		
			case 2:
				// to get scd2, we will divide by 10, and then truncate decimilisation
				var scd2 = Math.floor(sco / 10);
				return scd2;
		
			default:
				statusdisp(21);
				break;
		}
	}
};

function runUpdate() {

	recordon = $('#recordon').get('checked');

	if ($('#p1').get("innerHTML") != '<small>' + cr1 + '</small>' + p1) {
		updating = true;
		$('#p1').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#p1').set("innerHTML", '<small>' + cr1 + '</small>' + p1);
				$('#p1').set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
		});
	}

	if ($('#p2').get("innerHTML") != '<small>' + cr2 + '</small>' + p2) {
		updating = true;
		$('#p2').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#p2').set("innerHTML", '<small>' + cr2 + '</small>' + p2);
				$('#p2').set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
		});
	}

	if ($('#s1d2').get("innerHTML") != s1d2 || $('#s1d1').get("innerHTML") != s1d1) {
	// would check only the units digit, but this sanity check will pass if, for example,
	// a send changes score from 20 to 10
		updating = true;
		// now we check explicitly for tens digit cases
		if ( $('#s1d2').get("innerHTML") != s1d2 ) {
			$('#s1d2').animate({$$fade: 0}, outSpeed);
			$('#s1d1').animate({$$fade: 0}, outSpeed).then(function() {
				// nested ifs are pain these should really be functions
				// check if tens is 0 and move units to the left
				if (s1d2 == 0) {
					$('#s1d1').animate({$top: '30px'}, 1).then(function() {
						$('#s1d2').set("innerHTML", s1d2);
						$('#s1d1').set("innerHTML", s1d1);
						$('#s1d1').animate({$$fade: 1, $top: '0px'}, numSpeed);
						$.wait(numSpeed).then(function() {
							$('#s1d1').animate({$left: '-25px'}, numSpeed).then(function() {
								updating = false;
							});
						});
					});
				} else {
					$('#s1d2').animate({$top: '30px'}, 1);
					$('#s1d1').animate({$left: '0px'}, 1);
					$('#s1d1').animate({$top: '30px'}, 1).then(function() {
						$('#s1d2').set("innerHTML", s1d2);
						$('#s1d1').set("innerHTML", s1d1);
						$('#s1d2').animate({$$fade: 1, $top: '0px'}, numSpeed);
						$.wait(numSpeed/2).then(function() {
							$('#s1d1').animate({$$fade: 1, $top: '0px'}, numSpeed).then(function() {
								updating = false;
							});
						});
					});
				}
			});
		} else {
		// we're not animating the tens digit
			$('#s1d1').animate({$$fade: 0}, outSpeed).then(function() {
				$('#s1d1').animate({$top: '30px'}, 1).then(function() {
					$('#s1d1').set("innerHTML", s1d1);
					$('#s1d1').animate({$$fade: 1, $top: '0px'}, numSpeed).then(function() {
						updating = false;
					});
				});
			});
		}
	}

	if ($('#s2d2').get("innerHTML") != s2d2 || $('#s2d1').get("innerHTML") != s2d1) {
		// would check only the units digit, but this sanity check will pass if, for example,
		// a send changes score from 20 to 10
			updating = true;
			// now we check explicitly for tens digit cases
			if ( $('#s2d2').get("innerHTML") != s2d2 ) {
				$('#s2d2').animate({$$fade: 0}, outSpeed);
				$('#s2d1').animate({$$fade: 0}, outSpeed).then(function() {
					// nested ifs are pain these should really be functions
					// check if tens is 0 and move units to the left
					if (s2d2 == 0) {
						$('#s2d1').animate({$top: '30px'}, 1).then(function() {
							$('#s2d2').set("innerHTML", s2d2);
							$('#s2d1').set("innerHTML", s2d1);
							$('#s2d1').animate({$$fade: 1, $top: '0px'}, numSpeed);
							$.wait(numSpeed).then(function() {
								$('#s2d1').animate({$left: '-25px'}, numSpeed).then(function() {
									updating = false;
								});
							});
						});
					} else {
						// make sure units is in the right position, in case 9 rolls to 10 or smth
						$('#s2d2').animate({$top: '30px'}, 1);
						$('#s2d1').animate({$left: '0px'}, 1);
						$('#s2d1').animate({$top: '30px'}, 1).then(function() {
							$('#s2d2').set("innerHTML", s2d2);
							$('#s2d1').set("innerHTML", s2d1);
							$('#s2d2').animate({$$fade: 1, $top: '0px'}, numSpeed);
							$.wait(numSpeed/2).then(function() {
								$('#s2d1').animate({$$fade: 1, $top: '0px'}, numSpeed).then(function() {
									updating = false;
								});
							});
						});
					}
				});
			} else {
			// we're not animating the tens digit
				$('#s2d1').animate({$$fade: 0}, outSpeed).then(function() {
					$('#s2d1').animate({$top: '30px'}, 1).then(function() {
						$('#s2d1').set("innerHTML", s2d1);
						$('#s2d1').animate({$$fade: 1, $top: '0px'}, numSpeed).then(function() {
							updating = false;
						});
					});
				});
			}
	}

	if ($('#r1').get("innerHTML") != (r1w + '-' + r1l)) {
		updating = true;
		$('.p1r').animate({$$fade: 0}, outSpeed).then(function() {
			$('#r1').set("innerHTML", r1w + '-' + r1l);
			if (recordon) $('.p1r').animate({$$fade: 1}, inSpeed);
			updating = false;
		});
	}

	if ($('#r2').get("innerHTML") != (r2w + '-' + r2l)) {
		updating = true;
		$('.p2r').animate({$$fade: 0}, outSpeed).then(function() {
			$('#r2').set("innerHTML", r2w + '-' + r2l);
			if (recordon) $('.p2r').animate({$$fade: 1}, inSpeed);
			updating = false;
		});
	}

	if ($('#gg').get("innerHTML") != gg) {
		updating = true;
		$('.rtext').animate({$$fade: 0}, outSpeed).then(function() {
			$('#gg').set("innerHTML", gg);
			$('.rtext').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
        });
	}

	if ( $('#cr1p1').get("innerHTML") != cr1p1 ||
		 $('#cr1p2').get("innerHTML") != cr1p2 ||
		 $('#cr1p3').get("innerHTML") != cr1p3 ||
		 $('#cr1p4').get("innerHTML") != cr1p4 ||
		 $('#cr1p5').get("innerHTML") != cr1p5 ) {
		updating = true;
		// initialise these as arrays, makes more efficient code
		var ela1 = ['#cr1p1', '#cr1p2', '#cr1p3', '#cr1p4', '#cr1p5'];
		var val1 = [cr1p1, cr1p2, cr1p3, cr1p4, cr1p5];
		// first, check for any that have changed and update. should only happen if subs.
		for (let el1 = 0; el1 < ela1.length; el1++) {
			if ( $(ela1[el1]).get("innerHTML") != val1[el1] ) {
				updating = true;
				$(ela1[el1]).set('$opacity', 0);
				$.wait(inSpeed).then(function() {
					if ( val1[el1] == "" || val1[el1] == " " ) { // fix for lack of delete on mac
					// it is an empty string, move all others after it in
						$(ela1[el1]).animate({$width: 0}, inSpeed).then(function() { updating = false; });
					} else {
					// then check for if it's an empty string, fade back if not, if so, don't
						$(ela1[el1]).set("innerHTML", val1[el1]);
						$(ela1[el1]).set('$opacity', 1);
						$.wait(inSpeed).then(function() { updating = false; });
					}
				});
			}
		}
	}

	if ( $('#cr2p1').get("innerHTML") != cr2p1 ||
		 $('#cr2p2').get("innerHTML") != cr2p2 ||
		 $('#cr2p3').get("innerHTML") != cr2p3 ||
		 $('#cr2p4').get("innerHTML") != cr2p4 ||
		 $('#cr2p5').get("innerHTML") != cr2p5 ) {
		// initialise these as arrays, makes more efficient code
		var ela2 = ['#cr2p1', '#cr2p2', '#cr2p3', '#cr2p4', '#cr2p5'];
		var val2 = [cr2p1, cr2p2, cr2p3, cr2p4, cr2p5];
		// first, check for any that have changed and update. should only happen if subs.
		for (let el2 = 0; el2 < ela2.length; el2++) {
			if ( $(ela2[el2]).get("innerHTML") != val2[el2] ) {
				updating = true;
				$(ela2[el2]).set('$opacity', 0);
				$.wait(inSpeed).then(function() {
					// then check for if it's an empty string, fade back if not, if so, don't
					if ( val2[el2] == "" || val2[el2] == " " ) { // fix for lack of delete on mac
					// it is an empty string, move all others after it in
						$(ela2[el2]).animate({$width: 0}, inSpeed).then(function() { updating = false; });
					} else {
						$(ela2[el2]).set("innerHTML", val2[el2]);
						$(ela2[el2]).set('$opacity', 1);
						$.wait(inSpeed).then(function() { updating = false; });
					}
				});
			}
		}
	}
}