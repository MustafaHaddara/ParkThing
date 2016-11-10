var payment_time = 0;
var max_time = 120;
var payment_interval = 30;
var price_per_interval = 30; // In cents

var card_num = "";

var confirm_dialog_state_stay = "";
var confirm_dialog_state_leave = "";
var confirm_dialog_cleanup_leave = function() {};

var coin_payment_increment = 25; // cents
var coin_payment_count = 0;

var d = new Date();
document.getElementById('current-time').innerText = (d.getHours().toString().length < 2?'0':'') + d.getHours() + ':' + (d.getMinutes().toString().length < 2?'0':'') + d.getMinutes();

/*state-initial*/
document.getElementById('state-initial-new-button').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'none';
    payment_time = 0;
    var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById('state-time-exp-time').innerText = (t.getHours().toString().length < 2?'0':'') + t.getHours() + ':' + (t.getMinutes().toString().length < 2?'0':'') + t.getMinutes();
    var l = (payment_time/30*price_per_interval);
    var m = Math.floor(l/100);
    l = (l - m*100).toString();
    document.getElementById('state-time-price').innerText = '$' + m + '.' + l + (l.length < 2? '0':'');
    document.getElementById('state-time-minus-time').disabled = true;
    document.getElementById('state-time-plus-time').disabled = false;
    document.getElementById('state-time-pay-button').disabled = true;
    document.getElementById('state-time').style.display = 'flex';
}, false);

document.getElementById('state-initial-prepaid-button').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'none';
    document.getElementById('state-log-in').disabled = false;
    document.getElementById('state-initial').disabled = true;
    document.getElementById('state-log-in').style.display = 'flex';
    document.getElementById("state-log-in-username").value = "";
    document.getElementById('state-printing').style.display = 'none';
}, false);

document.getElementById('state-initial-refund-button').addEventListener('click', function() {
    document.getElementById('state-printing').style.display = 'none';
    document.getElementById('state-initial').style.display = 'none';
    document.getElementById('state-refund').style.display = 'flex';
    var t = addMinutes(new Date(), randint(30,120));
    printTicketWithTime(t, function() {
        document.getElementById('state-refund').style.display = 'none';
        document.getElementById('printer-ticket').style.display = 'none';
        var money_back = Math.round((t - new Date()) / 60000)*price_per_interval/payment_interval;
        if((money_back%5) < 3) {
        	money_back -= (money_back%5);
        } else {
        	money_back += (5 -(money_back%5));
        }
        var d = Math.floor(money_back/100);
        var c = money_back - d*100;
        document.getElementById('state-refund-return-text').innerText = 'Refund: $' + d + '.' + (c.toString().length < 2?"0":"") + c;
       	document.getElementById('state-refund-return').style.display = "flex";
        if(money_back > 0) {
        	document.getElementById('coins').play();
        }
        setTimeout(function() {
        	document.getElementById('state-refund-return').style.display = "none";
            document.getElementById('state-initial').style.display = "flex";
        }, 5000);
    });
});

/*state-log-in*/
document.getElementById('state-log-in-submit').addEventListener('click', function(e) {
	/*
	document.getElementById('state-account-existing-ticket').style.display = 'flex';
    document.getElementById('state-account-existing-ticket').disabled = false;
    document.getElementById('state-log-in').style.display = 'none';
    document.getElementById('state-log-in').disabled = true;
	*/
	e.preventDefault();
	var username = document.getElementById('state-log-in-username').value;
	if(username == 'test1'){
		document.getElementById('state-account-new-ticket').style.display = 'flex';
    	document.getElementById('state-account-new-ticket').disabled = false;
    	document.getElementById('state-log-in').style.display = 'none';
    	document.getElementById('state-log-in').disabled = true;
	} else if(username == 'test2'){
		document.getElementById('state-account-existing-ticket').style.display = 'flex';
    	document.getElementById('state-account-existing-ticket').disabled = false;
    	document.getElementById('state-log-in').style.display = 'none';
    	document.getElementById('state-log-in').disabled = true;
	}
}, false);

