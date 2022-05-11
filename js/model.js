var modal = document.getElementById("myModal");

function openRequestCallback(courseId) {
    modal.style.display = "block";
}

function closeModel() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModel();
    }
}