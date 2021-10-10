import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getUser} from "../redux/actions/usersActions";
import {createDialog, checkDialog, createMessage} from "../redux/actions/dialogsActions";
import {access_show, alert_message, message_popup, zoom_image} from "../redux/actions/appActions";

import User from "../components/Users/User";

class UserContainer extends React.Component {
    componentDidMount() {
        const user_id = this.props.match.params.id;
        this.props.getUser(user_id);
        this.props.checkDialog(user_id);
    }

    render() {
        if(!this.props.user) return "Loading..."
        return (
            <User {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        demo: state.authReducer.demo,
        gender_id: state.authReducer.gender_id,
        plan_id: state.authReducer.plan_id,
        user_id: state.authReducer.user_id,
        user: state.usersReducer.user,
        dialog_exists: state.usersReducer.dialog_exists,
        dialog_id: state.usersReducer.dialog_id,
        message_popup_active: state.appReducer.app.message_popup_active,
        zoom: state.appReducer.app.zoom
    }
}
export default compose(
    connect(mapStateToProps, {
        alert_message,
        getUser,
        createDialog,
        checkDialog,
        createMessage,
        message_popup,
        zoom_image,
        access_show,
    }),
    withRouter
)(UserContainer);