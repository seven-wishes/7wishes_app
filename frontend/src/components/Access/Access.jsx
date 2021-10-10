import React from 'react';
import {NavLink} from "react-router-dom";

const Access = (props) => {
    console.log(props)
    const demo_amount = 80;
    const active = props.access_visible ? "active" : "";

    const onDemoHandler = () => {
        props.paymentInit(props.user_id, demo_amount, props.plan_id, props.plan_title);
    }

    return (
        <div className={`access ${active}`}>
            <div className="access__wrap">
                <div className="access__content">
                    <div className="access__title">Доступ закрыт</div>
                    <div className="access__text">Только пользователи с тарифом SILVER и выше могут просматривать анкеты пользоватей.</div>
                    <div className="access__actions">
                        <NavLink to="/plans" className="access__action" onClick={() => props.access_hide()}>Получить доступ</NavLink>
                        {props.auth.gender_id === 1 && props.auth.plan_id === 1
                            ? <div className="access__link">
                                <div onClick={onDemoHandler} className="access__link-action">Получить демо доступ за 80 руб.</div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="access__overlay" onClick={() => props.access_hide()} />
        </div>
    );
};

export default Access;