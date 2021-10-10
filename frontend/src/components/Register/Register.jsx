import React from 'react';
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {email, passwordNew} from "../../utilities/validators";

import Input from "../redux-form/Input";

const RegisterForm = (props) => {
    return (
        <div className="login login--register">
            <div className="wrap">
                <div className="login__wrap">
                    <div className="login__content">
                        <form className="login__form" onSubmit={props.handleSubmit}>
                            <h1 className="login__content-title">Регистрация</h1>
                            <div className="form__row">
                                <Field name="email" type="email" component={Input} label="Электронная почта" validate={[email]} />
                            </div>
                            <div className="form__row">
                                <Field name="password" type="password" component={Input} label="Пароль" validate={[passwordNew]} />
                            </div>
                            <div className="form__row">
                                <h3 className="form__row-title">Выберите ваш пол</h3>
                                <div className="form__row-checks">
                                    <div className="form__row-check">
                                        <input id="gender_man" name="gender" type="radio" value="1" />
                                        <label htmlFor="gender_man">Мужской</label>
                                    </div>
                                    <div className="form__row-check">
                                        <input id="gender_woman" name="gender" type="radio" value="0" />
                                        <label htmlFor="gender_woman">Женский</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form__actions">
                                <div className="form__action">
                                    <button className="form__submit">Зарегистрироваться</button>
                                </div>
                                <div className="form__action">
                                    <NavLink className="form__link" to="/login">Войти на сайт</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegisterReduxForm = reduxForm({
    form: 'register'
})(RegisterForm)

const Register = (props) => {
    const onSubmit = (formData) => {
        const genderInput = document.querySelector('input[name="gender"]:checked');
        if (genderInput == null) {
            props.alert_message('Выберите свой пол')
        } else {
            props.createUser(formData.email, formData.password, genderInput.value);
        }
    }

    return <RegisterReduxForm onSubmit={onSubmit} />
}

export default Register;
