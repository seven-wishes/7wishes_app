import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderMenu = (props) => {
    return (
        <nav className="header__menu">
            <ul className="header__menu-list">
                <li className="header__menu-item"><NavLink className="header__menu-link" to="/users">Список анкет</NavLink></li>
                <li className="header__menu-item"><NavLink className="header__menu-link" to="/plans">Тарифы</NavLink></li>
                <li className="header__menu-item"><NavLink className="header__menu-link" to="/about">О клубе</NavLink></li>
                <li className="header__menu-item"><NavLink className="header__menu-link" to="/articles">Публикации</NavLink></li>
            </ul>
        </nav>
    )
};

export default HeaderMenu;