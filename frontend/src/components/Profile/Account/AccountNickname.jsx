import React, {useState} from 'react';

const AccountNickname = (props) => {
    const [edit, setEdit] = useState(false);
    const [nickname, setNickname] = useState(props.value);

    const activateEdit = () => {
        setEdit(true);
        setNickname(props.value);
    }
    const deactivateEdit = () => {
        setEdit(false);
        setNickname(nickname);
        if(nickname !== props.value) {
            props.update(nickname);
        }
    }

    const onValueChange = (e) => {
        setNickname(e.currentTarget.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            deactivateEdit();
        }
    }

    const textBlock = (
        <span className="account__section-input account__section-input--block" onClick={activateEdit}>{props.value}</span>
    )
    const inputBlock = (
        <input autoFocus={true}
               className="account__section-input"
               id="account_nickname"
               name="account_nickname"
               onChange={onValueChange}
               onBlur={deactivateEdit}
               onKeyPress={handleKeyPress}
               type="text"
               value={nickname} />
    )

    return (
        <div>
            <label htmlFor="account_nickname" className="account__section-label">{props.label}</label>
            {edit ? inputBlock : textBlock}
        </div>
    );
};

export default AccountNickname;