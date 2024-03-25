import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import {MainPage} from "../../Pages/MainPage.jsx";
import {ProductPage} from "../../Pages/ProductPage.jsx";
import {ProductsPage} from "../../Pages/ProductsPage.jsx";
import {UserPage} from "../../Pages/UserPage.jsx";
import {AuthPage} from "../../Pages/AuthPage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setUserId, setUserToken} from "../../Storage/Redux/Auth/authSlice.js";

export const SpaRouter = () => {
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.userToken);
    const userId = useSelector(state => state.user.userId);
    const localStorageToken = localStorage.getItem('authToken');
    const localStorageUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (localStorageToken && !userToken) {
            dispatch(setUserToken(localStorageToken))
        }

        if (localStorageUserId && !userId) {
            dispatch(setUserId(localStorageUserId))
        }
    }, [localStorageToken, localStorageUserId]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Header/>}>
                    <Route index element={<MainPage/>} />
                    <Route path='/user'>
                        {userToken ? (
                            <>
                                <Route index element={<UserPage isCurrentUser={true}/>} />
                                <Route path=':tab' element={<UserPage isCurrentUser={true}/>}/>
                            </>
                        ) : (
                            <Route index element={<Navigate to="/"/>}/>
                        )}

                        <Route path=':userId' element={<UserPage/>}>
                            <Route path=':tab' element={<UserPage/>} />
                        </Route>
                    </Route>
                    <Route path='/products'>
                        <Route index element={<Navigate to="/"/>} />
                        <Route path=':categorySlug'>
                            <Route index  element={<ProductsPage/>} />
                            <Route path=':productId' element={<ProductPage/>} />
                        </Route>
                    </Route>
                    {userToken ?
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

