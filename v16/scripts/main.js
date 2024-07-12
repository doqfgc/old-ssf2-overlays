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
var twotone, ctarget1, ctarget2;
var updating = false;
// force the checkbox to unchecked for reasons
var overlaystatus = false;
$('#overlaystatus').set('checked', false);

var recordon = true;
$('#recordon').set('checked', true);

var faded = false;
var faded2 = false;
$('#fadestatus').set('checked', false);
$('#fadestatus2').set('checked', false);

// these are useful if you use score bars instead of score numbers
// var sc1 = ['.score11','.score12','.score13'];
// var sc2 = ['.score21','.score22','.score23'];

function statusdisp(err) {
	var g = [];
	g[0] = 'OK';
	g[11] = 'E 11: overlay is in the middle of updating';
	g[12] = 'E 12: can\'t send on a disabled overlay';
	g[13] = 'E 13: can\'t toggle on a faded overlay, unfade first';

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

function overlayinit() {
	// sets content of overlay immediately, bypassing running
	// HyperOverlay.send() and thus runupdate() on init of display.
	// allows for more elaborate init animations

	$('#p1n').set('$opacity', 0);
	$('#p2n').set('$opacity', 0);
	$('#p1r').animate({$$fade: 0}, 1);
	$('#p2r').animate({$$fade: 0}, 1);
	$('.p1s').animate({$$fade: 0}, 1);
	$('.p2s').animate({$$fade: 0}, 1);
	$('#gg').set('$opacity', 0);
	$('#tt').set('$opacity', 0);

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

	$('#p1n').set("innerHTML", '<small>' + cr1 + '</small>' + p1);
	$('#p2n').set("innerHTML", '<small>' + cr2 + '</small>' + p2);
	$('#p1r').set("innerHTML", r1w + '-' + r1l);
	$('#p2r').set("innerHTML", r2w + '-' + r2l);
	$('#s1').set("innerHTML", s1);
	$('#s2').set("innerHTML", s2);
	$('#tt').set("innerHTML", mm);
	$('#gg').set("innerHTML", gg);
}

function getRandomIntInclusive(min, max) {
	// stolen from MDN. used for generating line colours
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randn_bm(min, max, skew) {
	// stolen from a stackoverflow question. better way to generate hue and saturation?
	// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
	let u = 0, v = 0;
	while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random()
	let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )

	num = num / 10.0 + 0.5 // Translate to 0 -> 1
	if (num > 1 || num < 0) 
		num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range

	else{
		num = Math.pow(num, skew) // Skew
		num *= max - min // Stretch to fill range
		num += min // offset to min
	}
	return num
}
  

function generatelines() {
	// generate colour lines first
	var clines = [  [11,31,''],
					[11,26,''],
					[22,25,''],
					[13,29,''],
					[12,25,''],
					[17, 4,''],
					[22, 9,''],
					[14, 0,''],
					[24,26,''],
					[10,32,''],
					[16,12,''],
					[20,30,''],
					[19,20,''],
					[19, 7,''],
					[21,29,''],
					[10,28,''],
					[13, 2,''],
					[25,25,''],
					[24,15,''],
					[25,18,''],
					[22,28,''],
					[12, 1,''],
					[25,15,''],
					[10,38,''],
					[15,34,'']
	];
	var ll = clines.length;
	// let's have them be procedurally generated using these variables
	twotone = false; //set to false to have only one colour
	ctarget1 = 137;
	ctarget2 = 137; //unused if twotone = false;
	for (var j = 0; j < ll; j++) {
		var bias = true;
		var chue, csat, clum;
		// if bias is false, we use ctarget2 to generate hue.
		// if twotone is false, bias will always be true.
		if (twotone) { bias = Math.random() > 0.5 }
		if (bias) {
			chue = getRandomIntInclusive(ctarget1 - 15, ctarget1 + 15);
		} else {
			chue = getRandomIntInclusive(ctarget2 - 15, ctarget2 + 15);
		}
		//csat = getRandomIntInclusive(30, 95);
		//clum = getRandomIntInclusive(20, 75);
		csat = Math.floor(randn_bm(-20, 150, 1));
		if (csat > 95) {csat = 95}; if (csat < 30) {csat = 30}; // rare cases where it's outside the desired bounds
		clum = Math.floor(randn_bm(-50, 130, 1));
		if (clum > 75) {clum = 75}; if (clum < 20) {clum = 20}; // rare cases where it's outside the desired bounds
		clines[j][2] = 'hsl(' + chue + ', ' + csat + '%, ' + clum + '%)';
	}
	for (var i = 0; i < ll; i++) {
		var linecase = EE('div', { '@class': 'initlineslines',
						  '@id': 'icline' + i,
						  '@style': 'height: ' + clines[i][0] + 'px; top: ' + (clines[i][1] + 35) + 'px; background-color: ' + clines[i][2] });
		$('#ilmainc').add(linecase);
	}
	// then black lines
	var blines = [	[7,40],
					[8,2],
					[9,15],
					[10,9],
					[9,0],
					[7,39],
					[7,33],
					[10,6],
					[5,33],
					[6,36],
					[5,7],
					[9,20],
					[6,29],
					[10,26],
					[10,40],
					[5,5],
					[10,33],
					[7,27],
					[9,8],
					[7,39],
					[9,14],
					[5,17],
					[10,34],
					[5,23],
					[10,26]
	];
	var kl = blines.length;
	for (var i = 0; i < kl; i++) {
		var linecase = EE('div', { '@class': 'initlineslines',
						  '@id': 'ibline' + i,
						  '@style': 'height: ' + blines[i][0] + 'px; top: ' + (blines[i][1] + 35) + 'px; background-color: #000' });
		$('#ilmainb').add(linecase);
	}
}

function regencolours() {
	// regenerates colours after init, making it random every time!
	for (var j = 0; j < 25; j++) {
		var bias = true;
		var chue, csat, clum;
		// if bias is false, we use ctarget2 to generate hue.
		// if twotone is false, bias will always be true.
		if (twotone) { bias = Math.random() > 0.5 }
		if (bias) {
			chue = getRandomIntInclusive(ctarget1 - 15, ctarget1 + 15);
		} else {
			chue = getRandomIntInclusive(ctarget2 - 15, ctarget2 + 15);
		}
		//csat = getRandomIntInclusive(30, 95);
		//clum = getRandomIntInclusive(20, 75);
		csat = Math.floor(randn_bm(-20, 150, 1));
		if (csat > 95) {csat = 95}; if (csat < 30) {csat = 30}; // rare cases where it's outside the desired bounds
		clum = Math.floor(randn_bm(-50, 130, 1));
		if (clum > 75) {clum = 75}; if (clum < 20) {clum = 20}; // rare cases where it's outside the desired bounds
		var cful = 'hsl(' + chue + ', ' + csat + '%, ' + clum + '%)';
		$('#icline'+j).set('$background-color', cful);
	}
}

function feedlines() {
	// start color lines at 100ms intervals. start black lines after 2000ms at 100ms intervals
	var l = 0;
	var m = 0;
	var cinterval = setInterval(() => {
		$('#icline' + l).set('$width', '1510px');
		l++;
		if (l == 25) {
			clearInterval(cinterval);
		}
	}, 50);
	$.wait(750).then(function() {
		var binterval = setInterval(() => {
			$('#ibline' + m).set('$width', '1510px');
			m++;
			if (m == 25) {
				clearInterval(binterval);
			}
		}, 50);
	});
}

function runopener() {
	$('.opener').set('$opacity', 1);
	$('.opener').set('$transform', 'translateX(-50%) scale(1)');
	$.wait(500).then(function() {
		var sst = $('.subsubtext').get('$width', true) + 7;
		$('.subtext').set('$width', sst + 'px');
	})
	$.wait(1500).then(function() {
		$('.opener').set('$transform', 'translateX(-50%) scale(1.2)');
		$('.opener').set('$opacity', 0);
	});
}

function resetopener() {
	$('.opener').set('$transform', 'translateX(-50%) scale(0.8)');
	for (var i=0;i<25;i++){
		$('#icline' + i).set('$width', '0px');
		$('#ibline' + i).set('$width', '0px');
		$('.subtext').set('$width', '0px');
		regencolours();
	}
}

function checkpnamewidth(pname, pnamec) {
	// check if we're too wide and set font size to fit
	var pnw = $(pname).get('$width', true);
	var fs = 42;
	// the width of the name box is 575px, we can hard code this
	if (pnw < 575) {
		$(pnamec).set('$font-size', '42px');
		//$(pname).set('$width', 'auto');
		//$(pname).set('$transform', 'translateX(0%)');
	} else {
		// insert a calculation here that calcs the amount needed to resize by and then do it
		// diff: 115
		// optimal font: 33
		// font difference: 9
		// differential: 13
		// scale new: 0.81
		// scale difference: 0.19
		// scale differential: 6px for every 0.01
		var nf = Math.floor((pnw - 575) / 12);
		fs = fs - nf;
		// var tf = nf / 2;
		$(pnamec).set('$font-size', fs + 'px');

		//var ns = Math.floor((pnw - 575) / 6);
		//ns = ns/100;
		//var sf = 1 - ns;
		//$(pname).set('$width', '0px');
		//$(pname).set('$transform', 'translateX(0%) scale(' +sf+ ')');
	}
	// currently there's a regression where setting pname to a name that is too long
	// normally, but shorter than the old name, it'll revert back to 42 and break
	// shouldn't be a problem in normal use, though

	// the crew font size doesn't adjust to fit; it would break the update function
	// the scale function works but it breaks the opening sequence more than
	// I'd like
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
		// then, check if we're faded, unfade, and then fire again
		if (faded || faded2) {
			faded = false;
			faded2 = false;
			$('#fadestatus').set('checked', false);
			$('#fadestatus2').set('checked', false);
			HyperOverlay.fadeOverlay();
			$.wait(1000).then(function() {
				HyperOverlay.send(side, direction);
			});
			statusdisp(0); return 0;
		}
		// finally, check for what we're doing and then do it
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

		// first forbid toggle if we're faded
		if ( faded ) {
			statusdisp(13); return 13;
		}
		if ( overlaystatus ) {
			updating = true;
			$('.bigbar').set('$opacity', 0);
			$('.bigbar').set('$width', '0px');
			$('.littlebar').set('$opacity', 0);
			$('.p1nb').set('$opacity', 0);
			$('.p2nb').set('$opacity', 0);
			$('.bc').set('$width', '0px');
			$('.p1c').set('$opacity', 0);
			$('.p2c').set('$opacity', 0);
			$('#gg').set('$opacity', 0);
			$('#tt').set('$opacity', 0);
			$.wait(1500).then(function() {
				$('#p1n').set('$left', '50%');
				$('#p2n').set('$left', '50%');
				$('#p1n').set('$transform', 'translateX(-50%)');
				$('#p2n').set('$transform', 'translateX(-50%)');
				$('#p1n').set('$opacity', 0);
				$('#p2n').set('$opacity', 0);
				$('.pname small').set('$font-size', '24px');
				$('.namebox').set('$font-size', '36px');
				clearolcon();
				updating = false;
			});
			$.wait(2000).then(function() {
				$('.bigbar').set('$width', '1645px');
			})
			overlaystatus = false;
			statusdisp(0); return 0;
		} else {
			overlayinit();
			runopener();
			$('.p1nb').set('$top', '35px');
			$('.p2nb').set('$top', '35px');
			$('.p1c').set('$opacity', 1);
			$('.p2c').set('$opacity', 1);
			$.wait(500).then(feedlines);
			$.wait(1500).then(function() {
				$.wait(250).then(function() {
					$('#p1n').set('$opacity', 1);
					$('#p2n').set('$opacity', 1);
					$('.pname small').set('$font-size', '28px');
					$('.namebox').set('$font-size', '42px');
					checkpnamewidth('#p1n', '#p1nc');
					checkpnamewidth('#p2n', '#p2nc');
				})
				$.wait(750).then(function() {
					$('#p1n').set('$left', '0%');
					$('#p2n').set('$left', '0%');
					$('#p1n').set('$transform', 'translateX(0%)');
					$('#p2n').set('$transform', 'translateX(0%)');
					$('.bc').set('$width', '1000px');
				});
				$.wait(1250).then(function() {
					$('.p1nb').set('$opacity', 1);
					$('.p2nb').set('$opacity', 1);
					// $('.littlebar').set('$opacity', 1);
					if (recordon) {
						$('.recbox').set('$opacity', 1);
						$('#p1r').animate({$$fade: 1}, inSpeed);
						$('#p2r').animate({$$fade: 1}, inSpeed);
					}
					$('.p1s').animate({$$fade: 1}, inSpeed);
					$('.p2s').animate({$$fade: 1}, inSpeed);
					$('#gg').set('$opacity', 1);
					$('#tt').set('$opacity', 1);
					$('.bigbar').set('$opacity', 1);
					updating = false;
				});
				$.wait(2000).then(resetopener);
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
			recordon = $('#recordon').get('checked');
			statusdisp(0); return 0;
		}
		recordon = $('#recordon').get('checked');
		if (recordon) {
			$('.recbox').set('$opacity', 1);
		} else {
			$('.recbox').set('$opacity', 0);
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
	fadeOverlay: function(col) {
		// fadeOverlay: enter the second, faded, state of the overlay
		// first, check if we're not enabled and silently return
		if (!overlaystatus) {
			statusdisp(0); return 0;
		}
		faded = $('#fadestatus').get('checked');
		faded2 = $('#fadestatus2').get('checked');
		if (faded || faded2) {
			if (faded && faded2) {
				// if both boxes somehow get checked (this shouldn't happen),
				// silently switch the fade status
				switch (col) {
					case 1:
						$('#fadestatus2').set('checked', false);
						$('#p1n').set('$', '-fl-p1n');
						$('#p2n').set('$', '-fl-p2n');
						$('#s1').set('$', '-fl-p1n');
						$('#s2').set('$', '-fl-p2n');
						break;
					case 2:
						$('#fadestatus').set('checked', false);
						$('#p1n').set('$', '-f-p1n');
						$('#p2n').set('$', '-f-p2n');
						$('#s1').set('$', '-f-p1n');
						$('#s2').set('$', '-f-p2n');
						break;
				}
			} else {
				$('#p1rc').set('$top', '25px');
				$('#p1rc').set('$opacity', 0);
				$('#p2rc').set('$top', '25px');
				$('#p2rc').set('$opacity', 0);
				$('.bigbar').set('$top', '20px');
				$('.bigbar').set('$opacity', 0);
				$('.littlebar').set('$top', '20px');
				$('.littlebar').set('$opacity', 0);
				$('.p1nb').set('$top', '20px');
				$('.p1nb').set('$opacity', 0);
				$('.p2nb').set('$top', '20px');
				$('.p2nb').set('$opacity', 0);
				$('.bc').set('$top', '75px');
				$('.bc').set('$opacity', 0);
				$('#p1n').set('$opacity', '0.90');
				$('#p2n').set('$opacity', '0.90');
				$('#s1').set('$opacity', '0.90');
				$('#s2').set('$opacity', '0.90');
			}
			switch (col) {
				case 1:
					$('#p1n').set('$', '+f-p1n');
					$('#p2n').set('$', '+f-p2n');
					$('#s1').set('$', '+f-p1n');
					$('#s2').set('$', '+f-p2n');
					break;
				case 2:
					$('#p1n').set('$', '+fl-p1n');
					$('#p2n').set('$', '+fl-p2n');
					$('#s1').set('$', '+fl-p1n');
					$('#s2').set('$', '+fl-p2n');
					break;
			}
		} else {
			$('#p1rc').set('$top', '40px');
			$('#p1rc').set('$opacity', 1);
			$('#p2rc').set('$top', '40px');
			$('#p2rc').set('$opacity', 1);
			$('.bigbar').set('$top', '35px');
			$('.bigbar').set('$opacity', 1);
			$('.littlebar').set('$top', '35px');
			$('.littlebar').set('$opacity', 1);
			$('.p1nb').set('$top', '35px');
			$('.p1nb').set('$opacity', 1);
			$('.p2nb').set('$top', '35px');
			$('.p2nb').set('$opacity', 1);
			$('.bc').set('$top', '90px');
			$('.bc').set('$opacity', 1);
			$('#p1n').set('$', '-f-p1n');
			$('#p2n').set('$', '-f-p2n');
			$('#s1').set('$', '-f-p1n');
			$('#s2').set('$', '-f-p2n');
			$('#p1n').set('$', '-fl-p1n');
			$('#p2n').set('$', '-fl-p2n');
			$('#s1').set('$', '-fl-p1n');
			$('#s2').set('$', '-fl-p2n');
			$('#p1n').set('$opacity', '1');
			$('#p2n').set('$opacity', '1');
			$('#s1').set('$opacity', '1');
			$('#s2').set('$opacity', '1');
		}
	}
};

function runUpdate() {

	recordon = $('#recordon').get('checked');

	if ($('#p1n').get("innerHTML") != '<small style="font-size: 28px;">' + cr1 + '</small>' + p1) {
		updating = true;
		$('#p1n').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#p1n').set("innerHTML", '<small style="font-size: 28px;">' + cr1 + '</small>' + p1);
				$('#p1n').set('$opacity', 1);
				checkpnamewidth('#p1n', '#p1nc');
				$.wait(inSpeed).then(function() { updating = false; });
		});
	}

	if ($('#p2n').get("innerHTML") != '<small style="font-size: 28px;">' + cr2 + '</small>' + p2) {
		updating = true;
		$('#p2n').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#p2n').set("innerHTML", '<small style="font-size: 28px;">' + cr2 + '</small>' + p2);
				$('#p2n').set('$opacity', 1);
				checkpnamewidth('#p2n', '#p2nc');
				$.wait(inSpeed).then(function() { updating = false; });
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
		$('#gg').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#gg').set("innerHTML", gg);
				$('#gg').set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
	    });
	}

	if ($('#tt').get("innerHTML") != mm) {
		updating = true;
		$('#tt').set('$opacity', 0);
		$.wait(inSpeed).then(function() {
				$('#tt').set("innerHTML", mm);
				$('#tt').set('$opacity', 1);
				$.wait(inSpeed).then(function() { updating = false; });
	    });
	}
}


