import {uploadAPI} from "../../api/api";
import {alert_message} from "./appActions";
import {ACCOUNT} from "../actionTypes";

export function setAvatar(file_url) {
    return {
        type: ACCOUNT.SET_AVATAR,
        payload: {
            file_url
        }
    }
}

export const uploadPhoto = (file) => (dispatch) => {
    uploadAPI.uploadPhoto(file)
        .then(res => {
            console.log(res)
            if(res.data.result === 0) {
                dispatch(alert_message(res.data.message));
                dispatch(setAvatar(res.data.file_url));
                console.log(res.data.file_url);
            } else {
                console.log('err')
            }
        })
}

export const uploadGallery = (file) => (dispatch) => {
    uploadAPI.uploadGallery(file)
        .then(res => {
            console.log(res)
            if(res.data.result === 0) {
                dispatch(alert_message(res.data.message));
                dispatch({
                    type: ACCOUNT.GALLERY_IMAGE_ADD,
                    payload: {
                        image_id: res.data.image.image_id,
                        account_id: res.data.image.account_id,
                        url: res.data.image.url
                    }
                });
            } else {
                console.log('err')
            }
        })
}