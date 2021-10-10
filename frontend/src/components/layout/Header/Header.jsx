import React from 'react';

import HeaderMenu from "./HeaderMenu/HeaderMenu";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderActions from "./HeaderActions/HeaderActions";

const Header = (props) => {
    return (
        <div className="header">
            <div className="wrap">
                <div className="header__wrap">
                    <HeaderLogo />
                    <HeaderMenu />
                    <HeaderActions auth={props.auth} messages_count={props.messages_count} logout={props.logout} show_menu_mobile={props.show_menu_mobile} />
                </div>
            </div>
        </div>
    )
};

export default Header;