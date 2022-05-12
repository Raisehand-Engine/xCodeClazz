const host = `http://127.0.0.1:3002/sandbox/v1/api/xcodeclazz`;
const routes = {
    GET_STATUS_STUDENTS: `${host}/status/students`,
    GET_STATUS_COURSES: `${host}/status/courses`,
    GET_STATUS_REQUEST_CALLBACKS: `${host}/status/request_callbacks`,
    GET_STUDENTS: `${host}/students`,
    GET_STUDENT: `${host}/student`,
    POST_STUDENT_CREATE: `${host}/student/create`,
    POST_STUDENT_DELETE: `${host}/student/delete`,
    POST_STUDENT_UPDATE: `${host}/student/update`,
    GET_REQUEST_CALLBACKS: `${host}/request_callbacks`,
    GET_REQUEST_CALLBACK: `${host}/request_callback`,
    POST_REQUEST_CALLBACK_CREATE: `${host}/request_callback/create`,
    POST_REQUEST_CALLBACK_DELETE: `${host}/request_callback/delete`,
    GET_COURSES: `${host}/courses`,
    GET_COURSE: `${host}/course`,
    POST_COURSE_CREATE: `${host}/course/create`,
    POST_COURSE_UPDATE: `${host}/course/update`,
    POST_COURSE_DELETE: `${host}/course/delete`,
};

function loadCourses() {
    // fetch(routes.GET_COURSES, {
    //     method: 'GET',
    // }).then(response => response.json()).then((res) => {
    //     const courses_container = document.getElementById('courses_container');
    //     courses_container.innerHTML = courses.map(singleCourseDesign).join('');
    // });
    const courses_container = document.getElementById('courses_container');
    courses_container.innerHTML = courses.map(singleCourseDesign).join('');
}

function listenRequestCallbackButton() {
    document.getElementById('request.callback.model.button').addEventListener('click', (e) => {
        e.preventDefault();
        const courseId = model_state.course.value;
        const name = document.getElementById('user.name').value;
        const phone = document.getElementById('user.phone').value;
        const school = document.getElementById('user.school').value;

        // prevent error here...
        showModelLoadingSpinner();
        fetch(routes.POST_REQUEST_CALLBACK_CREATE, {
            method: 'POST',
            body: JSON.stringify({
                courseId: '60be2160f6239b55f4d97151', // courseId
                name: name,
                phone: phone,
                school: school
            })
        }).then(response => response.json()).then(res => {
            console.log(res);
            setTimeout(() => {
                hideModelLoadingSpinner();
                resetModelState();
                closeModel();
            }, 5000);
        });
    });
}

loadCourses();
listenRequestCallbackButton();