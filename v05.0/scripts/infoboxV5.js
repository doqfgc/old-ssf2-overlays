var newImage = new Image();
var fileUrl = "output/infobox.xml";
var upSpeed = 6000;
var inSpeed = 1500;
var outSpeed = 750;

var i1;

$(function() {
	checkUpdate();
	setInterval(function() { checkUpdate(); }, upSpeed);
});

function getResponse() {
	i1 = getElement(responseXml, "text1");
}

function runUpdate() {
	//if (timeOld == timeNew) return;
	
	if ($('#i1').get("innerHTML") != i1) {
		updating = true;
		$('.infobox').animate({$top: '60px', $left: '-20px'}, outSpeed).then(function() {
			$('#i1').set("innerHTML", i1);
            $('.infobox').animate({$top: '0px', $left: '0px'}, inSpeed).then(function() {
                $('.info').animate({$left: '49px'}, 1).then(function() {
                    $('.info').animate({$$fade: 1, $left: '24px'}, inSpeed).then(function() {
                        $('.dummy').animate({$$fade: 0}, 7500).then(function() {
                            $('.infobox').animate({$top: '60px', $left: '-20px'}, outSpeed).then(function() {
                                $('.info').animate({$$fade: 0}, 2).then(function() {updating = false; });
                            });
                        });
                    });
                });
            });
		});
	}
}