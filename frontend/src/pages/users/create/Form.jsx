import { useState, useContext } from "react";
import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthContext from "../../../contexts/AuthProvider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserDataForm = ({ formMethods, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      first_name: d.name,
      last_name: d.lastname,
      email: d.email,
      password: d.password,
      company: auth.company.id,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          minWidth: { xs: 0, sm: "290px" },
        }}
      >
        <TextField
          label={t("users.create.labels.name")}
          {...register("name", {
            required: t("users.create.errors.requiredName"),
          })}
          error={errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label={t("users.create.labels.lastname")}
          {...register("lastname", {
            required: t("users.create.errors.requiredLastname"),
          })}
          error={errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          label={t("users.create.labels.email")}
          {...register("email", {
            required: t("users.create.errors.requiredEmail"),
          })}
          error={errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type={showPassword ? "input" : "password"}
          label={t("users.create.labels.password")}
          {...register("password", {
            required: t("users.create.errors.requiredPassword"),
          })}
          error={errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.create.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit">
            {t("users.create.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { UserDataForm };
