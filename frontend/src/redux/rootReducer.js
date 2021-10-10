import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import accountReducer from "./reducers/accountReducer";
import usersReducer from "./reducers/usersReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import plansReducer from "./reducers/plansReducer";
import paymentReducer from "./reducers/paymentReducer";
import articlesReducer from "./reducers/articlesReducer";

const rootReducer = combineReducers({
    form: formReducer,
    appReducer,
    authReducer,
    accountReducer,
    usersReducer,
    dialogsReducer,
    plansReducer,
    paymentReducer,
    articlesReducer
})

export default rootReducer