import React, {useEffect, useState} from "react";
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {ProductList} from "../Components/Products/ProductList.jsx";
import {useMatch} from "react-router-dom";
import axios from "axios";

export const ProductsPage = () => {
    const match = useMatch('/products/:categorySlug');
    const categorySlug = match.params.categorySlug;
    const [categoryProducts, setCategoryProducts] = useState()

    useEffect(() => {
        axios(`/api/categories/${categorySlug}/products`).then(response => {
            setCategoryProducts(response.data.products);
            console.log('response', response.data.products)
        });
    }, [categorySlug]);
    return (
        <PageLayout
            heading={'Товари'}
        >

            {categoryProducts && (
                <ProductList products={categoryProducts}/>
            )}
        </PageLayout>
    )
}
