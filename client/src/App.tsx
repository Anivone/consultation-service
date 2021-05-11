import React  from 'react';
import './App.css';
import './bootstrap.css';
import { initAxiosInterceptors } from "./helpers/AxiosInterceptor";
import Container from "./components/Container";

const App = () => {

    initAxiosInterceptors();

    console.log('App() re-rendered !');

    return (
        <Container/>
    );
}

export default App;
