const server = {
    sandbox: `http://localhost:3000/xcodeclazz`,
    live: `https://raisehand.software/xcodeclazz`
}
const localhost = server.sandbox // `http://127.0.0.1:3002`

const redirect_url = (isLive() ? 'https://www.xcodeclazz.com' : 'http://localhost:5500/');
const host = (isLive() ? server.live : server.sandbox) + `/v1/api/xcodeclazz`;
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
    POST_CONF: `${host}/conf`,
    GET_CONF: `${host}/conf`,
    DELETE_CONF: `${host}/conf`,
};

const network_states = {
    isSomethingAlreadyRequest: false,
}