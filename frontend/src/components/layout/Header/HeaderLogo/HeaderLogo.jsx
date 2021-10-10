import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderLogo = (props) => {
    return (
        <NavLink to="/" className="header__logo">
            <div className="header__logo-name">7 желаний</div>
            <div className="header__logo-description">Сервис выгодных знакомств</div>
        </NavLink>
    )
};

export default HeaderLogo;