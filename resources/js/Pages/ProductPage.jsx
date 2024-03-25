import React, {useEffect, useState} from 'react';
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {useMatch} from "react-router-dom";
import axios from "axios";
import {ProductProfile} from "../Components/Product/ProductProfile.jsx";

export const ProductPage = () => {
    const match = useMatch('/products/:categorySlug/:productId');
    const productId = match.params.productId;
    const [product, setProduct] = useState()

    useEffect(() => {
        axios(`/api/products/${productId}`).then(response => {
            setProduct(response.data.product);
            console.log('response', response.data.product)
        });
    }, [productId]);

    return (
        <PageLayout
            heading={product?.name}
        >
            {product && (
                <ProductProfile product={product}/>
            )}
        </PageLayout>
    )
}
