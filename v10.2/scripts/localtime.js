var fileUrl = "output/event.xml";
var upSpeed = 1000;
var inSpeed = 1000;

var lt, hs;


$(function() {
	checkUpdate();
    setInterval(function() { checkUpdate(); }, upSpeed);
});


function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function getResponse() {
	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	var s = addZero(d.getSeconds());
	lt = 'Local Time ' + h + ':' + m + ':' + s + ' PDT';
}

function runUpdate() {

        if ($('#ev').get("innerHTML") != lt) {
            updating = true;
            $('#ev').set("innerHTML", lt);
            updating = false;
        }
}