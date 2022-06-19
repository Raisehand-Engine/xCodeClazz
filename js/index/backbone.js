function loadCourses() {
    fetch(routes.GET_COURSES, {
        method: 'GET',
    }).then(response => response.json()).then((documents) => {
        const courses_container = document.getElementById('courses_container');
        courses_container.innerHTML = documents.courses.map(singleCourseDesign).join('');
    }).catch(console.log);
}

// send thanku message, or something cool "we'll learn this together!"
function listenRequestCallbackButton() {
    document.getElementById('request.callback.model.button').addEventListener('click', (e) => {
        e.preventDefault();

        const courseId = model_state.course.value;
        const name = document.getElementById('user.name').value;
        const phone = document.getElementById('user.phone').value;
        const school = document.getElementById('user.school').value;

        document.getElementById('user.name').value = '';
        document.getElementById('user.phone').value = '';
        document.getElementById('user.school').value = '';

        if (network_states.isSomethingAlreadyRequest) return;

        if (!isMongoId(courseId)) return;
        if (!name || name == '' || name.length < 5) return;
        if (!phone || phone == '' || phone.length < 5) return;
        if (!school || school == '' || school.length < 5) return;

        showModelLoadingSpinner();
        network_states.isSomethingAlreadyRequest = true;
        fetch(routes.POST_REQUEST_CALLBACK_CREATE, {
            method: 'POST',
            body: JSON.stringify({ courseId, name, phone, school })
        }).then(response => response.json()).then(res => {
            showSnackbar(res?.message || 'Requested Successfully');
            network_states.isSomethingAlreadyRequest = false;
            hideModelLoadingSpinner();
            resetModelState();
            closeModel();
        }).catch((err) => {
            showSnackbar(res?.message || 'Requested Failed');
            network_states.isSomethingAlreadyRequest = false;
            hideModelLoadingSpinner();
            resetModelState();
            closeModel();
        });
    });
}

loadCourses();
listenRequestCallbackButton();