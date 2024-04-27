var fileUrl = "output/event.xml";
var upSpeed = 7500;
var inSpeed = 1000;

var e1, e2, e3, e4;
var em = 1;

$(function() {
	checkUpdate();
    setInterval(function() { checkUpdate(); }, upSpeed);
});

function getResponse() {
	e1 = getElement(responseXml, "text1");
	e2 = getElement(responseXml, "text2");
	e3 = getElement(responseXml, "text3");
//	e4 = getElement(responseXml, "text4");
}

function runUpdate() {
    
   	if (em == 1) { //sanity check
        if ($('#e1').get("innerHTML") != e1) {
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e1);
                em = 2;
                $('.event1').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1, $left: '110px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (em == 2) { //sanity check
        if ($('#e1').get("innerHTML") != e2) {
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e2);
                em = 3;
                $('.event1').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1, $left: '110px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (em == 3) { //sanity check
        if ($('#e1').get("innerHTML") != e3) {
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e3);
                em = 1;
                $('.event1').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1, $left: '110px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    /*
   	if (em == 4) { //sanity check
        if ($('#e1').get("innerHTML") != e4) {
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e4);
                em = 1;
                $('.event1').animate({$left: '130px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1, $left: '105px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    */
}