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
	CoreOverlay ver.1.0.0
	made without blood or sweat, but a lot of tears by doq

	main.js - the core code that powers all other components

	CoreOverlay is licensed under the terms of the MIT License; see the COPYING file for license details.
*/
var MINI = require('minified'); 
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;

var inSpeed = 500;
var outSpeed = 500;
var cr1, cr2, p1, p2, s1, s2, r1w, r2w, r1l, r2l, mm, gg, olds1, olds2;
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

	$('#hol-status').set('innerHTML', g[err]);
}

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
				s1 = $('#is1').get("value");
				s2 = $('#is2').get("value");
				cr1 = $('#icr1').get("value");
				cr2 = $('#icr2').get("value");
				r1w = $('#ir1w').get("value");
				r2w = $('#ir2w').get("value");
				r1l = $('#ir1l').get("value");
				r2l = $('#ir2l').get("value");
				gg = $('#imm').get("value");
				mm = $('#igg').get("value");
				runUpdate();
				break;
		
			case 'left':
				if (direction == 'up') {
					$('#is1').set("value", ++s1);
					$('#ir1w').set("value", ++r1w);
					$('#ir2l').set("value", ++r2l);
					HyperOverlay.send('send');
				} else if (direction == 'down') {
					$('#is1').set("value", --s1);
					$('#ir1w').set("value", --r1w);
					$('#ir2l').set("value", --r2l);
					HyperOverlay.send('send');
				}
				break;
	
			case 'right':
				if (direction == 'up') {
					$('#is2').set("value", ++s2);
					$('#ir2w').set("value", ++r2w);
					$('#ir1l').set("value", ++r1l);
					HyperOverlay.send('send');
				} else if (direction == 'down') {
					$('#is2').set("value", --s2);
					$('#ir2w').set("value", --r2w);
					$('#ir1l').set("value", --r1l);
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
			$('.leftglow').animate({$$fade: 1}, 300);
			$('.rightglow').animate({$$fade: 1}, 300).then(function() {
				$('.overlay').animate({$$fade: 0}, 300).then(function() {
					$('#p1').set('$opacity', 0);
					$('#p2').set('$opacity', 0);
					$('.p1s').animate({$$fade: 0}, outSpeed);
					$('.p2s').animate({$$fade: 0}, outSpeed);
					$('.p1r').animate({$$fade: 0}, outSpeed);
					$('.p2r').animate({$$fade: 0}, outSpeed);
					$('.leftmask').animate({$$fade: 1}, 1);
					$('.rightmask').animate({$$fade: 1}, 1);
					$('.sepmaskt').animate({$$fade: 1}, 1);
					$('.sepmaskb').animate({$$fade: 1}, 1);
					$('.sepmaskt').set('$top', '0px');
					$('.sepmaskb').set('$bottom', '0px');
					$('.leftmask').animate({$left: '-70px'}, 1);
					$('.rightmask').animate({$right: '-60px'}, 1);
					$('.rtext').animate({$$fade: 0}, outSpeed).then(function() {
						$('#p1').set("innerHTML", '');
						$('#p2').set("innerHTML", '');
						$('#s1').set("innerHTML", '');
						$('#s2').set("innerHTML", '');
						$('#r1').set("innerHTML", '');
						$('#r2').set("innerHTML", '');
						$('#gg').set("innerHTML", '');
						$('.overlay').animate({$$fade: 1}, 1);
						$('.overlay').animate({$right: '294px'}, 1);
					});
				});
			});
			overlaystatus = false;
			statusdisp(0); return 0;
		} else {
			$('.sepmaskt').set('$top', '-100px');
			$('.sepmaskb').set('$bottom', '-100px');
			$.wait(500).then(function() {
				HyperOverlay.send('send');
				$('.leftmask').animate({$left: '-900px'}, 400);
				$('.rightmask').animate({$right: '-600px'}, 400);
				$('.overlay').animate({$right: '60px'}, 400, 1).then(function() {
					$('.overlay').animate({$right: '50px'}, 2000, 1);
					$('.leftglow').animate({$$fade: 0}, 500);
					$('.rightglow').animate({$$fade: 0}, 500);
					$('.leftmask').animate({$$fade: 0}, 500);
					$('.rightmask').animate({$$fade: 0}, 500);
					$('.sepmaskt').animate({$$fade: 0}, 500);
					$('.sepmaskb').animate({$$fade: 0}, 500);
				});
			});
			overlaystatus = true;
			statusdisp(0); return 0;
		}
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
	}
};

function runUpdate() {

	recordon = $('#recordon').get('checked');

	if ($('#p1').get("innerHTML") != '<small>' + cr1 + '</small>' + p1) {
		updating = true;
		$('#p1').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#p1').animate({$left: '80px'}, 1).then(function() {
				$('#p1').set("innerHTML", '<small>' + cr1 + '</small>' + p1);
				$('#p1').set('$opacity', 1);
				$('#p1').set('$left', '30px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
		});
	}

	if ($('#p2').get("innerHTML") != '<small>' + cr2 + '</small>' + p2) {
		updating = true;
		$('#p2').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('.pname').set('$transition', 'none');
			$('#p2').animate({$left: '80px'}, 1).then(function() {
				$('.pname').set('$transition', 'opacity 500ms, left 500ms');
				$('#p2').set("innerHTML", '<small>' + cr2 + '</small>' + p2);
				$('#p2').set('$opacity', 1);
				$('#p2').set('$left', '30px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
		});
	}

	if ($('#s1').get("innerHTML") != s1) {
		updating = true;
		$('.p1s').animate({$$fade: 0}, outSpeed).then(function() {
			$('#s1').set("innerHTML", s1);
			$('.p1s').animate({$$fade: 1}, inSpeed);
			updating = false;
		});
	}

	if ($('#s2').get("innerHTML") != s2) {
        $('.dummy').animate({$$fade: 0}, 1).then(function() {
			updating = true;
			$('.p2s').animate({$$fade: 0}, outSpeed).then(function() {
				$('#s2').set("innerHTML", s2);
				$('.p2s').animate({$$fade: 1}, inSpeed);
				updating = false;
			});
		});
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
		$('.rtextbtm').animate({$$fade: 0}, outSpeed).then(function() {
			$('#gg').set("innerHTML", gg);
			$('.rtextbtm').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
        });
	}

	if ($('#tt').get("innerHTML") != mm) {
		updating = true;
		$('.rtexttop').animate({$$fade: 0}, outSpeed).then(function() {
			$('#tt').set("innerHTML", mm);
			$('.rtexttop').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
        });
	}
}