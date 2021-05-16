import React, { useContext } from "react";
import ContainerContext from "../../../context/ContainerContext";
import AccountButton from "./AccountButton";

const NavBar = () => {

    const { authService } = useContext(ContainerContext);
    const account = authService.account.getValue();

    console.log('navbar account: ', account);

    return (
        <div className='navbar navbar-light bg-light d-flex flex-row justify-content-between align-items-center'>
            <a className='navbar-brand brand ml-40' href="/">Consultatio</a>
            <div className='navbar-account mr-40 d-flex flex-row justify-content-end align-items-center'>
                <div className='navbar-user'>
                    {account?.firstName} {account?.lastName}
                </div>
                <div className='navbar-icon ml-20'>
                    <AccountButton/>
                </div>
            </div>
        </div>
    );
}

export default NavBar;