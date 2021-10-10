import React  from 'react';

const UserFilter = (props) => {
    const onGoalChange = (e) => {
        const filter_id = e.currentTarget.id
        props.changeFilter("goal", filter_id, e.currentTarget.checked)
    }

    const onAgeChange = (e) => {
        const filter_id = e.currentTarget.id
        props.changeFilter("age", filter_id, e.currentTarget.checked)
    }

    const onHeightChange = (e) => {
        const filter_id = e.currentTarget.id
        props.changeFilter("height", filter_id, e.currentTarget.checked)
    }

    const onWeightChange = (e) => {
        const filter_id = e.currentTarget.id
        props.changeFilter("weight", filter_id, e.currentTarget.checked)
    }

    const onFilterHandler = () => {
        props.setFilter(props.gender_id, props.filters)
    }

    return (
        <form className="users__filters">
            <div className="users__filter">
                <div className="users__filter-title">Цели знакомства</div>
                <div className="users__filter-checks">
                    {props.filters.goals.map(item => {
                        return (
                            <div className="users__filter-check">
                                <input id={item.id} type="checkbox" name="filter_age" className="users__filter-check" onChange={onGoalChange} checked={item.active} />
                                <label htmlFor={item.id}>{!!props.gender_id ? item.title_man : item.title_woman}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="users__filter">
                <div className="users__filter-title">Возраст</div>
                <div className="users__filter-checks">
                    {props.filters.age.map(item => {
                        return (
                            <div className="users__filter-check">
                                <input id={item.id} type="checkbox" name="filter_age" className="users__filter-check" onChange={onAgeChange} checked={item.active} />
                                <label htmlFor={item.id}>{item.title}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="users__filter">
                <div className="users__filter-title">Рост</div>
                <div className="users__filter-checks">
                    {props.filters.height.map(item => {
                        return (
                            <div className="users__filter-check">
                                <input id={item.id} type="checkbox" name="filter_height" className="users__filter-check" onChange={onHeightChange} checked={item.active} />
                                <label htmlFor={item.id}>{item.title}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="users__filter">
                <div className="users__filter-title">Вес</div>
                <div className="users__filter-checks">
                    {props.filters.weight.map(item => {
                        return (
                            <div className="users__filter-check">
                                <input id={item.id} type="checkbox" name="filter_weight" className="users__filter-check" onChange={onWeightChange} checked={item.active} />
                                <label htmlFor={item.id}>{item.title}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="users__filter-actions">
                <button className="users__filter-submit" type="button" onClick={onFilterHandler}>Применить фильтр</button>
            </div>
        </form>
    );
};

export default UserFilter;