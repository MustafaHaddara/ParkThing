var payment_time = 0;
var max_time = 120;
var payment_interval = 30;
var price_per_interval = 30; // In cents

var d = new Date();
document.getElementById("current-time").innerText = (d.getHours().toString().length < 2?"0":"") + d.getHours() + ":" + (d.getMinutes().toString().length < 2?"0":"") + d.getMinutes();

/*state-initial*/

document.getElementById("state-initial-new-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";

    payment_time = 0;
    var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById("state-time-exp-time").innerText = (t.getHours().toString().length < 2?"0":"") + t.getHours() + ":" + (t.getMinutes().toString().length < 2?"0":"") + t.getMinutes();
    var l = (payment_time/30*price_per_interval);
    var m = Math.floor(l/100);
    l = (l - m*100).toString();
    document.getElementById("state-time-price").innerText = "$" + m + "." + l + (l.length < 2? "0":"");
    document.getElementById("state-time-minus-time").disabled = true;
    document.getElementById("state-time-plus-time").disabled = false;
    document.getElementById("state-time-pay-button").disabled = true;
    document.getElementById("state-time").style.display = "flex";
}, false);

document.getElementById("state-initial-prepaid-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";
    document.getElementById("state-log-in").disabled = false;
    document.getElementById("state-initial").disabled = true;
    document.getElementById("state-log-in").style.display = "flex";
}, false);

document.getElementById("state-initial-refund-button").addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'none';
    document.getElementById('state-refund').style.display = 'flex';
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
});

document.getElementById("state-log-in-submit").addEventListener('click', function() {
	/*document.getElementById("state-account-existing-ticket").style.display = "flex";
    document.getElementById("state-account-existing-ticket").disabled = false;
    document.getElementById("state-log-in").style.display = "none";
    document.getElementById("state-log-in").disabled = true;
	*/
	var username = document.getElementById("state-log-in-account-num").value;
	if(username == "test1"){
		document.getElementById("state-account-new-ticket").style.display = "flex";
    	document.getElementById("state-account-new-ticket").disabled = false;
    	document.getElementById("state-log-in").style.display = "none";
    	document.getElementById("state-log-in").disabled = true;
	} else if(username == "test2"){
		document.getElementById("state-account-existing-ticket").style.display = "flex";
    	document.getElementById("state-account-existing-ticket").disabled = false;
    	document.getElementById("state-log-in").style.display = "none";
    	document.getElementById("state-log-in").disabled = true;
	}
}, false);

document.getElementById("state-log-in-cancel-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "flex";
    document.getElementById("state-log-in").style.display = "none";
    document.getElementById("state-log-in").disabled = true;
}, false);

/*state-time*/

document.getElementById("state-time-cancel-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "flex";
    document.getElementById("state-time").style.display = "none";
}, false);

