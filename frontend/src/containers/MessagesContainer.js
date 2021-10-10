import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";

import {getDialogs, getDialog, createMessage} from "../redux/actions/dialogsActions"

import Messages from "../components/Messages/Messages";

class MessagesContainer extends React.Component {
    componentDidMount() {
        this.props.getDialogs();
        if (this.props.match.params.id) {
            this.props.getDialog(this.props.match.params.id);
        }
    }

    render() {
        if (!this.props.auth) return <Redirect to="/login" />

        const dialog = this.props.match.params.id ? this.props.dialog : null

        return (
            <Messages {...this.props} dialog={dialog} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        dialog_id: state.dialogsReducer.dialog_id,
        dialogs: state.dialogsReducer.dialogs,
        dialog: state.dialogsReducer.dialog,
        user_id: state.authReducer.user_id
    }
}
export default compose(
    connect(mapStateToProps, {
        getDialogs,
        getDialog,
        createMessage,
    }),
    withRouter
)(MessagesContainer);