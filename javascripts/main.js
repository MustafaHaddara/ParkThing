var nb = document.getElementById('state-initial-new-button');

nb.addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";
    document.getElementById("state-time").style.display = "flex";
}, false);

var logIn = document.getElementById('state-log-in');

logIn.addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";
    document.getElementById("state-log-in").style.display = "flex";
}, false);