document.getElementById('state-log-in-cancel-button').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'flex';
    document.getElementById('state-log-in').style.display = 'none';
    document.getElementById('state-log-in').disabled = true;
}, false);

document.getElementById('state-account-logout').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'flex';
    document.getElementById('state-account-new-ticket').style.display = 'none';
    document.getElementById('state-account-new-ticket').disabled = true;
}, false);

document.getElementById('state-account-logout-existing').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'flex';
    document.getElementById('state-account-existing-ticket').style.display = 'none';
    document.getElementById('state-account-existing-ticket').disabled = true;
}, false);


document.getElementById('state-account-start-new-ticket').addEventListener('click', function() {
    var max_expiry_time = addMinutes(new Date(), max_time);
    printTicketWithTime(max_expiry_time, function() {
        document.getElementById('state-initial').style.display = 'flex';
        document.getElementById('state-account-new-ticket').style.display = 'none';
        clearTicket();
    });
    
    document.getElementById('state-account-new-ticket').disabled = true;
    document.getElementById('state-account-new-ticket').style.display = 'none';
    goToPrintingScreen('Transaction Approved. Printing Ticket...');
    document.getElementById('state-printing-text').style.display = 'flex';
}, false);

document.getElementById('state-account-cancel-existing-ticket').addEventListener('click', function() {
    // var max_expiry_time = addMinutes(new Date(), max_time);
    // printTicketWithTime(max_expiry_time, function() {
    //     document.getElementById('state-initial').style.display = 'flex';
    //     document.getElementById('state-account-existing-ticket').style.display = 'none';
    //     clearTicket();
    // });
    // document.getElementById('state-account-existing-ticket').disabled = true;
    // document.getElementById('state-account-existing-ticket').style.display = 'none';
    // goToPrintingScreen('Transaction Finished. Printing Receipts...');
    // document.getElementById('state-printing-text').style.display = 'flex';

    document.getElementById('state-account-existing-ticket').style.display = 'none';
    document.getElementById('state-account-refund').style.display = 'flex';
    var t = addMinutes(new Date(), randint(30,120));
    printTicketWithTime(t, function() {
        document.getElementById('state-account-refund').style.display = 'none';
        document.getElementById('printer-ticket').style.display = 'none';
        document.getElementById('state-account-refund-return-text').innerText = 'Printing transaction receipt.';
        document.getElementById('state-printing').style.display = "none";
        document.getElementById('state-account-refund-return').style.display = "flex";
        if(money_back > 0) {
            document.getElementById('coins').play();
        }
        // setTimeout(function() {
        //     document.getElementById('state-account-refund-return').style.display = "none";
        //     document.getElementById('state-initial').style.display = "flex";
        // }, 5000);
    });
}, false);

/*state-time*/
document.getElementById('state-time-cancel-button').addEventListener('click', function() {
    if (payment_time > 0) {
    	confirm_dialog_state_stay = "state-time";
	    confirm_dialog_state_leave = "state-initial";
	    confirm_dialog_cleanup_leave = function() {};
    	document.getElementById('state-destructive').style.display = 'flex';
    } else {
    	document.getElementById('state-initial').style.display = 'flex';
    }
    document.getElementById('state-time').style.display = 'none';
}, false);

document.getElementById('state-time-plus-time').addEventListener('click', function() {
	if ((payment_time+payment_interval) <= max_time){
	    payment_time += payment_interval;
	    var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById('state-time-exp-time').innerText = (t.getHours().toString().length < 2?'0':'') + t.getHours() + ':' + (t.getMinutes().toString().length < 2?'0':'') + t.getMinutes();
	    var l = (payment_time/30*price_per_interval);
	    var m = Math.floor(l/100);
	    l = (l - m*100).toString();
	    document.getElementById('state-time-price').innerText = '$' + m + '.' + l + (l.length < 2? '0':'');
		    document.getElementById('state-time-minus-time').disabled = false;
	    document.getElementById('state-time-pay-button').disabled = false;
	   	if(payment_time >= max_time) {
	   		document.getElementById('state-time-plus-time').disabled = true;
	   	}
	}
}, false);

