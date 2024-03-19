import React from "react";
import {Box, Container} from "@mui/material";

export const PageLayout = ({children}) => {
    return (
        <Box
            sx={{
                py: 6,
            }}
        >
            <Container>
                {children}
            </Container>
        </Box>
    )
}
