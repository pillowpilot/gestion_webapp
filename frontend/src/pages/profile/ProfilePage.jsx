import React from "react";
import { Avatar, Badge, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

const ProfilePictureAndName = ({ name, lastname, profile }) => {
    const formatedTitle = `${lastname}, ${name}`;
    const formatedSubtitle = `${profile}`;
    const ProfilePictureWithEditBadge = () => {
        return (
            <IconButton>
                <Badge badgeContent={<Edit />} anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}>
                    <Avatar sx={{
                        width: 128,
                        height: 128,
                    }}>AB</Avatar>
                </Badge>
            </IconButton>
        );
    };
    return (
        <Paper sx={{
            padding: 5,
        }}>
            <Stack direction="row" spacing={2}>
                <ProfilePictureWithEditBadge />
                <Stack direction="column">
                    <Typography variant="h4">{formatedTitle}</Typography>
                    <Typography variant="subtitle2">{formatedSubtitle}</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};

const ProfileData = () => {
    const [profile, setProfile] = React.useState("Profile A");

    const profileChangeHandler = (event) => {
        setProfile(event.target.value);
    };
    return (
        <Paper>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 5,
            }}>
                <FormControl>
                    <Grid container spacing={5} sx={{
                        maxWidth: 600,
                    }}>
                        <Grid item xs={6}>
                            <TextField required label="Name" placeholder="Name A" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required label="Lastname" placeholder="Lastname A" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required label="Email" placeholder="Email A" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Phone" placeholder="Phone A" />
                        </Grid>
                        <Grid item xs={12}>
                            <Select value={profile} onChange={profileChangeHandler} sx={{
                                minWidth: 245,
                            }}>
                                <MenuItem value="Profile A">Profile A</MenuItem>
                                <MenuItem value="Profile B">Profile B</MenuItem>
                                <MenuItem value="Profile C">Profile C</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{
                        margin: "auto",
                        marginTop: 5,
                    }}>Save</Button>
                </FormControl>
            </Box>
        </Paper>
    );
}

const ProfilePage = () => {
    return (
        <Stack spacing={2}>
            <ProfilePictureAndName name="Name A" lastname="Lastname A" profile="Profile A" />
            <ProfileData />
        </Stack>
    );
};

export default ProfilePage;