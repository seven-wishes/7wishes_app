import React from 'react';
import {NavLink} from "react-router-dom";

const Menu = (props) => {
    const active = props.mobile_menu ? "active" : "";

    const onHideHandler = () => {
        props.hide_menu_mobile();
    }

    const onLogoutHandler = () => {
        props.logout();
        props.hide_menu_mobile();
    }

    const isAuthActions = (
        <>
            <div className="menu__personal-item">
                <NavLink to="/profile" className="menu__personal-link" onClick={onHideHandler}>Личный кабинет</NavLink>
            </div>
            <div className="menu__personal-item">
                <button type="button" className="menu__personal-logout" onClick={onLogoutHandler}>Выход</button>
            </div>
        </>
    );

    const withoutAuthActions = (
        <>
            <div className="menu__personal-item">
                <NavLink to="/login" className="menu__personal-link" onClick={onHideHandler}>Вход</NavLink>
            </div>
            <div className="menu__personal-item">
                <NavLink to="/register" className="menu__personal-link" onClick={onHideHandler}>Регистрация</NavLink>
            </div>
        </>
    );
    return (
        <div className={`menu ${active}`}>
            <div className="menu__wrap">
                <div className="menu__head">
                    <div className="menu__logo">
                        <NavLink to="/" className="header__logo">
                            <div className="header__logo-name">7 желаний</div>
                            <div className="header__logo-description">Сервис выгодных знакомств</div>
                        </NavLink>
                    </div>
                    <div className="menu__close">
                        <div className="header__toggle">
                            <button type="button" className="header__toggle-button" onClick={onHideHandler}>Закрыть</button>
                        </div>
                    </div>
                </div>
                <div className="menu__content">
                    <div className="menu__list">
                        <div className="menu__list-item">
                            <NavLink to="/users" className="menu__list-link" onClick={onHideHandler}>Список анкет</NavLink>
                        </div>
                        <div className="menu__list-item">
                            <NavLink to="/plans" className="menu__list-link" onClick={onHideHandler}>Тарифы</NavLink>
                        </div>
                        <div className="menu__list-item">
                            <NavLink to="/about" className="menu__list-link" onClick={onHideHandler}>О клубе</NavLink>
                        </div>
                        <div className="menu__list-item">
                            <NavLink to="/articles" className="menu__list-link" onClick={onHideHandler}>Публикации</NavLink>
                        </div>
                    </div>
                </div>
                <div className="menu__personal">
                    <div className="menu__personal-list">
                        {!props.auth ? withoutAuthActions : isAuthActions}
                    </div>
                </div>
                <div className="menu__alt">
                    <div className="menu__alt-list">
                        <div className="menu__alt-item">
                            <NavLink to="/policy" className="menu__alt-link" onClick={onHideHandler}>Политика приватности</NavLink>
                        </div>
                        <div className="menu__alt-item">
                            <NavLink to="/info" className="menu__alt-link" onClick={onHideHandler}>Реквизиты</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;