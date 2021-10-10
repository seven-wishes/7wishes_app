import React from 'react';
import {Field, reduxForm} from "redux-form";
import Textarea from "../redux-form/Textarea";

const MessagePopupForm = (props) => {
    return (
        <div className="message-popup">
            <div className="message-popup__wrap">
                <div className="message-popup__title">Новое сообщение</div>
                <form className="message-popup__content" onSubmit={props.handleSubmit}>
                    <Field className="message-popup__textarea" name="message_text" component={Textarea} label="Сообщение" />
                    <div className="message-popup__actions">
                        <button className="message-popup__action" type="submit">Отправить сообщение</button>
                    </div>
                </form>
            </div>
            <div className="message-popup__overlay" onClick={() => props.message_popup(false)} />
        </div>
    );
};

const MessagePopupFormReduxForm = reduxForm({
    form: 'message'
})(MessagePopupForm)

const MessagePopup = (props) => {
    const onSubmit = (formData) => {
        props.message_popup(false);
        props.createMessage(props.dialog_id, formData.message_text);
    }

    return <MessagePopupFormReduxForm message_popup={props.message_popup} onSubmit={onSubmit} />
}

export default MessagePopup;
