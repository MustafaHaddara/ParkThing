var payment_time = 0;
var max_time = 120;
var payment_interval = 30;

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

