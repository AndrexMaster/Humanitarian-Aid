import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";

export const ProductDescription = ({product}) => {

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gridColumnStart: 1,
                gridColumnEnd: 3,
                p: 2,
                gap: 2,
            }}
        >
            <Box>
                <Typography variant={'h4'}>
                    Повний опис
                </Typography>
                <Divider/>
            </Box>
            <Box>
                <Typography>
                    {product.full_description}
                </Typography>
            </Box>
        </Paper>
    )
}
