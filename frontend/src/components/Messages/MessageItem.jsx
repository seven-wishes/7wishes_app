import React from 'react';

const MessageItem = (props) => {
    const onDeleteHandler = () => {
        const check = window.confirm('Удалить сообщение');
        if (check) {
            props.deleteMessage(props.message_id);
        }
    }

    return (
        <div className={`messages__item ${props.user_id === props.author_id ? "messages__item--my" : ""}`}>
            <div className="messages__item-text">{props.message_text}</div>
            <div className="messages__item-author">{props.user_nickname}</div>
            {/*<div className="messages__item-delete" onClick={onDeleteHandler}>Удалить сообщение</div>*/}
        </div>
    );
};

export default MessageItem;