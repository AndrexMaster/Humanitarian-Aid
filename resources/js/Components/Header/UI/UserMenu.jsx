import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Menu,
    MenuItem,
    Tooltip
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "@/Storage/Redux/Auth/authSlice.js";

export const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userToken = useSelector(state => state.user.userToken);


    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    };

    const handleLogOut = () => {
        dispatch(userLogout())
        handleClose()
        navigate('/');
    }

    return (
        <>
            {!userToken ?
                <Button variant="text" onClick={() => navigate('auth')}>Увійти</Button>
            :
                <>
                    <Box
                        sx={{
                            cursor: 'pointer',

                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >

                        <Tooltip title="User menu">

                            <Avatar
                                alt="User avatar"
                                src={'https://via.placeholder.com/150' ?? ''}
                                onClick={handleClick}
                            />
                        </Tooltip>
                    </Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}

                    >
                        <MenuItem onClick={() => navigate(`user`)}>
                            Профіль
                        </MenuItem>
                        <MenuItem onClick={() => navigate(`user/products`)}>
                            Мої товари</MenuItem>
                        <MenuItem onClick={() => {
                            handleLogOut()
                        }}>
                            Вийти з аккаунту
                        </MenuItem>
                    </Menu>
                </>
            }

        </>
    )
}
