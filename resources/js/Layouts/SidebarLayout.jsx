import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";

export const SidebarLayout = ({heading, children}) => {

    return (
        <Paper
            sx={{
                p: 2,
            }}
        >
            {heading?.length > 0 && (
                <>
                    <Box
                        sx={{
                            pb: 2,
                            pl: 1,
                        }}
                    >
                        <Typography variant={'h6'}>
                            {heading}
                        </Typography>
                    </Box>
                    <Divider/>
                </>
            )}
            <Box
                sx={{
                    pt: 2,
                }}
            >
                {children}
            </Box>
        </Paper>
    )
}
