import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import Main from "../components/layout/Main/Main";

class MainContainer extends React.Component {
    render() {
        return (
            <Main {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {

    }
}
export default compose(
    connect(mapStateToProps, {}),
)(MainContainer);