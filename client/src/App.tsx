import React from 'react';
import './App.css';
import './bootstrap.css';
import { initAxiosInterceptors } from "./helpers/AxiosInterceptor";
import Container from "./components/Container";
import { BrowserRouter } from "react-router-dom";
import ContainerContext from "./context/ContainerContext";

const App = () => {

    initAxiosInterceptors();

    console.log('App() re-rendered !');

    return (
        <BrowserRouter>
            <Container/>
        </BrowserRouter>
    );
}

export default App;
