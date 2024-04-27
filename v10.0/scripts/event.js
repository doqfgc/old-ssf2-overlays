var fileUrl = "output/event.xml";
var upSpeed = 7500;
var inSpeed = 1000;

var ev, hs;
var intro = 1;


$(function() {
	checkUpdate();
    setInterval(function() { checkUpdate(); }, upSpeed);
});

function getResponse() {
	ev = getElement(responseXml, "text1");
//	hs = getElement(responseXml, "text2");
//	e3 = getElement(responseXml, "text3");
//	e4 = getElement(responseXml, "text4");
}

function runUpdate() {

    //intro schwing
    if (intro == 1) { //sanity check
        $('.btmbg').animate({$left: '1080px'}, 1200, 0);
        intro = 2;
    }

    if (intro == 2) { //oof
        if ($('#ev').get("innerHTML") != ev) {
            updating = true;
            $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#ev').set("innerHTML", ev);
                $('.topbg').set("$left", '-50px');
                //em = 2;
                $('.topbg').animate({$left: '0px'}, inSpeed);
                $('.toptext').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
        }

        if ($('#hs').get("innerHTML") != hs) {
            updating = true;
            $('.btmtext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#hs').set("innerHTML", hs);
                //em = 3;
                $('.btmtext').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
            });
        }
    }

    /*
   	if (em == 1) { //sanity check
        if ($('#ev').get("innerHTML") != ev) {
            updating = true;
            $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#ev').set("innerHTML", ev);
                em = 2;
                $('.toptext').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.toptext').animate({$$fade: 1, $left: '110px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }

   	if (em == 2) { //sanity check
        if ($('#ev').get("innerHTML") != hs) {
            updating = true;
            $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#ev').set("innerHTML", hs);
                em = 3;
                $('.toptext').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.toptext').animate({$$fade: 1, $left: '110px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }

   	if (em == 1) { //sanity check
        if ($('#ev').get("innerHTML") != e3) {
            updating = true;
            $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#ev').set("innerHTML", e3);
                em = 1;
                $('.toptext').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.toptext').animate({$$fade: 1, $left: '110px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }

   	if (em == 2) { //sanity check
        if ($('#ev').get("innerHTML") != e4) {
            updating = true;
            $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#ev').set("innerHTML", e4);
                em = 1;
                $('.toptext').animate({$left: '130px'}, 2)
                .then(function() {
                    $('.toptext').animate({$$fade: 1, $left: '105px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    */
}