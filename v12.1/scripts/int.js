var MINI = require('minified'); 
var _=MINI._, $=MINI.$, $$=MINI.$$, EE=MINI.EE, HTML=MINI.HTML;

var current = null;
var eck, ech, showhide;

function refreshstate() {
    $.request('get', 'state.txt')
    .then(function(txt) {
         if (txt != current) {
             $('#evtx').animate({$$fade: 0}, 1000).then(function() {
                 $('#evtx').set('innerHTML', txt);
                 $('#evtx').animate({$$fade: 1}, 1000);
                 current = txt;
             });
         } else {
             return 0;
         }
     })
     .error(function(status, statusText, responseText) {
        if (statusText != current) {
            $('#evtx').animate({$$fade: 0}, 1000).then(function() {
                $('#evtx').set('innerHTML', statusText);
                $('#evtx').animate({$$fade: 1}, 1000);
                current = statusText;
            });
        } else {
            return 0;
        }
     });
}

function showhidestands() {
    if (showhide) {
        $('.standings').set('$right', '-800px');
        $.wait(1000).then(function() {
            $('.full').set('$transform', 'scale(1)');
            $('.full').set('$left', '0');
            showhide = false;
        });
    } else {
        $('.standings').set('$right', '25px');
        $('.full').set('$transform', 'scale(0.75)');
        $('.full').set('$left', '-10%');
        showhide = true;
    }
}

$('.logoimg').animate({$$fade: 1}, 1000);
refreshstate();

eck = setInterval(refreshstate, 5000);
showhide = false;
ech = setInterval(showhidestands, 20000);