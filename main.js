// console.log(window)

// const createStoreWithMiddleware = applyMiddleware(ReduxPromiseMiddleware, ReduxThunk)(createStore);
// const createStoreWithMiddleware = createStore(rootReducer, applyMiddleware(ReduxPromiseMiddleware));
// var store = createStore(rootReducer, {});

const App = () => {
    return (
        // <Provider store={createStoreWithMiddleware(rootReducer)}>
        <HashRouter>
            <Switch>
                <Route path="/" exact component={HomeLayout} />
                <Route path="/conf" exact component={Conference} />
                <Route path="/editor" exact component={EditorLayout} />
                <Route path="/course" exact component={SingleCourse} />
                <Redirect to="/" />
            </Switch>
        </HashRouter>
        // </Provider>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));