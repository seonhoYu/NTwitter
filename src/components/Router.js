import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import {authService} from "fbase";
import Navigation from "components/Navigation";
import { Redirect } from "react-router-dom";

const AppRouter = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser !== null);

    if(isLoggedIn){
        return <Router>
            <Navigation></Navigation>
            <Switch>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
                <Redirect from="*" to="/"></Redirect>
            </Switch>
        </Router>
    }
    else{
        return <Router>
            <Switch>
                <Route exac path="/">
                    <Auth />
                </Route>
            </Switch>
            <Redirect from="*" to="/"></Redirect>
        </Router>
    }
}

export default AppRouter;