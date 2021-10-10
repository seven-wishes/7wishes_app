import {usersAPI} from "../../api/api";
import { FILTERS, USERS } from "../actionTypes";

export function set_users_list(users_list, total_users_count) {
    return {
        type: USERS.SET_LIST,
        payload: {
            users_list,
            total_users_count
        }
    }
}
export function set_user(user) {
    return {
        type: USERS.SET_USER,
        payload: {
            user
        }
    }
}
export function set_current_page(currentPage) {
    return {
        type: USERS.SET_CURRENT_PAGE,
        payload: {
            currentPage
        }
    }
}



export function change_filter(type, filter_id, value) {
    if (type === "age") {
        return {
            type: FILTERS.SET_AGE,
            payload: {
                filter_id: filter_id,
                value: value
            }
        }
    } else if (type === "height") {
        return {
            type: FILTERS.SET_HEIGHT,
            payload: {
                filter_id: filter_id,
                value: value
            }
        }
    } else if (type === "weight") {
        return {
            type: FILTERS.SET_WEIGHT,
            payload: {
                filter_id: filter_id,
                value: value
            }
        }
    } else if (type === "goal") {
        return {
            type: FILTERS.SET_GOAL,
            payload: {
                filter_id: filter_id,
                value: value
            }
        }
    }
}

export const getAccounts = (gender_id, page) => (dispatch) => {
    usersAPI.getAccounts(gender_id, page)
        .then(res => {
            dispatch(set_users_list(res.data.users_list, res.data.total_users_count))
        })
}

export const getUser = (user_id) => (dispatch) => {
    usersAPI.getUser(user_id)
        .then(res => {
            dispatch(set_user(res.data.user))
        })
}

export const setFilter = (gender_id, filter) => (dispatch) => {
    usersAPI.setFilter(gender_id, filter)
        .then(res => {
            dispatch(set_users_list(res.data.users_list, res.data.total_users_count))
        })
}