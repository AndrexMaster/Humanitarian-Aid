import React from "react";
import {NavLink} from "react-router-dom";
import {Box, Typography} from "@mui/material";

export const MenuList = () => {
    const menuList = [
        {
            title: 'Головна',
            link: '/'
        },
        {
            title: 'Каталог',
            link: '/products'
        },
    ]

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,

                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease',
                    borderBottom: '1px solid transparent',

                    '&.active': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                    },
                    '&.pending': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                    },
                    '&.transitioning': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                    }
                }
            }}
        >
            {menuList.map((item, index) => {
                return (
                    <NavLink
                        to={item.link}
                        key={index}
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        sx={{
                        }}
                    >
                        <Typography>
                            {item.title}
                        </Typography>
                    </NavLink>
                )
            })}
        </Box>
    )
}
