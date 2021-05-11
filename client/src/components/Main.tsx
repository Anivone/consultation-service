import React, { useContext, useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import ContainerContext from "../context/ContainerContext";
import to from "await-to-js";
import { IAccount } from "../domain/entities/types";
import LoginPage from "./login/LoginPage";
import RegistrationPage from "./registration/RegistrationPage";

interface AuthProps {
    email: string;
    userID: string;
    role: string;
}

export interface Login {
    login: boolean;
}

const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100vh',
    },
})

const Main = () => {

    const { authService } = useContext(ContainerContext);
    const classes = useStyles();

    const [state, setState] = useState<Partial<AuthProps>>({
        email: '',
        userID: '',
        role: '',
    });

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            const [err, account] = await to<IAccount | null>(authService.authenticate());
            if (err) throw err;

            if (!account) return;

            setState({
                email: account.email,
                userID: account.userID,
                role: account.role,
            });
        })();
    }, []);

    return (
        <div className='vw-100 vh-100 d-flex flex-row justify-content-center align-items-center'>
            <div className='w-75 d-flex flex-row justify-content-center align-items-center'>
                <div>
                    <div>Email: {state.email}</div>
                    <div>UserID: {state.userID}</div>
                    <div>Role: {state.role}</div>
                </div>
            </div>
        </div>
    )
}

export default Main;