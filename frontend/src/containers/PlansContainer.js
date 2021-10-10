import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";

import {getPlans} from "../redux/actions/plansActions";
import {paymentInit} from "../redux/actions/paymentActions";

import Plans from "../components/Plans/Plans";

class PlansContainer extends React.Component {
    componentDidMount() {
        this.props.getPlans(this.props.gender_id);
    }

    render() {
        return (
            <Plans {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        user_id: state.authReducer.user_id,
        plan_id: state.authReducer.plan_id,
        gender_id: state.authReducer.gender_id,
        plans: state.plansReducer.plans
    }
}
export default compose(
    connect(mapStateToProps, {
        getPlans,
        paymentInit
    }),
)(PlansContainer);