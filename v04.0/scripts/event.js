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
	e4 = getElement(responseXml, "text1");
	e3 = getElement(responseXml, "text2");
	e2 = getElement(responseXml, "text3");
	e1 = getElement(responseXml, "text4");
}

function runUpdate() {
    
    var em = 1;
    
   	if (em = 1) { //sanity check
        if ($('#e1').get("innerHTML") != e1) {
            updating = true;
            $('.event1').animate({$$fade: 0, $left: '600px'}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e1);
                em = 2;
                $('.event1').animate({$left: '650px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1, $left: '625px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (em = 2) { //sanity check
        if ($('#e1').get("innerHTML") != e3) {
            updating = true;
            $('.event1').animate({$$fade: 0, $left: '600px'}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e3);
                em = 1;
                $('.event1').animate({$left: '650px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1, $left: '625px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (em = 1) { //sanity check
        if ($('#e2').get("innerHTML") != e2) {
            updating = true;
            $('.event2').animate({$$fade: 0, $right: '650px'}, inSpeed).then(function() {
                $('#e2').set("innerHTML", e2);
                em = 2;
                $('.event2').animate({$right: '600px'}, 2)
                .then(function() {
                    $('.event2').animate({$$fade: 1, $right: '625px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
   	if (em = 2) { //sanity check
        if ($('#e2').get("innerHTML") != e4) {
            updating = true;
            $('.event2').animate({$$fade: 0, $right: '650px'}, inSpeed).then(function() {
                $('#e2').set("innerHTML", e4);
                em = 1;
                $('.event2').animate({$right: '600px'}, 2)
                .then(function() {
                    $('.event2').animate({$$fade: 1, $right: '625px'}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
    
	$('.btm').animate({$top: '0px'}, inSpeed);
}