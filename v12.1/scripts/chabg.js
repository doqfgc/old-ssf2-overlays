var MINI = require('minified'); 
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;

var x = 1440;
var y = 720;
var m = 150;

var posx = [1/4*x, 2/4*x, 3/4*x];
var posy = [1/4*y, 2/4*y, 3/4*y];

var direction = [-1*m, m];
var axis = ['x', 'y']; // not actually used as is; just for reference purposes
var imaid = ['#ima1', '#ima2'];
var imasrcid = ['#imasrc1', '#imasrc2'];

var ab, imasel, imasrc, imapos, av, ol;
var imagestate = 0;

function nextcha() {
    ol = imagestate;
    if (imagestate) { imagestate = 0; } else { imagestate = 1; }
    $(imaid[ol]).set('$opacity', 0);
    // determine next image and its properties
    imasel = Math.floor(Math.random() * 46);
    imasrc = 'cha/' + imasel + '.png';
    imapos = [
        Math.floor(Math.random() * 3), // posx
        Math.floor(Math.random() * 3), // posy
        Math.floor(Math.random() * 2), // direction
        Math.floor(Math.random() * 2)  // axis
    ];

    // prevent characters from going offscreen
    if (imapos[0] == 0 && imapos[3] == 0) { imapos[2] = 1; }
    if (imapos[1] == 0 && imapos[3] == 1) { imapos[2] = 1; }
    if (imapos[0] == 2 && imapos[3] == 0) { imapos[2] = 0; }
    if (imapos[1] == 2 && imapos[3] == 1) { imapos[2] = 0; }

    $(imasrcid[imagestate]).set('src', imasrc);
    $(imaid[imagestate]).set('$left', posx[imapos[0]] + 'px');
    $(imaid[imagestate]).set('$top', posy[imapos[1]] + 'px');
    $(imaid[imagestate]).set('$opacity', 1);
    if (imapos[3]) { // check for x axis vector
        av = direction[imapos[2]] + posx[imapos[0]];
        av = av + 'px';
        $(imaid[imagestate]).animate({$left: av}, 8500, 1);
    } else { // is y vector 
        av = direction[imapos[2]] + posy[imapos[1]];
        av = av + 'px';
        $(imaid[imagestate]).animate({$top: av}, 8500, 1);
    }
}

ab = setInterval(nextcha, 7000);

nextcha();