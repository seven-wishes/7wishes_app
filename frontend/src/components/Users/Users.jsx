import React from 'react';
import {NavLink} from "react-router-dom";

const Users = (props) => {
    return (
        <div className="users">
            <div className="wrap">
                <div className="users__wrap">
                    <div className="users__col users__col--man">
                        <div className="users__col-content">
                            <h2 className="users__col-title">Мужчины</h2>
                            <p className="users__col-text">8 456 мужчин готовы исполнить вашу мечту</p>
                            <div className="users__col-actions">
                                <NavLink className="users__col-action" to="/users/man/1">Выбрать мужчину</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="users__col users__col--woman">
                        <div className="users__col-content">
                            <h2 className="users__col-title">Девушки</h2>
                            <p className="users__col-text">25 789 девушек ждут своего мужчину</p>
                            <div className="users__col-actions">
                                <NavLink className="users__col-action" to="/users/woman/1">Выбрать девушку</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Users;