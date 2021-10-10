import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import {checkAuthorization, logout} from "../redux/actions/authActions";
import {show_menu_mobile} from "../redux/actions/appActions";

import Header from "../components/layout/Header/Header";
import {getNewMessagesCount} from "../redux/actions/accountActions";

class HeaderContainer extends React.Component {
    refresh() {
        this.props.checkAuthorization();
        this.props.getNewMessagesCount(this.props.user_id);
    }

    componentDidMount() {
        this.props.checkAuthorization();
        this.props.getNewMessagesCount(this.props.user_id);
        // interval is 60 sec
        this.interval = setInterval(() => this.refresh(), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        user_id: state.authReducer.user_id,
        messages_count: state.accountReducer.messages_count
    }
}
export default compose(
    connect(mapStateToProps, {
        checkAuthorization,
        logout,
        show_menu_mobile,
        getNewMessagesCount
    }),
)(HeaderContainer);