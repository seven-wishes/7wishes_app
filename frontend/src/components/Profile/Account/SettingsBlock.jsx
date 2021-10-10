import React from 'react';

const SettingsBlock = (props) => {
    return (
        <div className={`tab settings ${props.profile_tab ===  "settings" ? "active" : ""}`} id="settings">
            <h2 className="account__title">Мои настройки</h2>
            <div className="account__section">
                <h3 className="account__section-title">Сменить пароль</h3>
                <div className="account__section-wrap">
                    <div className="account__section-row">
                        <div className="account__section-col account__section-col--fullwidth">
                            <label htmlFor="" className="account__section-label">Новый пароль</label>
                            <input className="account__section-input" type="text" />
                        </div>
                    </div>
                    <div className="account__section-row">
                        <div className="account__section-col account__section-col--fullwidth">
                            <label htmlFor="" className="account__section-label">Повторите пароль</label>
                            <input className="account__section-input" type="text" />
                        </div>
                    </div>
                </div>
                <div className="account__actions">
                    <button className="account__save">Изменить пароль</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsBlock;