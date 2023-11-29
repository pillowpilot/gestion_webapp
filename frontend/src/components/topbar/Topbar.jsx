import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const Topbar = () => {
    return (
        <Box sx={{
            paddingY: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            gap: 1,
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
            }}>
            <Typography variant="subtitle1">Some User</Typography>
            <Typography variant="caption" sx={{
                color: "text.secondary",
            }}>Some profile</Typography>
            </Box>
            <Avatar>SU</Avatar>
        </Box>
    );
};

export default Topbar;