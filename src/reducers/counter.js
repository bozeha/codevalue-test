const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREASE":
            return state + 1;
            break;
        case "DECREASE":
            return state - 1;
            break;
        default:
            return state;
            break;
    }
};

export default counter;
