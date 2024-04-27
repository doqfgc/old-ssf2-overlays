/* 
  .g8"""bgd                           .g8""8q.                            `7MM                    
.dP'     `M                         .dP'    `YM.                            MM                    
dM'       ` ,pW"Wq.`7Mb,od8 .gP"Ya  dM'      `MM `7M'   `MF'.gP"Ya `7Mb,od8 MM   ,6"Yb.`7M'   `MF'
MM         6W'   `Wb MM' "',M'   Yb MM        MM   VA   ,V ,M'   Yb  MM' "' MM  8)   MM  VA   ,V  
MM.        8M     M8 MM    8M"""""" MM.      ,MP    VA ,V  8M""""""  MM     MM   ,pm9MM   VA ,V   
`Mb.     ,'YA.   ,A9 MM    YM.    , `Mb.    ,dP'     VVV   YM.    ,  MM     MM  8M   MM    VVV    
  `"bmmmd'  `Ybmd9'.JMML.   `Mbmmd'   `"bmmd"'        W     `Mbmmd'.JMML. .JMML.`Moo9^Yo.  ,V     
                                                                                          ,V      
                                                                                       OOb"         
	CoreOverlay ver.1.0.0
	made without blood or sweat, but a lot of tears by doq

	main.js - the core code that powers all other components

	CoreOverlay is licensed under the terms of the MIT License; see the COPYING file for license details.
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
			/*$('.coverbox').set('$visibility', 'visible');
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
			statusdisp(0); return 0;*/
		} else {
			var cr1c = $('#icr1c').get("value");
			var cr2c = $('#icr2c').get("value");
			cr1f = $('#icr1f').get("value");
			cr2f = $('#icr2f').get("value");
			$('#ms1').set('$left', '-120px');
			$('#ms2').set('$right', '-120px');
			$('.fncwordmark').set('$letter-spacing', '15px');
			$.wait(1500).then(function() {
				//$('.friday').set('$width', $('.friday').get('$width'));
				//$('.night').set('$width', $('.night').get('$width'));
				//$('.crews').set('$width', $('.crews').get('$width'));
				$('.friday').set('$width', '1em');
				$('.night').set('$width', '1em');
				$('.crews').set('$width', '1em');
				$('.opatx').set('$opacity', 0);
				$('#cr1').set("innerHTML", cr1f);
				$('#cr2').set("innerHTML", cr2f);
				$('#cr1').set("$opacity", 1);
				$('#cr2').set("$opacity", 1);
				$.wait(40).then(function() {
					$('.fncwordmark').set('$font-size', '88px');
					$('.friday').set('$top', '0px');
					$('.night').set('$top', '0px');
					$('.crews').set('$top', '0px');
					$('.friday').animate({$width: '1.3em'}, 300);
					$('.night').animate({$width: '1.1em'}, 300);
					$('.crews').animate({$width: '1.1em'}, 300);
					$('#cr1').set("$right", '155px');
					$('#cr2').set("$left", '155px');
					$.wait(1000).then(function() {
						$('#cr1').set("$top", '3px');
						$('#cr2').set("$top", '3px');
						$('#cr1').set("$font-size", '16px');
						$('#cr2').set("$font-size", '16px');
						HyperOverlay.send('send');
						$.wait(1500).then(function() {
							$('.fncwordmark').set('$top', '-20px');
							$('.centrescore').set('$top', '35px');
							$('.p1bgcolor').set('$background-color', cr1c);
							$('.p2bgcolor').set('$background-color', cr2c);
							$.wait(1000).then(function() {
								$('.masks').set('$visibility', 'hidden');
								$('.fncwordmark').set('$visibility', 'hidden');
								//HyperOverlay.showRoster(-1);
							});
						});
					});
					/* 155px, 3px, 16px */
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
			s1 = $('#is1').get("value");
			s2 = $('#is2').get("value");
			var cr1c = $('#icr1c').get("value");
			var cr2c = $('#icr2c').get("value");
			var crtc = cr1c;
			pt = p1;
			st = s1;
			crt = cr1f;
			rtw = r1w;
			rtl = r1l;
			p1 = p2;
			s1 = s2;
			cr1f = cr2f;
			r1w = r2w;
			r1l = r2l;
			p2 = pt;
			s2 = st;
			cr2f = crt;
			r2w = rtw;
			r2l = rtl;
			cr1c = cr2c;
			cr2c = crtc;
			$('#ip1').set("value", p1);
			$('#ip2').set("value", p2);
			$('#is1').set("value", s1);
			$('#is2').set("value", s2);
			$('#icr1f').set("value", cr1f);
			$('#icr2f').set("value", cr2f);
			$('#ir1w').set("value", r1w);
			$('#ir2w').set("value", r2w);
			$('#ir1l').set("value", r1l);
			$('#ir2l').set("value", r2l);
			$('.p1bgcolor').set('$background-color', cr1c);
			$('.p2bgcolor').set('$background-color', cr2c);
			$('#icr1c').set("value", cr1c);
			$('#icr2c').set("value", cr2c);
			HyperOverlay.send('send');
		} else {
			pt = $('#ip1').get("value");
			st = $('#is1').get("value");
			crt = $('#icr1f').get("value");
			rtw = $('#ir1w').get("value");
			rtl = $('#ir1l').get("value");
			var crtc = $('#icr1c').get("value");
			$('#ip1').set("value", $('#ip2').get("value"));
			$('#is1').set("value", $('#is2').get("value"));
			$('#icr1c').set("value", $('#icr2c').get("value"));
			$('#icr1f').set("value", $('#icr2f').get("value"));
			$('#ir1w').set("value", $('#ir2w').get("value"));
			$('#ir1l').set("value", $('#ir2l').get("value"));
			$('#ip2').set("value", pt);
			$('#is2').set("value", st);
			$('#icr2f').set("value", crt);
			$('#icr2c').set("value", crtc);
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

	if ($('#p1').get("innerHTML") != p1) {
		updating = true;
		$('#p1').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#p1').set('$transition', 'none');
			$('#p1').set('$right', '205px');
			$.wait(40).then(function() { // a single frame
				$('#p1').set('$transition', 'opacity 500ms, right 500ms');
				$('#p1').set("innerHTML", p1);
				$('#p1').set('$opacity', 1);
				$('#p1').set('$right', '155px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
		});
	}

	if ($('#p2').get("innerHTML") != p2) {
		updating = true;
		$('#p2').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#p2').set('$transition', 'none');
			$('#p2').set('$left', '205px');
			$.wait(40).then(function() { // a single frame
				$('#p2').set('$transition', 'opacity 500ms, left 500ms');
				$('#p2').set("innerHTML", p2);
				$('#p2').set('$opacity', 1);
				$('#p2').set('$left', '155px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
		});
	}

	/*
	if ($('#p1n').get("innerHTML") != '<small>' + cr1 + '</small>' + p1) {
		updating = true;
		$('#p1n').set('$right', '-50px');
		$('#p1n').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#p1n').set('$transition', 'none');
			$('#p1n').set('$right', '50px');
			$.wait(40).then(function() { // a single frame
				$('#p1n').set('$transition', 'opacity 500ms, right 500ms');
				$('#p1n').set("innerHTML", '<small>' + cr1 + '</small>' + p1);
				$('#p1n').set('$opacity', 1);
				$('#p1n').set('$right', '0px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
		});
	}

	if ($('#p2n').get("innerHTML") != '<small>' + cr2 + '</small>' + p2) {
		updating = true;
		$('#p2n').set('$left', '-50px');
		$('#p2n').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#p2n').set('$transition', 'none');
			$('#p2n').set('$left', '50px');
			$.wait(40).then(function() { // a single frame
				$('#p2n').set('$transition', 'opacity 500ms, left 500ms');
				$('#p2n').set("innerHTML", '<small>' + cr2 + '</small>' + p2);
				$('#p2n').set('$opacity', 1);
				$('#p2n').set('$left', '0px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
		});
	} */

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

	if ($('#cr1').get("innerHTML") != cr1f) {
		updating = true;
		$('#cr1').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#cr1').set("innerHTML", cr1f);
				$('#cr1').set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
		});
	}

	if ($('#cr2').get("innerHTML") != cr2f) {
		updating = true;
		$('#cr2').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#cr2').set("innerHTML", cr2f);
				$('#cr2').set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
		});
	}

	/*if ( $('#cr1p1').get("innerHTML") != cr1p1 ||
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
	}*/


}