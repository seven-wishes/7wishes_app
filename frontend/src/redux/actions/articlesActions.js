import {articlesAPI} from "../../api/api";
import {ARTICLES} from "../actionTypes";
import { alert_message } from "./appActions";

export function set_articles (articles) {
    return {
        type: ARTICLES.SET_ARTICLES,
        payload: {
            articles
        }
    }
}

export function create_article (article) {
    return {
        type: ARTICLES.CREATE_ARTICLE,
        payload: {
            article
        }
    }
}

export function answer_article (article) {
    return {
        type: ARTICLES.ANSWER_ARTICLE,
        payload: {
            article
        }
    }
}

export const getArticles = () => (dispatch) => {
    articlesAPI.getArticles()
        .then(res => {
            if (res.data.result === 0) {
                return dispatch(set_articles(res.data.articles));
            }
        })
        .catch(e => {
            console.log(e);
        })
}

export const createArticle = (text) => (dispatch) => {
    articlesAPI.createArticle(text)
        .then(res => {
            if (res.data.result !== 0) {
                dispatch(alert_message(res.data.message));
            }

            console.log(res.data.article)
            dispatch(create_article(res.data.article))
            console.log(res)
        })
        .catch(e => {
            console.log(e);
        })
}

export const answerArticle = (text, account_id) => (dispatch) => {
    articlesAPI.answerArticle(text, account_id)
        .then(res => {
            if (res.data.result !== 0) {
                return dispatch(alert_message("Что-то пошло не так"))
            }
            dispatch(alert_message(res.data.message))
        })
        .catch(e => {
            console.log(e);
        })
}