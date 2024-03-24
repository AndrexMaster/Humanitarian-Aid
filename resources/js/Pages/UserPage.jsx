import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {UserSidebar} from "../Components/User/UI/UserSidebar.jsx";
import {UserProducts} from "../Components/User/UI/UserProducts.jsx";
import {UserProfile} from "../Components/User/UserProfile.jsx";
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {SidebarLayout} from "../Layouts/SidebarLayout.jsx";
import {UserTabLayout} from "../Layouts/UserTabLayout.jsx";
import {useMatch} from "react-router-dom";

export const UserPage = (props) => {
    const {
        isCurrentUser,
    } = props;

    const [activeTab, setActiveTab] = useState(0)
    const matchUserTab = useMatch('/user/:tab');
    const userTab = matchUserTab?.params?.tab;


    useEffect(() => {
        if (userTab === 'products') {
            setActiveTab(1)
        } else {
            setActiveTab(0)
        }
    }, [matchUserTab]);


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
                    <UserSidebar activeTab={activeTab} isCurrentUser={isCurrentUser} setActiveTab={setActiveTab}/>
                </SidebarLayout>
                    {activeTab === 0 && (
                        <UserTabLayout heading={'Данні користувача'}>
                            <UserProfile isCurrentUser={isCurrentUser}/>
                        </UserTabLayout>
                    )}
                    {activeTab === 1 && (
                        <UserTabLayout heading={'Виставленні товари користувача'}>
                            <UserProducts isCurrentUser={isCurrentUser}/>
                        </UserTabLayout>
                    )}
            </Box>
        </PageLayout>
    )
}
