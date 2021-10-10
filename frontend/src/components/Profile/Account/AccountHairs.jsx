import React from 'react';

const AccountHairs = (props) => {
    const onValueChange = (e) => {
        props.update(e.currentTarget.value);
    }

    const HairColorOption = (props) => {
        return (
            <option defaultValue={props.selected} value={props.id}>{props.hair_color}</option>
        );
    };
    const hairColorList = (
        props.hair_colors.map(c => {
            if (props.hair_color_id !== c.id && c.id !== 1) {
                return (
                    <HairColorOption key={c.id} hair_color={props.gender_id === 0 ? c.hair_color_woman : c.hair_color_title} id={c.id} />
                )
            }
            return true;
        })
    );
    return (
        <>
            <label htmlFor="" className="account__section-label">Мой цвет волос</label>
            <select className="account__section-select" onChange={onValueChange}>
                {props.hair_color_title ? <option defaultValue={true} value="">{props.hair_color_title}</option> : <option defaultValue={true} value="">Выберите свой цвет волос</option>}
                {props.hair_color_title ? <option disabled value="">Выберите свой цвет волос</option> : null}
                {hairColorList}
            </select>
        </>
    );
};

export default AccountHairs;