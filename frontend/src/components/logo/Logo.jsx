import { Box, Typography } from "@mui/material";
import React from "react";

const Logo = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
        }}>
            <Typography variant="h3" sx={{
                fontWeight: "bold",
                color: "primary.main",
                textTransform: "uppercase",
            }}>
                LOGO
            </Typography>
        </Box>
    );
};

export default Logo;