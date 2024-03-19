import React from "react";
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {Box, Paper, Tab, Tabs} from "@mui/material";
import {RegistrationForm} from "../Components/Auth/RegistrationForm.jsx";
import {LoginForm} from "../Components/Auth/LoginForm.jsx";

export const AuthPage = ({activeTab}) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <PageLayout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Paper sx={{width: '350px', p: 2}}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                                <Tab sx={{width: '50%'}} label="Вхід" {...a11yProps(0)} />
                                <Tab sx={{width: '50%'}} label="Реєстрація" {...a11yProps(1)} />
                            </Tabs>
                        </Box>

                        {tabIndex === 0 && (
                            <LoginForm/>
                        )}
                        {tabIndex === 1 && (
                            <RegistrationForm/>
                        )}
                    </Box>
                </Paper>
            </Box>
        </PageLayout>
    )
}
