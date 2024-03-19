import React from "react";
import {Box, Divider, Paper, Typography} from "@mui/material";

export const UserTabLayout = ({heading, children}) => {

    return (
        <Paper
            sx={{
                p: 2,
                flex: '100%',
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
                    pl: 1,
                    pt: 2,
                }}
            >
                {children}
            </Box>
        </Paper>
    )
}
