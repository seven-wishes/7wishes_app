import {APP} from "../actionTypes";
import {plansAPI} from "../../api/api";
import {alert_message} from "./appActions";

export function set_plans(plans) {
    return {
        type: APP.SET_PLANS,
        payload: {
            plans
        }
    }
}

export const getPlans = (gender_id) => (dispatch) => {
    plansAPI.getPlans(gender_id)
        .then(res => {
            dispatch(alert_message(res.data.message));
            dispatch(set_plans(res.data.plans))
        })
        .catch(e => {
            console.log(e);
        })
}