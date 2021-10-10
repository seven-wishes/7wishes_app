import React from 'react';
import {NavLink} from "react-router-dom";

import user from "../../../../assets/icons/login.svg";
import envelope from "../../../../assets/icons/envelope.svg";

const HeaderActions = (props) => {
    const userLinks = (
        <div className="header__user-action">
            <NavLink to="/messages" className="header__user-link">
                <div className="header__user-login">
                    <figure className="header__user-icon">
                        <picture>
                            <img src={envelope} alt="" className="image" />
                            <span>{props.messages_count}</span>
                        </picture>
                    </figure>
                </div>
            </NavLink>
            <NavLink to="/profile" className="header__user-link">
                <div className="header__user-login">
                    <figure className="header__user-icon">
                        <picture><img src={user} alt="" className="image" /></picture>
                    </figure>
                    <span className="header__user-info">Личный кабинет</span>
                </div>
            </NavLink>
            <button className="header__user-logout" onClick={() => props.logout()}>Выйти</button>
        </div>
    );

    const incognitoLinks = (
        <NavLink to="/login" className="header__user-link">
            <div className="header__user-login">
                <figure className="header__user-icon">
                    <picture><img src={user} alt="" className="image" /></picture>
                </figure>
                <span className="header__user-info">Войти</span>
            </div>
        </NavLink>
    );

    return (
        <div className="header__actions">
            <div className="header__action">
                <div className="header__user">
                    {props.auth ? userLinks : incognitoLinks}
                </div>
            </div>
            <div className="header__toggle">
                <button type="button" className="header__toggle-button" onClick={() => props.show_menu_mobile()}>Меню</button>
            </div>
        </div>
    )
};

export default HeaderActions;