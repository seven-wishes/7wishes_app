import React from 'react';
import {NavLink} from "react-router-dom";

const FooterMenu = (props) => {
    return (
        <div className="footer__menu">
            <ul className="footer__menu-list">
                <li className="footer__menu-item"><NavLink className="footer__menu-link" to="/policy">Политика приватности</NavLink></li>
                <li className="footer__menu-item"><NavLink className="footer__menu-link" to="/info">Реквизиты</NavLink></li>
            </ul>
        </div>
    )
};

export default FooterMenu;