import React, {useState} from 'react';

const AccountAge = (props) => {
    const [edit, setEdit] = useState(false);
    const [age, setAge] = useState(props.value);

    const activateEdit = () => {
        setEdit(true);
        setAge(props.value);
    }
    const deactivateEdit = () => {
        setEdit(false);
        setAge(age);
        if(age !== props.value) {
            props.update(age);
        }
    }

    const onValueChange = (e) => {
        setAge(e.currentTarget.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            deactivateEdit();
        }
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const ageValue2 = new Date(age)

    const textBlock = (
        <span className="account__section-input account__section-input--block" onClick={activateEdit}>{age ? ageValue2.toLocaleString("ru", options) : null}</span>
    )
    const inputBlock = (
        <input autoFocus={true}
               className="account__section-input"
               id="account_age"
               name="account_age"
               onChange={onValueChange}
               onBlur={deactivateEdit}
               onKeyPress={handleKeyPress}
               type="date"
               value={age}
        />
    )

    return (
        <div>
            <label htmlFor="account_age" className="account__section-label">{props.label}</label>
            {edit ? inputBlock : textBlock}
        </div>
    );
};

export default AccountAge;