document.getElementById('state-time-minus-time').addEventListener('click', function() {
	if((payment_time-payment_interval) >= 0) {
	    payment_time -= payment_interval;
	   var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById('state-time-exp-time').innerText = (t.getHours().toString().length < 2?'0':'') + t.getHours() + ':' + (t.getMinutes().toString().length < 2?'0':'') + t.getMinutes();
	    var l = (payment_time/30*price_per_interval);
	    var m = Math.floor(l/100);
	    l = (l - m*100).toString();
	    document.getElementById('state-time-price').innerText = '$' + m + '.' + l + (l.length < 2? '0':'');
	    document.getElementById('state-time-plus-time').disabled = false;
	    if(payment_time == 0) {
		    document.getElementById('state-time-minus-time').disabled = true;
		    document.getElementById('state-time-pay-button').disabled = true;
		}
	}
}, false);

document.getElementById('state-time-pay-button').addEventListener('click', function() {
	document.getElementById('state-time').style.display = 'none';
    document.getElementById('state-choose-payment').style.display = 'flex';
}, false);

/* state-choose-payment */
document.getElementById('state-choose-payment-back').addEventListener('click', function() {
    document.getElementById('state-time').style.display = 'flex';
    document.getElementById('state-choose-payment').style.display = 'none';
    //TODO: Refund any coinage
}, false);

document.getElementById('state-choose-payment-card').addEventListener('click', function() {
	document.getElementById('state-payment-card-error').style.visibility = "hidden";
    document.getElementById('state-payment-card').style.display = 'flex';
    document.getElementById('state-choose-payment').style.display = 'none';
}, false);

document.getElementById('state-choose-payment-cash').addEventListener('click', function() {
	coin_payment_count = 0;
    var l = (payment_time/30*price_per_interval);
    var m = Math.floor(l/100);
    l = (l - m*100).toString();
    document.getElementById('state-payment-cash-remaining').innerText = '$' + m + '.' + l + (l.length < 2? '0':'');
    document.getElementById('state-payment-cash').style.display = 'flex';
    document.getElementById('state-choose-payment').style.display = 'none';
}, false);

var payment_cash_cleanup = function() {
	coin_payment_count = 0;
    document.getElementById('coins').play();
};

/* state-payment- */
document.getElementById('state-payment-cash-back').addEventListener('click', function() {
	if (coin_payment_count > 0) {
    	    confirm_dialog_state_stay = "state-payment-cash";
	    confirm_dialog_state_leave = "state-choose-payment";
	    confirm_dialog_cleanup_leave = payment_cash_cleanup;
	    var l = coin_payment_increment * coin_payment_count;
	    if (l > 0) {
	    	var m =  Math.floor(l/100);
	    	l -= m*100;
	    	document.getElementById('state-destructive-blurb-byline').innerText = "You will be returned $" + m + "." + (l.toString().length < 2? "0": "") + l;
		}
    	document.getElementById('state-destructive').style.display = 'flex';
    } else {
    	document.getElementById('state-choose-payment').style.display = 'flex';
    }
    document.getElementById('state-payment-cash').style.display = 'none';
    
    //TODO: Refund any coinage
}, false);

/* state-payment-card */

var payment_card_cleanup = function() {
	card_num = "";
    document.getElementById('state-payment-card-number').innerText = card_num;
    if(card_num.length == 16) {
		document.getElementById('state-payment-card-process').disabled = false;
	} else {
		document.getElementById('state-payment-card-process').disabled = true;
	}
};

document.getElementById('state-payment-card-back').addEventListener('click', function() {
    if (card_num.length > 0) {
    	    confirm_dialog_state_stay = "state-payment-card";
	    confirm_dialog_state_leave = "state-choose-payment";
	    confirm_dialog_cleanup_leave = payment_card_cleanup;
    	document.getElementById('state-destructive').style.display = 'flex';
    } else {
    	document.getElementById('state-choose-payment').style.display = 'flex';
    }
    document.getElementById('state-payment-card').style.display = 'none';
}, false);

