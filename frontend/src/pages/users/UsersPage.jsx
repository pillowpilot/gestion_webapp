import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const rows = [
    { id: 1, col1: 'Name A', col2: 'Lastname A', col3: 'Profile A', col4: 100000 },
    { id: 2, col1: 'Name B', col3: 'Profile B', col4: 'Costs B' },
    { id: 3, col1: 'Name C', col2: 'Lastname C', col3: 'Profile C', col4: 110000 },
    { id: 4, col1: 'Name D', col2: 'Lastname D', col3: 'Profile B', col4: 100011 },
    { id: 5, col1: 'Name E', col2: 'Lastname E', col3: 'Profile A', col4: 20000 },
    { id: 6, col1: 'Name F', col2: 'Lastname F', col3: 'Profile A', col4: 0 },
    { id: 7, col1: 'Name G', col2: 'Lastname G', col3: 'Profile C', col4: 852963 },
    { id: 8, col1: 'Name H', col2: 'Lastname H', col3: 'Profile C', col4: 789654 },
    { id: 9, col1: 'Name I', col2: 'Lastname I', col3: 'Profile B', col4: 1945558 },
    { id: 10, col1: 'Name H', col2: 'Lastname H', col3: 'Profile B', col4: 1945558 },
    { id: 11, col1: 'Name AX', col2: 'Lastname A', col3: 'Profile A', col4: 100000 },
    { id: 12, col1: 'Name BX', col3: 'Profile B', col4: 'Costs B' },
    { id: 13, col1: 'Name CX', col2: 'Lastname C', col3: 'Profile C', col4: 110000 },
    { id: 14, col1: 'Name DX', col2: 'Lastname D', col3: 'Profile B', col4: 100011 },
    { id: 15, col1: 'Name EX', col2: 'Lastname E', col3: 'Profile A', col4: 20000 },
    { id: 16, col1: 'Name FX', col2: 'Lastname F', col3: 'Profile A', col4: 0 },
    { id: 17, col1: 'Name GX', col2: 'Lastname G', col3: 'Profile C', col4: 852963 },
    { id: 18, col1: 'Name HX', col2: 'Lastname H', col3: 'Profile C', col4: 789654 },
    { id: 19, col1: 'Name IX', col2: 'Lastname I', col3: 'Profile B', col4: 1945558 },

];

const nameWithAvatarRenderingFunction = (params) => {
    const extractInitials = (fullname) => {
        const parts = fullname.split(' ');
        const nameInitial = parts[0].charAt(0);
        const lastnameInitial = parts[1]? parts[1].charAt(0): '';
        return nameInitial + lastnameInitial;
    };
    console.log(params);
    const fullname = params.formattedValue;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
        }}>
            <Avatar>{extractInitials(fullname)}</Avatar>
            {fullname}
        </Box>
    );
};

const lastnameRenderingFunction = (params) => {
    return (params.formattedValue);
};

const columns = [
    { field: 'name', headerName: 'Name', width: 250, renderCell: nameWithAvatarRenderingFunction },
    { field: 'website', headerName: 'Profile', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'id', headerName: 'Details', renderCell: 
        (params) => (<Button variant="contained" color="primary">Modify</Button>) },
];

const UsersDataGrid = () => {
    const [users, setUsers] = useState([]);

    const isDataReady = useRef(false);

    useEffect(() => {
        if (!isDataReady.current) {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(data => {
                    setUsers([
                        ...data, 
                        ...data.map((o) => ({ ...o, 'id': o.id + 10 })),
                        ...data.map((o) => ({ ...o, 'id': o.id + 20 })),
                    ]);
                    isDataReady.current = true;
                })
        }
    })

    return (
        <Box>
            <DataGrid checkboxSelection pageSizeOptions={[10, 25, 50, 100]} rows={users} columns={columns} sx={{
                height: "500px",
            }}/>
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
            }}>Delete Selected Users</Button>
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