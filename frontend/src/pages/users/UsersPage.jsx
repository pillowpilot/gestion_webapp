import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const rows = [
    { id: 1, col1: 'Name A', col2: 'Lastname A', col3: 'Profile A', col4: 'Costs A' },
    { id: 2, col1: 'Name B', col3: 'Profile B', col4: 'Costs B' },
    { id: 3, col1: 'Name C', col2: 'Lastname C', col3: 'Profile C', col4: 'Costs C' },
];

const columns = [
    { field: 'col1', headerName: 'Name', width: 150 },
    { field: 'col2', headerName: 'Lastname', width: 150 },
    { field: 'col3', headerName: 'Profile', width: 150 },
    { field: 'col4', headerName: 'Costs', width: 150 },
];

const UsersDataGrid = () => {
    return (
        <Box>
            <DataGrid rows={rows} columns={columns} />
        </Box>
    );
};

const Actions = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
        }} >
            <Button variant="contained" color="primary" sx={{
                marginTop: 2,
            }}>Add User</Button>
            <Button variant="contained" color="primary" sx={{
                marginTop: 2,
            }}>Edit Selected User</Button>
            <Button variant="contained" color="primary" sx={{
                marginTop: 2,
            }}>Delete Selected User</Button>
        </Box >
    );
};

const UsersPage = () => {
    return (
        <Paper sx={{
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Typography variant="h4">Users' Data</Typography>
            <UsersDataGrid />
            <Actions />
        </Paper>
    );
};

export default UsersPage;