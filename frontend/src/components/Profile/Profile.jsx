import React from 'react';

import NewAccountBlock from "./Account/NewAccountBlock";
import SettingsBlock from "./Account/SettingsBlock";
import AccountBlock from "./Account/AccountBlock";
import MessagesBlock from "./Account/MessagesBlock";
import {NavLink} from "react-router-dom";
import { paymentUpInit } from "../../redux/actions/paymentActions";

const Profile = (props) => {
    const onTabSelector = (e) => {
        const tab = e.currentTarget.dataset.tab;
        props.profile_tab_selector(tab);
    }

    const onActivateHandler = () => {
        props.activateAccount(props.user_id);
    }
    const onDeactivateHandler = () => {
        props.deactivateAccount(props.user_id);
    }

    const onActivateInvisible = () => {
        props.setInvisible(true);
    }
    const onDeactivateInvisible = () => {
        props.setInvisible(false);
    }

    const amount = 200;
    const onPayHandler = (e) => {
        props.paymentUpInit(props.user_id, amount, props.plan_id);
    }

    return (
        <div className="profile">
            <div className="wrap">
                <div className="profile__wrap">
                    <div className="profile__aside">
                        <div className="profile__aside-block">
                            <div className="profile__tabs">
                                <div className="profile__tabs-item" data-tab="account" onClick={onTabSelector}>Мой профиль</div>
                                <NavLink to="/messages" className="profile__tabs-item">Мои сообщения</NavLink>
                                {props.accountExists ? <div className="profile__tabs-item" data-tab="settings" onClick={onTabSelector}>Настройки</div> : null}
                            </div>
                        </div>
                        {props.accountExists ?
                        <div className="profile__aside-block">
                            <div className="profile__plans">
                                <div className="profile__plans-title">Мой тариф</div>
                                <div className="profile__plans-name">{props.plan_title}</div>
                                <div className="profile__messages-actions">
                                    <NavLink to="/plans" className="profile__messages-action">Сменить тариф</NavLink>
                                    <button className="profile__messages-action profile__messages-action--transparent" onClick={onPayHandler}>Поднять страницу</button>
                                </div>
                            </div>
                        </div> : null}
                        {props.accountExists ?
                        <div className="profile__aside-block">
                            <div className="profile__release">
                                <div className="profile__release-text">
                                    {props.account_is_active ? "Анкета опубликована" : "Анкета не опубликована"}
                                </div>
                                <div className="profile__release-actions">
                                    {props.account_is_active ? <button className="profile__release-action profile__release-action--deactivate" onClick={onDeactivateHandler}>Снять с публикации</button> : <button className="profile__release-action" onClick={onActivateHandler}>Опубликовать</button>}
                                </div>
                            </div>
                        </div> : null}
                        {props.accountExists ?
                            <div className="profile__aside-block">
                                <div className="profile__release">
                                    <div className="profile__release-text">Режим невидимка</div>
                                    <div className="profile__release-actions">
                                        {props.is_invisible ? <button className="profile__release-action" onClick={onDeactivateInvisible}>Включен</button> : <button className="profile__release-action profile__release-action--deactivate" onClick={onActivateInvisible}>Выключен</button>}
                                    </div>
                                </div>
                            </div> : null}
                    </div>
                    <div className="profile__section">
                        {!props.accountExists
                            ? <NewAccountBlock createAccount={props.createAccount}
                                               getMyAccount={props.getMyAccount}
                                               gender_id={props.gender_id}
                                               user_id={props.user_id}
                                               />
                            : <AccountBlock account={props.account}
                                            cities={props.cities}
                                            eye_colors={props.eye_colors}
                                            hair_colors={props.hair_colors}
                                            goals={props.goals}
                                            profile_tab={props.profile_tab}
                                            deleteGalleryItem={props.deleteGalleryItem}
                                            updateAccount={props.updateAccount}
                                            updateCity={props.updateCity}
                                            updateAge={props.updateAge}
                                            updateNickname={props.updateNickname}
                                            updateDescription={props.updateDescription}
                                            updateHeight={props.updateHeight}
                                            updateWeight={props.updateWeight}
                                            updateEyeColor={props.updateEyeColor}
                                            updateHairColor={props.updateHairColor}
                                            updateGoal={props.updateGoal}
                                            uploadPhoto={props.uploadPhoto}
                                            uploadGallery={props.uploadGallery}
                                            zoom_image={props.zoom_image}
                                            zoom={props.zoom}
                                            />}
                        <MessagesBlock profile_tab={props.profile_tab} />
                        <SettingsBlock profile_tab={props.profile_tab} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;