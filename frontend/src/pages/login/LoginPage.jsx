import React from "react";
import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Image } from "mui-image";
import loginSideImage from "../../assets/login-side-image-2.jpg";

const LoginLeft = () => {
  return (
    <Box sx={{
      maxHeight: "inherit",
      flexBasis: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Image src={loginSideImage} style={{
        maxHeight: "inherit",
      }} />
    </Box>
  );
}

const LoginRight = () => {
  return (
    <Box sx={{
      padding: 4,
      minWidth: "600px",
      flexBasis: '50%',
    }}>
      <Stack direction="column" gap={2}>
        <Typography variant="h3">Log in</Typography>
        <Typography variant="subtitle1">Welcome back!</Typography>
        <TextField type="email" label="Email" name="email" placeholder="Enter your email here" required />
        <TextField type="password" label="Password" name="password" placeholder="Enter your email here" required />
        <Button type="submit" variant="contained" sx={{
          paddingY: '1rem',
        }}>Log in</Button>
        <Stack direction="row" sx={{
          justifyContent: "space-between",
        }}>
          <Typography variant="subtitle1">Don't have an account?</Typography>
          <NavLink to="/">
            <Typography variant="subtitle1">Skip to dashboard</Typography>
          </NavLink>
        </Stack>
      </Stack>
    </Box>
  );
}

const LoginPage = () => {
  return (
    <Stack direction="row" sx={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Paper sx={{
        maxWidth: "1200px",
        maxHeight: "680px",
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}>
        <LoginLeft></LoginLeft>
        <LoginRight></LoginRight>
      </Paper>
    </Stack>
  );
}

export default LoginPage;