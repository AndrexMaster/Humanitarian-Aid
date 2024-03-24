import React, {createContext, useContext} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Box, Button, Switch, Tooltip, useTheme} from "@mui/material";
import {UserMenu} from "./UI/UserMenu.jsx";
import {MenuList} from "./UI/MenuList.jsx";
import {toggleTheme} from '../../Storage/Redux/Global/themeSlice';
import {useDispatch} from "react-redux";

export const Header = (props) => {

    let location = useLocation();
    const dispatch = useDispatch();
    const isMainPage = location.pathname === '/'
    const theme = useTheme();


    return (
        <>
            <Box
                sx={{
                    py: 1,
                    px: 2,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100vw',
                    zIndex: 1,
                    boxSizing: 'border-box',
                    backgroundColor: isMainPage ? 'transparent' : theme.palette.background.default,
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        component={'img'}
                        src={'/assets/logo.png'}
                        sx={{height: '40px', width: '40px'}}
                    />
                    <MenuList isMainPage={isMainPage} categories/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                        }}
                    >
                        <Tooltip title="Перемкнути тему">
                            <Switch
                                onChange={() => dispatch(toggleTheme())}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{
                                    '& .MuiSwitch-track': {
                                        backgroundColor: isMainPage ? theme.palette.background.switchTrack.main : theme.palette.background.switchTrack.default
                                    }
                                }}
                            />
                        </Tooltip>
                        <UserMenu/>
                    </Box>
                </Box>
            </Box>
            <Outlet/>
        </>
    )
}
