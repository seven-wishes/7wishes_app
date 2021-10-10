import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import Users from "../components/Users/Users";

class UsersContainer extends React.Component {
    render() {
        return (
            <Users {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {

    }
}
export default compose(
    connect(mapStateToProps, {}),
)(UsersContainer);