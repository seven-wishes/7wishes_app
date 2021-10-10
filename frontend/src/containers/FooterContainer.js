import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import Footer from "../components/layout/Footer/Footer";

class FooterContainer extends React.Component {
    render() {
        return (
            <Footer {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {

    }
}
export default compose(
    connect(mapStateToProps, {}),
)(FooterContainer);