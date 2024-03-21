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

export const UserMenu = ({setAuthToken}) => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

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
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate('/');
    }

    return (
        <>
            {!authToken ?
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
                        <MenuItem onClick={() => navigate(`user/${userId}`)}>
                            Профіль
                        </MenuItem>
                        <MenuItem onClick={() => navigate(`user/${userId}/products`)}>
                            Мої товари</MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            handleLogOut()
                            setAuthToken('')
                        }}>
                            Вийти з аккаунту
                        </MenuItem>
                    </Menu>
                </>
            }

        </>
    )
}
