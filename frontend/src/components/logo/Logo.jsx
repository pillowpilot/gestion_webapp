import { Typography } from "@mui/material";
import React from "react";

const Logo = () => {
    return (
            <Typography variant="h3" sx={{
                fontWeight: "bold",
                color: "primary.main",
                textTransform: "uppercase",
                textAlign: "center",
            }}>
                LOGO
            </Typography>
    );
};

export default Logo;