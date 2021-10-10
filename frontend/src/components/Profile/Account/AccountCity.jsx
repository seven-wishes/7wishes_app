import React from 'react';

const AccountCity = (props) => {
    const onValueChange = (e) => {
        props.update(e.currentTarget.value);
    }

    const CityOption = (props) => {
        return (
            <option defaultValue={props.selected} value={props.id}>{props.city}</option>
        );
    };
    const citiesList = (
        props.cities.map(c => {
            if (props.city_id !== c.id && c.id !== 1) {
                return (
                    <CityOption key={c.id} city={c.city_title} id={c.id} />
                )
            }
            return true;
        })
    );
    return (
        <>
            <label htmlFor="" className="account__section-label">Мой город</label>
            <select className="account__section-select" onChange={onValueChange}>
                {props.city_title ? <option defaultValue={true} value="">{props.city_title}</option> : <option defaultValue={true} value="">Выберите город из списка</option>}
                {props.city_title ? <option disabled value="">Выберите город из списка</option> : null}
                {citiesList}
            </select>
        </>
    );
};

export default AccountCity;