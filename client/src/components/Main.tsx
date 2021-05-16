import React, { useContext, useEffect, useState } from "react";
import ContainerContext from "../context/ContainerContext";
import { Route, Switch } from "react-router-dom";
import NavBar from "./layout/navbar/NavBar";
import PostPage from "./posts/PostPage";
import MainContent from "./main/MainContent";

const Main = () => {

    const { authService } = useContext(ContainerContext);
    const account = authService.account.getValue();

    return (
        <div className='max-vw-100 min-vh-100 bg-main text-center'>
            <NavBar/>
            <div className='w-100 d-flex flex-row justify-content-center align-items-center'>
                <Switch>
                    <Route path={'/posts/:id'}>
                        <PostPage/>
                    </Route>
                    <Route exact path={'/'}>
                        <MainContent/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Main;