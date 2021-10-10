import React, {useState} from 'react';

const AccountDescription = (props) => {
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState(props.value);

    const activateEdit = () => {
        setEdit(true);
        setDescription(props.value);
    }
    const deactivateEdit = () => {
        setEdit(false);
        setDescription(description);
        if(description !== props.value) {
            props.update(description);
        }
    }

    const onValueChange = (e) => {
        setDescription(e.currentTarget.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            deactivateEdit();
        }
    }

    const textBlock = (
        <span className="account__section-textarea account__section-textarea--block" onClick={activateEdit}>{props.value}</span>
    )
    const inputBlock = (
        <textarea autoFocus={true}
                  className="account__section-textarea"
                  id="account_description"
                  name="account_description"
                  onChange={onValueChange}
                  onBlur={deactivateEdit}
                  onKeyPress={handleKeyPress}>{props.value}</textarea>
    )

    return (
        <div>
            <label htmlFor="account_description" className="account__section-label">{props.label}</label>
            {edit ? inputBlock : textBlock}
        </div>
    );
};

export default AccountDescription;