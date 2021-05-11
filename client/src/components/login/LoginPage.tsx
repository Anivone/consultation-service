import React, { useContext, useState } from "react";
import ContainerContext from "../../context/ContainerContext";
import { Button, makeStyles, TextField } from "@material-ui/core";
import to from "await-to-js";
import { IAccount } from "../../domain/entities/types";
import { useHistory } from 'react-router-dom';

interface LoginPageState {
    email: string;
    password: string;
}

const useStyles = makeStyles({
    title: {
        fontSize: '36px'
    },
    registerLabel: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: '14px',
        fontColor: '#646464',
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

    const login = async (evt: any) => {
        const [err, user] = await to<IAccount | null>(
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
        <div className='vw-100 vh-100 d-flex flex-row justify-content-center align-items-center'>
            <div className='w-75 d-flex flex-row justify-content-center align-items-center'>
                <div className='w-100 h-100 d-flex flex-row justify-content-center align-items-center'>
                    <div className='w-75 d-flex flex-column justify-content-center align-items-center'>
                        <div className='w-100 mb-5 d-flex flex-column justify-content-center align-items-center'>
                            <div className='w-100 mb-5 d-flex flex-row justify-content-center align-items-center'>
                                <span className={classes.title}>Увійти до аккаунту</span>
                            </div>
                            <div className='w-50 d-flex flex-column justify-content-center align-items-center'>
                                <TextField
                                    className='w-75 mb-4'
                                    fullWidth
                                    required
                                    autoFocus
                                    label="Електронна пошта"
                                    variant="outlined"
                                    placeholder={'example@mail.com'}
                                    value={state.email}
                                    onChange={onEmailChange}
                                />
                                <TextField
                                    className='w-75'
                                    required
                                    fullWidth
                                    type={'password'}
                                    label="Пароль"
                                    variant="outlined"
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
                                Увійти
                            </Button>
                        </div>
                        <div
                            className='w-100 mt-3 mb-3 d-flex flex-row justify-content-center align-items-center'>
                            <span className={classes.registerLabel}>Або якщо ви ще не зареєстровані</span>
                        </div>
                        <div className='w-25 d-flex flex-column justify-content-center align-items-center'>
                            <Button
                                fullWidth
                                variant={"outlined"}
                                color={"primary"}
                                onClick={registrationRedirect}
                            >
                                Зареєструватися
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;