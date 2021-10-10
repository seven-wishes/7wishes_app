import React from 'react';

const Info = (props) => {
    return (
        <div className="info">
            <div className="wrap">
                <div className="info__wrap">
                    <h1 className="info__pagetitle">Реквизиты</h1>
                    <h2 className="info__title">Сервис знакомств "7 желаний"</h2>
                    <ul className="info__list">
                        <li className="info__text">ИП Медведева Наталья Алексаднровна</li>
                        <li className="info__text">ОГРНИП: 320774600528374</li>
                        <li className="info__text">ИНН: 246306802356</li>
                        <li className="info__text">Эл. почта: info@7wishes.club</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Info;