document.getElementById('card-slot').addEventListener('click', function() {
	if(document.getElementById('state-payment-card').style.display === 'flex') {
		document.getElementById('state-payment-card').style.display = 'none';
		goToPrintingScreen('Transaction Approved. Printing Ticket...');
        var selectedExpiryDate = new Date();
        selectedTime = document.getElementById('state-time-exp-time').innerText.split(':');
        selectedExpiryDate.setHours(selectedTime[0]);
        selectedExpiryDate.setMinutes(selectedTime[1]);
		printTicketWithTime(selectedExpiryDate, function() {
			clearTicket();
			document.getElementById('state-printing').style.display = 'none';
			var s = document.getElementById('state-printing-alert');
                s.pause();
                s.currentTime = 0;
			document.getElementById('state-initial').style.display = 'flex';
		});
	}
}, false);

var keypad_buttons = document.getElementsByClassName('keypad-button');
for (var  i = 0; i < keypad_buttons.length; i ++) {
	keypad_buttons[i].addEventListener('click', function(e) {
		if (e.currentTarget.innerText !== '<') {
			if(card_num.length < 16) {
				card_num += e.currentTarget.innerText;
			}
		} else if(card_num.length > 0){
			card_num = card_num.slice(0, -1);
		}
	}, false);
}

document.getElementById('state-payment-card-process').addEventListener('click', function() {
	if (card_num === "6555123456789012") {
		document.getElementById('state-payment-card').style.display = 'none';
		goToPrintingScreen('Transaction Approved. Printing Ticket...');
        var selectedExpiryDate = new Date();
        selectedTime = document.getElementById('state-time-exp-time').innerText.split(':');
        selectedExpiryDate.setHours(selectedTime[0]);
        selectedExpiryDate.setMinutes(selectedTime[1]);
		printTicketWithTime(selectedExpiryDate, function() {
			clearTicket();
			document.getElementById('state-printing').style.display = 'none';
			var s = document.getElementById('state-printing-alert');
                s.pause();
                s.currentTime = 0;
			document.getElementById('state-initial').style.display = 'flex';
			card_num = "";
		});
	} else {
		var tl = document.getElementById('state-payment-card-error');
		var sl = tl.getElementsByTagName('div')[0];
		tl.style.visibility = "visible";
		sl.style.animationName = "flash";
		sl.style.animationPlayState = "running";
	}
}, false);

document.getElementById('state-payment-card-error').getElementsByTagName('div')[0].addEventListener("animationend", function(e) {
	e.currentTarget.style.animationName = "none";
	e.currentTarget.style.animationPlayState = "paused";
}, false);

/*state-refund*/
document.getElementById('state-refund-cancel-button').addEventListener('click', function() {
    document.getElementById('state-initial').style.display = 'flex';
    document.getElementById('state-refund').style.display = 'none';
    document.getElementById('printer-ticket').style.display = 'none';
}, false);

/*state-destructive*/
document.getElementById('state-destructive-stay').addEventListener('click', function() {
	document.getElementById('state-destructive-blurb-byline').innerText = "";
    document.getElementById(confirm_dialog_state_stay).style.display = 'flex';
    document.getElementById('state-destructive').style.display = 'none';
}, false);

document.getElementById('state-destructive-leave').addEventListener('click', function() {
	confirm_dialog_cleanup_leave();
	document.getElementById('state-destructive-blurb-byline').innerText = "";
    document.getElementById(confirm_dialog_state_leave).style.display = 'flex';
    document.getElementById('state-destructive').style.display = 'none';
}, false);

/*functions*/
/*Display msg on the "Now Printing" screen*/
function goToPrintingScreen(msg) {
	setTimeout(printingScreenTimeout, 5000);
    document.getElementById('state-printing').style.display = 'flex';
    document.getElementById('state-printing-text').innerHTML = msg;
}

/*print a "physical" ticket*/
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

