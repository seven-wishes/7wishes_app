import {dialogsAPI} from "../../api/api";
import {alert_message} from "./appActions";
import {DIALOGS, USERS} from "../actionTypes";

export function dialog_init(dialog_id) {
    return {
        type: USERS.DIALOG_INIT,
        payload: {
            dialog_id
        }
    }
}
export function check_dialog_with_user(dialog_exists, dialog_id) {
    return {
        type: USERS.CHECK_DIALOG,
        payload: {
            dialog_exists,
            dialog_id
        }
    }
}
export function set_dialogs(dialogs) {
    return {
        type: DIALOGS.SET_LIST,
        payload: {
            dialogs
        }
    }
}
export function set_dialog(dialog, dialog_id) {
    return {
        type: DIALOGS.SET_DIALOG,
        payload: {
            dialog,
            dialog_id
        }
    }
}
export function add_message(message_row) {
    return {
        type: DIALOGS.ADD_MESSAGE,
        payload: {
            message_row
        }
    }
}
export function delete_message(message) {
    return {
        type: DIALOGS.DELETE_MESSAGE,
        payload: {
            message
        }
    }
}
export function delete_dialog() {
    return {
        type: DIALOGS.DELETE_DIALOG
    }
}
export function clear_dialog() {
    return {
        type: DIALOGS.CLEAR_DIALOG
    }
}
export function dialog_error(dialog_error) {
    return {
        type: DIALOGS.DIALOG_ERROR,
        dialog_error
    }
}

export const createDialog = (user_id) => (dispatch) => {
    dialogsAPI.createDialog(user_id)
        .then(res => {
            dispatch(alert_message(res.data.message));
            dispatch(dialog_init(res.data.dialog_id));
        })
        .catch(e => {
            console.log(e);
        })
}
export const checkDialog = (user_id) => (dispatch) => {
    dialogsAPI.checkDialog(user_id)
        .then(res => {
            dispatch(check_dialog_with_user(res.data.dialog_exists, res.data.dialog_id))
        })
        .catch(e => {
            console.log(e);
        })
}
export const createMessage = (dialog_id, message_text) => (dispatch) => {
    dialogsAPI.createMessage(dialog_id, message_text)
        .then(res => {
            dispatch(alert_message(res.data.message));
            dispatch(check_dialog_with_user(res.data.dialog_exists, res.data.dialog_id));
            dispatch(add_message(res.data.message_row));
        })
        .catch(e => {
            console.log(e);
        })
}
export const getDialogs = () => (dispatch) => {
    dialogsAPI.getDialogs()
        .then(res => {
            dispatch(alert_message(res.data.message));
            dispatch(set_dialogs(res.data.dialogs));
        })
        .catch(e => {
            console.log(e);
        })
}
export const getDialog = (dialog_id) => (dispatch) => {
    dialogsAPI.getDialog(dialog_id)
        .then(res => {
            if (res.data.result === 0) {
                dispatch(set_dialog(res.data.dialog, res.data.dialog_id));
            } else {
                dispatch(dialog_error(res.data.dialog_error));
            }
        })
        .catch(e => {
            console.log(e);
        })
}
export const deleteMessage = (message_id) => (dispatch) => {
    dialogsAPI.deleteMessage(message_id)
        .then(res => {
            if (res.data.result === 0) {
                dispatch(delete_message(res.data.message_id))
            } else {
                dispatch(dialog_error(res.data.dialog_error));
            }
        })
        .catch(e => {
            console.log(e);
        })
}
export const deleteDialog = (dialog_id) => (dispatch) => {
    dialogsAPI.deleteDialog(dialog_id)
        .then(res => {
            if (res.data.result === 0) {
                dispatch(delete_dialog())
            } else {
                dispatch(alert_message(res.data.message));
            }
        })
        .catch(e => {
            console.log(e);
        })
}
