import React from 'react';
import {Box, Paper} from "@mui/material";
import {ProductImage} from "./UI/ProductImage";
import {ProductForm} from "./UI/ProductForm";
import {ProductDescription} from "./UI/ProductDescription";

export const ProductProfile = ({product}) => {

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 2,
            }}
        >
            <ProductImage imageSrc={product?.image_src ?? ''}/>
            <Paper
                sx={{
                    display: 'flex',
                    p: 2
                }}
            >
                <ProductForm product={product ?? {}}/>
            </Paper>
            <ProductDescription product={product ?? {}}/>
        </Box>
    )
}
