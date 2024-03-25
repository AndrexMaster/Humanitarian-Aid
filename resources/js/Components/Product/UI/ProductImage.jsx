import React from 'react';
import {Box, Paper} from "@mui/material";

export const ProductImage = ({imageSrc}) => {

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '70vh',
                maxWidth: '100%',
                boxSizing: 'border-box',
                p: 2,
                aspectRatio: 1,
            }}
        >
            <Box
                component={'img'}
                src={imageSrc ?? ''}
                sx={{
                    height: '100%',
                    objectFit: 'contain',
                }}
            />
        </Paper>
    )
}
