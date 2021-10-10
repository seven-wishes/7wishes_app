import React from 'react';
import MessageItem from "./MessageItem";

const Dialog = (props) => {
    if (!props) return 'Loading'

    let messagesList;
    if (props.dialog !== null && props.dialog !== undefined) {
        if (Object.keys(props.dialog).length !== 0) {
            messagesList = (
                props.dialog.map((m) => {
                    return <MessageItem key={m.id} message_id={m.id}
                                        message_text={m.message_text} author_id={m.author_id}
                                        user_id={props.user_id} user_nickname={m.user_nickname}
                                        deleteMessage={props.deleteMessage} />
                })
            );
        }
    }

    return (
        <div className="messages__list">
            {/*{props.dialog_error ? <p className="messages__error">Сообщений еще нет, напишите что-нибудь</p> : messagesList}*/}
            {props.dialog_id !== null ? messagesList : <p className="messages__error">Выберите переписку с другим пользователем из колонки слева. Здесь появятся сообщения.</p>}
        </div>
    );
};

export default Dialog;