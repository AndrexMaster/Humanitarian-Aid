import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import {MainPage} from "../../Pages/MainPage.jsx";
import {ProductPage} from "../../Pages/ProductPage.jsx";
import {ProductsPage} from "../../Pages/ProductsPage.jsx";
import {UserPage} from "../../Pages/UserPage.jsx";
import {AuthPage} from "../../Pages/AuthPage.jsx";

export const SpaRouter = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        setAuthToken(localStorage.getItem('authToken'))
    }, [localStorage]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Header setAuthToken={setAuthToken} />}>
                    <Route index element={<MainPage/>} />
                    <Route path='/user'>
                        <Route path=':userId' element={<UserPage />}>
                            <Route path=':tab' element={<UserPage/>} />
                        </Route>
                    </Route>
                    <Route path='/products'>
                        <Route index element={<Navigate to="/"/>} />
                        <Route path=':categorySlug' element={<ProductsPage/>}/>
                        <Route path=':productId' element={<ProductPage/>} />
                    </Route>
                    {authToken ?
                        <Route path='/auth' element={<Navigate to="/"/>}>
                            <Route index element={<Navigate to="/"/>} />
                            <Route path='*' element={<Navigate to="/"/>} />
                        </Route>
                    :
                        <Route path='/auth'>
                            <Route index element={<AuthPage/>} />
                            <Route path='*' element={<AuthPage/>} />
                        </Route>
                    }

                    <Route path='*' element={<MainPage/>} />
                </Route>
            </Routes>
        </>
    )
}

