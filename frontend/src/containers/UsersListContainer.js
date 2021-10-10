import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import UsersList from "../components/Users/UsersList";
import { change_filter, getAccounts, set_current_page, setFilter } from "../redux/actions/usersActions";
import {access_show, getGoals} from "../redux/actions/appActions";
import {withRouter} from "react-router-dom";

class UsersListContainer extends React.Component {
    componentDidMount() {
        this.props.getAccounts(this.props.gender_id, 1);
        this.props.getGoals();
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentPage !== this.props.match.params.page) {
            this.props.set_current_page(Number(this.props.match.params.page));
            if (this.props.currentPage !== prevProps.currentPage) {
                this.props.getAccounts(this.props.gender_id, this.props.match.params.page);
            }
        }
    }

    render() {
        return (
            <UsersList {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        demo: state.authReducer.demo,
        plan_id: state.authReducer.plan_id,
        goals: state.appReducer.goals,
        filters: state.usersReducer.filters,
        users_list: state.usersReducer.users_list,
        total_users_count: state.usersReducer.total_users_count,
        users_page_size: state.usersReducer.users_page_size,
        currentPage: state.usersReducer.currentPage,
    }
}
export default compose(
    connect(mapStateToProps, {
        getAccounts,
        getGoals,
        access_show,
        set_current_page,
        change_filter,
        setFilter
    }),
    withRouter
)(UsersListContainer);