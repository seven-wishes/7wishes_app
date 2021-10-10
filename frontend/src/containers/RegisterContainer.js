import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {createUser} from "../redux/actions/authActions";
import {alert_message} from "../redux/actions/appActions";

import Register from "../components/Register/Register";

class RegisterContainer extends React.Component {
    componentDidMount() {
        alert_message('hello', 1000)
    }

    render() {
        if (this.props.auth) return <Redirect to="/profile" />
        return (
            <Register {...this.props} createUser={this.props.createUser} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth
    }
}
export default compose(
    connect(mapStateToProps, {
        createUser,
        alert_message
    }),
)(RegisterContainer);