import React, {useState} from 'react';

const AccountWeight = (props) => {
    const [edit, setEdit] = useState(false);
    const [weight, setWeight] = useState(props.value);

    const activateEdit = () => {
        setEdit(true);
        setWeight(props.value);
    }
    const deactivateEdit = () => {
        setEdit(false);
        setWeight(weight);
        if(weight !== props.value) {
            props.update(weight);
        }
    }

    const onValueChange = (e) => {
        setWeight(e.currentTarget.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            deactivateEdit();
        }
    }

    const textBlock = (
        <span className="account__section-input account__section-input--block" onClick={activateEdit}>{props.value ? props.value : ' '}</span>
    )
    const inputBlock = (
        <input autoFocus={true}
               className="account__section-input"
               id="account_weight"
               name="account_weight"
               onChange={onValueChange}
               onBlur={deactivateEdit}
               onKeyPress={handleKeyPress}
               type="text"
               value={weight} />
    )

    return (
        <div>
            <label htmlFor="account_weight" className="account__section-label">{props.label}</label>
            {edit ? inputBlock : textBlock}
        </div>
    );
};

export default AccountWeight;