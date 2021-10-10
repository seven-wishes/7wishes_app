export const required = (value) => {
    if(value) return undefined
    return "Это обязательное поле"
}
export const userName = (value) => {
    if(!value) {
        return 'Напишите ваше имя'
    }
}
export const email = (value) => {
    if(!value) {
        return "Введите электронную почту"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Введите корректный e-mail'
    }
}
export const passwordNew = (value) => {
    if(!value) {
        return "Придумайте пароль"
    } else if(value.length < 6) {
        return "Не менее 6 символов"
    }
}
export const passwordCheck = (value) => {
    if(value) {
        return undefined
    }
    return "Введите пароль"
}
export const gender = (value) => {
    if(value) return undefined
    return "Выберите свой пол"
}
export const city = (value) => {
    if(value) return undefined
    return "Выберите свой город"
}