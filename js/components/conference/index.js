class Conference extends React.Component {

    constructor(props) {
        super(props);

        this.defaultCourse = "Python";
        this.state = {
            course: this.defaultCourse,
            href: '',
            passphrase: '',
            nodes: [],
        }
    };

    publish = () => {
        if (this.state.passphrase == '') return;
        if (this.state.course == '') return;
        if (this.state.href == '') return;

        const { course, href, passphrase } = this.state;

        network_states.isSomethingAlreadyRequest = true;
        fetch(routes.POST_CONF, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ course, href, passphrase })
        }).then(response => response.json()).then((res) => {
            showSnackbar(res.message);
            network_states.isSomethingAlreadyRequest = false;
            this.props.history.goBack();
        }).catch(e => {
            showSnackbar(e);
            network_states.isSomethingAlreadyRequest = false;
        });
    }

    loadConfs = () => {
        fetch(routes.GET_CONF, { method: 'GET', }).then(response => response.json()).then((res) => {
            this.setState({ nodes: res.documents });
        }).catch(showSnackbar);
    }

    getLinks = (node) => {
        return (
            <li className="flex flex-row justify-between items-center">
                <a target="_blank" className={`${node.active ? 'font-bold' : 'font-light'} text-lg w-full hover:text-logoColor`} href={node.href}>{node.course}</a>
                <span class={`flex h-3 w-3 ${node.active ? 'block' : 'hidden'}`}>
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-logoColor opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-logoColor"></span>
                </span>
            </li>
        )
    }

    componentDidMount() {
        this.loadConfs();
    }

    render() {
        return (
            <div className="p-4 h-screen flex flex-col md:flex-row md:space-x-4 items-center justify-center">
                <div className="w-72 h-72 shadow-xl rounded-lg shadow-xl flex flex-col p-5 space-y-2">
                    <h2 className="font-bold text-2xl"><strong className="text-logoColor animate-pulse">x</strong>Live</h2>
                    <hr />
                    <ul>{this.state.nodes.map(e => this.getLinks(e))}</ul>
                    <hr />
                    <small className="text-gray-300 text-xs">Click one of these to connect with live clazz</small>
                </div>
                <div className="w-72 h-72 shadow-xl rounded-lg shadow-xl flex flex-col p-5 flex flex-col items-center justify-center space-y-4">
                    <select className="w-full" onChange={e => this.setState({ course: e.target.value })}>
                        <option value={this.defaultCourse} key={this.defaultCourse}>{this.defaultCourse}</option>
                        <option value="Java" key="Java">Java</option>
                        <option value="C++" key="C++">C++</option>
                        <option value="Sql" key="Sql">Sql</option>
                    </select>
                    <input type="text" placeholder="Link" value={this.state.href} onChange={e => this.setState({ href: e.target.value })} className="w-full" />
                    <input type="password" placeholder="Passphrase" value={this.state.passphrase} onChange={e => this.setState({ passphrase: e.target.value })} className="w-full" />
                    <button className="border p-2 hover:bg-black hover:text-white flex flex-row items-center" onClick={e => this.publish()}>
                        <Spinner show={network_states.isSomethingAlreadyRequest} />
                        Publish
                    </button>
                </div>
            </div>
        )
    }
}
