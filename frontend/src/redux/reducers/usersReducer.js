import { FILTERS, USERS } from "../actionTypes";

const initialState = {
    filters: {
        goals: [
            {
                id: "spouse",
                title_man: "Ищу жену",
                title_woman: "Ищу мужа",
                active: false
            },
            {
                id: "paramour",
                title_man: "Ищу любовницу",
                title_woman: "Ищу любовника",
                active: false
            },
            {
                id: "performer",
                title_man: "Ищу приключения",
                title_woman: "Ищу приключения",
                active: false
            },
            {
                id: "mlfa",
                title_man: "Ищу опытную женщину",
                title_woman: "Ищу спонсора",
                active: false
            },
            {
                id: "assistant",
                title_man: "Ищу помощницу",
                title_woman: "Ищу работу личного секретаря",
                active: false
            },
            {
                id: "housemaid",
                title_man: "Ищу домработницу",
                title_woman: "Ищу работу домработницы",
                active: false
            },
            {
                id: "friend",
                title_man: "Ищу подругу",
                title_woman: "Ищу друга",
                active: false
            },
        ],
        age: [
            {
                id: "filterAge-25",
                title: "до 25 лет",
                from: 0,
                to: 24,
                active: false
            },
            {
                id: "filterAge-25-35",
                title: "25-35 лет",
                from: 25,
                to: 34,
                active: false
            },
            {
                id: "filterAge-35-45",
                title: "35-45 лет",
                from: 35,
                to: 44,
                active: false
            },
            {
                id: "filterAge-45",
                title: "от 45 лет",
                from: 45,
                to: 100,
                active: false
            },
        ],
        weight: [
            {
                id: "filterWeight-60",
                title: "до 60 кг",
                from: 0,
                to: 59,
                active: false
            },
            {
                id: "filterWeight-60-80",
                title: "60-80 кг",
                from: 60,
                to: 70,
                active: false
            },
            {
                id: "filterWeight-80-100",
                title: "80-100 кг",
                from: 80,
                to: 99,
                active: false
            },
            {
                id: "filterWeight-100",
                title: "от 100 кг",
                from: 100,
                to: 1000,
                active: false
            },
        ],
        height: [
            {
                id: "filterHeight-160",
                title: "до 160 см",
                from: 0,
                to: 159,
                active: false
            },
            {
                id: "filterHeight-160-70",
                title: "160-170 см",
                from: 160,
                to: 169,
                active: false
            },
            {
                id: "filterHeight-170-180",
                title: "170-180 см",
                from: 170,
                to: 179,
                active: false
            },
            {
                id: "filterHeight-180",
                title: "от 180 см",
                from: 180,
                to: 1000,
                active: false
            },
        ]
    },
    total_users_count: 0,
    users_page_size: 12,
    currentPage: 1,
    users_list: [],
    user: {},
    dialog_exists: false,
    dialog_id: null
}
function appReducer (state = initialState, action) {
    switch(action.type) {
        case USERS.SET_LIST:
            return {
                ...state,
                users_list: action.payload.users_list,
                total_users_count: action.payload.total_users_count
            }
        case USERS.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        case USERS.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case USERS.CHECK_DIALOG:
            return {
                ...state,
                dialog_exists: action.payload.dialog_exists,
                dialog_id: action.payload.dialog_id
            }
        case USERS.DIALOG_INIT:
            return {
                ...state,
                dialog_id: action.payload.dialog_id
            }
        case FILTERS.SET_AGE:
            const changedAgeID = action.payload.filter_id
            const changedAgeIndex = state.filters.age.findIndex(({id}) => id === changedAgeID)
            const changedAge = state.filters.age[changedAgeIndex]

            let changedNewAge

            if (changedAge) {
                changedNewAge = {
                    ...changedAge,
                    active: action.payload.value
                }
            } else {
                changedNewAge = changedAge
            }

            if (changedAgeIndex >= 0) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        age: [
                            ...state.filters.age.slice(0, changedAgeIndex),
                            changedNewAge,
                            ...state.filters.age.slice((changedAgeIndex + 1))
                        ]
                    }
                }
            } else {
                return {
                    ...state
                }
            }
        case FILTERS.SET_WEIGHT:
            const changedWeightID = action.payload.filter_id
            const changedWeightIndex = state.filters.weight.findIndex(({id}) => id === changedWeightID)
            const changedWeight = state.filters.weight[changedWeightIndex]

            let changedNewWeight

            if (changedWeight) {
                changedNewWeight = {
                    ...changedWeight,
                    active: action.payload.value
                }
            } else {
                changedNewWeight = changedWeight
            }

            if (changedWeightIndex >= 0) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        weight: [
                            ...state.filters.weight.slice(0, changedWeightIndex),
                            changedNewWeight,
                            ...state.filters.weight.slice((changedWeightIndex + 1))
                        ]
                    }
                }
            } else {
                return {
                    ...state
                }
            }
        case FILTERS.SET_HEIGHT:
            const changedHeightID = action.payload.filter_id
            const changedHeightIndex = state.filters.height.findIndex(({id}) => id === changedHeightID)
            const changedHeight = state.filters.height[changedHeightIndex]

            let changedNewHeight

            if (changedHeight) {
                changedNewHeight = {
                    ...changedHeight,
                    active: action.payload.value
                }
            } else {
                changedNewHeight = changedHeight
            }

            if (changedHeightIndex >= 0) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        height: [
                            ...state.filters.height.slice(0, changedHeightIndex),
                            changedNewHeight,
                            ...state.filters.height.slice((changedHeightIndex + 1))
                        ]
                    }
                }
            } else {
                return {
                    ...state
                }
            }
        case FILTERS.SET_GOAL:
            const changedGoalID = action.payload.filter_id
            const changedGoalIndex = state.filters.goals.findIndex(({id}) => id === changedGoalID)
            const changedGoal = state.filters.goals[changedGoalIndex]

            let changedNewGoal

            if (changedGoal) {
                changedNewGoal = {
                    ...changedGoal,
                    active: action.payload.value
                }
            } else {
                changedNewGoal = changedGoal
            }

            if (changedGoalIndex >= 0) {
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        goals: [
                            ...state.filters.goals.slice(0, changedGoalIndex),
                            changedNewGoal,
                            ...state.filters.goals.slice((changedGoalIndex + 1))
                        ]
                    }
                }
            } else {
                return {
                    ...state
                }
            }
        default: return state
    }
}
export default appReducer