/*print parking ticket with specific time*/
function printTicketWithTime(dateTime, callback) {
    var time = getTime(dateTime);
    var date = getDate(dateTime);
    printTicket('<h1>EXPIRES: ' + time + '</h1><br><h1>Ticket ' + date + '</h1>', callback);
}

/*pull a formatted time out of the Date() object*/
function getTime(date) {
    var hours = leftPad(date.getHours().toString(), '0', 2);
    var mins = leftPad(date.getMinutes().toString(), '0', 2);
    return hours + ':' + mins;
}

/*pull a formatted date out of the Date() object*/
function getDate(date) {
    day = leftPad(date.getDate().toString(), '0', 2);
    month = leftPad((date.getMonth() + 1), '0', 2);
    year = date.getFullYear();

    return day + '/' + month + '/' + year;
}

/*time management*/
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}


/*don't use npm*/
function leftPad(str, ext, len) {
    var res = str + ''; // make sure it's a string
    while (res.length < len) {
        res = ext + res;
    }
    return res;
}

/*random int on the interval [start,stop] (ie. inclusive on both ends)*/
function randint(start, stop) {
    return Math.floor(Math.random() * (stop - start + 1)) + start
}

/*hide the "physical" printout*/
function clearTicket() {
    document.getElementById('printer-ticket').style.display = 'none';
    document.getElementById('printer-ticket').innerHTML = '';
    document.getElementById('state-printing-text').style.display = 'none';
}

function timeUpdate() {
	var a = new Date();
	var time_changed = d.getHours() != a.getHours() || d.getMinutes() != a.getMinutes();
	if (time_changed) {
		d = a;
		document.getElementById('current-time').innerText = (d.getHours().toString().length < 2?'0':'') + d.getHours() + ':' + (d.getMinutes().toString().length < 2?'0':'') + d.getMinutes();
		var t = new Date(d.getTime() + payment_time*60000);
		document.getElementById('state-time-exp-time').innerText = (t.getHours().toString().length < 2?'0':'') + t.getHours() + ':' + (t.getMinutes().toString().length < 2?'0':'') + t.getMinutes();
	}
	if(card_num.length == 16) {
		document.getElementById('state-payment-card-process').disabled = false;
	} else {
		document.getElementById('state-payment-card-process').disabled = true;
	}
	document.getElementById('state-payment-card-number').innerText = card_num;
	window.requestAnimationFrame(timeUpdate);
}

window.requestAnimationFrame(timeUpdate);


function printingScreenTimeout() {
	if (document.getElementById('state-printing').style.display === "flex") {
		document.getElementById('state-printing-alert').play();
	}
}

/*  Physical Coin-Slot */

document.getElementById('coin-slot').addEventListener('click', function() {
    coin_payment_count++;
    var l = (payment_time/30*price_per_interval);
    var c = l - coin_payment_increment * coin_payment_count;
    var m = Math.floor(c/100);        
    if (c <= 0) {
        coin_payment_count = 0;
        if(document.getElementById('state-payment-cash').style.display === 'flex') {
            document.getElementById('state-payment-cash').style.display = 'none';
            c = Math.abs(c);
            m = Math.floor(c/100);
            goToPrintingScreen('Transaction Approved. Printing Ticket...<br> Change: $' + m + '.' +  (c.toString().length < 2? '0':'') + c);
            var selectedExpiryDate = new Date();
            selectedTime = document.getElementById('state-time-exp-time').innerText.split(':');
            selectedExpiryDate.setHours(selectedTime[0]);
            selectedExpiryDate.setMinutes(selectedTime[1]);
            if (c > 0) {
                document.getElementById('coins').play();
            }
            printTicketWithTime(selectedExpiryDate, function() {
                clearTicket();
                document.getElementById('state-printing').style.display = 'none';
                var s = document.getElementById('state-printing-alert');
                s.pause();
                s.currentTime = 0;
                document.getElementById('state-initial').style.display = 'flex';
            });
        }
    }     
    c = (c - m*100).toString();   
    document.getElementById('state-payment-cash-remaining').innerText = '$' + m + '.' +  (c.toString().length < 2? '0':'') + c;
}, false);
