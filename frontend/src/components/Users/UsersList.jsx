import React from 'react';

import UserCard from "./UserCard";
import {NavLink} from "react-router-dom";
import UserFilter from "./UserFilter";

const UsersList = (props) => {
    console.log(props)
    if (!props.users_list) return "Loading..."

    const emptyData = (
        <div className="empty">
            <div className="empty__title">Пользователей не найдено.</div>
            <div className="empty__text">Попробуйте очистить фильтр или измените параметры подбора.</div>
        </div>
    )

    const UsersDataList = () => {
        if(props.users_list.length === 0) {
            return emptyData;
        }

        return (
            props.users_list.map((u) => {
                return <UserCard access_show={props.access_show}
                                 account_is_online={u.account_is_online}
                                 is_invisible={u.is_invisible}
                                 plan_id={u.plan_id}
                                 plan_active_to={u.plan_active_date_to}
                                 auth={props.auth}
                                 demo={props.demo}
                                 age={u.age}
                                 key={`${u.id}-${u.user_id}`}
                                 user_id={u.user_id}
                                 avatar_url={u.avatar_url}
                                 city_id={u.city_id}
                                 city_title={u.city_title}
                                 nickname={u.nickname}
                />
            })
        )
    };

    let pagesCount = Math.ceil(props.total_users_count / props.users_page_size);
    let currentPage = props.currentPage;
    const maxPages = 5;

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > pagesCount) {
        currentPage = pagesCount;
    }

    let startPage, endPage;
    if (pagesCount <= maxPages) {
        startPage = 1;
        endPage = pagesCount;
    }
    else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= pagesCount) {
            startPage = pagesCount - maxPages + 1;
            endPage = pagesCount;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    let total_pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    const paginationList = (
        total_pages.map((p, index) => {
            const link = props.gender_id === 1 ? `/users/man/${p}` : `/users/woman/${p}`;
            const pageNumber = `${p}`;
            return (
                <NavLink key={index} to={link} className="users__pagination-item">{pageNumber}</NavLink>
            )
        })
    )

    return (
        <div className="users__page">
            <div className="wrap">
                <div className="users__page-info">
                    <h1 className="users__page-title">
                        {props.gender_id === 1 ? "Все мужчины 7 желаний" : "Все девушки 7 желаний"}
                    </h1>
                    <p className="users__page-text">Сделайте свой выбор, отправьте сообщение первым</p>
                </div>
                <UserFilter filters={props.filters} goals={props.goals} setFilter={props.setFilter} gender_id={props.gender_id} changeFilter={props.change_filter} />
                <div className="users__list">
                    <UsersDataList />
                </div>
                <div className="users__pagination">
                    {paginationList}
                </div>
            </div>
        </div>
    );
};

export default UsersList;