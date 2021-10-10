import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import {hide_menu_mobile} from "../redux/actions/appActions";
import {logout} from "../redux/actions/authActions";

import Menu from "../components/layout/Menu/Menu";

class MenuContainer extends React.Component {
    render() {
        return (
            <Menu {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        mobile_menu: state.appReducer.app.mobile_menu
    }
}
export default compose(
    connect(mapStateToProps, {
        hide_menu_mobile,
        logout
    }),
)(MenuContainer);