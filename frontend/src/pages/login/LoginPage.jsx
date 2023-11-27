import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const LoginLeft = () => {
  return (
    <Box sx={{
      flexBasis: '66%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Typography variant="body1" sx={{
        textAlign: 'right',
      }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur sed assumenda architecto recusandae placeat? Similique optio labore natus unde voluptatibus iusto. Delectus quasi adipisci obcaecati labore laboriosam cupiditate accusamus soluta!
      </Typography>
    </Box>
  );
}

const LoginRight = () => {
  return (
    <Box sx={{
      flexBasis: '33%',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
        gap: '1.5rem',
      }}>
        <Typography variant="h3">Log in</Typography>
        <Typography variant="subtitle1">Welcome back!</Typography>
        <TextField type="email" label="Email" name="email" placeholder="Enter your email here" required />
        <TextField type="password" label="Password" name="password" placeholder="Enter your email here" required />
        <Button type="submit" variant="contained" sx={{
          paddingY: '1rem',
        }}>Log in</Button>
        <Typography variant="subtitle1">Don't have an account?</Typography>
      </Box>
    </Box>
  );
}

const Login = () => {
  return (
    <div className="login">
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '2rem',
        }}>
        <LoginLeft></LoginLeft>
        <LoginRight></LoginRight>
      </Box>
    </div>
  );
}

export default Login;