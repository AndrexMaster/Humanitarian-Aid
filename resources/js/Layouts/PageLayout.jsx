import React from "react";
import {Box, Breadcrumbs, Container, Paper, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

export const PageLayout = (props) => {
    const {
        beforeContainer,
        children,
        heading
    } = props;
    let location = useLocation();
    const locationPath = location.pathname
    const breadCrumbsItems = locationPath.split('/').filter(item => item !== '');

    return (
        <Box>
            {beforeContainer !== undefined && beforeContainer}
            {children && (
                <Container
                    sx={{
                        pt: beforeContainer || locationPath === '/auth' ? '0' : '56px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            py: 4,
                        }}
                    >
                        {heading && (
                            <Paper
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    p: 2
                                }}
                            >
                                <Breadcrumbs aria-label="breadcrumb">
                                    {breadCrumbsItems.map((item, index) => (
                                        <Typography key={index} color="text.primary">{item}</Typography>
                                    ))}
                                </Breadcrumbs>
                                <Typography variant={'h4'}>
                                    {heading}
                                </Typography>
                            </Paper>
                        )}
                        {children}
                    </Box>
                </Container>
            )}
        </Box>
    )
}
