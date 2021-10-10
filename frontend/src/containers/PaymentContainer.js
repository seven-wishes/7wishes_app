import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import Payment from "../components/Plans/Payment";
import {paymentInit} from "../redux/actions/paymentActions";

class PaymentContainer extends React.Component {
    render() {
        if (!this.props.payment_init) return null;
        return (
            <Payment {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        payment_init: state.paymentReducer.payment_init,
        payment: state.paymentReducer.payment
    }
}
export default compose(
    connect(mapStateToProps, {
        paymentInit
    }),
)(PaymentContainer);