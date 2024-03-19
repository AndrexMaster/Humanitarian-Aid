import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { SpaRouter } from "./Global/Router/SpaRouter";

const App = () => {
    return (
        <BrowserRouter>
            <SpaRouter/>
        </BrowserRouter>
    )
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
