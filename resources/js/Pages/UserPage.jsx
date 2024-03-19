import React, {useState} from "react";
import {Box, Paper} from "@mui/material";
import {UserSidebar} from "../Components/User/UI/UserSidebar.jsx";
import {UserProducts} from "../Components/User/UI/UserProducts.jsx";
import {UserProfile} from "../Components/User/UserProfile.jsx";
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {SidebarLayout} from "../Layouts/SidebarLayout.jsx";
import {UserTabLayout} from "../Layouts/UserTabLayout.jsx";

export const UserPage = () => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <PageLayout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 2
                }}
            >
                <SidebarLayout
                    heading={'Панель управління'}
                >
                    <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
                </SidebarLayout>
                    {activeTab === 0 && (
                        <UserTabLayout heading={'Данні користувача'}>
                            <UserProfile/>
                        </UserTabLayout>
                    )}
                    {activeTab === 1 && (
                        <UserTabLayout heading={'Виставленні користувача'}>
                            <UserProducts/>
                        </UserTabLayout>
                    )}
            </Box>
        </PageLayout>
    )
}
