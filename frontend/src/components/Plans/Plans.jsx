import React from 'react';
import {NavLink} from "react-router-dom";
import star from '../../assets/icons/star.svg'

const Plans = (props) => {
    const PlanItem = (props) => {
        const values = (
            props.values.map((v) => {
                return <div key={v.id} className="plan__list-item">{v.text}</div>
            })
        )
        const amount = props.gender_id === 1 ? props.price_man : props.price_woman;
        const onClickHandler = (e) => {
            props.paymentInit(props.user_id, amount, props.plan_id, props.plan_title);
        }

        console.log(props)

        return (
            <div className="plan">
                <div className="plan__head">
                    <div className="plan__title">{props.plan_title}</div>
                    <div className="plan__icon">
                        <figure className="plan__icon-figure">
                            <picture><img src={star} alt=""/></picture>
                        </figure>
                    </div>
                    <div className="plan__price">
                        <div className="plan__price-value">{amount} ₽</div>
                        <div className="plan__price-comment">/ в месяц</div>
                    </div>
                </div>
                <div className="plan__body">
                    <div className="plan__list">
                        {values}
                    </div>
                </div>
                {props.auth ?
                    <div className="plan__actions">
                        {props.user_plan_id === props.plan_id
                            ? <button className="plan__action plan__action-active">Ваш тариф</button>
                            : (props.plan_id === 2 && props.gender_id === 0) ? null : <button className="plan__action" onClick={onClickHandler}>Выбрать тариф</button>
                        }
                    </div> :
                    <div className="plan__actions">
                        <NavLink to="/register" className="plan__action">Зарегистрироваться</NavLink>
                    </div>
                }
            </div>
        )
    }

    const plansList = (
        props.plans.map((p, index) => {
            return <PlanItem key={p.id}
                             auth={props.auth}
                             user_id={props.user_id}
                             user_plan_id={props.plan_id}
                             gender_id={props.gender_id}
                             plan_id={p.id}
                             plan_title={p.plan_title}
                             price_man={p.price_man}
                             price_woman={p.price_woman}
                             values={p.values}
                             paymentInit={props.paymentInit}
            />
        })
    );

    return (
        <div className="plans">
            <div className="wrap">
                <div className="plans__wrap">
                    <div className="plans__info">
                        <div className="plans__info-title">{props.gender_id === 1 ? "Мужчинам" : props.gender_id === 0 ? "Женщинам" : "Тарифы"}</div>
                    </div>
                    <div className="plans__list">
                        <div className="plan">
                            <div className="plan__head">
                                <div className="plan__title">Демо день</div>
                                <div className="plan__icon">
                                    <figure className="plan__icon-figure">
                                        <picture><img src={star} alt=""/></picture>
                                    </figure>
                                </div>
                                <div className="plan__price">
                                    <div className="plan__price-value">80 ₽</div>
                                    <div className="plan__price-comment">24 часа</div>
                                </div>
                            </div>
                            <div className="plan__body">
                                <div className="plan__list">
                                    <div className="plan__list-item">Открывает доступ в клуб</div>
                                    <div className="plan__list-item">Возможность отправлять сообщения</div>
                                    <div className="plan__list-item">Смотреть все фото пользователей</div>
                                </div>
                            </div>
                            {props.auth ?
                                <div className="plan__actions">
                                    {props.user_plan_id === props.plan_id
                                        ? <button className="plan__action plan__action-active">Ваш тариф</button>
                                        : (props.plan_id === 2 && props.gender_id === 0) ? null : <button className="plan__action" onClick={() => props.paymentInit(props.user_id, 80, 0, "Демо день")}>Выбрать тариф</button>
                                    }
                                </div> :
                                <div className="plan__actions">
                                    <NavLink to="/register" className="plan__action">Зарегистрироваться</NavLink>
                                </div>
                            }
                        </div>
                        {plansList}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plans;