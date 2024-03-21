import React from "react";
import {Outlet} from "react-router-dom";
import {Box, Paper} from "@mui/material";
import {UserMenu} from "./UI/UserMenu.jsx";
import {MenuList} from "./UI/MenuList.jsx";

export const Header = (props) => {
    const {
        setAuthToken,
        categories,
    } = props;

    return (
        <>
            <Paper
                sx={{
                    py: 1,
                    px: 2,
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
                    <Box sx={{height: '40px', width: '40px'}}></Box>
                    <MenuList categories={categories}/>
                    <UserMenu setAuthToken={setAuthToken}/>
                </Box>
            </Paper>
            <Outlet/>
        </>
    )
}
