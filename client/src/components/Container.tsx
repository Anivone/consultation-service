import React, { useContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import ContainerContext from "../context/ContainerContext";
import { BrowserRouter as Router, Switch, Route, BrowserRouter, useHistory } from 'react-router-dom';
import Main from "./Main";
import LoginPage from "./login/LoginPage";
import RegistrationPage from "./registration/RegistrationPage";
import to from "await-to-js";
import { IUserAccount } from "../domain/entities/IUserAccount";
import PostPage from "./posts/PostPage";
import NavBar from "./layout/navbar/NavBar";

const Container = () => {

    const history = useHistory();
    const { authService } = useContext(ContainerContext);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                history.push('/login');
                return;
            }

            const [err] = await to<IUserAccount | null>(authService.authenticate());
            if (err) throw err;

            const account = authService.account.getValue();

            if (!account) {
                history.push('/login');
                return;
            }
        })();
    }, []);

    return (
        <ContainerContext.Provider value={{
            authService: new AuthService(),
        }}>
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
        </ContainerContext.Provider>
    );
}

export default Container;