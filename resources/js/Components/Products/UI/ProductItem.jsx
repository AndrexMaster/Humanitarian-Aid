import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const ProductItem = (props) => {
    const {
        product,
        setIsOpenDialog,
        category
    } = props;
    let navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: 345,
                transition: 'transform 0.3s ease',
                position: 'relative',
                '&:hover': {
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)',
                }
            }}
        >
            {(product?.category?.name ?? product?.category?.name) && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                    }}
                >
                    <Chip label={product?.category?.name} sx={{
                        backgroundColor: '#FFFFFF',
                    }} />
                </Box>
            ) }
            <CardMedia
                sx={{
                    height: 140,
                    cursor: 'pointer',
                }}
                image={product.imageSrc ?? 'https://via.placeholder.com/150'}
                title="green iguana"
                onClick={() => navigate(`/products/${product.category.slug}/${product.id}`)}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant={'contained'}
                    sx={{
                        width: '100%',
                    }}
                    onClick={(e) => {
                        if (setIsOpenDialog) {
                            e.preventDefault();
                            setIsOpenDialog(true)
                        }
                    }}
                >Замовити</Button>
            </CardActions>
        </Card>
    )
}
