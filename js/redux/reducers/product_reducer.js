const product_reducer = function (state = {}, action) {
    switch (action.type) {
        case TYPE_DEMO:
            return { ...state, newField: action.payload }
        default:
            return state;
    }
};