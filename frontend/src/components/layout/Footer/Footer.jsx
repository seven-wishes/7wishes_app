import React from 'react';

import FooterCopyright from "./FooterCopyright/FooterCopyright";
import FooterMenu from "./FooterMenu/FooterMenu";

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="wrap">
                <div className="footer__wrap">
                    <FooterCopyright />
                    <FooterMenu />
                </div>
            </div>
        </div>
    )
};

export default Footer;