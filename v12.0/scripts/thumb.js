var newImage = new Image();
var fileUrl = "output/versus2.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 500;
var initialize = true;

var p1, p2, s1, s2, mm, gg, c1, c2, olds1, olds2;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

var sc1 = ['.score11','.score12','.score13'];
var sc2 = ['.score21','.score22','.score23'];

function getResponse() {
	p1 = getElement(responseXml, "player1A");
	p2 = getElement(responseXml, "player2A");
	p1b = getElement(responseXml, "player1B");
	p2b = getElement(responseXml, "player2B");
	s1 = getElement(responseXml, "score1");
	s2 = getElement(responseXml, "score2");
	mm = getElement(responseXml, "match");
//	gg = getElement(responseXml, "game");
	g1 = getElement(responseXml, "gameA");
	g2 = getElement(responseXml, "gameB");
	c1 = getElement(responseXml, "image1");
	c2 = getElement(responseXml, "image2");
}

function runUpdate() {
	//if (timeOld == timeNew) return;
	$('#p1').set('innerHTML', p1);
	$('#p2').set('innerHTML', p2);
	$('#mm').set('innerHTML', mm + ' - ' + g2);
	$('#leftch').set('src', 'thumb/chars/left/' + c1 + '.png');
	$('#rightch').set('src', 'thumb/chars/right/' + c2 + '.png');
}