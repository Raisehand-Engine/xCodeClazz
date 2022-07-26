var modal = document.getElementById("outputModal");

function closeModel() { modal.style.display = "none"; }
function openConsoleOutput(data) {
    modal.style.display = "block";
    if (data.stderr) {
        document.getElementById("output-te").innerHTML = data.stderr;
    } else if (data.stdout) {
        document.getElementById("output-te").innerHTML = data.stdout;
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        document.getElementById("output-te").innerHTML = ""
        closeModel();
    }
}