import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getDialog, deleteMessage} from "../redux/actions/dialogsActions"

import Dialog from "../components/Messages/Dialog";

class DialogContainer extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getDialog(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id) {
            if (prevProps.match.params.id !== this.props.match.params.id) {
                this.props.getDialog(this.props.match.params.id);
            }
        }
    }
    render() {
        // this.props.getDialog(this.props.match.params.id);
        console.log(this.props)
        return (
            <Dialog {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        user_id: state.authReducer.user_id,
        dialog: state.dialogsReducer.dialog,
        dialog_id: state.dialogsReducer.dialog_id,
        dialog_error: state.dialogsReducer.dialog_error
    }
}
export default compose(
    connect(mapStateToProps, {
        getDialog,
        deleteMessage
    }),
    withRouter
)(DialogContainer);