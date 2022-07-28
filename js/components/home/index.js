const HomeLayout = () => {

    const [courses, setCourses] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [callbackRequestModel, setCallbackRequestModel] = useState({});
    const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', school: '' });

    useEffect(() => loadCourses(), []);
    // useEffect(() => console.log(callbackRequestModel), [callbackRequestModel]);

    const showFormButtonSpinner = () => setSpinner(true);
    const hideFormButtonSpinner = () => setSpinner(false);
    const closeModel = () => setCallbackRequestModel({});
    const openModel = (course) => setCallbackRequestModel(course);

    const singleCourseDesign = (course) => {
        return (
            <div className="relative border rounded-md shadow-lg px-2 py-5 flex flex-col items-center space-y-5">
                <div className="bg-slate-100 absolute border px-3 py-1 top-2 left-0 rounded-tr-md rounded-br-md border-l-2 border-l-black">
                    <p>Batch {course.session.starts} - {course.session.ends} • {course.duration}</p>
                </div>
                <div className="flex flex-row items-center space-x-2 bg-slate-100 absolute border px-3 py-1 top-6 left-0 rounded-tr-md rounded-br-md border-l-2 border-l-black">
                    <p>{course.spaceLeft}/{course.spaceFull} full</p>
                    <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>
                <img src={course.thumbnailUrl} alt={course.thumbnailUrl} className="max-h-44 h-72" />
                <h3 className="text-2xl font-light">{course.title}</h3>
                <p className="font-extralight text-slate-400">• {course.subtitle} •</p>
                <h4 className="font-light text-slate-500 text-4xl">₹{number_format(course.price)}/-</h4>
                <ul className="list-none list-inside text-center"> {course.features.map(e => (<li>{e}</li>))}</ul>
                <div className="flex justify-center items-center">
                    <button className="border px-4 py-2 bg-logoColor text-white" disabled={!course.hasActive} onClick={() => course.hasActive ? openModel(course) : showSnackbar('Please dont hack me!')}>Request</button>
                    {/* <Link className="border px-4 py-2 bg-logoColor text-white" to={`/course?courseId=${course._id}`}>Scope</Link> */}
                    <Link className="border px-4 py-2 text-white" disabled={!course.hasActive} to={`/editor?lang=${course.keywords}`} ><img src="/assets/code-editor-logo.svg" alt="/assets/code-editor-logo.svg" className="h-6 w-6" /></Link>
                </div>
            </div>
        );
    }

    const loadCourses = () => {
        fetch(routes.GET_COURSES, { method: 'GET', }).then(response => response.json()).then((documents) => {
            setCourses(documents.courses);
        }).catch(showSnackbar);
    }

    const sendCallbackRequest = () => {
        const { _id } = callbackRequestModel;
        const { name, phone, school } = callbackForm;

        if (!isMongoId(_id)) return;
        if (!name || name == '' || name.length < 5) return;
        if (!phone || phone == '' || phone.length < 5) return;
        if (!school || school == '' || school.length < 5) return;

        if (network_states.isSomethingAlreadyRequest) return;
        network_states.isSomethingAlreadyRequest = true;

        // send thanku message, or something cool "we'll learn this together!"

        showFormButtonSpinner();
        fetch(routes.POST_REQUEST_CALLBACK_CREATE, {
            method: 'POST',
            body: JSON.stringify({ courseId: _id, name, phone, school })
        }).then(response => response.json()).then(res => {
            showSnackbar(res.message || 'Requested Successfully');
            network_states.isSomethingAlreadyRequest = false;
            hideFormButtonSpinner();
            closeModel();
        }).catch((err) => {
            showSnackbar(res.message || 'Requested Failed');
            network_states.isSomethingAlreadyRequest = false;
            hideFormButtonSpinner();
            closeModel();
        });

        setCallbackForm({ name: '', phone: '', school: '' });
    }

    return (
        <div>
            <div className="h-screen overflow-y-auto overflow-x-hidden">
                <div className="w-full bg-white z-10 shadow shadow-sm h-14 sticky top-0">
                    <div className="flex overflow-hidden">
                        <div className="flex-none flex-col self-center p-2">
                            <Link to="/">
                                <img src="./assets/logo192.png" alt="brand logo" width="32" height="32" />
                            </Link>
                        </div>
                        <p className="flex-auto h-14 flex flex-row justify-center items-center text-2xl font-extralight -ml-12">
                            xCodeClazz
                        </p>
                    </div>
                </div>
                <div className="p-5">

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

                        {/* first half */}
                        <div className="hidden sm:hidden md:hidden lg:flex flex-col justify-center items-center">
                            <img src="/assets/logo512.png" alt="brand logo" width="200" height="200" />
                        </div>

                        {/* second half */}
                        <div className="flex flex-col justify-center p-2 md:p-6 lg:p-10">

                            <h1 className="text-5xl">
                                Hi, Folks
                            </h1>
                            <p className="mt-4 text-2xl font-extralight leading-9 md:leading-loose">
                                Programming is not just writing bunch of code on the screen,
                                it's an <strong>ART</strong> very few people master. Why don't you learn
                                to program from a self taught artist. Learn from us we'll teach you every
                                concept in depth &amp; that too with ease explanation. <b>Let's Code</b>
                                {/* You're probably want to learn coding! great. In fact you should as soon as possible. You know what this is one of the most valuable skills now days. so what next? Learn from us! at least we are the best at this if not great. */}
                            </p>
                            <blockquote className="mt-10 leading-tight border-l-8 border-l-logoColor pl-4">
                                Gourav Gupta
                                <br />
                                <small className="text-slate-400">Lead Programmer &amp; Founder <strong>xCodeClazz</strong></small>
                            </blockquote>

                            <Link to="/conf" className="mt-4 border-2 border-logoColor px-4 py-2 w-min bg-black text-white">Conferences</Link>
                        </div>

                    </div>

                </div>

                <div className="mt-10 bg-gray-100 px-5 py-10 shadow-inner text-center flex flex-col space-y-5">
                    <h3 className="text-3xl font-semibold tracking-widest">OFFLINE COURSES</h3>
                    <p className="font-extralight text-md">
                        The interactive learning for school/college students.
                    </p>
                </div>

                <div className="flex flex-row justify-center"><Spinner show={courses.length == 0} /></div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {courses.map(singleCourseDesign)}
                </div>

                <div className="mt-10 bg-gray-100 px-5 py-10 shadow-inner text-center flex flex-col space-y-5">
                    <h3 className="text-3xl font-semibold tracking-widest">BENIFITS</h3>
                    <p className="font-extralight text-md">What else you should expect from us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

                    <div className="p-5 flex flex-col items-center space-y-5 text-center">
                        <img src="/assets/certificate-logo.png" alt="/assets/certificate-logo.png" className="h-18 w-20" />
                        <h4 className="text-3xl font-semibold">Certificate</h4>
                        <p className="font-extralight text-lg">Receive a Certificate of Completion the moment you complete the course.</p>
                    </div>

                    <div className="p-5 flex flex-col items-center space-y-5 text-center">
                        <img src="/assets/code-editor-logo.png" alt="/assets/code-editor-logo.png" className="h-18 w-20" />
                        <h4 className="text-3xl font-semibold">xCodeClazz IDE</h4>
                        <p className="font-extralight text-lg">Our own ready to use coding playground editor for all your code.</p>
                    </div>

                    <div className="p-5 flex flex-col items-center space-y-5 text-center">
                        <img src="/assets/video-conference.png" alt="/assets/video-conference.png" className="h-18 w-20" />
                        <h4 className="text-3xl font-semibold">Video Conference</h4>
                        <p className="font-extralight text-lg">We also encourage student to ask question on the air if needed.</p>
                    </div>

                    <div className="p-5 flex flex-col items-center space-y-5 text-center">
                        <img src="/assets/wireless-logo.png" alt="/assets/wireless-logo.png" className="h-18 w-20" />
                        <h4 className="text-3xl font-semibold">Wifi Clazzroom</h4>
                        <p className="font-extralight text-lg">We let you access our wifi network for fast coding execution.</p>
                    </div>

                    <div className="p-5 flex flex-col items-center space-y-5 text-center">
                        <img src="/assets/chat-logo.png" alt="/assets/chat-logo.png" className="h-18 w-20" />
                        <h4 className="text-3xl font-semibold">Code Sharing</h4>
                        <p className="font-extralight text-lg">We encourage code sharing because sharing knowledge or helping others helps you to perform better, and become stronger as professionals.</p>
                    </div>

                    <div className="p-5 flex flex-col items-center space-y-5 text-center">
                        <img src="/assets/critical-thinking-logo.png" alt="/assets/critical-thinking-logo.png" className="h-18 w-20" />
                        <h4 className="text-3xl font-semibold">Critical Thinking</h4>
                        <p className="font-extralight text-lg">Programming is all about thinking what to do and how to do. You will spend
                            your 90% thinking on how to solve given problem. You will be taught how to think like programmer</p>
                    </div>

                </div>

                <div className="p-5 flex flex-col items-center space-y-3 bg-black text-white text-center">
                    <h4 className="text-3xl font-semibold"><strong className="text-logoColor">x</strong>CodeClazz</h4>
                    <p className="font-extralight text-md">www.xcodeclazz.com</p>
                    <p className="font-extralight text-md">+91 89878 62422, 657 3566208</p>
                    <p className="font-extralight text-sm">Dara Variety Store next to Gupta Book Store, Gamharia, Jamshedpur, Jharkhand -
                        832108</p>
                </div>

                <div className={`modal ${Object.keys(callbackRequestModel).length > 0 ? 'block' : 'hidden'}`}>
                    <div className="modal-content relative flex flex-col rounded-md justify-center sm:w-2/4 md:w-2/4 lg:w-1/4 xl:w-1/4">
                        <span className="close absolute top-0 right-0 p-2 cursor-pointer" onClick={() => closeModel()}>&times;</span>
                        <h3 className="text-2xl font-bold text-center">We need your details</h3>
                        <div className="flex flex-col">
                            <div className="w-full flex flex-col space-y-2 mt-4 mb-2">
                                <input className="rounded-sm focus:border-black border-black" type="text" value={callbackForm.name} onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })} placeholder="Name" />
                                <input className="rounded-sm focus:border-black border-black" type="text" value={callbackForm.phone} onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })} placeholder="Phone Number" />
                                <input className="rounded-sm focus:border-black border-black" type="text" value={callbackForm.school} onChange={(e) => setCallbackForm({ ...callbackForm, school: e.target.value })} placeholder="School/College" />
                            </div>
                            <button type="button" className="border shadow-sm p-3 flex justify-center space-x-2 bg-logoColor text-white" onClick={() => sendCallbackRequest()}>
                                <Spinner show={spinner} />
                                <strong>Request Callback</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}