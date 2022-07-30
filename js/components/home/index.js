const HomeLayout = () => {

    const [courses, setCourses] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [callbackRequestModel, setCallbackRequestModel] = useState({});
    const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', school: '' });

    useEffect(() => loadCourses(), []);
    // useEffect(() => console.log(callbackRequestModel), [callbackRequestModel]);
    useEffect(() => {
        let params = (new URL(document.location)).searchParams;
        let code = params.get("code");
        // check if the user has code param on the browser
        if (code) {
            axios({
                method: 'post',
                url: 'https://oauth2.googleapis.com/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
                data: `code=${code}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(redirect_url)}&grant_type=authorization_code`,
            }).then(first => {
                const access_token = first.data.access_token;
                const token_type = first.data.token_type;
                const expires_in = first.data.expires_in;
                const id_token = first.data.id_token;
                const scope = first.data.scope;

                axios({
                    method: 'get',
                    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${token_type} ${access_token}` },
                }).then(second => {
                    console.log(second.data);
                    // window.location = 'https://www.xcodeclazz.com'
                });
            }).catch(console.error);
        }
    });

    const login = () => {
        const scope = "https://www.googleapis.com/auth/userinfo.profile";
        const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(redirect_url)}&prompt=consent&response_type=code&client_id=${clientID}&scope=${encodeURIComponent(scope)}&access_type=online`;
        window.open(url, '_self');
    }

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
                    {/* <Link className="border px-4 py-2 text-white" disabled={!course.hasActive} to={`/editor?lang=${course.keywords}`} ><img src="/assets/code-editor-logo.svg" alt="/assets/code-editor-logo.svg" className="h-6 w-6" /></Link> */}
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

                        {/* second half */}
                        <div className="flex flex-col justify-center p-2 md:p-6 lg:p-10">

                            <h1 className="text-4xl">
                                Hola, Genius
                            </h1>
                            <p className="mt-4 text-2xl font-extralight leading-9 md:leading-normal text-gray-400">
                                Programming is not just writing bunch of code on the screen,
                                It's an <strong>ART</strong> very few people master. Why don't you learn
                                to program from a self taught artist. Learn from us we'll teach you every
                                concept in depth &amp; that too with ease explanation. <b>Let's Code</b>
                                {/* You're probably want to learn coding! great. In fact you should as soon as possible. You know what this is one of the most valuable skills now days. so what next? Learn from us! at least we are the best at this if not great. */}
                            </p>
                            <blockquote className="mt-10 leading-tight border-l-8 border-l-logoColor pl-4">
                                Gourav Gupta
                                <br />
                                <small className="text-slate-400">Lead Programmer &amp; Founder <strong>xCodeClazz</strong></small>
                            </blockquote>

                            <div className="flex flex-row space-x-1 mt-8">
                                {/* <button className="border-2 border-logoColor px-4 py-2 w-min bg-black text-white flex flex-row items-center" onClick={e => login()}>
                                    <Spinner show={false} />
                                    Login
                                </button> */}
                                {/* <Link to="/dashboard" className="border-2 border-logoColor px-4 py-2 w-min bg-black text-white">Dashboard</Link> */}
                                <Link to="/conf" className="border-2 border-logoColor px-4 py-2 w-min bg-black text-white flex flex-row items-center">
                                    <Spinner show={false} />
                                    Conferences
                                </Link>
                            </div>
                        </div>

                        {/* first half */}
                        <div className="hidden sm:hidden md:hidden lg:flex flex-col justify-center items-center space-y-2">
                            {/* <img src="/assets/logo512.png" alt="brand logo" width="200" height="200" /> */}

                            <h2 className="text-xl font-bold">Leaderboard</h2>
                            <hr />
                            <div className="w-72 h-72 shadow-xl rounded-lg overflow-hidden">
                                <ul className="space-y-1 overflow-y-auto h-full">
                                    <li className="w-full h-14 cursor-pointer hover:bg-gray-100">
                                        <div className="w-full h-full flex flex-row items-center p-4 space-x-3">
                                            <img src="https://via.placeholder.com/100x100" width="40" height="40" className="rounded-full" alt="" />
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-semibold">Gaurav Gupta</h4>
                                                <small className="text-xs text-gray-400">Vani Vidya Mandir • <strong>C++</strong></small>
                                            </div>
                                        </div>
                                    </li>
                                    <hr />
                                    <li className="w-full h-14 cursor-pointer hover:bg-gray-100">
                                        <div className="w-full h-full flex flex-row items-center p-4 space-x-3">
                                            <img src="https://via.placeholder.com/100x100" width="40" height="40" className="rounded-full" alt="" />
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-semibold">Satyam Gorai</h4>
                                                <small className="text-xs text-gray-400">Xavier Gamharia • <strong>Java</strong></small>
                                            </div>
                                        </div>
                                    </li>
                                    <hr />
                                    <li className="w-full h-14 cursor-pointer hover:bg-gray-100">
                                        <div className="w-full h-full flex flex-row items-center p-4 space-x-3">
                                            <img src="https://via.placeholder.com/100x100" width="40" height="40" className="rounded-full" alt="" />
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-semibold">Vishal Kumar</h4>
                                                <small className="text-xs text-gray-400">Xavier Gamharia • <strong>Java</strong></small>
                                            </div>
                                        </div>
                                    </li>
                                    <hr />
                                    <li className="w-full h-14 cursor-pointer hover:bg-gray-100">
                                        <div className="w-full h-full flex flex-row items-center p-4 space-x-3">
                                            <img src="https://via.placeholder.com/100x100" width="40" height="40" className="rounded-full" alt="" />
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-semibold">Aditya Roy</h4>
                                                <small className="text-xs text-gray-400">Xavier Gamharia • <strong>Java</strong></small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="w-full h-2">
                                        <div className="w-full h-full flex flex-row items-center p-4 space-x-3">
                                            <h4 className="text-xs font-semibold text-slate-600">* and 99 Other(s) on the leaderboard.</h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-10 bg-gray-100 px-5 py-10 shadow-inner text-center flex flex-col space-y-5">
                    <h3 className="text-3xl font-semibold tracking-widest">OFFLINE COURSES</h3>
                    <p className="font-extralight text-md">
                        The interactive learning for school/college students.
                    </p>
                </div>

                {
                    courses.length > 0 ? (
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {courses.map(singleCourseDesign)}
                        </div>
                    ) : (
                        <div className="p-5">
                            <div className="flex flex-row items-center justify-center"><Spinner show={courses.length == 0} /></div>
                        </div>
                    )
                }

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