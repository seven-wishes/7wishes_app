import React from 'react';
import user from "../../../assets/images/user.svg";

const AccountAvatar = (props) => {
    const userImage = props.avatar_url ? props.avatar_url : user;

    const onFileSelected = (e) => {
        if(e.target.files[0]) {
            props.uploadPhoto(e.target.files[0])
        }
    }

    const zoom = props.zoom ? 'active' : '';
    const onZoomHandler = () => {
        if (props.zoom) {
            props.zoom_image(false);
        } else {
            props.zoom_image(true);
        }
    }

    return (
        <div className="account__images">
            <figure className={`account__image image-zoom ${zoom}`} onClick={onZoomHandler}>
                <picture>
                    <img src={userImage} alt="" />
                </picture>
            </figure>
            <div className="account__images-actions">
                <div className="account__images-action">
                    <label htmlFor="account_avatar" className={`account__images-label ${props.avatar_url ? "account__images-label--change" : ""}`}>
                        {props.avatar_url ? "Изменить фото" : "Добавить фото"}
                        <input id="account_avatar" name="avatar" type="file" className="account__images-input" onChange={onFileSelected} />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AccountAvatar;