document.getElementById("state-time-plus-time").addEventListener('click', function() {
	if ((payment_time+payment_interval) <= max_time){
	    payment_time += payment_interval;
	    var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById("state-time-exp-time").innerText = (t.getHours().toString().length < 2?"0":"") + t.getHours() + ":" + (t.getMinutes().toString().length < 2?"0":"") + t.getMinutes();
	    var l = (payment_time/30*price_per_interval);
	    var m = Math.floor(l/100);
	    l = (l - m*100).toString();
	    document.getElementById("state-time-price").innerText = "$" + m + "." + l + (l.length < 2? "0":"");
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
	   var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById("state-time-exp-time").innerText = (t.getHours().toString().length < 2?"0":"") + t.getHours() + ":" + (t.getMinutes().toString().length < 2?"0":"") + t.getMinutes();
	    var l = (payment_time/30*price_per_interval);
	    var m = Math.floor(l/100);
	    l = (l - m*100).toString();
	    document.getElementById("state-time-price").innerText = "$" + m + "." + l + (l.length < 2? "0":"");
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

/* state-choose-payment */
document.getElementById("state-choose-payment-back").addEventListener('click', function() {
    document.getElementById("state-time").style.display = "flex";
    document.getElementById("state-choose-payment").style.display = "none";
    //TODO: Refund any coinage
}, false);

document.getElementById("state-choose-payment-card").addEventListener('click', function() {
    document.getElementById("state-payment-card").style.display = "flex";
    document.getElementById("state-choose-payment").style.display = "none";
}, false);

document.getElementById("state-choose-payment-cash").addEventListener('click', function() {
	var l = (payment_time/30*price_per_interval);
    var m = Math.floor(l/100);
    l = (l - m*100).toString();
    document.getElementById("state-payment-cash-remaining").innerText = "$" + m + "." + l + (l.length < 2? "0":"");
    document.getElementById("state-payment-cash").style.display = "flex";
    document.getElementById("state-choose-payment").style.display = "none";
}, false);

/* state-payment-coin */
document.getElementById("state-payment-cash-back").addEventListener('click', function() {
    document.getElementById("state-choose-payment").style.display = "flex";
    document.getElementById("state-payment-cash").style.display = "none";
    //TODO: Refund any coinage
}, false);

/* state-payment-card */
document.getElementById("state-payment-card-back").addEventListener('click', function() {
    document.getElementById("state-choose-payment").style.display = "flex";
    document.getElementById("state-payment-card").style.display = "none";
    //TODO: Refund any coinage
}, false);

document.getElementById("card-slot").addEventListener('click', function() {
	if(document.getElementById("state-payment-card").style.display === "flex") {
		document.getElementById("state-payment-card").style.display = "none";
		goToPrintingScreen("Transaction Approved. Printing Ticket...");
		printTicket("Hi", function() {
			clearTicket();
			document.getElementById('state-printing').style.display = 'none';
			document.getElementById('state-initial').style.display = "flex";
		});
	}
}, false);

/*state-refund*/

document.getElementById('state-refund-cancel-button').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'flex';
    document.getElementById('state-refund').style.display = 'none';
    document.getElementById('printer-ticket').style.display = 'none';
}, false);

/* on click functions for prepaid tickets */
function state_account_submission(username){
	if (username == "test1"){
		document.getElementById("state-log-in").disabled = true;
    	document.getElementById("state-account-new-ticket").disabled = false;
    	document.getElementById("state-account-new-ticket").style.display = "flex";
    	document.getElementById("state-account-existing-ticket").disabled = true;
    	return true;
	} else if (username = "test2"){
		document.getElementById("state-log-in").disabled = true;
    	document.getElementById("state-account-existing-ticket").disabled = false;
    	document.getElementById("state-account-existing-ticket").style.display = "flex";
    	document.getElementById("state-account-new-ticket").disabled = true;
    	return true;
	} else {
		return false;
	}
}

/*functions*/
function goToPrintingScreen(msg) {
    document.getElementById('state-printing').style.display = 'flex';
    document.getElementById('state-printing-text').innerText = msg;
}

function printTicket(text, callback) {
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

function clearTicket() {
    document.getElementById('printer-ticket').style.display = 'none';
    document.getElementById('printer-ticket').innerHTML = '';
}

function time_update() {
	var a = new Date();
	var time_changed = d.getHours() != a.getHours() || d.getMinutes() != a.getMinutes();
	if (time_changed) {
		d = a;
		document.getElementById("current-time").innerText = (d.getHours().toString().length < 2?"0":"") + d.getHours() + ":" + (d.getMinutes().toString().length < 2?"0":"") + d.getMinutes();
		var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById("state-time-exp-time").innerText = (t.getHours().toString().length < 2?"0":"") + t.getHours() + ":" + (t.getMinutes().toString().length < 2?"0":"") + t.getMinutes();
	}

	window.requestAnimationFrame(time_update);
}

window.requestAnimationFrame(time_update);
