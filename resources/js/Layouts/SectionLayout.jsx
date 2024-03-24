import React from "react";
import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SectionLayout = (props) => {
    const {
        heading,
        viewAllLink,
        children,
    } = props;

    const navigate = useNavigate()

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
                <Typography component="h3" variant="h5">
                    {heading}
                </Typography>
                {viewAllLink && (
                    <Button
                        variant="text"
                        onClick={() => navigate(viewAllLink)}
                    >
                        View All
                    </Button>
                )}
            </Paper>
            <Paper sx={{p: 2}}>{children}</Paper>
        </Box>
    )
}
