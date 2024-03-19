import React from "react";
import {ProductList} from "../Components/Products/ProductList";
import {PageLayout} from "../Layouts/PageLayout";
import {SectionLayout} from "../Layouts/SectionLayout";

export const MainPage = () => {
    const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            category: 'Category 1',
            price: 100
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            category: 'Category 2',
            price: 200
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'Description 3',
            category: 'Category 3',
            price: 300
        },
    ];


    return (
        <PageLayout>
            <SectionLayout
                heading={'Featured Products'}
                viewAllLink={'/products'}
            >
                <ProductList products={products}/>

            </SectionLayout>
        </PageLayout>
    )
}
