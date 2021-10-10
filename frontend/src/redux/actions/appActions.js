import {APP} from "../actionTypes";
import {appAPI} from "../../api/api";

export function access_show() {return {type: APP.ACCESS_SHOW}}
export function access_hide() {return {type: APP.ACCESS_HIDE}}

export function message_popup(message_popup_active) {return {type: APP.MESSAGE_POPUP, message_popup_active}}

export function show_menu_mobile() {
    console.log('test show_menu_mobile');
    return {
        type: APP.MOBILE_MENU_SHOW
    }
}
export function hide_menu_mobile() {
    return {
        type: APP.MOBILE_MENU_HIDE
    }
}
export function zoom_image(zoom) {
    return {
        type: APP.ZOOM_IMAGE,
        payload: {
            zoom
        }
    }
}
export function alert_show(message) {
    return {
        type: APP.ALERT_MESSAGE,
        payload: {
            message: message
        }
    }
}
export function alert_remove() {
    return {
        type: APP.ALERT_REMOVE
    }
}
export function profile_tab_selector(tab) {
    return {
        type: APP.TAB_SELECT,
        payload: {
            tab
        }
    }
}

export function set_cities(cities) {return {type: APP.SET_CITIES, cities}}
export function set_eye_colors(eye_colors) {return {type: APP.SET_EYE_COLORS, eye_colors}}
export function set_hair_colors(hair_colors) {return {type: APP.SET_HAIR_COLORS, hair_colors}}
export function set_goals(goals) {return {type: APP.SET_GOALS, goals}}

export const alert_message = (message, timer = 5000) => (dispatch) => {
    dispatch(alert_show(message));
    setTimeout(() => {
        dispatch(alert_remove());
    }, timer);
}

export const getCities = () => (dispatch) => {
    appAPI.getCities()
        .then(res => {
            dispatch(set_cities(res.data.cities));
        })
        .catch(e => {
            console.log(e);
        })
}

export const getEyeColors = () => (dispatch) => {
    appAPI.getEyeColors()
        .then(res => {
            dispatch(set_eye_colors(res.data.eye_colors));
        })
        .catch(e => {
            console.log(e);
        })
}

export const getHairColors = () => (dispatch) => {
    appAPI.getHairColors()
        .then(res => {
            dispatch(set_hair_colors(res.data.hair_colors));
        })
        .catch(e => {
            console.log(e);
        })
}

export const getGoals = () => (dispatch) => {
    appAPI.getGoals()
        .then(res => {
            dispatch(set_goals(res.data.goals));
        })
        .catch(e => {
            console.log(e);
        })
}
