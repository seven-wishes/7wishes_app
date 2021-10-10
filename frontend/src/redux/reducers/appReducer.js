import {APP} from "../actionTypes";

const initialState = {
    app: {
        alert: '',
        mobile_menu: false,
        profile_tab: 'account',
        zoom: false,
        message_popup_active: false,
        access_visible: false
    },
    cities: [],
    eye_colors: [],
    hair_colors: [],
    goals: []
}
function appReducer (state = initialState, action) {
    switch(action.type) {
        case APP.ACCESS_SHOW:
            return {
                ...state,
                app: {
                    ...state.app,
                    access_visible: true
                }
            }
        case APP.ACCESS_HIDE:
            return {
                ...state,
                app: {
                    ...state.app,
                    access_visible: false
                }
            }
        case APP.ALERT_MESSAGE:
            return {
                ...state,
                app: {
                    ...state.app,
                    alert: action.payload.message
                }
            }
        case APP.ALERT_REMOVE:
            return {
                ...state,
                app: {
                    ...state.app,
                    alert: ''
                }
            }
        case APP.TAB_SELECT:
            return {
                ...state,
                app: {
                    ...state.app,
                    profile_tab: action.payload.tab
                }
            }
        case APP.ZOOM_IMAGE:
            return {
                ...state,
                app: {
                    ...state.app,
                    zoom: action.payload.zoom
                }
            }
        case APP.MESSAGE_POPUP:
            return {
                ...state,
                app: {
                    ...state.app,
                    message_popup_active: action.message_popup_active
                }
            }
        case APP.MOBILE_MENU_SHOW:
            return {
                ...state,
                app: {
                    ...state.app,
                    mobile_menu: true
                }
            }
        case APP.MOBILE_MENU_HIDE:
            return {
                ...state,
                app: {
                    ...state.app,
                    mobile_menu: false
                }
            }
        case APP.SET_CITIES:
            return {
                ...state,
                cities: action.cities
            }
        case APP.SET_EYE_COLORS:
            return {
                ...state,
                eye_colors: action.eye_colors
            }
        case APP.SET_HAIR_COLORS:
            return {
                ...state,
                hair_colors: action.hair_colors
            }
        case APP.SET_GOALS:
            return {
                ...state,
                goals: action.goals
            }
        default: return state
    }
}
export default appReducer