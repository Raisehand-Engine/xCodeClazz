const SingleCourse = () => {
    const courseId = getUrlParam('courseId');

    const loadCourse = () => {
        fetch(routes.GET_COURSE, {
            method: 'POST',
            body: JSON.stringify({ courseId })
        }).then(response => response.json()).then((documents) => {
            document.getElementById('json').innerHTML = JSON.stringify(documents.course)
        }).catch(console.log);
    }

    return (
        <h2>Let it complete first</h2>
    )
}