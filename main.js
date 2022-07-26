const { useState, useEffect, useRef } = React

const App = () => {
    return (
        <HashRouter>
            <Route path="/" exact component={HomeLayout} />
            <Route path="/editor" exact component={EditorLayout} />
            <Route path="/course" exact component={SingleCourse} />
        </HashRouter>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));