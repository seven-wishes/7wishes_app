import {APP} from "../actionTypes";

const initialState = {
    plans: [],
}
function appReducer (state = initialState, action) {
    switch(action.type) {
        case APP.SET_PLANS:
            return {
                ...state,
                plans: action.payload.plans,
            }
        default: return state
    }
}
export default appReducer