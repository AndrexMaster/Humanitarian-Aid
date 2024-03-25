import React from 'react';
import {Box, Paper, Typography} from "@mui/material";

export const ProductDescription = ({product}) => {

    return (
        <Paper
            sx={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
                p: 2
            }}
        >
            <Box>
                <Typography>
                    123123123123
                </Typography>
            </Box>
            <Box>
                <Typography>
                    345345345345
                </Typography>
            </Box>
        </Paper>
    )
}
