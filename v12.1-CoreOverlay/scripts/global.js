var MINI = require('minified'); 
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;

var visible, timeOld, timeNew, updating;
var parser = new DOMParser();
var responseXml, responseXml2;
		
function checkUpdate() {
	if (updating) return;
	getRequest();
}

function getRequest() {
	$.request("GET", fileUrls[0]).then(function(responseTxt) {
		responseXml = parser.parseFromString(responseTxt,"text/xml");
		
		getResponse();
		timeOld = timeNew;
		timeNew = getElement(responseXml, "time", false);
		visible = getElement(responseXml, "visible", false);
			
		//runUpdate();
	}).error(function(status, responseTxt) {
		responseXml = parser.parseFromString(responseTxt,"text/xml");
		
		getResponse();
		timeOld = timeNew;
		timeNew = getElement(responseXml, "time", false);
		visible = getElement(responseXml, "visible", false);
			
		//runUpdate();
	});
	$.request("GET", fileUrls[1]).then(function(responseTxt) {
		responseXml2 = parser.parseFromString(responseTxt,"text/xml");
		
		getResponse2();
		timeOld = timeNew;
		timeNew = getElement(responseXml2, "time", false);
		visible = getElement(responseXml2, "visible", false);
			
		runUpdate();
	}).error(function(status, responseTxt) {
		responseXml2 = parser.parseFromString(responseTxt,"text/xml");
		
		getResponse2();
		timeOld = timeNew;
		timeNew = getElement(responseXml2, "time", false);
		visible = getElement(responseXml2, "visible", false);
			
		runUpdate();
	});
}

function getElement(xmlResponse, elemName, search) {
	if (xmlResponse.getElementsByTagName(elemName)[0].childNodes[0]) {
		var text = xmlResponse.getElementsByTagName(elemName)[0].childNodes[0].nodeValue;
			
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
		text = text.replace(/\s/g, "&nbsp;");
		
		if (search = (typeof search === "undefined") ? true : false)
		{
			var regex = /\{\{(\w{1,4})\}\}/g;
			var match = regex.exec(text);
			
			while (match != null) {
				text = text.replace(match[0], "<small>"+match[1]+"</small>");
				match = regex.exec(text);
			}
		}
		
		return text;
	}
	return "";
}