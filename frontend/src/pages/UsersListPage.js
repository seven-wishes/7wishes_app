import React from "react";

import UsersListContainer from "../containers/UsersListContainer";

const UsersListPage = (props) => {
    return (
        <UsersListContainer gender_id={props.gender_id} />
    )
}

export default UsersListPage