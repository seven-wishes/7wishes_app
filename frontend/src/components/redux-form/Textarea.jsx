import React from 'react';
import s from './redux-form.modules.sass';

const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.block}>
            <label htmlFor="" className={s.label}>{props.label}</label>
            <textarea className={s.input} {...input} {...props} />
            { hasError && <span className={s.error}>{meta.error}</span> }
        </div>
    )
}

export default Input