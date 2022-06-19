function ctas() {
    var fire_btn = document.getElementById('cta-fire-btn');
    fire_btn.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('https://xcodeclazz.herokuapp.com/app', {
            method: 'GET',
        }).then(response => response.json()).then((document) => {
            console.log(document);
        }).catch(console.log);
    });
}

function initCodeMirror() {
    const instance = CodeMirror(document.querySelector('#editor'), {
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
    instance.on('change', function (cm, change) {
        console.log(cm.getValue())
    });
    instance.on('scroll', function (cm) {
        // cm.execCommand('selectAll')
    });
}

ctas();
initCodeMirror();