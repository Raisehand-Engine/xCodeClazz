var modal = document.getElementById("myModal");
var model_spinner = document.getElementById('request.callback.model.button.spinner');

var model_state = {}

function resetModelState() { model_state = {}; }
function closeModel() { modal.style.display = "none"; }

function openRequestCallback(key, value) {
    modal.style.display = "block";
    model_state[key] = { ...model_state[key], value };
}

function showModelLoadingSpinner() {
    model_spinner.style.display ='block';
}

function hideModelLoadingSpinner() {
    model_spinner.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModel();
    }
}