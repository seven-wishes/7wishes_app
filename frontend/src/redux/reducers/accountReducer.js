import {ACCOUNT} from "../actionTypes";

const initialState = {
    accountExists: null,
    account: {
        account_id: null,
        user_id: null,
        images: null,
        gender_id: null,
        gender_name: null,
        age: null,
        nickname: null,
        height: null,
        weight: null,
        city_id: null,
        city_title: null,
        eye_color_id: null,
        eye_color_title: null,
        hair_color_id: null,
        hair_color_title: null,
        avatar_url: null,
        account_is_active: null,
        is_invisible: false,
    },
    messages_count: 0
}
function appReducer (state = initialState, action) {
    switch(action.type) {
        case ACCOUNT.SET:
            return {
                ...state,
                accountExists: action.payload.accountExists,
                account: action.payload.account
            }
        case ACCOUNT.ACTIVATE:
            return {
                ...state,
                account: {
                    ...state.account,
                    account_is_active: true
                }
            }
        case ACCOUNT.DEACTIVATE:
            return {
                ...state,
                account: {
                    ...state.account,
                    account_is_active: false
                }
            }
        case ACCOUNT.SET_INVISIBLE:
            return {
                ...state,
                account: {
                    ...state.account,
                    is_invisible: action.payload
                }
            }
        case ACCOUNT.UPDATE_AGE:
            return {
                ...state,
                account: {
                    ...state.account,
                    age: action.age
                }
            }
        case ACCOUNT.UPDATE_NICKNAME:
            return {
                ...state,
                account: {
                    ...state.account,
                    nickname: action.nickname
                }
            }
        case ACCOUNT.UPDATE_DESCRIPTION:
            return {
                ...state,
                account: {
                    ...state.account,
                    description: action.description
                }
            }
        case ACCOUNT.UPDATE_HEIGHT:
            return {
                ...state,
                account: {
                    ...state.account,
                    height: action.height
                }
            }
        case ACCOUNT.UPDATE_WEIGHT:
            return {
                ...state,
                account: {
                    ...state.account,
                    weight: action.weight
                }
            }
        case ACCOUNT.SET_AVATAR:
            return {
                ...state,
                account: {
                    ...state.account,
                    avatar_url: action.payload.file_url
                }
            }
        case ACCOUNT.SET_MESSAGES_COUNT:
            return {
                ...state,
                messages_count: action.payload

            }
        case ACCOUNT.GALLERY_IMAGE_REMOVE:
            const itemIndex = state.account.images.findIndex(({image_id}) => image_id === action.payload);
            console.log(action.payload, itemIndex)
            return {
                ...state,
                account: {
                    ...state.account,
                    images: [
                        ...state.account.images.slice(0, itemIndex),
                        ...state.account.images.slice(itemIndex + 1)
                    ]
                }
            }
        case ACCOUNT.GALLERY_IMAGE_ADD:
            return {
                ...state,
                account: {
                    ...state.account,
                    images: [
                        ...state.account.images,
                        action.payload
                    ]
                }
            }
        default: return state
    }
}
export default appReducer