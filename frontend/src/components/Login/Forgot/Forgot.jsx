import React from "react";
import {Field, reduxForm} from "redux-form";
import Input from "../../redux-form/Input";
import {email} from "../../../utilities/validators";

const ForgotForm = (props) => {
    return (
        <form className="login__form" onSubmit={props.handleSubmit}>
            <h1 className="login__content-title">Забыли пароль?</h1>
            <div className="form__row">
                <Field name="email" id="email_forgot" type="email" component={Input} label="Электронная почта" validate={[email]} />
                <p className="form__comment">Введите свою электронную почту, мы вышлем новый пароль.</p>
            </div>
            <div className="form__actions">
                <div className="form__action">
                    <button className="form__submit">Восстановить пароль</button>
                </div>
                <div className="form__action">
                    <div className="form__link" onClick={() => props.forgot_password(false)}>Войти на сайт</div>
                </div>
            </div>
        </form>
    )
};

const ForgotReduxForm = reduxForm({
    form: 'forgot',
})(ForgotForm)

const Forgot = (props) => {
    const onSubmit = (formData) => {
        props.forgotPassword(formData.email);
    }

    return <ForgotReduxForm onSubmit={onSubmit} forgot_password={props.forgot_password} forgotPassword={props.forgotPassword} />
}

export default Forgot;