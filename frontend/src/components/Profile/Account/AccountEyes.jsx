import React from 'react';

const AccountEyes = (props) => {
    const onValueChange = (e) => {
        props.update(e.currentTarget.value);
    }

    const EyeColorOption = (props) => {
        return (
            <option defaultValue={props.selected} value={props.id}>{props.eye_color}</option>
        );
    };
    const eyeColorList = (
        props.eye_colors.map(c => {
            if (props.eye_color_id !== c.id && c.id !== 1) {
                return (
                    <EyeColorOption key={c.id} eye_color={c.eye_color_title} id={c.id} />
                )
            }
            return true;
        })
    );
    return (
        <>
            <label htmlFor="" className="account__section-label">Мой цвет глаз</label>
            <select className="account__section-select" onChange={onValueChange}>
                {props.eye_color_title ? <option defaultValue={true} value="">{props.eye_color_title}</option> : <option defaultValue={true} value="">Выберите свой цвет глаз</option>}
                {props.eye_color_title ? <option disabled value="">Выберите свой цвет глаз</option> : null}
                {eyeColorList}
            </select>
        </>
    );
};

export default AccountEyes;