import React, {useEffect, useState} from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { SpaRouter } from "./Global/Router/SpaRouter";
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider, useSelector} from 'react-redux';
import store from './Storage/Redux/store'
import {lightTheme, darkTheme} from "./Storage/Theme/theme";

const CustomProvider = () => {
    const themeMode = useSelector(state => state.theme.theme);
    const bodyNode = document.querySelector('body');
    if (bodyNode) {
        bodyNode.style.backgroundColor = themeMode === 'light' ? '#f0f4f9' : '#202124';
    }

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            <BrowserRouter>
                <SpaRouter/>
            </BrowserRouter>
        </ThemeProvider>
    )
}
const App = () => {

    return (
        <Provider store={store}>
            <CustomProvider/>
        </Provider>
    )
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
