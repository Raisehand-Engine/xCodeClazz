// console.log(window)

// const createStoreWithMiddleware = applyMiddleware(ReduxPromiseMiddleware, ReduxThunk)(createStore);
// const createStoreWithMiddleware = createStore(rootReducer, applyMiddleware(ReduxPromiseMiddleware));
// var store = createStore(rootReducer, {});

const App = () => {
    return (
        // <Provider store={createStoreWithMiddleware(rootReducer)}>
        <HashRouter>
            <Route path="/" exact component={HomeLayout} />
            <Route path="/editor" exact component={EditorLayout} />
            <Route path="/course" exact component={SingleCourse} />
        </HashRouter>
        // </Provider>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));