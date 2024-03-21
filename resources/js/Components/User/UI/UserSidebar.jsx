import React from "react";
import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const UserSidebar = ({activeTab, setActiveTab}) => {
    const navigate = useNavigate()

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    '& > *': {
                        px: 2,
                        py: 1,
                    },

                    '& > *:not(:last-child)': {
                        borderBottom: '1px solid #ebebeb',
                    },

                }}
            >
                <Box
                    sx={{
                        backgroundColor: activeTab === 0 ? '#1976d2' : 'transparent',
                        '& p': {
                            color: activeTab === 0 ? '#FFF' : '#626262'
                        },

                        '&:hover': {
                            cursor: activeTab !== 0 && 'pointer',
                            backgroundColor: activeTab !== 0 && 'theme.primary',
                        }
                    }}
                    onClick={() => {
                        setActiveTab(0);
                        navigate('')

                    }}

                >
                    <Typography>
                        Данні користувача
                    </Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: activeTab === 1 ? '#1976d2' : 'transparent',
                        '& p': {
                            color: activeTab === 1 ? '#FFF' : '#626262'
                        },

                        '&:hover': {
                            cursor: activeTab !== 1 && 'pointer',
                            backgroundColor: activeTab !== 1 && 'theme.primary',
                        }
                    }}
                    onClick={() => {
                        setActiveTab(1)
                        navigate('products')
                    }}
                >
                    <Typography>
                        Список товарів користувача
                    </Typography>
                </Box>
            </Box>
        )
}
