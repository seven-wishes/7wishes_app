import React from 'react';
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import Input from "../redux-form/Input";
import {email, passwordCheck} from "../../utilities/validators";
import Forgot from "./Forgot/Forgot";

const LoginForm = (props) => {
    return (
        <div className="login">
            <div className="wrap">
                <div className="login__wrap">
                    <div className="login__content">
                        {props.is_forgot_password ? <Forgot forgot_password={props.forgot_password} forgotPassword={props.forgotPassword} /> :
                            <form className="login__form" onSubmit={props.handleSubmit}>
                                <h1 className="login__content-title">Вход на сайт</h1>
                                <div className="form__row">
                                    <Field name="email" type="email" component={Input} label="Электронная почта"
                                           validate={[email]}/>
                                </div>
                                <div className="form__row">
                                    <Field name="password" type="password" component={Input} label="Пароль"
                                           validate={[passwordCheck]}/>
                                </div>
                                <div className="form__actions">
                                    <div className="form__action">
                                        <button className="form__submit">Войти на сайт</button>
                                        <div className="form__alt">
                                            <button type="button" className="form__alt-button" onClick={() => props.forgot_password(true)}>Забыли пароль</button>
                                        </div>
                                    </div>
                                    <div className="form__action">
                                        <NavLink className="form__link" to="/register">Зарегистрироваться</NavLink>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }

    return <LoginReduxForm onSubmit={onSubmit} is_forgot_password={props.is_forgot_password} forgot_password={props.forgot_password} forgotPassword={props.forgotPassword} />
}

export default Login;
