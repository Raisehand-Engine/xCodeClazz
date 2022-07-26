class EditorLayout extends React.Component {

    constructor(props) {
        super(props);

        this.editorRef = React.createRef();
        this.state = { code: 'hello world', outputModel: {} }
    };

    closeModel = () => this.setState({ outputModel: {} });
    openModel = (output) => this.setState({ outputModel: output });

    runCode = () => {
        fetch('https://xcodeclazz.herokuapp.com/v1/api/compiler/python', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "code": `${this.state.code}`
            })
        }).then(response => response.json()).then((document) => {
            this.openModel(document.result);
            console.log(document.result);
        }).catch(console.log);
    }

    createEditor = () => {
        const instance = CodeMirror(this.editorRef.current, {
            value: '# © xCodeClazz 2021 - 2022\n# Write your code here... \n\n\n',
            mode: { name: "python", globalVars: true },
            lineNumbers: true,
            tabSize: 2,
            autoCloseBrackets: true,
            styleSelectedText: true,
            highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
            autoCloseTags: true,
            matchBrackets: true,
            styleActiveLine: true,
            lineWrapping: true,
            foldGutter: true,
            theme: 'monokai',
            spellcheck: false,
            // theme: "night",
            // direction: "rtl",
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

    onEditorTextChange = (cm, change) => this.setState({ code: cm.getValue() });
    onEditorScrollChange = (cm) => { };

    componentDidMount() { this.createEditor(); };

    render() {
        return (
            <div className="flex flex-col">
                <div className="bg-black h-12 text-white px-3 flex justify-between items-center sticky top-0">
                    <h4 className="text-3xl font-semibold"><strong className="text-logoColor">x</strong>CodeClazz</h4>
                    <button className="border border-2 border-logoColor text-logoColor px-3" onClick={() => this.runCode()}>Fire</button>
                </div>
                <div ref={this.editorRef} className="h-screen"></div>
                <div className={`modal ${Object.keys(this.state.outputModel).length > 0 ? 'block' : 'hidden'}`}>
                    <div className="modal-content relative flex flex-col rounded-md justify-center sm:w-2/4 md:w-2/4 lg:w-1/4 xl:w-1/4">
                        <span className="close absolute top-0 right-0 p-2 cursor-pointer" onClick={() => this.closeModel()}>&times;</span>
                        <h3 className="text-2xl font-bold"><strong className="text-logoColor">x</strong>Console</h3>
                        <div className="flex flex-col h-44">
                            <textarea value={this.state.outputModel.stdout || this.state.outputModel.stderr} disabled cols="30" rows="10" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}