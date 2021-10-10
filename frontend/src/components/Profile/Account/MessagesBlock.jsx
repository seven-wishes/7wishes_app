import React from 'react';

const MessagesBlock = (props) => {
    return (
        <div className={`tab messages__section ${props.profile_tab ===  "messages__section" ? "active" : ""}`} id="messages">
            <h2 className="account__title">Мои сообщения</h2>
            <div className="account__section">
                <div className="messages__block">
                    <div className="dialogs__wrap">
                        <div className="dialogs__wrap-header">Список диалогов</div>
                        <div className="dialogs__list">
                            <div className="dialogs__item">
                                <div className="dialogs__item-name">Алексей</div>
                            </div>
                            <div className="dialogs__item active">
                                <div className="dialogs__item-name">Алексей</div>
                            </div>
                            <div className="dialogs__item">
                                <div className="dialogs__item-name">Алексей</div>
                            </div>
                            <div className="dialogs__item">
                                <div className="dialogs__item-name">Алексей</div>
                            </div>
                            <div className="dialogs__item">
                                <div className="dialogs__item-name">Алексей</div>
                            </div>
                        </div>
                    </div>
                    <div className="messages__wrap">
                        <div className="dialogs__wrap-header">Список сообщений</div>
                        <div className="messages__list">
                            <div className="messages__item">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                            <div className="messages__item">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                            <div className="messages__item messages__item--my">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                            <div className="messages__item messages__item--my">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                            <div className="messages__item">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                            <div className="messages__item messages__item--my">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                            <div className="messages__item messages__item--my">
                                <div className="messages__item-text">Доступно только для авторизованных пользователей</div>
                                <div className="messages__item-author">Алексей</div>
                            </div>
                        </div>
                        <div className="messages__answer">
                            <div className="messages__answer-row">
                                <textarea className="messages__answer-textarea" name="" id="" />
                            </div>
                            <div className="messages__answer-actions">
                                <button className="messages__answer-submit">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesBlock;