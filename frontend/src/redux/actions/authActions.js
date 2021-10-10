import {authAPI} from "../../api/api";
import {AUTH} from "../actionTypes";

import {alert_message} from "./appActions";

export function auth(user_id, gender_id, plan_id, plan_title, is_online, demo) {
    return {
        type: AUTH.LOGIN,
        payload: {
            user_id,
            gender_id,
            plan_id,
            plan_title,
            is_online,
            demo
        }
    }
}
export function auth_destroy() {
    return {
        type: AUTH.LOGOUT
    }
}

export const login = (email, password) => (dispatch) => {
    authAPI.login(email, password)
        .then (res => {
            console.log(res.data)
            dispatch(alert_message(res.data.message));
            if (res.data.result === 0) {
                dispatch(auth(res.data.user_id, res.data.gender_id, res.data.plan_id, res.data.plan_title, res.data.is_online, res.data.demo));
            }
        })
        .catch (e => {
            console.log(e);
        })
}

export const checkAuthorization = () => (dispatch) => {
    authAPI.checkAuthorization()
        .then (res => {
            if (res.data.result === 0) {
                dispatch(auth(res.data.user_id, res.data.gender_id, res.data.plan_id, res.data.plan_title, res.data.is_online, res.data.demo));
            }
        })
        .catch (e => {
            console.log(e);
        })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then (res => {
            dispatch(alert_message(res.data.message));
            if (res.data.result === 0) {
                dispatch(auth_destroy())
            }
        })
        .catch (e => {
            console.log(e);
        })
}

export const createUser = (email, password, gender) => (dispatch) => {
    authAPI.createUser(email, password, gender)
        .then(res => {
            console.log(res.data)
            dispatch(alert_message(res.data.message));
            if (res.data.result === 0) {
                dispatch(auth(res.data.user_id, res.data.gender_id));
            }
        })
        .catch(e => {
            console.log(e);
        })
}

export function forgot_password (forgot) { return {type: AUTH.FORGOT_PASSWORD, payload: forgot} }

export const forgotPassword = (email) => (dispatch) => {
    authAPI.forgotPassword(email)
        .then(res => {
            console.log(res.data)
            if (res.data.result !== 0) {
                return dispatch(alert_message(res.data.message));
            }

            dispatch(alert_message(res.data.message));
            dispatch(forgot_password(false));
        })
        .catch(e => {
            console.log(e);
        })
}