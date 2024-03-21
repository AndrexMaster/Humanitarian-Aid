import React, {useEffect, useState} from "react";
import {ProductList} from "./ProductList";
import {Box} from "@mui/material";
import axios from "axios";

export const ProductsCategory = (props) => {
    const {categorySlug} = props;

    const [categoryProducts, setCategoryProducts] = useState()

    useEffect(() => {
        axios.get(`/api/categories/${categorySlug}/products`).then(response => {
            setCategoryProducts(response.data.products);
        });
    }, []);

    return (
        <Box>
            {categoryProducts && (
                <ProductList  products={categoryProducts}/>
            )}
        </Box>
    )
}
