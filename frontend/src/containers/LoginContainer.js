import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Login from "../components/Login/Login";
import {checkAuthorization, forgot_password, forgotPassword, login} from "../redux/actions/authActions";

class FooterContainer extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auth !== prevProps.auth) {
            this.props.checkAuthorization();
        }
    }

    render() {
        if (this.props.auth) return <Redirect to="/profile" />
        return (
            <Login {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        is_forgot_password: state.authReducer.is_forgot_password
    }
}
export default compose(
    connect(mapStateToProps, {
        checkAuthorization,
        login,
        forgot_password,
        forgotPassword
    }),
)(FooterContainer);