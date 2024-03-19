import React from "react";
import {Box, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const SectionLayout = (props) => {
    const {
        heading,
        viewAllLink,
        children,
    } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Typography component={'h3'} variant={'h5'}>
                    {heading}
                </Typography>
                {viewAllLink && (
                    <Link
                        to={viewAllLink}
                    >
                        <Typography>
                            View All
                        </Typography>
                    </Link>
                )}
            </Paper>
            <Box>{children}</Box>
        </Box>
    )
}
