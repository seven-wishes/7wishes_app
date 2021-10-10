import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import DialogItem from "../components/Messages/DialogItem";

import {deleteDialog} from "../redux/actions/dialogsActions"

class DialogItemContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <DialogItem {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        plan_id: state.authReducer.plan_id
    }
}
export default compose(
    connect(mapStateToProps, {
        deleteDialog
    }),
)(DialogItemContainer);