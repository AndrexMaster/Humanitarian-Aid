import React from "react";
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {ProductList} from "../Components/Products/ProductList.jsx";

export const ProductsPage = () => {
    return (
        <PageLayout>
            <h1>Products Page</h1>
            <ProductList/>
        </PageLayout>
    )
}
