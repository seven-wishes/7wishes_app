import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Profile from "../components/Profile/Profile";
import {
    activateAccount, deactivateAccount,
    createAccount, getMyAccount,
    updateAccount, updateCity,
    updateDescription, updateEyeColor, updateHairColor,
    updateHeight, updateNickname, updateWeight, updateGoal, setInvisible, deleteGalleryItem, updateAge
} from "../redux/actions/accountActions";
import {uploadGallery, uploadPhoto} from "../redux/actions/uploadActions";
import {clear_dialog} from "../redux/actions/dialogsActions";
import {
    getCities,
    getEyeColors,
    getGoals,
    getHairColors,
    profile_tab_selector,
    zoom_image
} from "../redux/actions/appActions";
import { paymentUpInit } from "../redux/actions/paymentActions";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getMyAccount();
        this.props.getCities();
        this.props.getEyeColors();
        this.props.getHairColors();
        this.props.getGoals();
        this.props.clear_dialog();
    }

    render() {
        if (!this.props.auth) return <Redirect to="/login" />
        return (
            <Profile {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        user_id: state.authReducer.user_id,
        gender_id: state.authReducer.gender_id,
        plan_id: state.authReducer.plan_id,
        plan_title: state.authReducer.plan_title,
        accountExists: state.accountReducer.accountExists,
        account: state.accountReducer.account,
        avatar_url: state.accountReducer.avatar_url,
        eye_colors: state.appReducer.eye_colors,
        hair_colors: state.appReducer.hair_colors,
        cities: state.appReducer.cities,
        goals: state.appReducer.goals,
        profile_tab: state.appReducer.app.profile_tab,
        account_is_active: state.accountReducer.account.account_is_active,
        is_invisible: state.accountReducer.account.is_invisible,
        zoom: state.appReducer.app.zoom
    }
}
export default compose(
    connect(mapStateToProps, {
        activateAccount,
        deactivateAccount,
        getCities,
        getEyeColors,
        getHairColors,
        getGoals,
        createAccount,
        getMyAccount,
        deleteGalleryItem,
        updateAccount,
        updateCity,
        updateAge,
        updateNickname,
        updateDescription,
        updateHeight,
        updateWeight,
        updateEyeColor,
        updateHairColor,
        updateGoal,
        uploadPhoto,
        uploadGallery,
        profile_tab_selector,
        clear_dialog,
        zoom_image,
        setInvisible,
        paymentUpInit
    }),
)(ProfileContainer);