import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import Access from "../components/Access/Access";

import {access_show, access_hide} from "../redux/actions/appActions";
import { paymentInit } from "../redux/actions/paymentActions";

class AccessContainer extends React.Component {
    render() {
        return (
            <Access {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        access_visible: state.appReducer.app.access_visible
    }
}
export default compose(
    connect(mapStateToProps, {
        access_show,
        access_hide,
        paymentInit
    }),
)(AccessContainer);