import React, {useState} from 'react';

const AccountHeight = (props) => {
    const [edit, setEdit] = useState(false);
    const [height, setHeight] = useState(props.value);

    const activateEdit = () => {
        setEdit(true);
        setHeight(props.value);
    }
    const deactivateEdit = () => {
        setEdit(false);
        setHeight(height);
        if(height !== props.value) {
            props.update(height);
        }
    }

    const onValueChange = (e) => {
        setHeight(e.currentTarget.value);
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
               id="account_height"
               name="account_height"
               onChange={onValueChange}
               onBlur={deactivateEdit}
               onKeyPress={handleKeyPress}
               type="text"
               value={height} />
    )

    return (
        <div>
            <label htmlFor="account_height" className="account__section-label">{props.label}</label>
            {edit ? inputBlock : textBlock}
        </div>
    );
};

export default AccountHeight;