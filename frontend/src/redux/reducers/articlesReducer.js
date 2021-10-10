import {ARTICLES} from "../actionTypes";

const initialState = {
    articles: [],
}
function articlesReducer (state = initialState, action) {
    switch(action.type) {
        case ARTICLES.SET_ARTICLES:
            return {
                ...state,
                articles: action.payload.articles
            }
        case ARTICLES.CREATE_ARTICLE:
            return {
                ...state,
                articles: [action.payload.article].concat(state.articles)
            }
        default: return state
    }
}
export default articlesReducer