import counter from "./counter";
import dataReducer from "./dataReducer";
/////////////// import second reducer

////////////// import tool from redux to comabine all reducers
import { combineReducers } from "redux";


export const allReducers = combineReducers({
    counterState: counter,
    dataList: dataReducer,
});

