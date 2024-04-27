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
	hs = getElement(responseXml, "text2");
//	e3 = getElement(responseXml, "text3");
//	e4 = getElement(responseXml, "text4");
}

function shakeElements() {
    for (var w = 0; w < 15; w++){
        $('.btmbg').animate({$left: '609px'}, 25, 0);
        $('.topbg').animate({$left: '1009px'}, 25, 0).then(function(){
            $('.btmbg').animate({$left: '629px'}, 25, 0);
            $('.topbg').animate({$left: '1029px'}, 25, 0).then(function(){
                $('.btmbg').animate({$left: '609px'}, 25, 0);
                $('.topbg').animate({$left: '1009px'}, 25, 0).then(function(){
                    $('.btmbg').animate({$left: '629px'}, 25, 0);
                    $('.topbg').animate({$left: '1029px'}, 25, 0);
                });
            });
        });
    }
    $('.btmbg').animate({$left: '614px'}, 75, 0);
    $('.topbg').animate({$left: '1014px'}, 75, 0);
}

function runUpdate() {
    
    //intro schwing
    if (intro == 1) { //sanity check
        $('.btmbg').animate({$left: '357px'}, 1200, -0.1);
        $('.topbg').animate({$left: '1250px'}, 1200, -0.1).then(function(){
            $('.btmbg').animate({$left: '347px', $top: '50px'}, 650, -1);
            $('.topbg').animate({$left: '1260px', $top: '0px'}, 650, -1).then(function(){
                $('.btmbg').animate({$left: '614px'}, 200, 0.3);
                $('.topbg').animate({$left: '1014px'}, 200, 0.3).then(function(){
                    shakeElements();
                });
            });
        });
        
        if ($('#ev').get("innerHTML") != ev) {
            updating = true;
            $('.dummy').animate({$left: '-3001px'}, 1500).then(function() {
                $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                    $('#ev').set("innerHTML", ev);
                    //em = 2;
                    $('.toptext').animate({$$fade: 1}, inSpeed).then(function() { updating = false; });
                });
            });
        }

        if ($('#hs').get("innerHTML") != hs) {
            updating = true;
            $('.dummy').animate({$left: '-3001px'}, 1500).then(function() {
                $('.btmtext').animate({$$fade: 0}, inSpeed).then(function() {
                    $('#hs').set("innerHTML", hs);
                    //em = 3;
                    $('.btmtext').animate({$$fade: 1}, inSpeed).then(function() { updating = false; intro = 2; });
                });
            });
        }
    }
    
    if (intro == 2) { //oof
        if ($('#ev').get("innerHTML") != ev) {
            updating = true;
            $('.toptext').animate({$$fade: 0}, inSpeed).then(function() {
                $('#ev').set("innerHTML", ev);
                //em = 2;
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