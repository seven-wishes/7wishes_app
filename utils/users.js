function countAge (year, month, date) {
    let age;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dob = new Date(year, month, date);
    const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    //Возраст = текущий год - год рождения
    age = today.getFullYear() - dob.getFullYear();
    //Если ДР в этом году ещё предстоит, то вычитаем из age один год
    if (today < dobnow) {
        age = age - 1;
    }

    return age
}

module.exports = countAge