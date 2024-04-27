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

// debug switch; disables transitions and sets active state automatically
// useful for final overlay placements
var debugswitch = true;


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

var inverted = false;
$('#invertstatus').set('checked', false);

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

function clearolcon() {
	// simply clears content on overlay. bypasses runupdate() so that things don't break
	$('#p1n').set("innerHTML", '');
	$('#p2n').set("innerHTML", '');
	$('#p1r').set("innerHTML", '');
	$('#p2r').set("innerHTML", '');
	$('#s1').set("innerHTML", '');
	$('#s2').set("innerHTML", '');
	$('#tt').set("innerHTML", '');
	$('#gg').set("innerHTML", '');
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
			updating = true;
			if (recordon) {
				$('#p1nc').set('$', '-rt-p1nc +rf-p1nc');
				$('#p2nc').set('$', '-rt-p2nc +rf-p2nc');
				$('#p1nb').set('$', '-rt-p1nb +rf-p1nb');
				$('#p2nb').set('$', '-rt-p2nb +rf-p2nb');
			} else {
				$('#p1nc').set('$', '-t-p1nc +f-p1nc');
				$('#p2nc').set('$', '-t-p2nc +f-p2nc');
				$('#p1nb').set('$', '-t-p1nb +f-p1nb');
				$('#p2nb').set('$', '-t-p2nb +f-p2nb');
			}
			$('#p1rc').set('$', '-t-p1rc +f-p1rc');
			$('#p1rb').set('$', '-t-p1rb +f-p1rb');
			$('#p2rc').set('$', '-t-p2rc +f-p2rc');
			$('#p2rb').set('$', '-t-p2rb +f-p2rb');
			$('#mmc').set('$', '-t-mmc +f-mmc');
			$('#mmb').set('$', '-t-mmb +f-mmb');
			$('#ggc').set('$', '-t-ggc +f-ggc');
			$('#ggb').set('$', '-t-ggb +f-ggb');
			$('.centreblock').set('$opacity', 0);
			$.wait(1000).then(function() {
				$('.p1s').animate({$$fade: 0}, outSpeed);
				$('.p2s').animate({$$fade: 0}, outSpeed);
				$('#p1r').animate({$$fade: 0}, outSpeed);
				$('#p2r').animate({$$fade: 0}, outSpeed);
				// everything should be scaled out now; silently set back to start
				$.wait(500).then(function() {
					if (recordon) {
						$('#p1nc').set('$', '-rf-p1nc +s-p1nc');
						$('#p2nc').set('$', '-rf-p2nc +s-p2nc');
						$('#p1nb').set('$', '-rf-p1nb +s-p1nb');
						$('#p2nb').set('$', '-rf-p2nb +s-p2nb');
					} else {
						$('#p1nc').set('$', '-f-p1nc +s-p1nc');
						$('#p2nc').set('$', '-f-p2nc +s-p2nc');
						$('#p1nb').set('$', '-f-p1nb +s-p1nb');
						$('#p2nb').set('$', '-f-p2nb +s-p2nb');
					}
					$('#p1rc').set('$', '-f-p1rc +s-p1rc');
					$('#p1rb').set('$', '-f-p1rb +s-p1rb');
					$('#p2rc').set('$', '-f-p2rc +s-p2rc');
					$('#p2rb').set('$', '-f-p2rb +s-p2rb');
					$('#mmc').set('$', '-f-mmc +s-mmc');
					$('#mmb').set('$', '-f-mmb +s-mmb');
					$('#ggc').set('$', '-f-ggc +s-ggc');
					$('#ggb').set('$', '-f-ggb +s-ggb');
					$.wait(1000).then(function() {
						clearolcon();
						updating = false;
					});
				});
			});
			overlaystatus = false;
			statusdisp(0); return 0;
		} else {
			$('#p1nc').set('$', '-s-p1nc +t-p1nc');
			$('#p2nc').set('$', '-s-p2nc +t-p2nc');
			$('#p1nb').set('$', '-s-p1nb +n-p1nb');
			$('#p2nb').set('$', '-s-p2nb +n-p2nb');
			$('#mmc').set('$', '-s-mmc +t-mmc');
			$('#mmb').set('$', '-s-mmb +n-mmb');
			$('#ggc').set('$', '-s-ggc +t-ggc');
			$('#ggb').set('$', '-s-ggb +n-ggb');
			$.wait(1000).then(function() {
				$('.centreblock').set('$opacity', 1);
				$('#p1nb').set('$', '-n-p1nb +t-p1nb');
				$('#p2nb').set('$', '-n-p2nb +t-p2nb');
				$('#mmb').set('$', '-n-mmb +t-mmb');
				$('#ggb').set('$', '-n-ggb +t-ggb');
				HyperOverlay.send('send');
				if (recordon) {
					$.wait(1500).then(function() {
						$('#p1nc').set('$', '-t-p1nc +rt-p1nc');
						$('#p2nc').set('$', '-t-p2nc +rt-p2nc');
						$('#p1nb').set('$', '-t-p1nb +rt-p1nb');
						$('#p2nb').set('$', '-t-p2nb +rt-p2nb');
						$('#p1rc').set('$', '-s-p1rc +t-p1rc');
						$('#p1rb').set('$', '-s-p1rb +n-p1rb');
						$('#p2rc').set('$', '-s-p2rc +t-p2rc');
						$('#p2rb').set('$', '-s-p2rb +n-p2rb');
						$.wait(1000).then(function() {
							$('#p1rb').set('$', '-n-p1rb +t-p1rb');
							$('#p2rb').set('$', '-n-p2rb +t-p2rb');
						});
					});
				}
			});
			overlaystatus = true;
			statusdisp(0); return 0;
		}
	},
	togglerecord: function () {
		// first, check if we're still updating and reject togglerecord until then
		if (updating) {
			statusdisp(11); return 11;
		}
		// next, check if we're not enabled and silently return
		if (!overlaystatus) {
			statusdisp(0); return 0;
		}
		recordon = $('#recordon').get('checked');
		if (recordon) {
			$('#p1r').set('$opacity', 1);
			$('#p2r').set('$opacity', 1);
			$('#p1nc').set('$', '-t-p1nc +rt-p1nc');
			$('#p2nc').set('$', '-t-p2nc +rt-p2nc');
			$('#p1nb').set('$', '-t-p1nb +rt-p1nb');
			$('#p2nb').set('$', '-t-p2nb +rt-p2nb');
			$('#p1rc').set('$', '-s-p1rc +t-p1rc');
			$('#p1rb').set('$', '-s-p1rb +n-p1rb');
			$('#p2rc').set('$', '-s-p2rc +t-p2rc');
			$('#p2rb').set('$', '-s-p2rb +n-p2rb');
			$.wait(1000).then(function() {
				$('#p1rb').set('$', '-n-p1rb +t-p1rb');
				$('#p2rb').set('$', '-n-p2rb +t-p2rb');
				$('#p2r').animate({$$fade: 1}, inSpeed);
				$('#p1r').animate({$$fade: 1}, inSpeed);
			});
		} else {
			$('#p1nc').set('$', '-rt-p1nc +t-p1nc');
			$('#p2nc').set('$', '-rt-p2nc +t-p2nc');
			$('#p1nb').set('$', '-rt-p1nb +t-p1nb');
			$('#p2nb').set('$', '-rt-p2nb +t-p2nb');
			$('#p1rb').set('$', '-t-p1rb +n-p1rb');
			$('#p2rb').set('$', '-t-p2rb +n-p2rb');
			$.wait(1000).then(function() {
				$('#p1rc').set('$', '-t-p1rc +s-p1rc');
				$('#p1rb').set('$', '-n-p1rb +s-p1rb');
				$('#p2rc').set('$', '-t-p2rc +s-p2rc');
				$('#p2rb').set('$', '-n-p2rb +s-p2rb');
				$('#p2r').animate({$$fade: 0}, outSpeed);
				$('#p1r').animate({$$fade: 0}, outSpeed);
			});
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
	invertColours: function() {
		// invertColours: applies .inverted to select elements, which it applies a filter: invert()
		// ideal for applying to dark elements to flip them on dark stages for visibility
		inverted = $('#invertstatus').get('checked');
		if (inverted) {
			$('#p1nb').set('$', '+inverted');
			$('#p2nb').set('$', '+inverted');
			$('#p1rb').set('$', '+inverted');
			$('#p2rb').set('$', '+inverted');
			$('#ggb').set('$', '+inverted');
			$('#mmb').set('$', '+inverted');
			$('#ggc').set('$', '+inverted');
			$('#mmc').set('$', '+inverted');
			$('.centreblock').set('$', '+inverted');
		} else {
			$('#p1nb').set('$', '-inverted');
			$('#p2nb').set('$', '-inverted');
			$('#p1rb').set('$', '-inverted');
			$('#p2rb').set('$', '-inverted');
			$('#ggb').set('$', '-inverted');
			$('#mmb').set('$', '-inverted');
			$('#ggc').set('$', '-inverted');
			$('#mmc').set('$', '-inverted');
			$('.centreblock').set('$', '-inverted');
		}
	}
};

function runUpdate() {

	recordon = $('#recordon').get('checked');

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

	if ($('#p1r').get("innerHTML") != (r1w + '-' + r1l)) {
		updating = true;
		$('#p1r').animate({$$fade: 0}, outSpeed).then(function() {
			$('#p1r').set("innerHTML", r1w + '-' + r1l);
			if (recordon) $('#p1r').animate({$$fade: 1}, inSpeed);
			updating = false;
		});
	}

	if ($('#p2r').get("innerHTML") != (r2w + '-' + r2l)) {
		updating = true;
		$('#p2r').animate({$$fade: 0}, outSpeed).then(function() {
			$('#p2r').set("innerHTML", r2w + '-' + r2l);
			if (recordon) $('#p2r').animate({$$fade: 1}, inSpeed);
			updating = false;
		});
	}

	if ($('#gg').get("innerHTML") != gg) {
		updating = true;
		$('#gg').set('$left', '-50px');
		$('#gg').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#gg').set('$transition', 'none');
			$('#gg').set('$left', '50px');
			$.wait(40).then(function() { // a single frame
				$('#gg').set('$transition', 'opacity 500ms, left 500ms');
				$('#gg').set("innerHTML", gg);
				$('#gg').set('$opacity', 1);
				$('#gg').set('$left', '0px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
	    });
	}

	if ($('#tt').get("innerHTML") != mm) {
		updating = true;
		$('#tt').set('$right', '-50px');
		$('#tt').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
			$('#tt').set('$transition', 'none');
			$('#tt').set('$right', '50px');
			$.wait(40).then(function() { // a single frame
				$('#tt').set('$transition', 'opacity 500ms, right 500ms');
				$('#tt').set("innerHTML", mm);
				$('#tt').set('$opacity', 1);
				$('#tt').set('$right', '0px');
				$.wait(inSpeed).then(function() { updating = false; });
			});
	    });
	}
}


