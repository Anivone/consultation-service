import React, { useContext, useState } from "react";
import { Button, FormControlLabel, makeStyles, Switch, TextField } from "@material-ui/core";
import ContainerContext from "../../context/ContainerContext";
import to from "await-to-js";
import { IAccount } from "../../domain/entities/types";
import { useHistory } from 'react-router-dom';

export interface RegistrationPageState {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    country: string;
    city: string;
    isConsultant: boolean;
    specialtyID?: string;
}

const useStyles = makeStyles({
    title: {
        fontSize: '36px'
    },
    inputWidth: {
        width: '25%'
    },
    positionInput: {
        opacity: '0',
    },
    spaceDiv: {
        width: '20px'
    },
    marginRight: {
        marginRight: '10px'
    },
    loginLabel: {
        fontSize: '14px',
        fontColor: '#646464'
    }
})

const RegistrationPage = () => {

    const { authService } = useContext(ContainerContext);
    const history = useHistory();
    const classes = useStyles();

    const [state, setState] = useState<RegistrationPageState>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        country: '',
        city: '',
        isConsultant: false,
        specialtyID: ''
    })

    const handleSwitch = (evt: any) => {
        setState({
            ...state,
            [evt.target.name]: evt.target.checked
        })
    }

    const handleInput = (evt: any) => {
        setState({
            ...state,
            [evt.target.name]: evt.target.value
        })
    }

    const onClickLog = async (evt: any) => {
        const [err, user] = await to<any | null>(authService.register(state));
        if (err) throw err;
        if (!user) return;

        history.push('/');
    }

    const loginRedirect = () => {
        history.push('/login');
    }

    return (
        <div className='vw-100 vh-100 bg-main d-flex flex-row justify-content-center align-items-center'>
            <div className='w-75 d-flex flex-row justify-content-center align-items-center'>
                <div className='w-100 h-100 d-flex flex-row justify-content-center align-items-center'>
                    <div className='w-75 d-flex flex-column justify-content-center align-items-center'>
                        <div className='w-100 mb-5 d-flex flex-row justify-content-center align-items-center'>
                            <span className={classes.title}>Registration</span>
                        </div>
                        <div className='w-100 mb-4 d-flex flex-row justify-content-center align-items-center'>
                            <TextField
                                onChange={handleInput}
                                name={'email'}
                                className={classes.inputWidth}
                                required
                                autoFocus
                                label="Email"
                                variant="outlined"
                                placeholder={'example@mail.com'}
                            />
                            <div className={classes.spaceDiv}/>
                            <TextField
                                onChange={handleInput}
                                name={'password'}
                                className={classes.inputWidth}
                                required
                                type={'password'}
                                label="Password"
                                variant="outlined"
                            />
                        </div>
                        <div className='w-100 mb-4 d-flex flex-row justify-content-center align-items-center'>
                            <TextField
                                onChange={handleInput}
                                name={'firstName'}
                                className={classes.inputWidth}
                                required
                                label="First Name"
                                variant="outlined"
                            />
                            <div className={classes.spaceDiv}/>
                            <TextField
                                onChange={handleInput}
                                name={'lastName'}
                                className={classes.inputWidth}
                                required
                                label="Last Name"
                                variant="outlined"
                            />
                        </div>
                        <div className='w-100 mb-4 d-flex flex-row justify-content-center align-items-center'>
                            <TextField
                                onChange={handleInput}
                                name={'middleName'}
                                className={classes.inputWidth}
                                label="Middle Name"
                                variant="outlined"
                            />
                            <div className={classes.spaceDiv}/>
                            <TextField
                                onChange={handleInput}
                                name={'phoneNumber'}
                                className={classes.inputWidth}
                                required
                                label="Phone Number"
                                variant="outlined"
                                placeholder={'1234567890'}
                            />
                        </div>
                        <div className='w-100 mb-3 d-flex flex-row justify-content-center align-items-center'>
                            <FormControlLabel
                                name={'isConsultant'}
                                control={<Switch checked={state.isConsultant} color={'primary'}/>}
                                label="I am a consultant"
                                onChange={handleSwitch}
                            />
                        </div>

                        {
                            state.isConsultant
                                ?
                                <div className='w-75 d-flex flex-row justify-content-center align-items-center'>
                                    <div className='w-50'>
                                        <TextField
                                            fullWidth
                                            onChange={handleInput}
                                            name={'specialtyID'}
                                            required
                                            label="Specialty"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                                : null
                        }

                        <div className='w-25 mt-4 d-flex flex-column justify-content-center align-items-center'>
                            <Button
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                                onClick={onClickLog}
                            >
                                Register
                            </Button>
                        </div>
                        <div
                            className='w-100 mt-3 mb-3 d-flex flex-row justify-content-center align-content-center'>
                            <span className={classes.loginLabel}>Or if you already have an account</span>
                        </div>
                        <div className='w-25 d-flex flex-column justify-content-center align-items-center'>
                            <Button
                                fullWidth
                                variant={"outlined"}
                                color={"primary"}
                                onClick={loginRedirect}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RegistrationPage;