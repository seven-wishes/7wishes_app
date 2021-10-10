import {PAYMENTS} from "../actionTypes";

const initialState = {
    payment_init: false,
    payment: {}
}
function appReducer (state = initialState, action) {
    switch(action.type) {
        case PAYMENTS.PAYMENT_INIT:
            return {
                ...state,
                payment_init: true,
                payment: action.payload.payment
            }
        default: return state
    }
}
export default appReducer