import React from 'react';
import {Field, reduxForm} from "redux-form";
import Textarea from "../redux-form/Textarea";

const DialogFormForm = (props) => {
    return (
        <form className="messages__answer" onSubmit={props.handleSubmit}>
            <div className="messages__answer-row">
                <Field className="messages__answer-textarea" name="message_text" component={Textarea} label="" />
            </div>
            <div className="messages__answer-actions">
                <button className="messages__answer-submit" type="submit">Отправить</button>
            </div>
        </form>
    );
};

const DialogFormReduxForm = reduxForm({
    form: 'message'
})(DialogFormForm)

const DialogForm = (props) => {
    const onSubmit = (formData) => {
        console.log(props);
        props.createMessage(props.dialog_id, formData.message_text);
    }

    return <DialogFormReduxForm message_popup={props.message_popup} onSubmit={onSubmit} />
}

export default DialogForm;
