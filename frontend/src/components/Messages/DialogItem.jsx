import React from 'react';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    console.log(props)
    const onDeleteHandler = () => {
        const check = window.confirm("Удалить всю переписку?");
        if (check) {
            props.deleteDialog(props.dialog_id)
        }
    }
    return (
        <div className="dialogs__item">
            <NavLink to={`/messages/${props.dialog_id}`} className={`dialogs__item-link ${props.active ? "active" : ""}`}>{props.user_nickname}</NavLink>
            <button className="dialogs__item-delete" onClick={onDeleteHandler}>Удалить переписку</button>
        </div>
    );
};

export default DialogItem;