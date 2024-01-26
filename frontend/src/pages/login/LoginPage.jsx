import { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthProvider";
import bgImage from "../../assets/orange_field_bg.png";


const LoginRight = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth, setAuth, onLogin } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      loginEmail: "manager@unida.com",
      loginPassword: "manager",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const onSubmitHandler = async (data) => {
    setErrorMsg("");

    const email = data.loginEmail;
    const password = data.loginPassword;

    try {
      await onLogin(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(`Error while login`, err);
      const responseCode = err.code;
      switch(responseCode){
        case "ERR_NETWORK":
          setErrorMsg(t("errors.network.default"));
          break;
        case "ERR_BAD_REQUEST":
          setErrorMsg(t("errors.credentials.default"));
          break;
        default:
          setErrorMsg(t("errors.unknown.default"));
      }
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        flexBasis: "50%",
      }}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction="column" gap={2}>
          <Typography variant="h3">{t("login.header")}</Typography>
          <Typography variant="subtitle1">{t("login.caption")}</Typography>
          <TextField
            type="email"
            label="Email"
            placeholder="Enter your email here"
            required
            {...register("loginEmail")}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Enter your password here"
            required
            {...register("loginPassword")}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              paddingY: "1rem",
            }}
          >
            {t("login.loginBtn")}
          </Button>
          <Stack
            direction="column"
            gap={2}
            justifyContent="space-between"
          >
            {errorMsg === "" ? (
              <></>
            ) : (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            <Typography variant="subtitle1">{t("login.dontHaveAccount")}</Typography>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

const LoginPage = () => {
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <Grid item sx={0} md={6} lg={8}></Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ minWidth: 400 }}>
          <LoginRight />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
