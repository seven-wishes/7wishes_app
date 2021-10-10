import React from 'react';
import star from '../../assets/icons/star.svg'
import Payment from "./Payment";

const PlansUnAuth = (props) => {

    const PlanItem = (props) => {
        console.log('paln',props)
        const values = (
            props.values.map((v) => {
                return <div className="plan__list-item">{v.text}</div>
            })
        )
        const amount = props.gender_id === 1 ? props.price_man : props.price_woman;
        const onClickHandler = (e) => {
            props.paymentInit(props.user_id, amount, props.plan_id, props.plan_title);
        }
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
                        <div className="plan__price-value">{amount}</div>
                        <div className="plan__price-comment">/ в месяц</div>
                    </div>
                </div>
                <div className="plan__body">
                    <div className="plan__list">
                        {values}
                    </div>
                </div>
                <div className="plan__actions">
                    <button className="plan__action" onClick={onClickHandler}>Выбрать тариф</button>
                </div>
            </div>
        )
    }

    const plansList = (
        props.plans.map((p, index) => {
            return <PlanItem key={p.id}
                             user_id={props.user_id}
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
                        <div className="plans__info-title">Женщины / Мужчины</div>
                    </div>
                    <div className="plans__list">
                        {plansList}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansUnAuth;