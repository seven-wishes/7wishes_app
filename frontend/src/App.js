import React from "react";
import './assets/App.sass';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import UsersListPage from "./pages/UsersListPage";
import UserPage from "./pages/UserPage";
import MessagesPage from "./pages/MessagesPage";
import PlansPage from "./pages/PlansPage";
import AboutPage from "./pages/AboutPage";
import InfoPage from "./pages/InfoPage";
import PolicyPage from "./pages/PolicyPage";

import HeaderContainer from "./containers/HeaderContainer";
import FooterContainer from "./containers/FooterContainer";
import AlertContainer from "./containers/AlertContainer";
import PaymentContainer from "./containers/PaymentContainer";
import AccessContainer from "./containers/AccessContainer";
import MenuContainer from "./containers/MenuContainer";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlesNewPage from "./pages/ArticlesNewPage";

function App(props) {
    return (
        <div className="app">
            <BrowserRouter>
                <HeaderContainer  />
                <Switch>
                    <Route path="/articles/new" exact render={() => <ArticlesNewPage />} />
                    <Route path="/articles" exact render={() => <ArticlesPage />} />
                    <Route path="/policy" exact render={() => <PolicyPage />} />
                    <Route path="/info" exact render={() => <InfoPage />} />
                    <Route path="/about" exact render={() => <AboutPage />} />
                    <Route path="/plans" exact render={() => <PlansPage />} />
                    <Route path="/user/:id" exact render={() => <UserPage />} />
                    <Route path="/users/man/:page" render={() => <UsersListPage gender_id={1} />} />
                    <Route path="/users/man/" exact render={() => <UsersListPage gender_id={1} />} />
                    <Route path="/users/woman/:page" exact render={() => <UsersListPage gender_id={0} />} />
                    <Route path="/users" render={() => <UsersPage />} />
                    <Route path="/messages/:id" exact render={() => <MessagesPage />} />
                    <Route path="/messages" exact render={() => <MessagesPage />} />
                    <Route path="/profile" render={() => <ProfilePage />} />
                    <Route path="/register" render={() => <RegisterPage />} />
                    <Route path="/login" render={() => <LoginPage />} />
                    <Route path="/" exact render={() => <MainPage />} />
                    <Redirect to="/" />
                </Switch>
                <FooterContainer />
                <AccessContainer />
                <MenuContainer />
            </BrowserRouter>
            <AlertContainer />
            <PaymentContainer />
        </div>
    );
}

export default App;
