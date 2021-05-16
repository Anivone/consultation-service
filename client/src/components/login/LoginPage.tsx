import React, { useContext, useEffect, useState } from "react";
import ContainerContext from "../../context/ContainerContext";
import { Button, makeStyles, TextField } from "@material-ui/core";
import to from "await-to-js";
import { IUserAccount } from "../../domain/entities/IUserAccount";
import { useHistory } from 'react-router-dom';

interface LoginPageState {
    email: string;
    password: string;
}

const useStyles = makeStyles({
    bgColor: {
        bgColor: '#f5f5f5',
    },
    title: {
        fontSize: '36px'
    },
    registerLabel: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: '14px',
        fontColor: '#646464',
    },
    textField: {
        backgroundColor: '#fff !important',
        '& .MuiFilledInput-root': {
            backgroundColor: '#fff !important'
        }
    }
})

const LoginPage = () => {

    const { authService } = useContext(ContainerContext);
    const history = useHistory();
    const classes = useStyles();

    const [state, setState] = useState<LoginPageState>({
        email: '',
        password: '',
    });

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            const [err, account] = await to<IUserAccount | null>(authService.authenticate());
            if (err) throw err;

            if (!account) return;
        })();
    }, []);

    const login = async (evt: any) => {
        const [err, user] = await to<IUserAccount | null>(
            authService.login(state.email, state.password));
        if (err) throw err;
        if (!user) return;

        history.push('/');
    }

    const registrationRedirect = () => {
        history.push('/registration');
    }

    const onEmailChange = (evt: any) => {
        setState({
            ...state,
            email: evt.target.value
        })
    }

    const onPasswordChange = (evt: any) => {
        setState({
            ...state,
            password: evt.target.value
        })
    }

    return (
        <div className='vw-100 vh-100 bg-main d-flex flex-row justify-content-center align-items-center'>
            <div className='w-75 d-flex flex-row justify-content-center align-items-center'>
                <div className='w-100 h-100 d-flex flex-row justify-content-center align-items-center'>
                    <div className='w-75 d-flex flex-column justify-content-center align-items-center'>
                        <div className='w-100 mb-5 d-flex flex-column justify-content-center align-items-center'>
                            <div className='w-100 mb-5 d-flex flex-row justify-content-center align-items-center'>
                                <span className={classes.title}>Login</span>
                            </div>
                            <div className='w-50 d-flex flex-column justify-content-center align-items-center'>
                                <TextField
                                    className={'w-75 mb-1'}
                                    fullWidth
                                    required
                                    autoFocus
                                    label="Email"
                                    variant={"outlined"}
                                    placeholder={'example@mail.com'}
                                    value={state.email}
                                    onChange={onEmailChange}
                                />
                                <TextField
                                    className='w-75'
                                    required
                                    fullWidth
                                    type={'password'}
                                    label="Password"
                                    variant={"outlined"}
                                    value={state.password}
                                    onChange={onPasswordChange}
                                />
                            </div>
                        </div>
                        <div className='w-25 d-flex flex-column justify-content-center align-items-center'>
                            <Button
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                                onClick={login}
                            >
                                Login
                            </Button>
                        </div>
                        <div
                            className='w-100 mt-3 mb-3 d-flex flex-row justify-content-center align-items-center'>
                            <span className={classes.registerLabel}>Or if you dont have an account</span>
                        </div>
                        <div className='w-25 d-flex flex-column justify-content-center align-items-center'>
                            <Button
                                fullWidth
                                variant={"outlined"}
                                color={"primary"}
                                onClick={registrationRedirect}
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;