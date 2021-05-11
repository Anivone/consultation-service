import React from "react";
import { AuthService } from "../services/AuthService";
import ContainerContext from "../context/ContainerContext";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from "./Main";
import LoginPage from "./login/LoginPage";
import RegistrationPage from "./registration/RegistrationPage";

const Container = () => {
    return (
        <ContainerContext.Provider value={{
            authService: new AuthService(),
        }}>
            <BrowserRouter>
                <Switch>
                    <Route path={'/login'}>
                        <LoginPage/>
                    </Route>
                    <Route path={'/registration'}>
                        <RegistrationPage/>
                    </Route>
                    <Route path={'/'}>
                        <Main/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ContainerContext.Provider>
    );
}

export default Container;