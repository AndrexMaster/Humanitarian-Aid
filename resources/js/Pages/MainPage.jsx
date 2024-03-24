import React, {useEffect, useState} from "react";
import {PageLayout} from "../Layouts/PageLayout";
import axios from "axios";
import {MainBanner} from "../Components/MainBanner/MainBanner.jsx";

export const MainPage = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/categories/withProducts').then(response => {
            setCategories(response.data.categories);
        });
    }, []);

    return (
        <PageLayout
            beforeContainer={<MainBanner/>}
        />
    )
}
