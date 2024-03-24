import React from "react";
import {PageLayout} from "../Layouts/PageLayout.jsx";
import {Box, Paper, Tab, Tabs, Typography} from "@mui/material";
import {RegistrationForm} from "../Components/Auth/RegistrationForm.jsx";
import {LoginForm} from "../Components/Auth/LoginForm.jsx";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

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
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    height: 'calc(100vh - 56px)',
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        p: 2,
                        width: '350px',
                    }}
                >
                    {tabIndex === 0 && (
                        <>
                            <VerifiedUserIcon/>
                            <Typography variant={'h5'}>
                                Вхід
                            </Typography>
                            <VerifiedUserIcon/>
                        </>

                    )}
                    {tabIndex === 1 && (
                        <>
                            <VerifiedUserIcon/>
                            <Typography variant={'h5'}>
                                Реєстрація
                            </Typography>
                            <VerifiedUserIcon/>
                        </>
                    )}
                </Paper>
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
