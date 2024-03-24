import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Box, Typography, useTheme} from "@mui/material";
import axios from "axios";

export const MenuList = (props) => {
    const {
        isMainPage,
    } = props
    const theme = useTheme();
    const [menuList, setMenuList] = useState([]);

    const mainPageMenu = {
        '& a': {
            textDecoration: 'none',
            color: '#FFF',
            transition: 'color 0.3s ease',
            borderBottom: '1px solid transparent',

            '&.active': {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
            '&.pending': {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
            '&.transitioning': {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },

            '&.active p': {
                color: theme.palette.primary.main,
            }
        }
    };
    const defaultMenu = {
        '& a': {
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            borderBottom: '1px solid transparent',
            color: 'inherit',

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
            },

            '&.active p': {
                color: theme.palette.primary.main,
            }
        }
    };
    useEffect(() => {
        axios('/api/headerMenu')
            .then(response => {
                setMenuList(response.data.menu);
            })
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,
                ...(isMainPage ? mainPageMenu : defaultMenu)
            }}
        >
            {menuList?.length > 0 && menuList.map((item, index) => {
                return (
                    <NavLink
                        to={item.url}
                        key={index}
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                    >
                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}
                        >
                            {item.title}
                        </Typography>
                    </NavLink>
                )
            })}
        </Box>
    )
}
