var fileUrl = "output/event.xml";
var upSpeed = 15000;
var inSpeed = 1500;

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
    if (em == 1) {
        if (document.getElementById("evn").style.left == "-1745px") {
            $('.event2').animate({$$fade: 0}, inSpeed).then(function() { $('.events').animate({$left: '0px'}, inSpeed); }).then(function() {
            
            document.getElementById("evn").style.left = "0px";
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
            document.getElementById("evn").style.left = "0px";
                $('#e1').set("innerHTML", e1);
                $('.event1').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });

            updating = true;
            $('.event2').animate({$$fade: 0}, inSpeed).then(function() {
            document.getElementById("evn").style.left = "0px";
                $('#e2').set("innerHTML", e2);
                    $('.event2').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; em = 2; });
                
            });
        }
        else {
            $('.event2').animate({$$fade: 0}, inSpeed).then(function() { $('.events').animate({$left: '-3840px'}, inSpeed); }).then(function() {
            
            document.getElementById("evn").style.left = "0px";
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
            document.getElementById("evn").style.left = "0px";
                $('#e1').set("innerHTML", e1);
                $('.event1').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });

            updating = true;
            $('.event2').animate({$$fade: 0}, inSpeed).then(function() {
            document.getElementById("evn").style.left = "0px";
                $('#e2').set("innerHTML", e2);
                    $('.event2').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; em = 2; });
                
            });
        }
    }
    if (em == 2) {
        $('.event1').animate({$$fade: 0}, inSpeed);
        $('.event2').animate({$$fade: 0}, inSpeed).then(function() { $('.events').animate({$left: '-1745px'}, inSpeed); });
        
        em = 1;
    }
    /*
   	if (em == 3) { //sanity check
        if ($('#e1').get("innerHTML") != e3) {
            updating = true;
            $('.event1').animate({$$fade: 0}, inSpeed).then(function() {
                $('#e1').set("innerHTML", e3);
                em = 1;
                $('.event1').animate({$left: '135px'}, 2)
                .then(function() {
                    $('.event1').animate({$$fade: 1}, inSpeed);
                }).then(function() { updating = false; });
            });
        }
    }
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