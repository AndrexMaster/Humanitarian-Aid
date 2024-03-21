import React, {useEffect, useState} from "react";
import {PageLayout} from "../Layouts/PageLayout";
import {SectionLayout} from "../Layouts/SectionLayout";
import axios from "axios";
import {ProductsCategory} from "../Components/Products/ProductsCategory.jsx";

export const MainPage = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/categories').then(response => {
            setCategories(response.data.categories);
        });
    }, []);

    return (
        <PageLayout>
            {categories?.length > 0 && categories.map(category => (
                <SectionLayout
                    key={category.id}
                    heading={category.name}
                    viewAllLink={`/products/${category.slug}`}
                >
                    <ProductsCategory categorySlug={category.slug}/>
                </SectionLayout>
            ))}
        </PageLayout>
    )
}
