var payment_time = 0;
var max_time = 120;
var payment_interval = 30;

/*functions*/
var goToPrintingScreen = function(msg) {
    document.getElementById('state-printing').style.display = 'flex';
    document.getElementById('state-printing-text').innerText = msg;
}

var printTicket = function(text, callback) {
    // text = message on ticket. this can be full html formatted text
    // callback = function to call when ticket is pressed
    document.getElementById('printer-ticket').style.display = 'block';
    document.getElementById('printer-ticket').innerHTML = text;
    document.getElementById('printer-ticket').onclick = function() {
        if (callback && typeof callback === 'function') {
            callback();
        }
    };
}

var clearTicket = function() {
    document.getElementById('printer-ticket').style.display = 'none';
    document.getElementById('printer-ticket').innerHTML = '';
}

/*state-initial*/

document.getElementById("state-initial-new-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";

    payment_time = 0;
    document.getElementById("state-time-exp-time").innerText = payment_time+" minutes.";
    document.getElementById("state-time-minus-time").disabled = true;
    document.getElementById("state-time-plus-time").disabled = false;
    document.getElementById("state-time-pay-button").disabled = true;
    document.getElementById("state-time").style.display = "flex";
}, false);

document.getElementById("state-log-in").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";
    document.getElementById("state-log-in").style.display = "flex";
}, false);

document.getElementById("state-initial-refund-button").addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'none';
    document.getElementById('state-refund').style.display = 'flex';
    console.log('refund clicked');
    printTicket('Ticket Thursday Nov 7 2016<br>Valid Until 10:30AM', function() {
        document.getElementById('state-refund').style.display = 'none';
        document.getElementById('printer-ticket').style.display = 'none';
        goToPrintingScreen('Now printing voucher, please wait');
        setTimeout(function() {
            printTicket('You have $10 of unused parking time!<br>Redeem this online at myparking.fakecity.ca', function() {
                document.getElementById('state-printing').style.display = 'none';
                document.getElementById('printer-ticket').style.display = 'none';
                document.getElementById('state-initial').style.display = 'flex';
            })
            goToPrintingScreen('Please take your voucher');
        }, 1500);
    });
}, false);

/*state-time*/

document.getElementById("state-time-cancel-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "flex";
    document.getElementById("state-time").style.display = "none";
}, false);

document.getElementById("state-time-plus-time").addEventListener('click', function() {
	if ((payment_time+payment_interval) <= max_time){
	    payment_time += payment_interval;
	    document.getElementById("state-time-exp-time").innerText = payment_time+" minutes.";
	    document.getElementById("state-time-minus-time").disabled = false;
	    document.getElementById("state-time-pay-button").disabled = false;
	   	if(payment_time >= max_time) {
	   		document.getElementById("state-time-plus-time").disabled = true;
	   	}
	}
}, false);

document.getElementById("state-time-minus-time").addEventListener('click', function() {
	if((payment_time-payment_interval) >= 0) {
	    payment_time -= payment_interval;
	    document.getElementById("state-time-exp-time").innerText = payment_time+" minutes.";
	    document.getElementById("state-time-plus-time").disabled = false;
	    if(payment_time == 0) {
		    document.getElementById("state-time-minus-time").disabled = true;
		    document.getElementById("state-time-pay-button").disabled = true;
		}
	}
}, false);

document.getElementById("state-time-pay-button").addEventListener('click', function() {
	document.getElementById("state-time").style.display = "none";
    document.getElementById("state-choose-payment").style.display = "flex";
}, false);

/*state-refund*/
document.getElementById('state-refund-cancel-button').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'flex';
    document.getElementById('state-refund').style.display = 'none';
    document.getElementById('printer-ticket').style.display = 'none';
}, false);