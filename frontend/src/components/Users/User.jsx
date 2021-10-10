import React from 'react';
import no_image from '../../assets/images/user.svg';
import MessagePopup from "../Messages/MessagePopup";

const User = (props) => {
    console.log(props)
    const {user} = props;
    const isMan = props.user.gender_id === 1;
    const userImage = props.user.avatar !== undefined || user.avatar_url ? user.avatar_url : no_image;

    const zoom = props.zoom ? 'active' : '';
    const onZoomHandler = () => {
        if (props.zoom) {
            props.zoom_image(false);
        } else {
            props.zoom_image(true);
        }
    }

    const onPopupHandler = () => {
        if (props.user_id === user.user_id) {
            return props.alert_message("Вы не можете писать себе")
        }
        if (props.gender_id === user.gender_id && props.plan_id < 4) {
            const gender = user.gender_id === 0 ? "женщине" : "мужчине"
            return props.alert_message(`Вы не можете писать ${gender}. Эта возможность откроется только на тарифе VIP.`)
        }
        if (!props.dialog_exists) {
            props.createDialog(user.user_id)
        }
        return props.message_popup_active ? props.message_popup(false) : props.message_popup(true);
    }

    const onAccessHandler = () => {
        props.access_show();
    }

    return (
        <div className="user">
            <div className="wrap">
                <div className="user__wrap">
                    <div className="user__image">
                        <figure className={`user__image-figure image-zoom ${zoom}`} onClick={onZoomHandler}>
                            <picture>
                                <img src={`//7-wishes.ru${userImage}`} alt=""/>
                            </picture>
                        </figure>
                    </div>
                    <div className="user__content">
                        <div className="user__head">
                            <div className="user__city">{user.city_title}</div>
                            <div className="user__nickname">{user.nickname} {user.age && ` - ${user.age}`}</div>
                            {user.account_is_online && !user.is_invisible ? <div className="user__online">Онлайн</div> : null}
                            <div className="user__actions">
                                {props.auth && props.plan_id > 1 || props.auth && props.demo
                                    ? <button className="user__action" onClick={onPopupHandler}>Отправить сообщение</button>
                                    : <div className="user__action" onClick={onAccessHandler}>Отправить сообщение</div>
                                }
                            </div>
                        </div>
                        <div className="user__about">
                            <div className="user__about-title">Обо мне</div>
                            <div className="user__description">{user.description}</div>
                        </div>
                        <div className="user__params">
                            <div className="user__params-block">
                                <div className="user__params-title">Информация</div>
                                <div className="user__props">
                                    <div className="user__prop">
                                        <div className="user__prop-name">Рост:</div>
                                        <div className="user__prop-value">{user.height}</div>
                                    </div>
                                    <div className="user__prop">
                                        <div className="user__prop-name">Цвет глаз:</div>
                                        <div className="user__prop-value">{user.eye_color_title}</div>
                                    </div>
                                    <div className="user__prop">
                                        <div className="user__prop-name">Вес:</div>
                                        <div className="user__prop-value">{user.weight}</div>
                                    </div>
                                    <div className="user__prop">
                                        <div className="user__prop-name">Цвет волос:</div>
                                        <div className="user__prop-value">{user.gender_id === 0 ? user.hair_color_woman : user.hair_color_title}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="user__params-block">
                                <div className="user__params-title">Цели знакомства</div>
                                <div className="user__props">
                                    <div className="user__goals">
                                        {props.user.spouse ? <div className="user__goal">{isMan ? "Муж" : "Жена"}</div> : null}
                                        {props.user.paramour ? <div className="user__goal">{isMan ? "Любовник" : "Любовница"}</div> : null}
                                        {props.user.performer ? <div className="user__goal">{isMan ? "Исполнитель желаний" : "Исполнительница желаний"}</div> : null}
                                        {props.user.mlfa ? <div className="user__goal">{isMan ? "Ищу опытную женщину" : "Опытная женщина"}</div> : null}
                                        {props.user.assistant ? <div className="user__goal">{isMan ? "Ищу помощницу по бизнесу" : "Помощница по бизнесу"}</div> : null}
                                        {props.user.housemaid ? <div className="user__goal">{isMan ? "Ищу домработницу" : "Домработница"}</div> : null}
                                        {props.user.friend ? <div className="user__goal">{isMan ? "Друг" : "Подруга"}</div> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {props.message_popup_active ? <MessagePopup dialog_id={props.dialog_id} user_id={user.user_id} message_popup_active={props.message_popup_active} message_popup={props.message_popup} createMessage={props.createMessage} onPopupHandler={onPopupHandler} /> : null}
        </div>
    );
};

export default User;