import React from 'react';
import {NavLink} from "react-router-dom";

const Main = (props) => {
    return (
        <div className="main">
            <div className="wrap">
                <div className="main__wrap">
                    <div className="main__content">
                        <h1 className="main__title">Клуб по улучшению качества жизни людей</h1>
                        <p className="main__text">Это не сайт знакомств! КЛУБ – это то место, где Вы найдете ответы на вопросы, которые боитесь задать вслух. Кем стать, получить статус Silver, Gold или VIP, здесь решаешь только ТЫ!</p>
                        <div className="main__actions">
                            <div className="main__action">
                                <NavLink className="main__action-button" to="/register">Вступить в клуб</NavLink>
                            </div>
                            <div className="main__action">
                                <NavLink className="main__action-button main__action-button--transparent" to="/users">Смотреть анкеты</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Main;