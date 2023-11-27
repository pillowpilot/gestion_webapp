import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";

const SidebarOption = ({ title, Icon, to }) => {
    return (
        <ListItem>
            <ListItemButton component={RouterLink} to={to} sx={{
                '&': {
                    borderRadius: '10px',
                    padding: 2,
                    color: 'text.primary',
                },
                '&.active': {
                    color: 'primary.contrastText',
                    bgcolor: 'primary.main',
                    fontWeight: 'bold',
                },
            }}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={title} primaryTypographyProps={{
                    color: 'inherited',
                }} />
            </ListItemButton>
        </ListItem>
    );
}

const Sidebar = ({ data }) => {
    return (<Box>
        <List>
            {data.map((item, index) => (
                <SidebarOption key={index} title={item.title} Icon={item.Icon} to={item.to} />
            ))}
        </List>
    </Box>);
};

export default Sidebar;