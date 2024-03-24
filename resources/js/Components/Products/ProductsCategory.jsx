import React, {useEffect, useState} from "react";
import {ProductList} from "./ProductList";
import {Box} from "@mui/material";
import axios from "axios";

export const ProductsCategory = (props) => {
    const {category} = props;

    const [categoryProducts, setCategoryProducts] = useState()

    useEffect(() => {
        axios.get(`/api/categories/${category.slug}/products`).then(response => {
            setCategoryProducts(response.data.products);
        });
    }, []);

    return (
        <Box>
            {categoryProducts && (
                <ProductList category={category} products={categoryProducts}/>
            )}
        </Box>
    )
}
