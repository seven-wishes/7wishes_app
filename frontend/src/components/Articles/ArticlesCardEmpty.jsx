import React from "react";
import empty from "../../assets/images/user.svg";

const ArticlesCardEmpty = () => {
    return (
        <div className="articles__item articles__item--center">
            <figure className="articles__item-image">
                <picture>
                    <img src={empty} alt=""/>
                </picture>
            </figure>
            <div className="articles__item-info">
                <div className="articles__item-title">Уже скоро</div>
                <div className="articles__item-text">В этом разделе появятся публикации от наших пользователей</div>
            </div>
        </div>
    )
};

export default ArticlesCardEmpty;