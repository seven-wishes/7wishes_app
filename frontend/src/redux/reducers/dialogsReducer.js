import {DIALOGS} from "../actionTypes";

const initialState = {
    dialog_id: null,
    dialog: [],
    dialogs: [],
    dialog_error: false
}

function appReducer (state = initialState, action) {
    switch(action.type) {
        case DIALOGS.SET_LIST:
            return {
                ...state,
                dialogs: action.payload.dialogs
            }
        case DIALOGS.SET_DIALOG:
            return {
                ...state,
                dialog: action.payload.dialog,
                dialog_id: action.payload.dialog_id
            }
        case DIALOGS.CLEAR_DIALOG:
            return {
                ...state,
                dialog: {}
            }
        case DIALOGS.ADD_MESSAGE:
            return {
                ...state,
                dialog: state.dialog.concat(action.payload.message_row)

            }
        case DIALOGS.DELETE_MESSAGE:
            return {
                ...state,
                dialog: {
                }
            }
        case DIALOGS.DELETE_DIALOG:
            return {
                ...state,
                dialog: []

            }
        case DIALOGS.DIALOG_ERROR:
            return {
                ...state,
                dialog_error: action.dialog_error

            }
        default: return state
    }
}
export default appReducer