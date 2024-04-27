/*                                                                          ,,                    
  .g8"""bgd                           .g8""8q.                            `7MM                    
.dP'     `M                         .dP'    `YM.                            MM                    
dM'       ` ,pW"Wq.`7Mb,od8 .gP"Ya  dM'      `MM `7M'   `MF'.gP"Ya `7Mb,od8 MM   ,6"Yb.`7M'   `MF'
MM         6W'   `Wb MM' "',M'   Yb MM        MM   VA   ,V ,M'   Yb  MM' "' MM  8)   MM  VA   ,V  
MM.        8M     M8 MM    8M"""""" MM.      ,MP    VA ,V  8M""""""  MM     MM   ,pm9MM   VA ,V   
`Mb.     ,'YA.   ,A9 MM    YM.    , `Mb.    ,dP'     VVV   YM.    ,  MM     MM  8M   MM    VVV    
  `"bmmmd'  `Ybmd9'.JMML.   `Mbmmd'   `"bmmd"'        W     `Mbmmd'.JMML. .JMML.`Moo9^Yo.  ,V     
                                                                                          ,V      
                                                                                       OOb"         
	CoreOverlay ver.1.1.0
	made without blood or sweat, but a lot of tears by doc norberg

	main.js - the core code that powers all other components

	CoreOverlay is licensed under the terms of the MIT License; see the COPYING file for license details.
	CoreOverlay uses elements of Minified, which is in the Public Domain.
*/

// debug switch; disables transitions and sets active state automatically
// useful for final overlay placements
var debugswitch = true;


var MINI = require('minified'); 
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;

var inSpeed = 500;
var outSpeed = 500;
var cr1, cr2, p1, p2, r1w, r2w, r1l, r2l, mm, gg, olds1, olds2;
var s1 = [0,0,0,0,0];
var s2 = [0,0,0,0,0];
var is1 = ['#is11','#is12','#is13','#is14','#is15'];
var is2 = ['#is21','#is22','#is23','#is24','#is25'];
var sb1 = ['#sb11','#sb12','#sb13','#sb14','#sb15'];
var sb2 = ['#sb21','#sb22','#sb23','#sb24','#sb25'];
var updating = false;
var currentset = 0; // 0-index, so the value 0 points to the first set, 4 points to the 5th set
var positionstate = 340;
var positionstate2 = 1160;

// force the checkbox to get around the browser maintaining state between refreshes
var overlaystatus = false;
$('#overlaystatus').set('checked', false);

var inverted = false;
$('#inverted').set('checked', false);

// indicate the first set boxes
$(is1[currentset]).set('$background-color','#080');
$(is2[currentset]).set('$background-color','#080');

// these are useful if you use score bars instead of score numbers
// var sc1 = ['.score11','.score12','.score13'];
// var sc2 = ['.score21','.score22','.score23'];

function statusdisp(err) {
	// statusdisp: 
	var g = [];
	g[0] = 'OK';
	g[11] = 'E 11: overlay is in the middle of updating';
	g[12] = 'E 12: can\'t send on a disabled overlay';

	$('#hol-status').set('innerHTML', g[err]);
}

function flashScore(parr) {
	// flashScore: when updating a score, put it through this function to flash the score a few times
	//             instead of just fading it in once.
	$(parr).animate({$$fade: 1}, 250).then(function() {
		$(parr).animate({$$fade: 0}, 250).then(function() {
			$(parr).animate({$$fade: 1}, 250).then(function() {
				$(parr).animate({$$fade: 0}, 250).then(function() {
					$(parr).animate({$$fade: 1}, 500);
				});
			});
		});
	});
}

function clearolcon() {
	// clearolcon: sets the overlay contents as empty strings. best used after disabling the overlay.
	$('#p1t').set("innerHTML", '');
	$('#p2t').set("innerHTML", '');
	$('#p1n').set("innerHTML", '');
	$('#p2n').set("innerHTML", '');
	$('#p1r').set("innerHTML", '');
	$('#p2r').set("innerHTML", '');
	$('#s11').set("innerHTML", '');
	$('#s21').set("innerHTML", '');
	$('#s12').set("innerHTML", '');
	$('#s22').set("innerHTML", '');
	$('#s13').set("innerHTML", '');
	$('#s23').set("innerHTML", '');
	$('#s14').set("innerHTML", '');
	$('#s24').set("innerHTML", '');
	$('#s15').set("innerHTML", '');
	$('#s25').set("innerHTML", '');
	$('#tt').set("innerHTML", '');
	$('#gg').set("innerHTML", '');
}

