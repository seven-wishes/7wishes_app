import {AUTH} from "../actionTypes";

const initialState = {
    auth: false,
    demo: false,
    user_id: null,
    plan_id: null,
    plan_title: null,
    gender_id: null,
    is_online: false,
    is_forgot_password: false
}
function appReducer (state = initialState, action) {
    switch(action.type) {
        case AUTH.LOGIN:
            return {
                ...state,
                auth: true,
                user_id: action.payload.user_id,
                demo: action.payload.demo,
                gender_id: action.payload.gender_id,
                plan_id: action.payload.plan_id,
                plan_title: action.payload.plan_title,
                is_online: action.payload.is_online,
            }
        case AUTH.LOGOUT:
            return {
                ...state,
                auth: false
            }
        case AUTH.FORGOT_PASSWORD:
            return {
                ...state,
                is_forgot_password: action.payload
            }
        default: return state
    }
}
export default appReducer