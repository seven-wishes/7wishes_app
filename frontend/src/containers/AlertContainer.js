import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import Alert from "../components/Alert/Alert";
import {alert_remove} from "../redux/actions/appActions";

class AlertContainer extends React.Component {
    render() {
        return (
            <Alert {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        alert: state.appReducer.app.alert
    }
}
export default compose(
    connect(mapStateToProps, {
        alert_remove
    }),
)(AlertContainer);