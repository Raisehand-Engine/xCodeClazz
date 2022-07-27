class EditorLayout extends React.Component {

    constructor(props) {
        super(props);

        this.db = new DB();
        // '# © xCodeClazz 2021 - 2022\n# Write your code here... \n\n\n'

        this.editorRef = React.createRef();
        this.state = { code: this.db.getPythonCode(), outputModel: {}, waitForCode: false }
    };

    closeModel = () => this.setState({ outputModel: {} });
    openModel = (output) => this.setState({ outputModel: output });

    runCode = () => {
        this.setState({ waitForCode: true });
        fetch('https://xcodeclazz.herokuapp.com/v1/api/compiler/python', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "code": this.state.code
            })
        }).then(response => response.json()).then((document) => {
            this.setState({ waitForCode: false });
            this.openModel(document.result);
        }).catch(console.log);
    }

    createEditor = () => {
        const instance = CodeMirror(this.editorRef.current, {
            value: this.state.code,
            mode: {
                name: "python",
                version: 3,
                singleLineStringErrors: false
            },
            indentUnit: 4,
            lineNumbers: true,
            tabSize: 4,
            autoCloseBrackets: true,
            styleSelectedText: true,
            highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
            autoCloseTags: true,
            matchBrackets: true,
            styleActiveLine: true,
            lineWrapping: true,
            foldGutter: true,
            theme: 'ayu-dark',
            spellcheck: false,
            extraKeys: {
                "F11": function (cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                "Esc": function (cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            },
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            extraKeys: { "Ctrl-Space": "autocomplete" }
        });
        instance.on('change', this.onEditorTextChange);
        instance.on('scroll', this.onEditorScrollChange);
    }

    onEditorTextChange = (cm, change) => {
        this.setState({ code: cm.getValue() });
        this.db.savePythonCode(cm.getValue());
    }
    onEditorScrollChange = (cm) => { };

    componentDidMount() {
        this.createEditor();
        document.addEventListener('keyup', e => {
            if (e.key == 'Escape') { this.closeModel(); }
            if (e.ctrlKey && e.key == 'b') { this.runCode(); }
        }, false);
    };

    render() {
        return (
            <div className="flex flex-col">
                <div className="bg-black h-12 text-white px-3 flex justify-between items-center sticky top-0">
                    <h4 className="text-3xl font-semibold"><strong className="text-logoColor">x</strong>CodeClazz</h4>
                    <button className="border border-2 border-logoColor text-logoColor px-3 flex flex-row px-2 py-1" onClick={() => this.runCode()}>
                        <Spinner show={this.state.waitForCode} />Run
                    </button>
                </div>
                <div className={`modal ${Object.keys(this.state.outputModel).length > 0 ? 'block' : 'hidden'}`}>
                    <div className="modal-content relative flex flex-col rounded-md justify-center sm:w-2/4 md:w-2/4 lg:w-1/4 xl:w-1/4">
                        <span className="close absolute top-0 right-0 p-2 cursor-pointer" onClick={() => this.closeModel()}>&times;</span>
                        <h3 className="text-2xl font-bold"><strong className="text-logoColor">x</strong>Console</h3>
                        <div className="flex flex-col h-44">
                            <textarea value={this.state.outputModel.stdout || this.state.outputModel.stderr} disabled cols="30" rows="10" />
                        </div>
                    </div>
                </div>
                <div ref={this.editorRef} className="h-screen"></div>
            </div>
        )
    }

}