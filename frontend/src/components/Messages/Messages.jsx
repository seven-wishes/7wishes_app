import React from 'react';
import DialogContainer from "../../containers/DialogContainer";
import DialogForm from "./DialogForm";
import DialogItemContainer from "../../containers/DialogItemContainer";

const Messages = (props) => {
    if (!props.dialogs) return "Loading..."

    const dialogsList = (
        props.dialogs.map((d) => {
            const user_id = props.user_id === d.user_1_id ? d.user_2_id : d.user_1_id;
            if (!d.messages_exists) return;
            return <DialogItemContainer active={d.id === props.dialog_id} key={d.id} dialog_id={d.id} user_id={user_id} user_nickname={d.user_nickname} />
        })
    );

    return (
        <div className="messages-page">
            <div className="wrap">
                <div className="messages-page__wrap">
                    <div className="dialogs">
                        <div className="dialogs__wrap">
                            <div className="dialogs__wrap-header">Список диалогов</div>
                            <div className="dialogs__list">
                                {dialogsList}
                            </div>
                        </div>
                    </div>
                    <div className="messages">
                        <div className="messages__wrap">
                            <div className="messages__wrap-header">Список сообщений</div>
                            <DialogContainer dialog_id={props.match.params.id} />
                            <DialogForm dialog_id={props.dialog_id} createMessage={props.createMessage} getDialog={props.getDialog} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;