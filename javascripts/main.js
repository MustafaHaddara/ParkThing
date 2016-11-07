var nb = document.getElementById('state-initial-new-button');

nb.addEventListener('click', function() {
    document.getElementById("state-initial").style.display = "none";
    document.getElementById("state-time").style.display = "flex";
}, false);