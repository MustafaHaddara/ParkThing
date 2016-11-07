document.getElementById("state-initial-new-button").addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";
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