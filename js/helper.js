function isMongoId(oid) {
    return oid.length === 24 && !isNaN(Number('0x' + oid))
}

function showSnackbar(yourMessage = 'Something Happened') {
    var x = document.getElementById("snackbar");
    x.innerHTML = yourMessage;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}