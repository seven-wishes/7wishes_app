import {PAYMENTS} from "../actionTypes";
import {paymentAPI} from "../../api/api";

export function payment_init(payment) {
    console.log('data',payment)
    return {
        type: PAYMENTS.PAYMENT_INIT,
        payload: {
            payment
        }
    }
}

export const paymentInit = (user_id, amount, plan_id, plan_title) => (dispatch) => {
    paymentAPI.paymentInit(user_id, amount, plan_id, plan_title)
        .then(res => {
            dispatch(payment_init(res.data.payment))
        })
        .catch(e => {
            console.log(e);
        })
}

export const paymentUpInit = (user_id, amount, plan_id, plan_title) => (dispatch) => {
    paymentAPI.paymentUpInit(user_id, amount, plan_id, plan_title)
        .then(res => {
            dispatch(payment_init(res.data.payment))
        })
        .catch(e => {
            console.log(e);
        })
}