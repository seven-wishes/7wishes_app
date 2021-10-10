import * as axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? 'http://7-wishes.ru/api/' : 'http://localhost:5000/api/'

const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL
})

export const appAPI = {
    getCities () {
        return instance.get(`app/cities`)
    },
    getEyeColors () {
        return instance.get(`app/eye_colors`)
    },
    getHairColors () {
        return instance.get(`app/hair_colors`)
    },
    getGoals () {
        return instance.get(`app/goals`)
    },
}
export const uploadAPI = {
    uploadPhoto(file) {
        const formData = new FormData()
        formData.append('avatar', file)
        return instance.post(`upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    uploadGallery(file) {
        const formData = new FormData()
        formData.append('gallery', file)
        return instance.post(`upload/gallery`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
export const usersAPI = {
    getAccounts (gender_id, page) {
        return instance.get(`users/list/${gender_id}/${page}`)
    },
    getUser (user_id) {
        return instance.get(`users/account/${user_id}`);
    },
    setFilter (gender_id, filter) {
        return instance.post(`users/setfilter/`, {gender_id, filter});
    },
    _setFilter (gender_id, filter) {
        return instance.post(`users/filter/`, {gender_id, filter});
    }
}
export const authAPI = {
    login (email, password) {
        return instance.post(`auth`, {email, password})
    },
    checkAuthorization () {
        return instance.get(`auth`)
    },
    logout () {
        return instance.get(`auth/logout`)
    },
    createUser (email, password, gender) {
        return instance.post(`users/create`, {email, password, gender})
    },
    forgotPassword (email) {
        return instance.post(`auth/forgot`, {email})
    },
}
export const accountAPI = {
    createAccount (user_id, gender_id) {
        return instance.post(`account/create`, {user_id, gender_id})
    },
    activateAccount () {
        return instance.post(`account/activate`)
    },
    deactivateAccount () {
        return instance.post(`account/deactivate`)
    },
    setInvisible (invisibility) {
        return instance.post(`account/invisibility`, {invisibility})
    },
    getMyAccount () {
        return instance.get(`account/profile`)
    },
    deleteGalleryItem (image_id) {
        return instance.post(`account/gallery`, {image_id})
    },
    updateAccount (account) {
        return instance.post(`account/update`, {account})
    },
    updateCity (city_id) {
        return instance.post(`account/update/city`, {city_id})
    },
    updateAge (age) {
        return instance.post(`account/update/age`, {age})
    },
    updateNickname (nickname) {
        return instance.post(`account/update/nickname`, {nickname})
    },
    updateDescription (description) {
        return instance.post(`account/update/description`, {description})
    },
    updateHeight (height) {
        return instance.post(`account/update/height`, {height})
    },
    updateWeight (weight) {
        return instance.post(`account/update/weight`, {weight})
    },
    updateEyeColor (eye_color_id) {
        return instance.post(`account/update/eye_color`, {eye_color_id})
    },
    updateHairColor (hair_color_id) {
        return instance.post(`account/update/hair_color`, {hair_color_id})
    },
    updateGoal (goal, value) {
        return instance.post(`account/update/goal`, {goal, value})
    },
    getNewMessagesCount (user_id) {
        return instance.post(`account/messages`, {user_id})
    },
}
export const dialogsAPI = {
    createDialog (user_id) {
        return instance.post('dialogs/create', {user_id})
    },
    checkDialog (user_id) {
        return instance.post('dialogs/check', {user_id})
    },
    createMessage (dialog_id, message_text) {
        return instance.post('dialogs/message', {dialog_id, message_text})
    },
    getDialogs () {
        return instance.get('dialogs')
    },
    getDialog (dialog_id) {
        return instance.get(`dialogs/${dialog_id}`)
    },
    deleteMessage (message_id) {
        return instance.post(`dialogs/message/delete`, {message_id})
    },
    deleteDialog (dialog_id) {
        return instance.post(`dialogs/delete`, {dialog_id})
    },
}
export const plansAPI = {
    getPlans (gender_id) {
        return instance.get(`plans/${gender_id}`)
    },
}
export const paymentAPI = {
    paymentInit (user_id, amount, plan_id, plan_title) {
        return instance.post('payment/', {user_id, amount, plan_id, plan_title})
    },
    paymentUpInit (user_id, amount, plan_id) {
        return instance.post('payment/up', {user_id, amount, plan_id})
    },
}
export const articlesAPI = {
    getArticles () {
        return instance.get('articles')
    },
    createArticle (text) {
        return instance.post('articles', {text})
    },
    answerArticle (text, account_id) {
        return instance.post('articles/answer', {text, account_id})
    }
}