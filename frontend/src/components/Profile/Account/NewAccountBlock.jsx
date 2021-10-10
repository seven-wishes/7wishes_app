import React from 'react';

const NewAccountBlock = (props) => {
    const onCandidateActionHandler = () => {
        props.createAccount(props.user_id, props.gender_id);
        props.getMyAccount();
    }

    return (
        <div className="candidate">
            <h2 className="candidate__title">Мой профиль</h2>
            <div className="candidate__text">
                Поздравляем, вы зарегистрированы на сервисе 7-wishes.ru <br />
                Теперь вы можете добавить свою анкету.
            </div>
            <div className="candidate__actions">
                <button className="candidate__action" onClick={onCandidateActionHandler}>Добавить анкету</button>
            </div>
        </div>
    );
};

export default NewAccountBlock;