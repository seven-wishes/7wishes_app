import React from "react";
import ArticlesCard from "./ArticlesCard";
import ArticlesCardEmpty from "./ArticlesCardEmpty";
import { NavLink } from "react-router-dom";

const Articles = ({articles, auth, answerArticle, alert_message}) => {
    const articlesList = articles.map((article, index) => {
        return <ArticlesCard auth={auth.auth} key={index} article={article} answerArticle={answerArticle} alert_message={alert_message}/>
    })

    return (
        <div className="articles">
            <div className="wrap">
                <h1 className="info__pagetitle">Публикации от пользователей</h1>
                {auth.auth && <div className="articles__actions"><NavLink to="/articles/new" className="articles__actions-new">Добавить публикацию</NavLink></div>}
                <div className="articles__list">
                    {articles.length !== 0 ? articlesList : <ArticlesCardEmpty />}
                </div>
            </div>
        </div>
    )
};

export default Articles;