var CoreOverlay = {
	send: function(side, direction) {
	// send: take the current content of all inputs and send them directly to the overlay
	// useful for making changes to player names and set details
	// then update all items and run
	// send is also called when using the arrows to quick-update score, by using the side and direction local variables.

		// first, check if we're still updating and reject send until then
		if (updating) {
			statusdisp(11); return 11;
		}
		// next, check if we're not enabled and reject send until it's enabled
		if (!overlaystatus) {
			statusdisp(12); return 12;
		}
		switch (side) {
			case 'send':
				p1 = $('#ip1').get("value");
				p2 = $('#ip2').get("value");
				s1[0] = $('#is11').get("value");
				s2[0] = $('#is21').get("value");
				s1[1] = $('#is12').get("value");
				s2[1] = $('#is22').get("value");
				s1[2] = $('#is13').get("value");
				s2[2] = $('#is23').get("value");
				s1[3] = $('#is14').get("value");
				s2[3] = $('#is24').get("value");
				s1[4] = $('#is15').get("value");
				s2[4] = $('#is25').get("value");
				cr1 = $('#icr1').get("value");
				cr2 = $('#icr2').get("value");
				r1w = $('#ir1w').get("value");
				r2w = $('#ir2w').get("value");
				r1l = $('#ir1l').get("value");
				r2l = $('#ir2l').get("value");
				gg = $('#imm').get("value");
				mm = $('#igg').get("value");
				runUpdate('#p1t', cr1);
				runUpdate('#p2t', cr2);
				runUpdate('#p1n', p1);
				runUpdate('#p2n', p2);
				runUpdate('#s11', s1[0]);
				runUpdate('#s21', s2[0]);
				runUpdate('#s12', s1[1]);
				runUpdate('#s22', s2[1]);
				runUpdate('#s13', s1[2]);
				runUpdate('#s23', s2[2]);
				runUpdate('#s14', s1[3]);
				runUpdate('#s24', s2[3]);
				runUpdate('#s15', s1[4]);
				runUpdate('#s25', s2[4]);
				runUpdate('#gg', gg);
				runUpdate('#tt', mm);
				break;
		
			case 'left':
				if (direction == 'up') {
					$(is1[currentset]).set("value", ++s1[currentset]);
					CoreOverlay.send('send');
				} else if (direction == 'down') {
					$(is1[currentset]).set("value", --s1[currentset]);
					CoreOverlay.send('send');
				}
				break;
	
			case 'right':
				if (direction == 'up') {
					$(is2[currentset]).set("value", ++s2[currentset]);
					CoreOverlay.send('send');
				} else if (direction == 'down') {
					$(is2[currentset]).set("value", --s2[currentset]);
					CoreOverlay.send('send');
				}
				break;

			case 'g':
				// special case 'g' in case the overlay is moved left or right, mostly left
				if (direction == 'left') {
					// code before changing currentset
					$(is1[currentset]).set('$background-color','#000');
					$(is2[currentset]).set('$background-color','#000');
					$(sb1[currentset]).set('$opacity', 0.75);
					$(sb2[currentset]).set('$opacity', 0.75);
					++currentset;
					// code after changing currentset
					$(is1[currentset]).set('$background-color','#080');
					$(is2[currentset]).set('$background-color','#080');
					positionstate = positionstate + 85;
					positionstate2 = positionstate2 - 85;
					$('.p1s').set('$left', positionstate + 'px');
					$('.p2s').set('$left', positionstate + 'px');
					$('.bc').set('$right', positionstate2 + 'px');
					// CoreOverlay.send('send');
					// we do not need to fire a 'send' as no values are getting updated
				} else if (direction == 'right') {
					// code before changing currentset
					$(is1[currentset]).set('$background-color','#000');
					$(is2[currentset]).set('$background-color','#000');
					--currentset;
					// code after changing currentset
					$(is1[currentset]).set('$background-color','#080');
					$(is2[currentset]).set('$background-color','#080');
					$(sb1[currentset]).set('$opacity', 1);
					$(sb2[currentset]).set('$opacity', 1);
					positionstate = positionstate - 85;
					positionstate2 = positionstate2 + 85;
					$('.p1s').set('$left', positionstate + 'px');
					$('.p2s').set('$left', positionstate + 'px');
					$('.bc').set('$right', positionstate2 + 'px');
					// CoreOverlay.send('send');
					// we do not need to fire a 'send' as no values are getting updated
				}
				break;
			
			default:
				break;
		}
		statusdisp(0); return 0;
	},
	toggleOverlay: function () {
		// toggleOverlay: turns the overlay on and off. turning it on will also fire a Send.

		// the overlaystatus variable will be in sync with the #overlaystatus checkbox so this works
		if ( overlaystatus ) {
			updating = true;
			$('.p1nb').set('$opacity', 0);
			$('.p2nb').set('$opacity', 0);
			$('.bc').set('$width', '0px');
			$('.bc').set('$opacity', 0);
			$('.p1c').set('$opacity', 0);
			$('.p2c').set('$opacity', 0);
			$('#gg').set('$opacity', 0);
			$('#tt').set('$opacity', 0);
			$('.scorenum').set('$opacity', 0);
			$('.sbg').set('$opacity', 0);
			positionstate = 340;
			positionstate2 = 1160;
			$.wait(1500).then(function() {
				clearolcon();
				$('.p1s').set('$left', '340px');
				$('.p2s').set('$left', '340px');
				$('.p1nb').set('$width', '0px');
				$('.p2nb').set('$width', '0px');
				$('.bc').set('$right', '1160px');
				$(is1[currentset]).set('$background-color','#000');
				$(is2[currentset]).set('$background-color','#000');
				currentset = 0;
				$(is1[currentset]).set('$background-color','#080');
				$(is2[currentset]).set('$background-color','#080');
				positionstate = 340;
				positionstate2 = 1160;
				updating = false;
			});
			overlaystatus = false;
			statusdisp(0); return 0;
		} else {
			$('.p1nb').set('$width', '715px');
			$('.p2nb').set('$width', '715px');
			$('.p1nb').set('$opacity', 1);
			$('.p2nb').set('$opacity', 1);
			$('.p1c').set('$opacity', 1);
			$('.p2c').set('$opacity', 1);
			$.wait(500).then(function() {
				$('.bc').set('$width', '600px');
				$('.bc').set('$opacity', 1);
				$.wait(300).then(function() {
					CoreOverlay.send('send');
					$.wait(700).then(function() {
						$('.sbg').set('$opacity', 1);
						positionstate = positionstate + 85;
						positionstate2 = positionstate2 - 85;
						$('.p1s').set('$left', positionstate + 'px');
						$('.p2s').set('$left', positionstate + 'px');
						$('.bc').set('$right', positionstate2 + 'px');
					});
				});
			});
			overlaystatus = true;
			statusdisp(0); return 0;
		}
	},
	switchp: function() {
		// switchp (can't call it switch): switches player, score, record and then re-sends.
		// takes immediate effect, except if the overlay isn't on

		// first, check if we're still updating and reject switchp until then
		if (updating) {
			statusdisp(11); return 11;
		}
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
			CoreOverlay.send('send');
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
	invertColors: function() {
		// invertColors: flip the blacks and whites. useful for light stages where overlay visibility is poor.

		// enabling this if will silently return without actually inverting anything
		//if (!overlaystatus) {
		//	statusdisp(0); return 0;
		//}
		inverted = $('#inverted').get('checked');
		if (!inverted) {
			//$('.pname').set('$color','#fff');
			$('.bc').set('$background-color','#000');
			$('.gtext').set('$color','#fff');
			$('.scorenum').set('$color','#fff');
		} else {
			//$('.pname').set('$color','#000');
			$('.bc').set('$background-color','#fff');
			$('.gtext').set('$color','#000');
			$('.scorenum').set('$color','#000');
		}
	}
};

function runUpdate(did, vid) {
	// runUpdate: function that actually updates the items on the overlay display.
	// did: string. the #id of the displayed element.
	// vid: string. the variable or arbitrary string associated with the displayed element.
	//   the content of vid should be identical to the content of did if nothing was changed.
	// example call: runUpdate('#s1', s1);

	// the simplification of this function assumes that all display elements update using
	//   the same animation, though this could be simply extended to include multiple animations.

	// in this core build, the player name elements are a combination of cr1 and p1 variables,
	//   the function is called as such: runUpdate('#p1n', '<small>' + cr1 + '</small>' + p1);

	if ($(did).get("innerHTML") != vid) {
		updating = true;
		$(did).set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				// SPECIAL CHECK FOR "3". SHOULD ONLY AFFECT SCORES BUT @ ME IF THINGS GO WRONG.
				if(vid == 3) {
					$(did).set("$color", "#2c5");
				} else {
					// would be do nothing loop but there may be cases where a score is decreased below 3
					$(did).set("$color", "#fff");
				}
				$(did).set("innerHTML", vid);
				$(did).set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
		});
	}
}


