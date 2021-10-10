import {accountAPI} from "../../api/api";
import {alert_message} from "./appActions";
import {ACCOUNT} from "../actionTypes";

export function set_account(accountExists, account) {
    return {
        type: ACCOUNT.SET,
        payload: {
            accountExists,
            account
        }
    }
}

export function activate_account() {return {type: ACCOUNT.ACTIVATE}}
export function deactivate_account() {return {type: ACCOUNT.DEACTIVATE}}

export function set_invisible(is_invisible) {return {type: ACCOUNT.SET_INVISIBLE, payload: is_invisible}}

export function set_account_city(city) {return {type: ACCOUNT.UPDATE_CITY, city}}
export function set_account_age(age) {return {type: ACCOUNT.UPDATE_AGE, age}}
export function set_account_nickname(nickname) {return {type: ACCOUNT.UPDATE_NICKNAME, nickname}}
export function set_account_description(description) {return {type: ACCOUNT.UPDATE_DESCRIPTION, description}}
export function set_account_height(height) {return {type: ACCOUNT.UPDATE_HEIGHT, height}}
export function set_account_weight(weight) {return {type: ACCOUNT.UPDATE_WEIGHT, weight}}
export function set_account_eye_color(eye_color) {return {type: ACCOUNT.UPDATE_CITY, eye_color}}
export function set_account_hair_color(hair_color) {return {type: ACCOUNT.UPDATE_CITY, hair_color}}

export function set_messages_count(count) {return {type: ACCOUNT.SET_MESSAGES_COUNT, payload: count}}

export const createAccount = (user_id, gender_id) => (dispatch) => {
    accountAPI.createAccount(user_id, gender_id)
        .then(res => {
            console.log(res.data)
            dispatch(alert_message(res.data.message))
            dispatch(set_account(true, res.data.account))
        })
        .catch(e => {
            console.log(e);
        })
}

export const activateAccount = () => (dispatch) => {
    accountAPI.activateAccount()
        .then(res => {
            if (res.data.result === 1) {
                return dispatch(alert_message(res.data.message, 2000))
            }
            dispatch(alert_message(res.data.message, 2000))
            dispatch(activate_account())
        })
        .catch(e => {
            console.log(e);
        })
}

export const deactivateAccount = () => (dispatch) => {
    accountAPI.deactivateAccount()
        .then(res => {
            dispatch(alert_message(res.data.message, 2000))
            dispatch(deactivate_account())
        })
        .catch(e => {
            console.log(e);
        })
}

export const setInvisible = (is_invisible) => (dispatch) => {
    accountAPI.setInvisible(is_invisible)
        .then(res => {
            dispatch(alert_message(res.data.message, 1000));
            if (res.data.result === 0) {
                dispatch(set_invisible(res.data.is_invisible));
            }
        })
        .catch(e => {
            console.log(e);
        })
}

export const getMyAccount = (user_id) => (dispatch) => {
    accountAPI.getMyAccount(user_id)
        .then(res => {
            if (res.data.result === 0) {
                dispatch(set_account(true, res.data.account));
            }
        })
        .catch(e => {
            console.log(e);
        })
}

export const deleteGalleryItem = (image_id) => (dispatch) => {
    accountAPI.deleteGalleryItem(image_id)
        .then(res => {
            console.log(res.data)
            if (res.data.result === 0) {
                dispatch({type: ACCOUNT.GALLERY_IMAGE_REMOVE, payload: image_id});
            }
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateAccount = (account) => (dispatch) => {
    accountAPI.updateAccount(account)
        .then(res => {
            console.log(res.data)
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateCity = (city_id) => (dispatch) => {
    accountAPI.updateCity(city_id)
        .then(res => {
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateAge = (age) => (dispatch) => {
    accountAPI.updateAge(age)
        .then(res => {
            dispatch(set_account_age(res.data.age))
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateNickname = (nickname) => (dispatch) => {
    accountAPI.updateNickname(nickname)
        .then(res => {
            dispatch(set_account_nickname(res.data.nickname))
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateDescription = (description) => (dispatch) => {
    accountAPI.updateDescription(description)
        .then(res => {
            dispatch(set_account_description(res.data.description))
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateHeight = (height) => (dispatch) => {
    accountAPI.updateHeight(height)
        .then(res => {
            dispatch(set_account_height(res.data.height))
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateWeight = (weight) => (dispatch) => {
    accountAPI.updateWeight(weight)
        .then(res => {
            if (res.data.result === 0) {
                dispatch(set_account_weight(res.data.weight));
                dispatch(alert_message(res.data.message, 1000));
            }
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateEyeColor = (eye_color_id) => (dispatch) => {
    accountAPI.updateEyeColor(eye_color_id)
        .then(res => {
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateHairColor = (hair_color_id) => (dispatch) => {
    accountAPI.updateHairColor(hair_color_id)
        .then(res => {
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}

export const updateGoal = (goal, value) => (dispatch) => {
    accountAPI.updateGoal(goal, value)
        .then(res => {
            dispatch(alert_message(res.data.message, 1000))
        })
        .catch(e => {
            console.log(e);
        })
}


export const getNewMessagesCount = (user_id) => (dispatch) => {
    accountAPI.getNewMessagesCount(user_id)
        .then(res => {
            dispatch(set_messages_count(res.data.messages_count))
        })
        .catch(e => {
            console.log(e);
        })
}
