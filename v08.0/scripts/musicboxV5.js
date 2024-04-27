var fileUrl = "output/sonq.xml";
var upSpeed = 15000;
var inSpeed = 1500;

var m1;
var mp = 2;
var bp = 0;

$(function() {
	checkUpdate();
    setInterval(function() { checkUpdate(); }, upSpeed);
});

function getResponse() {
	m1 = getElement(responseXml, "status");
//	e2 = getElement(responseXml, "text2");
//	e3 = getElement(responseXml, "text3");
//	e4 = getElement(responseXml, "text4");
}

function runUpdate() {
    bp = 0;
    $('.song').animate({$$fade: 0}, inSpeed).then(function() {
    
    if (mp == 1 && bp == 0) {
        updating = true;
        $('.song').animate({$$fade: 0}, inSpeed).then(function() {
            $('#m1').set("innerHTML", m1);
            $('.song').animate({$$fade: 1}, inSpeed);
            }).then(function() { updating = false; mp = 2; bp = 1; });
    }
    if (mp == 2 && bp == 0) {
        $('.song').animate({$$fade: 0}, inSpeed);
        mp = 1;
        bp = 1;
    }
    });
}