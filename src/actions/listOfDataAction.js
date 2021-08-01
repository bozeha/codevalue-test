


export const UpdateListOfDataAction = (dataReceived) => (dispatch) => {
    dispatch({
        type: "UpdateData",
        payload: {
            data: dataReceived
        }
    })

}
export const EditItemAction = (dataReceived) => (dispatch) => {
    dispatch({
        type: "UpdateItem",
        payload: {
            index: dataReceived.index,
        }
    })

}