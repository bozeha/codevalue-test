const initial = { data: [], itemIndex: null }


const dataReducer = (state = initial, action) => {
    switch (action.type) {
        case "UpdateData":
            return {
                ...state,
                data: action.payload.data
            }
        case "UpdateItem":
            return {
                ...state,
                itemIndex: action.payload.index,
                itemStatus: action.payload.status,
            }

        default:
            return {
                ...state
            }

    }

}

export default dataReducer;