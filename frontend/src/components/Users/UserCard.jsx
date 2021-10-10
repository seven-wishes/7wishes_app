import React from 'react';
import user from "../../assets/images/user.svg";
import {NavLink} from "react-router-dom";

const UserCard = (props) => {
    const userImage = props.avatar_url ? props.avatar_url : user;
    console.log(props.plan_id)
    const plan_id = props.plan_id || 0
    const status = plan_id.toString() === "2" ? "silver" : plan_id.toString() === "3" ? "gold" : plan_id.toString() === "4" ? "vip" : ""

    const onAccessHandler = () => {
        props.access_show()
    }

    const cardWithAuth = (
        <div className="users__card">
            <NavLink to={`/user/${props.user_id}`} className="users__card-link">
                <figure className="users__card-figure">
                    <picture>
                        <img src={`http://7-wishes.ru${userImage}`} alt="" />
                    </picture>
                </figure>
            </NavLink>
            <div className="users__card-info">
                <div className="users__card-name"><NavLink to={`/user/${props.user_id}`} className="users__card-link">{props.nickname}</NavLink></div>
                <div className="users__card-city">{props.city_id !== 1 ? props.city_title : ''} {props.age && `- ${props.age}`}</div>
            </div>
            {props.account_is_online && !props.is_invisible ? <div className="users__card-online" /> : null}
            {status !== "1" && (new Date(props.plan_active_to) > Date.now()) && <div className={`users__card-status ${status}`}>{status}</div>}
        </div>
    );

    const cardWithoutAuth = (
        <div className="users__card" onClick={onAccessHandler}>
            <div className="users__card-link">
                <figure className="users__card-figure">
                    <picture>
                        <img src={`http://7-wishes.ru${userImage}`} alt="" />
                    </picture>
                </figure>
            </div>
            <div className="users__card-info">
                <div className="users__card-name"><div className="users__card-link">{props.nickname}</div></div>
                <div className="users__card-city">{props.city_id !== 1 ? props.city_title : ''} {props.age && `- ${props.age}`}</div>
            </div>
            {props.account_is_online && !props.is_invisible ? <div className="users__card-online" /> : null}
            {status !== "1" && (new Date(props.plan_active_to) > Date.now()) && <div className={`users__card-status ${status}`}>{status}</div>}
        </div>
    )

    return (
        <>
            {props.auth && props.plan_id > 1 || props.auth && props.demo ? cardWithAuth : cardWithoutAuth}
        </>
    );
};

export default UserCard;